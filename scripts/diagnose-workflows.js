#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const yaml = require('yaml');

const WORKFLOWS_DIR = path.join(__dirname, '..', '.github', 'workflows');
const MIN_RECOMMENDED_NODE_MAJOR = 18;
const RECOMMENDED_CHECKOUT_MAJOR = 4;

function findWorkflowFiles() {
  if (!fs.existsSync(WORKFLOWS_DIR)) {
    return [];
  }

  return fs
    .readdirSync(WORKFLOWS_DIR)
    .filter((file) => file.endsWith('.yml') || file.endsWith('.yaml'))
    .map((file) => path.join(WORKFLOWS_DIR, file));
}

function addIssue(report, severity, message, meta = {}) {
  report.issues.push({ severity, message, ...meta });
}

function checkNodeVersion(step, jobName, report) {
  if (!step.with || !step.with['node-version']) return;

  const versionValue = step.with['node-version'];
  const versionMatch = `${versionValue}`.match(/(\d+)/);
  if (!versionMatch) return;

  const major = parseInt(versionMatch[1], 10);
  if (Number.isNaN(major)) return;

  if (major < MIN_RECOMMENDED_NODE_MAJOR) {
    addIssue(
      report,
      'warning',
      `Job "${jobName}" configures actions/setup-node with Node ${versionValue}, consider upgrading to >= ${MIN_RECOMMENDED_NODE_MAJOR}.`
    );
  }
}

function checkCheckoutVersion(step, jobName, report) {
  const versionMatch = step.uses.match(/actions\/checkout@(v?)(\d+)/i);
  if (!versionMatch) return;

  const major = parseInt(versionMatch[2], 10);
  if (!Number.isInteger(major)) return;

  if (major < RECOMMENDED_CHECKOUT_MAJOR) {
    addIssue(
      report,
      'warning',
      `Job "${jobName}" is using actions/checkout@v${major}; upgrade to v${RECOMMENDED_CHECKOUT_MAJOR} to pick up the latest fixes.`
    );
  }
}

function analyzeSteps(steps = [], jobName, report) {
  if (!Array.isArray(steps) || steps.length === 0) {
    addIssue(report, 'warning', `Job "${jobName}" has no steps defined.`);
    return;
  }

  steps.forEach((step) => {
    if (!step || typeof step !== 'object') return;
    if (step.uses) {
      if (!step.uses.includes('@')) {
        addIssue(
          report,
          'warning',
          `Job "${jobName}" uses the action "${step.uses}" without a version tag; pin to a version or commit SHA.`
        );
      }

      checkCheckoutVersion(step, jobName, report);
      if (step.uses.toLowerCase().startsWith('actions/setup-node@')) {
        checkNodeVersion(step, jobName, report);
      }
    }
  });
}

function analyzeDocument(doc, filePath, index) {
  const data = doc.toJSON();
  const report = {
    file: path.relative(path.join(__dirname, '..'), filePath),
    documentIndex: index + 1,
    name: data && data.name ? data.name : undefined,
    triggers: data && data.on ? Object.keys(data.on) : [],
    jobs: data && data.jobs ? Object.keys(data.jobs) : [],
    issues: [],
  };

  if (!data || typeof data !== 'object') {
    addIssue(report, 'error', 'Workflow document is empty or invalid.');
    return report;
  }

  if (!data.on) {
    addIssue(report, 'warning', 'No triggers defined under "on".');
  }

  if (!data.jobs || typeof data.jobs !== 'object' || Object.keys(data.jobs).length === 0) {
    addIssue(report, 'error', 'No jobs defined in workflow.');
    return report;
  }

  if (!data.permissions) {
    addIssue(report, 'warning', 'Workflow does not set explicit permissions; GitHub defaults will be used.');
  }

  Object.entries(data.jobs).forEach(([jobName, job]) => {
    if (!job || typeof job !== 'object') {
      addIssue(report, 'error', `Job "${jobName}" is not a valid object.`);
      return;
    }

    if (!job['runs-on']) {
      addIssue(report, 'error', `Job "${jobName}" is missing the required "runs-on" field.`);
    }

    analyzeSteps(job.steps, jobName, report);
  });

  return report;
}

function analyzeFile(filePath) {
  const reports = [];
  const contents = fs.readFileSync(filePath, 'utf8');
  const docs = yaml.parseAllDocuments(contents);

  if (docs.length === 0) {
    reports.push({
      file: path.relative(path.join(__dirname, '..'), filePath),
      documentIndex: 1,
      name: undefined,
      triggers: [],
      jobs: [],
      issues: [{ severity: 'error', message: 'Workflow file is empty.' }],
    });
    return reports;
  }

  docs.forEach((doc, index) => {
    if (doc.errors && doc.errors.length) {
      reports.push({
        file: path.relative(path.join(__dirname, '..'), filePath),
        documentIndex: index + 1,
        name: undefined,
        triggers: [],
        jobs: [],
        issues: doc.errors.map((err) => ({ severity: 'error', message: err.message })),
      });
      return;
    }

    reports.push(analyzeDocument(doc, filePath, index));
  });

  return reports;
}

function printReports(reports, { verbose }) {
  reports.forEach((report) => {
    const headerParts = [`Workflow: ${report.file}`];
    if (report.name) headerParts.push(`Name: ${report.name}`);
    if (report.triggers && report.triggers.length) headerParts.push(`Triggers: ${report.triggers.join(', ')}`);
    console.log(headerParts.join(' | '));

    if (verbose && report.jobs && report.jobs.length) {
      console.log(`  Jobs: ${report.jobs.join(', ')}`);
    }

    if (!report.issues.length) {
      console.log('  No issues detected.');
    } else {
      report.issues.forEach((issue) => {
        const label = issue.severity === 'error' ? '[ERROR]' : '[WARN]';
        console.log(`  ${label} ${issue.message}`);
      });
    }
    console.log('');
  });
}

function main() {
  const args = new Set(process.argv.slice(2));
  const asJson = args.has('--json');
  const verbose = args.has('--verbose');

  const files = findWorkflowFiles();
  if (!files.length) {
    console.error('No workflow files found under .github/workflows.');
    process.exit(1);
  }

  const reports = files.flatMap((file) => analyzeFile(file));

  if (asJson) {
    console.log(JSON.stringify(reports, null, 2));
  } else {
    printReports(reports, { verbose });
  }

  const hasErrors = reports.some((report) => report.issues.some((issue) => issue.severity === 'error'));
  process.exit(hasErrors ? 1 : 0);
}

if (require.main === module) {
  main();
}
