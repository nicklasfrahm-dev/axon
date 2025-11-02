# Axon

Axon is a developer platform frontend for managing releases and environment overlays stored in Git. It's a minimal Next.js app and includes a small, pluggable client interface so the UI can talk to GitHub or other backends. So far, only GitHub is supported.

> 🚧 EXPERIMENTAL 🚧: This project is in an early stage of development and is not yet ready for production use. APIs may break between minor releases, and the project is not yet feature-complete. The project does however adhere to [semantic versioning][semver], so patch releases will never break the API.

## Features

- Dashboard showing clusters, tenants, and services.
- Per-service pages with overlay YAMLs and promotion/diff workflows.

## Conventions

There are two classes of configuration in Axon, `release` configuration, which defines the
chart, version, and repository for a service, and `service` configuration, which defines
the overlays for different environments, clusters, and tenants.

The `release` configuration is stored in directories following the pattern below:

```
deploy/clusters/<cluster>/<tenant>/<release>.yaml
```

Each `<release>.yaml` references an OCI chart and a tag, for example:

```yaml
repository: oci://ghcr.io/nicklasfrahm/charts
release: sample
chart: sample-chart
tag: 0.3.0
```

The `service` configuration is stored in directories following the layout below:

```
deploy/services/<release>/
  ├── 00-base.yaml
  ├── 10-env-dev.yaml
  ├── 10-env-stg.yaml
  ├── 10-env-prd.yaml
  ├── 20-cluster-prd-cph02.yaml
  └── 30-tenant-customer.yaml
```

### Client interface

The UI uses an interface so transports can be swapped during development or testing.

```typescript
interface AxonClient {
  clusters(): ClusterClient;
  services(): ServiceClient;
  tenants(): TenantClient;
}

interface ClusterClient {
  list(): Promise<Cluster[]>;
  get(name: string): Promise<Cluster>;
}

interface ServiceClient {
  list(): Promise<Service[]>;
  get(name: string): Promise<Service>;
}

interface TenantClient {
  list(): Promise<Tenant[]>;
  get(name: string): Promise<Tenant>;
}
```

## Development

The application is built with [Next.js][nextjs] and uses [Tailwind CSS][tailwindcss] for styling. Make sure to have the latest LTS of [Node.js][nodejs] installed. We recommend using [`nvm`][nvm] to manage your Node.js versions.

```bash
# Set up Node.js environment.
nvm install --lts
nvm use --lts
# Install dependencies.
npm ci
npm run dev
```

Create a `.env` file in the project root with the following content:

```ini
# The GitHub OAuth Client ID for authentication.
AUTH_GITHUB_ID=your_github_oauth_client_id
# The GitHub OAuth Client Secret for authentication.
AUTH_GITHUB_SECRET=your_github_oauth_client_secret
# A secret used to encrypt JWT tokens for authentication.
AUTH_SECRET=your_auth_secret_here
# The base URL for the application.
AUTH_URL=http://localhost:3000
# The environment the application is running in.
NODE_ENV=development
```

Open http://localhost:3000 and explore the application.

## License

This project is licensed under the terms of the [Apache 2.0](./LICENSE.md) license.

[nodejs]: https://nodejs.org/en/
[nextjs]: https://nextjs.org/
[tailwindcss]: https://tailwindcss.com/
[nvm]: https://github.com/nvm-sh/nvm
