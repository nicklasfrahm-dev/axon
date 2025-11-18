import type { AxonClient } from "@axon/app/lib/axon";
import { Cluster, Service, Tenant } from "@axon/app/lib/axon";
import LightningFS from "@isomorphic-git/lightning-fs";
import git from "isomorphic-git";
import http from "isomorphic-git/http/web";

class GitClient implements AxonClient {
  private fs: LightningFS.PromisifiedFS;
  private gitOptions: {
    fs: LightningFS.PromisifiedFS;
    http: typeof http;
    url: string;
    corsProxy: string;
    dir: string;
    singleBranch: boolean;
    depth: number;
  };

  constructor(private repoPath: string) {
    this.fs = new LightningFS("fs").promises;
    this.gitOptions = {
      fs: this.fs,
      http: http,
      url: this.repoPath,
      corsProxy: "https://cors.isomorphic-git.org",
      dir: "/",
      singleBranch: true,
      depth: 1,
    };
  }

  async refresh(): Promise<void> {
    // Clone the repository if not already cloned,
    // otherwise fetch the latest changes.
    const entries = await this.fs.readdir("/");
    if (entries.length === 0) {
      await git.clone(this.gitOptions);

      return;
    }

    await git.fetch(this.gitOptions);
  }

  async listClusters(): Promise<Cluster[]> {
    const entries = await this.fs.readdir("/deploy/clusters");

    return Promise.all(
      entries.map(async (entry) => {
        const stat = await this.fs.stat(`/deploy/clusters/${entry}`);
        if (stat.isDirectory()) {
          return new Cluster(entry);
        }

        return null;
      }),
    ).then((clusters) =>
      clusters.filter((cluster: Cluster | null) => cluster !== null),
    );
  }

  async listServices(): Promise<Service[]> {
    const entries = await this.fs.readdir("/deploy/services");

    return Promise.all(
      entries.map(async (entry) => {
        const stat = await this.fs.stat(`/deploy/services/${entry}`);
        if (stat.isDirectory()) {
          return new Service(entry);
        }

        return null;
      }),
    ).then((services) =>
      services.filter((service: Service | null) => service !== null),
    );
  }

  async listTenants(): Promise<Tenant[]> {
    const clusters = await this.listClusters();

    const clusterTenants = await Promise.all(
      clusters.map(async (cluster) => {
        const entries = await this.fs.readdir(
          `/deploy/clusters/${cluster.name}`,
        );
        return Promise.all(
          entries.map(async (entry) => {
            const stat = await this.fs.stat(
              `/deploy/clusters/${cluster.name}/${entry}`,
            );
            if (stat.isDirectory()) {
              return new Tenant(`${cluster.name}/${entry}`, entry);
            }

            return null;
          }),
        ).then((tenants) =>
          tenants.filter((tenant: Tenant | null) => tenant !== null),
        );
      }),
    );

    return clusterTenants.flat(1);
  }
}

export default GitClient;
