# GitHub CLI Usage Guide

This guide shows how to use the GitHub CLI (`gh`) for common operations.

## Authentication

Before using GitHub CLI, you need to authenticate:

```bash
# Login to GitHub
gh auth login

# Check authentication status
gh auth status

# Refresh authentication token
gh auth refresh

# Logout
gh auth logout
```

## Repository Operations

### Viewing Repositories

```bash
# View current repository
gh repo view

# View specific repository
gh repo view owner/repo

# View repository in browser
gh repo view --web

# View repository as JSON
gh repo view --json name,owner,description
```

### Creating Repositories

```bash
# Create a new repository
gh repo create my-repo

# Create with description and visibility
gh repo create my-repo --description "My project" --public

# Create from template
gh repo create my-repo --template owner/template-repo

# Clone after creating
gh repo create my-repo --clone
```

### Cloning Repositories

```bash
# Clone a repository
gh repo clone owner/repo

# Clone to specific directory
gh repo clone owner/repo target-dir
```

### Forking Repositories

```bash
# Fork a repository
gh repo fork owner/repo

# Fork and clone
gh repo fork owner/repo --clone
```

## Issue Operations

### Listing Issues

```bash
# List issues in current repository
gh issue list

# List open issues
gh issue list --state open

# List closed issues
gh issue list --state closed

# List issues with specific label
gh issue list --label bug

# List issues assigned to you
gh issue list --assignee @me

# Limit number of results
gh issue list --limit 10
```

### Creating Issues

```bash
# Create an issue interactively
gh issue create

# Create with title and body
gh issue create --title "Bug report" --body "Description of the bug"

# Create with labels and assignees
gh issue create --title "Feature request" --label enhancement --assignee @me

# Create from file
gh issue create --title "Issue" --body-file issue.md
```

### Viewing Issues

```bash
# View issue details
gh issue view 123

# View in browser
gh issue view 123 --web

# View comments
gh issue view 123 --comments
```

### Updating Issues

```bash
# Close an issue
gh issue close 123

# Reopen an issue
gh issue reopen 123

# Add labels
gh issue edit 123 --add-label bug,priority

# Remove labels
gh issue edit 123 --remove-label wontfix

# Assign to user
gh issue edit 123 --add-assignee username
```

## Pull Request Operations

### Listing Pull Requests

```bash
# List pull requests
gh pr list

# List by state
gh pr list --state open
gh pr list --state closed
gh pr list --state merged

# List by author
gh pr list --author username

# List with specific label
gh pr list --label bug
```

### Creating Pull Requests

```bash
# Create a pull request interactively
gh pr create

# Create with title and body
gh pr create --title "Fix bug" --body "Description of fix"

# Create and assign reviewers
gh pr create --title "Feature" --reviewer user1,user2

# Create as draft
gh pr create --draft --title "WIP: New feature"

# Create and fill from commit
gh pr create --fill
```

### Viewing Pull Requests

```bash
# View PR details
gh pr view 456

# View in browser
gh pr view 456 --web

# View PR diff
gh pr diff 456

# View PR checks status
gh pr checks 456
```

### Reviewing Pull Requests

```bash
# Checkout a PR locally
gh pr checkout 456

# Review a PR
gh pr review 456

# Approve a PR
gh pr review 456 --approve

# Request changes
gh pr review 456 --request-changes --body "Please fix..."

# Comment on a PR
gh pr comment 456 --body "Looks good!"
```

### Merging Pull Requests

```bash
# Merge a PR
gh pr merge 456

# Merge with squash
gh pr merge 456 --squash

# Merge and delete branch
gh pr merge 456 --delete-branch

# Merge when checks pass
gh pr merge 456 --auto
```

## Workflow Operations

### Listing Workflows

```bash
# List workflows
gh workflow list

# View workflow details
gh workflow view workflow-name

# View workflow runs
gh run list --workflow=workflow-name
```

### Running Workflows

```bash
# Trigger a workflow
gh workflow run workflow-name

# Trigger with inputs
gh workflow run workflow-name -f input1=value1 -f input2=value2
```

### Viewing Workflow Runs

```bash
# List recent workflow runs
gh run list

# View specific run
gh run view 12345

# View run in browser
gh run view 12345 --web

# View run logs
gh run view 12345 --log

# Download run artifacts
gh run download 12345
```

### Managing Workflow Runs

```bash
# Cancel a run
gh run cancel 12345

# Rerun a workflow
gh run rerun 12345

# Watch a run
gh run watch 12345
```

## Release Operations

### Listing Releases

```bash
# List releases
gh release list

# View specific release
gh release view v1.0.0

# View latest release
gh release view --latest
```

### Creating Releases

```bash
# Create a release
gh release create v1.0.0

# Create with title and notes
gh release create v1.0.0 --title "Release 1.0.0" --notes "Release notes"

# Create with files
gh release create v1.0.0 dist/*.tar.gz

# Create as draft
gh release create v1.0.0 --draft

# Create as pre-release
gh release create v1.0.0 --prerelease
```

### Managing Releases

```bash
# Upload assets to release
gh release upload v1.0.0 file.zip

# Delete a release
gh release delete v1.0.0

# Edit release
gh release edit v1.0.0 --title "New title"
```

## Gist Operations

### Creating Gists

```bash
# Create a gist from file
gh gist create file.txt

# Create public gist
gh gist create file.txt --public

# Create with description
gh gist create file.txt --desc "My gist"
```

### Listing and Viewing Gists

```bash
# List your gists
gh gist list

# View a gist
gh gist view gist-id

# Edit a gist
gh gist edit gist-id
```

## Using in Scripts

### Python Example

```python
import subprocess
import json

def run_gh(args: list[str]) -> dict:
    """Run a gh command and return JSON output."""
    result = subprocess.run(
        ["gh"] + args,
        capture_output=True,
        text=True,
        check=True
    )
    return json.loads(result.stdout)

# Example: Get repository info
repo_info = run_gh(["repo", "view", "--json", "name,owner,stars"])
print(f"Repo: {repo_info['name']}")
print(f"Owner: {repo_info['owner']['login']}")
print(f"Stars: {repo_info['stars']}")

# Example: List open issues
issues = run_gh(["issue", "list", "--state", "open", "--json", "number,title"])
for issue in issues:
    print(f"#{issue['number']}: {issue['title']}")
```

### TypeScript Example

```typescript
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

async function runGh(args: string[]): Promise<any> {
  const { stdout } = await execAsync(`gh ${args.join(" ")}`);
  return JSON.parse(stdout);
}

// Example: Get repository info
const repoInfo = await runGh([
  "repo",
  "view",
  "--json",
  "name,owner,stars",
]);
console.log(`Repo: ${repoInfo.name}`);
console.log(`Owner: ${repoInfo.owner.login}`);
console.log(`Stars: ${repoInfo.stars}`);

// Example: List open issues
const issues = await runGh([
  "issue",
  "list",
  "--state",
  "open",
  "--json",
  "number,title",
]);
for (const issue of issues) {
  console.log(`#${issue.number}: ${issue.title}`);
}
```

### Shell Script Example

```bash
#!/bin/bash
set -euo pipefail

# Get repository information
repo_info=$(gh repo view --json name,owner,stars)
repo_name=$(echo "$repo_info" | jq -r '.name')
repo_owner=$(echo "$repo_info" | jq -r '.owner.login')
repo_stars=$(echo "$repo_info" | jq -r '.stars')

echo "Repository: $repo_owner/$repo_name"
echo "Stars: $repo_stars"

# List open issues
echo ""
echo "Open issues:"
gh issue list --state open --json number,title | \
  jq -r '.[] | "#\(.number): \(.title)"'
```

## Advanced Usage

### Using JSON Output

Many `gh` commands support `--json` flag for structured output:

```bash
# Get specific fields as JSON
gh repo view --json name,owner,description,stars

# Combine with jq for processing
gh issue list --json number,title,labels | \
  jq '.[] | select(.labels[].name == "bug")'

# Use in scripts
issues=$(gh issue list --json number,title)
echo "$issues" | jq -r '.[0].title'
```

### Using Templates

Format output with `--template`:

```bash
# Custom issue list format
gh issue list --template '{{range .}}#{{.number}}: {{.title}}{{"\n"}}{{end}}'

# Table format
gh issue list --template '{{tablerow "NUMBER" "TITLE" "LABELS"}}{{range .}}{{tablerow .number .title (pluck "name" .labels | join ", ")}}{{end}}'
```

### Environment Variables

```bash
# Set GitHub token
export GITHUB_TOKEN=ghp_xxxxxxxxxxxxx

# Set default repository
export GH_REPO=owner/repo

# Then use without specifying repo
gh issue list
```

### Configuration

```bash
# Set default Git protocol
gh config set git_protocol ssh

# Set default editor
gh config set editor vim

# Set browser
gh config set browser firefox

# View all config
gh config list
```

## Extensions

### Installing Extensions

```bash
# Install an extension
gh extension install owner/gh-extension-name

# Install GitHub Copilot CLI
gh extension install github/gh-copilot

# List installed extensions
gh extension list

# Upgrade extensions
gh extension upgrade --all
```

### Using GitHub Copilot CLI

```bash
# Get suggestions for commands
gh copilot suggest "create a new branch"

# Explain a command
gh copilot explain "git rebase -i HEAD~3"
```

## Tips and Best Practices

1. **Use JSON output**: Easier to parse in scripts
2. **Combine with jq**: Process JSON output
3. **Set default repo**: Use `GH_REPO` environment variable
4. **Use aliases**: Create shortcuts for common commands
5. **Check auth status**: Run `gh auth status` regularly
6. **Read help**: Use `gh <command> --help` for details

## Common Aliases

Add to your shell configuration:

```bash
alias ghi='gh issue'
alias ghp='gh pr'
alias ghr='gh repo'
alias ghw='gh workflow'
```

## Resources

- [GitHub CLI Manual](https://cli.github.com/manual/)
- [GitHub CLI Repository](https://github.com/cli/cli)
- [GitHub API Documentation](https://docs.github.com/en/rest)
