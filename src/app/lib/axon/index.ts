interface AxonClient {
  // refresh implements the logic to sync the underlying data source.
  // For Git-based clients, this would involve pulling the latest changes.
  refresh(): Promise<void>;
  // Cluster management.
  listClusters(): Promise<Cluster[]>;
  // Service management.
  listServices(): Promise<Service[]>;
}

class Cluster {
  constructor(private name: string) {}

  environment(): string {
    const chunks = this.name.split("-");

    if (chunks.length < 2) {
      throw new Error(
        `Failed to parse cluster environment from name: ${this.name}`,
      );
    }

    return chunks[0];
  }

  location(): string {
    const chunks = this.name.split("-");

    if (chunks.length < 2) {
      throw new Error(
        `Failed to parse cluster location from name: ${this.name}`,
      );
    }

    return chunks[1];
  }
}

class Service {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

export type { AxonClient };
export { Cluster, Service };
