# CapRover One-Click Apps Repository

[![Validate One Click Apps](https://github.com/johndoe6345789/caprover-one-click-apps/actions/workflows/main.yml/badge.svg)](https://github.com/johndoe6345789/caprover-one-click-apps/actions/workflows/main.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A comprehensive collection of one-click app templates for [CapRover](https://caprover.com/) - the easiest way to deploy applications on your own servers.

## 📋 Table of Contents

- [About](#about)
- [Available Apps](#available-apps)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [Repository Structure](#repository-structure)
- [Development](#development)
- [License](#license)

## 🎯 About

This repository contains one-click app definitions for CapRover, making it incredibly easy to deploy popular applications with just a few clicks. Each app includes:

- Pre-configured Docker images
- Environment variables setup
- Volume management
- Service dependencies
- User-friendly installation instructions

## 📦 Available Apps

We currently have **118+ apps** available, including:

### Databases
- PostgreSQL, MySQL, MariaDB, MongoDB
- Redis, TimescaleDB, InfluxDB
- Neo4j, ClickHouse, Elasticsearch

### Development Tools
- GitLab, Gitea, Jenkins
- SonarQube, Nexus
- Drone CI

### Content Management
- WordPress, Ghost, Drupal, Joomla
- Wiki.js, BookStack
- Directus, Strapi

### Communication & Collaboration
- Mattermost, Rocket.Chat, Zulip
- Element (Matrix), Jitsi
- BigBlueButton

### Monitoring & Analytics
- Grafana, Prometheus, Netdata
- Matomo, Plausible
- Loki, Uptime Kuma

### Productivity
- Nextcloud, Owncloud
- Vikunja, Plane, Taiga
- Outline, Focalboard

### Security & Privacy
- Vaultwarden, Passbolt
- Supabase, Supertokens

And many more! See the [public/v4/apps](./public/v4/apps) directory for the complete list.

## 🚀 Getting Started

### Using Apps in CapRover

1. Log in to your CapRover dashboard
2. Navigate to **Apps** → **One-Click Apps/Databases**
3. Select an app from the list
4. Configure the required variables
5. Click **Deploy**

### Testing Apps Locally

Before contributing, test your app definition:

```bash
# Install dependencies
npm install

# Validate all apps
npm run validate

# Format code
npm run formatter

# Build distribution
npm run build
```

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

Quick checklist:
- ✅ Use specific version tags (not `latest`)
- ✅ Include a logo (PNG format)
- ✅ Add clear instructions
- ✅ Test thoroughly before submitting
- ✅ Follow existing app structure

## 📁 Repository Structure

```
caprover-one-click-apps/
├── .github/
│   ├── workflows/          # GitHub Actions workflows
│   └── ISSUE_TEMPLATE/     # Issue templates
├── public/
│   └── v4/
│       ├── apps/           # App YAML definitions
│       └── logos/          # App logos (PNG)
├── scripts/
│   ├── validate-apps.js    # Validation script
│   ├── build-one-click-apps.js
│   ├── build-one-click-apps-from-v4.js
│   └── diagnose-workflows.js # Workflow diagnostics helper
├── package.json
└── README.md
```

## 🛠️ Development

### GitHub Actions diagnostics

Use the workflow diagnostic helper to flag common CI configuration issues (missing permissions, unpinned actions, or outdated checkout/setup-node versions):

```bash
npm run diagnose-workflows -- --verbose
```

For machine-readable output you can add `--json`:

```bash
npm run diagnose-workflows -- --json
```

### App Definition Structure

Each app is defined in a YAML file with the following structure:

```yaml
captainVersion: 4
services:
    $$cap_appname:
        image: app:version
        volumes:
            - $$cap_appname-data:/data
        restart: always
        environment:
            KEY: value
caproverOneClickApp:
    variables:
        - id: $$cap_version
          label: Version
          defaultValue: 'latest'
          description: App version
    instructions:
        start: Starting deployment...
        end: Deployment complete!
    displayName: App Name
    isOfficial: false
    description: Short description (max 200 chars)
```

### Validation Rules

- Each app must have a corresponding PNG logo
- Description must be under 200 characters
- Must use CapRover version 4 format
- Avoid using `latest` tag for images
- Include clear start and end instructions

### Running Tests

```bash
# Validate apps
npm run validate

# Format YAML files
npm run formatter-write

# Build for deployment
npm run build
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [CapRover](https://caprover.com/) - The amazing platform that makes this possible
- All contributors who have added and maintained apps
- The open-source community for the fantastic applications

## 📞 Support

- For app-specific issues, refer to the original app's documentation
- For installation issues, check the app's pull request
- For general questions, open an issue in this repository

---

Made with ❤️ for the CapRover community