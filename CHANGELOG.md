# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Comprehensive README with detailed documentation
- CONTRIBUTING.md with contribution guidelines
- CHANGELOG.md for tracking changes
- Enhanced GitHub Actions workflows (PR validation, dependency checks, security scanning)
- 50 new one-click apps:
  - **Databases**: Cassandra, CouchDB, ArangoDB
  - **Messaging & Queues**: Kafka, NATS
  - **Analytics & BI**: Metabase, Superset, Redash
  - **Development Tools**: Hasura, Hoppscotch, Code Server, Adminer, Traefik
  - **Low-Code Platforms**: NocoDB, Appsmith
  - **Monitoring & Tracing**: Jaeger
  - **Media Management**: Jellyfin, PhotoPrism, Immich
  - **Productivity**: Actual Budget, Tandoor Recipes, Linkwarden, Baby Buddy
  - **Security & Auth**: Vault, Keycloak, Vaultwarden (Light)
  - **Utilities**: MailHog, Watchtower, Heimdall, LibreSpeed, SearXNG
  - **Content & Reading**: FreshRSS, Miniflux, Wallabag, Shaarli, Calibre-Web, COPS
  - **Finance**: Firefly III, Invoice Ninja
  - **Backup**: Duplicati
  - **Development Environments**: Chromium, Ollama (LLM runner)
  - **Networking**: OpenVPN, FlareSolverr
  - **URL Management**: YOURLS
  - **File Management**: Surfer, File Browser V2
  - **Dashboards**: Organizr
  - **CMS Variants**: Ghost (SQLite version)
- Logos for all new apps

### Changed
- Improved repository structure and organization
- Updated documentation and templates
- Enhanced validation and build scripts
- Modernized GitHub Actions workflows (Node 18, latest action versions)
- Made CNAME file optional in build script

### Fixed
- Build script now handles missing CNAME file gracefully
- Improved error handling in build process

## [1.0.0] - 2024-12-24

### Added
- Initial release with 68 one-click apps
- Core apps including databases, CMS, development tools
- Validation and build scripts
- Basic GitHub Actions workflow

[Unreleased]: https://github.com/johndoe6345789/caprover-one-click-apps/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/johndoe6345789/caprover-one-click-apps/releases/tag/v1.0.0
