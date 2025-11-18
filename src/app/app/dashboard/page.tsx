"use client";

import type { Cluster, Service, Tenant } from "@axon/app/lib/axon";
import GitClient from "@axon/app/lib/axon/git";
import { Boxes, Container, Package, Rocket, SquareDashed } from "lucide-react";
import { useEffect, useState } from "react";

type InfraInfo = {
  clusters: Cluster[];
  services: Service[];
  tenants: string[];
};

function uniqueTenantNames(tenants: Tenant[]): string[] {
  const namesSet = new Set<string>();

  tenants.forEach((tenant) => {
    namesSet.add(tenant.name);
  });

  return Array.from(namesSet);
}

// TODO: Move this to context and provide this via SSR.
const env = process.env;

export default function Dashboard() {
  const [query, setQuery] = useState("");
  const [infraInfo, setInfraInfo] = useState<InfraInfo>({
    clusters: [],
    services: [],
    tenants: [],
  });

  const instances = [];

  useEffect(() => {
    (async () => {
      const gitClient = new GitClient(
        env.NEXT_PUBLIC_GIT_REPO ||
          "https://github.com/nicklasfrahm-dev/platform",
      );

      await gitClient.refresh();

      const clusters = await gitClient.listClusters();
      const services = await gitClient.listServices();
      const tenants = await gitClient.listTenants();

      console.log(tenants);

      setInfraInfo({
        clusters,
        services,
        tenants: uniqueTenantNames(tenants),
      });
    })();
  }, []);

  const items = [
    {
      title: "Instances",
      count: instances.length,
      icon: <Container />,
    },
    {
      title: "Services",
      count: infraInfo.services.length,
      icon: <Package />,
    },
    {
      title: "Clusters",
      count: infraInfo.clusters.length,
      icon: <Boxes />,
    },
    {
      title: "Tenants",
      count: infraInfo.tenants.length,
      icon: <SquareDashed />,
    },
  ];

  return (
    <div className="p-4">
      <main className="mx-auto gap-8 max-w-5xl">
        {/* Overview card */}
        <div className="card p-4 shadow-sm mb-6">
          <div className="flex justify-between text-center">
            {items.map((item) => (
              <div key={item.title} className="flex-1">
                <div className="text-md text-[hsl(var(--foreground))]">
                  <span className="mr-1">{item.title}</span>
                </div>
                <div className="flex items-center justify-center mb-2 gap-2">
                  {item.icon}
                  <div className="text-3xl font-bold">{item.count}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search infrastructure"
              className="grow input px-4 py-4 text-lg"
            />
            <button
              type="button"
              className="ml-4 button-primary flex flex-row items-center"
            >
              <Rocket />
              <span className="ml-2 flex flex-row items-center">
                Deploy Service
              </span>
            </button>
          </div>
        </div>
        <div id="services-list" className="grid gap-4">
          {infraInfo.services
            .filter((service) =>
              service.name.toLowerCase().includes(query.toLowerCase()),
            )
            .map((service) => (
              <div key={service.name} className="card p-4 shadow-sm">
                <div className="text-xl font-bold flex items-center gap-2">
                  <Package />
                  {service.name}
                </div>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}
