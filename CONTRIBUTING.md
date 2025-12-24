# Contributing to CapRover One-Click Apps

Thank you for your interest in contributing! This document provides guidelines and instructions for adding new apps or improving existing ones.

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Adding a New App](#adding-a-new-app)
- [App Requirements](#app-requirements)
- [Testing Your App](#testing-your-app)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Code of Conduct](#code-of-conduct)

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/caprover-one-click-apps.git
   cd caprover-one-click-apps
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Create a new branch**:
   ```bash
   git checkout -b feature/add-myapp
   ```

## 📝 Adding a New App

### Step 1: Create the App YAML File

Create a new file in `public/v4/apps/` named `appname.yml`:

```yaml
captainVersion: 4
services:
    $$cap_appname:
        image: myapp:$$cap_version
        volumes:
            - $$cap_appname-data:/data
        restart: always
        environment:
            ENV_VAR: $$cap_env_var
        caproverExtra:
            containerHttpPort: 8080
caproverOneClickApp:
    variables:
        - id: $$cap_version
          label: App Version
          defaultValue: '1.0.0'
          description: Check official Docker Hub for valid tags
          validRegex: /.{1,}/
        - id: $$cap_env_var
          label: Environment Variable
          description: Description of what this variable does
    instructions:
        start: |-
            Deploying MyApp. This is shown before installation.
            Add any pre-installation instructions here.
        end: |-
            MyApp has been deployed!
            Access it at http://$$cap_appname.$$cap_root_domain
            Default credentials: admin/admin (change immediately!)
    displayName: MyApp
    isOfficial: false
    description: A brief description of MyApp. Maximum 200 characters including spaces.
```

### Step 2: Add the App Logo

1. Create or download a logo for your app (PNG format, square, minimum 200x200px)
2. Save it as `public/v4/logos/appname.png`
3. The filename must exactly match your YAML filename (without the extension)

### Step 3: Validate Your App

Run the validation script to ensure your app meets all requirements:

```bash
npm run validate
```

This will check:
- YAML syntax is correct
- All required fields are present
- Logo file exists
- Description length is under 200 characters
- CapRover version matches

### Step 4: Format Your Code

Ensure your YAML is properly formatted:

```bash
npm run formatter-write
```

## ✅ App Requirements

### Must Have

- [ ] **Valid YAML structure** - Must follow CapRover v4 format
- [ ] **Specific version tags** - Do NOT use `latest` tag
- [ ] **Logo file** - PNG format, saved in `public/v4/logos/`
- [ ] **Description** - Under 200 characters
- [ ] **Clear instructions** - Both `start` and `end` instructions
- [ ] **Environment variables** - With descriptions and defaults where possible
- [ ] **Official Docker image** - Use official or well-maintained images

### Should Have

- [ ] **Default values** - Provide sensible defaults (except passwords)
- [ ] **Volume persistence** - For data that should survive container restarts
- [ ] **Health checks** - If the application supports them
- [ ] **Resource limits** - Consider adding memory/CPU limits for resource-intensive apps
- [ ] **Dependencies** - Clearly define service dependencies (e.g., database)

### Best Practices

1. **Version Tags**: Always specify a version tag for Docker images
   ```yaml
   image: myapp:1.2.3  ✅
   image: myapp:latest  ❌
   ```

2. **Passwords**: Never hardcode passwords, always use variables
   ```yaml
   MYSQL_PASSWORD: $$cap_db_password  ✅
   MYSQL_PASSWORD: password123  ❌
   ```

3. **Documentation**: Link to official documentation in descriptions
   ```yaml
   description: MyApp - A great tool. See https://myapp.io/docs for more info.
   ```

4. **Port Configuration**: Specify the container's HTTP port
   ```yaml
   caproverExtra:
       containerHttpPort: 8080
   ```

5. **Data Persistence**: Use volumes for important data
   ```yaml
   volumes:
       - $$cap_appname-data:/var/lib/myapp
   ```

## 🧪 Testing Your App

### Manual Testing

1. **Set up a CapRover instance** (can be local or on a VPS)
2. **Add your repository** as a custom repository in CapRover:
   - Navigate to Apps → One-Click Apps/Databases
   - Add your fork's URL in "Add Remote Template"
3. **Deploy your app** through the CapRover interface
4. **Verify functionality**:
   - App starts without errors
   - Environment variables are correctly set
   - Data persists after container restart
   - Port forwarding works correctly

### Automated Testing

Run the validation suite:

```bash
# Validate app structure
npm run validate

# Check formatting
npm run formatter

# Build the distribution
npm run build
```

## 📤 Submitting a Pull Request

### Before Submitting

- [ ] Validate your app: `npm run validate`
- [ ] Format your code: `npm run formatter-write`
- [ ] Test the app in a real CapRover environment
- [ ] Review the PR checklist template

### Creating the PR

1. **Push your changes** to your fork:
   ```bash
   git add .
   git commit -m "Add MyApp one-click installation"
   git push origin feature/add-myapp
   ```

2. **Open a Pull Request** on GitHub
3. **Fill out the PR template** completely
4. **Wait for review** - Maintainers will review and may request changes

### PR Template Checklist

When you create a PR, ensure you can check all boxes:

- [ ] I have tested the template thoroughly
- [ ] I have provided as many default values as possible
- [ ] I am not using the "latest" tag
- [ ] Instructions are clear and self-explanatory
- [ ] Icon is added as a PNG file

## 🐛 Reporting Issues

### For Installation Issues

If you encounter issues with an existing app:

1. **Check the app's pull request** - The original contributor may have notes
2. **Review the app's official documentation**
3. **Open an issue** with:
   - App name and version
   - CapRover version
   - Error messages or logs
   - Steps to reproduce

### For App Bugs

For issues with the app itself (not the installation), please report to the app's official repository. CapRover one-click apps are installation templates only.

## 🎯 What Makes a Good Contribution

### Excellent Contributions Include

- Popular, well-maintained applications
- Clear, comprehensive instructions
- Sensible default values
- Proper security considerations
- Good documentation

### Avoid

- Unmaintained or abandoned projects
- Apps without official Docker images
- Complex setups that defeat "one-click" purpose
- Apps with security vulnerabilities
- Duplicate apps (check existing apps first)

## 📚 Additional Resources

- [CapRover Documentation](https://caprover.com/docs)
- [CapRover One-Click Apps Format](https://caprover.com/docs/one-click-apps.html)
- [Docker Hub](https://hub.docker.com/) - Find official images
- [YAML Syntax Reference](https://yaml.org/spec/1.2/spec.html)

## 🤝 Code of Conduct

Be respectful and constructive:
- Be welcoming to newcomers
- Provide constructive feedback
- Focus on the contribution, not the contributor
- Respect different viewpoints and experiences

## 💡 Need Help?

- Open an issue for questions
- Check existing issues for similar problems
- Join the CapRover community discussions

---

Thank you for contributing to make CapRover better! 🎉
