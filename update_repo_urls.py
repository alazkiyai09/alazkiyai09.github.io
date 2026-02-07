#!/usr/bin/env python3
"""
Update GitHub repository URLs after renaming repos.
"""
import re
from pathlib import Path

PROJECTS_DIR = Path("/home/ubuntu/PersonalWeb/src/content/projects")
DATA_DIR = Path("/home/ubuntu/PersonalWeb/src/data")

# Old -> New repository mappings
repo_mappings = {
    "federated-learning-security-portfolio": "fl-security-research",
    "FedPhish": "privacy-preserving-phishing-detection",
    "production-ai-portfolio": "enterprise-ai-systems",
    # pvd-lsb-modulo-steganography stays the same
}

def update_repository_url(url):
    """Update a repository URL to use the new repo name."""
    if not url or not isinstance(url, str):
        return url

    for old, new in repo_mappings.items():
        if old in url:
            # Replace old repo name with new one
            return url.replace(old, new)
    return url

def update_markdown_file(file_path):
    """Update repository URLs in a markdown file."""
    content = file_path.read_text()
    updated = False

    # Update repository field in frontmatter
    def replace_repo_match(match):
        nonlocal updated
        old_url = match.group(1)
        new_url = update_repository_url(old_url)
        if old_url != new_url:
            updated = True
        return f'repository: "{new_url}"'

    content = re.sub(r'repository: "([^"]+)"', replace_repo_match, content)

    # Update inline markdown links
    def replace_link_match(match):
        nonlocal updated
        old_url = match.group(1)
        new_url = update_repository_url(old_url)
        if old_url != new_url:
            updated = True
        return f']({new_url})'

    content = re.sub(r'\]([^\)]+\))', replace_link_match, content)

    if updated:
        file_path.write_text(content)
        print(f"Updated: {file_path.name}")

    return updated

def update_json_file(file_path):
    """Update repository URLs in a JSON file."""
    content = file_path.read_text()
    updated = False

    for old, new in repo_mappings.items():
        if old in content:
            content = content.replace(old, new)
            updated = True

    if updated:
        file_path.write_text(content)
        print(f"Updated: {file_path.name}")

    return updated

# Process all markdown files in projects
for md_file in PROJECTS_DIR.glob("*.md"):
    update_markdown_file(md_file)

# Process JSON data files
for json_file in DATA_DIR.glob("*.json"):
    update_json_file(json_file)

print("\nDone!")
