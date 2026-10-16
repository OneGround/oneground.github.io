---
name: release-notes
description: Use when an issue asks you to write, draft, add or change release notes or a changelog entry for a version of dev.oneground.nl (the `oneground.github.io` repository) - one entry per version, from raw changes a person pasted into the issue, on a branch you push for the person to review. Never pulls from Jira or any other ticket system.
---

# Release notes for dev.oneground.nl

This skill writes **one** changelog entry for one version of `oneground.github.io`, from changes a person pasted into the issue. It works on one branch per issue, pushes that branch so the person can view the draft, and changes the same file on later feedback rounds until the person is satisfied. It writes one file in the repository and nothing else.

## 1. Inputs

- **Version** (for example `2026.9.17`). It is required. Never derive the version from the date or from anything else. If the issue does not name the version, ask for it and write nothing.
- **Date**: today, unless the issue names another date.
- **Changes**: only the raw text a person pasted into the issue - copies from Jira or other raw information. **Never pull changes from Jira or any other ticket system, even when a tool for one is available to you.** Ticket systems hold personal data, and this repository is public. If no changes were pasted, ask for them and write nothing.
- **Personal data.** The person removes personal data before pasting. If the pasted text still contains personal data - a person's name, an email address, a phone number, a customer or citizen identifier - write nothing, quote none of it anywhere (not in a comment, a commit, a branch name or the file), and ask the person to replace that text. Describe where it is ("the second change, third line"), never what it is.

## 2. Scope

- Write exactly the changes given, and nothing adjacent: no related fixes you happen to know about, no other versions.
- Existing changelog entries are read-only. Never edit, reformat or "fix" an older file, even when it uses a style this skill forbids.

## 3. Path and duplicate check

- The path is `changelog/<YYYY>/<MM-DD>-release-<version>.md`, where `<YYYY>` and `<MM-DD>` come from the date.
- Before this check, run section 9 step 1 (the checkout and the branch, which includes `git fetch origin`), so that you have a checkout and an up-to-date `origin/main`. Push nothing until section 9 step 7.
- On the first run of an issue, check against the default branch on origin, never against your working tree: `git ls-tree -r --name-only origin/main -- changelog/` and `git grep -l 'slug: "<version>"' origin/main -- changelog/`. If that path already exists there, or any entry there already has `slug: "<version>"`, stop, write nothing and ask how to proceed.
- On a later run of the same issue, the file at that path on this issue's own branch is your own draft, not a duplicate. Change it; never write a second file for the same version.

## 4. Shape

- Open the newest file in `changelog/<YYYY>/` (the newest year folder, then the newest file in it) read-only. Copy only its frontmatter keys and its table header (the header row and the separator row). Never copy its body rows or its cell wording: older files may carry the "Not relevant" style this skill forbids.
- The frontmatter is `slug: "<version>"` and `title: "<version>: <short honest theme>"`. The theme names what the release actually contains, in a few words, with no marketing.
- The columns this skill expects are: `Component`, `Summary (english)`, `Relevance for consumers (English)`, `Relevance for end users (Dutch)`, `Relevance for system administration (Dutch)`. If the newest file's columns differ from these, follow the file, and say so in your report.

## 5. Calibration

- Before drafting, read the last five entries in `changelog/`, counted fresh at run time. For each column, count how many rows have something in it. Cells reading "Not relevant", "Niet relevant", "n.v.t." or a dash count as empty.
- Use those counts to judge how often each column is normally filled. This skill carries no fixed counts; take them from the tree every time.

## 6. Rows

- One row per component per change. The component is the service the change touches.
- Use the component names already used in the tree, such as `ZRC`, `DRC`, `ZTC`, `BRC`, `NRC`, `AC`, `ZCA` and `ZSDMS`, a combined name such as `DRC/ZTC` for one change that touches both, and `All modules` for a change that applies to every component.
- Release-wide context gets a row of its own.
- When the component of a change is ambiguous, ask instead of guessing.

## 7. Cells

- Each column's language follows its header: Summary and consumers in English, end users and system administration in Dutch.
- Dutch identifiers (field and resource names such as `zaaktype` or `informatieobjecttype`) stay verbatim in every column, including the English ones.
- Write the Dutch cells for their own reader, in their own words. Do not translate them from the English cell. The end user wants to know what changes in their work. The system administrator wants to know what they have to do or watch.
- A cell that is not relevant stays **empty**. Do not write "Not relevant", "Niet relevant", "n.v.t.", a dash or any other placeholder text.
- Never invent relevance. If the pasted changes do not say what a change means for a reader, leave that cell empty rather than guess.
- A cell longer than three sentences means the row should be split into two rows.

## 8. Public-repository gate

This repository is public, and a pushed branch is visible before anyone has reviewed it. Before you write the file, remove from every cell: personal data, reporter names, customer or municipality names or identifiers, internal hostnames, links to logging tools, request IDs, ticket keys, branch names and file paths. Describe the behaviour instead. The same applies to your commit message. In your report, say what you left out (by kind, never by quoting it).

## 9. Branch, write, format, build

Do these steps in this order, on every run that writes or changes the entry.

1. **Branch.**
    - First run of an issue: get the code with `multica repo checkout <url>`, where `<url>` is the project's `github_repo` resource from your task brief. That puts you on an `agent/...` checkout branch, which is never pushed. Create this issue's branch from the default branch: `git fetch origin && git switch -c <branch> origin/main`. Name it as your `branch-naming` skill says, with type `chore` and the slug `release-<version with dots as hyphens>`, for example `multica/chore/<TICKET_ID>-release-2026-10-2`.
    - Every later run of the same issue: continue on the branch named in your own earlier comment on that issue. If the local checkout is gone, run `multica repo checkout <url> --ref <that branch>`, then `git switch <that branch>` so you are on the branch itself and not on a new checkout branch. Then `git pull --ff-only`. Never start a second branch or a second file for the same version.
2. **Write** only the entry file at the path from section 3.
3. **Format.** If `node_modules` is missing, run `npm ci` first. Then run `npm run format`.
4. **Check.** `git status --porcelain` must show only the entry file. If anything else changed, restore it with `git restore <path>` and say so in your report.
5. **Build.** `npm run build` must pass. Send its output to a file under `TMPDIR` and read back only the result and any error. If it fails because of the entry, fix the entry and go back to step 3. If it fails for another reason, stop and report it.
6. **Commit** only the entry file: `git add <entry file>` and `git commit -m "Add release notes <version>"` (or `"Update release notes <version>"` on a feedback round).
7. **Push** the branch: `git push -u origin <branch>`. Never use `--no-verify`. If the push is refused, report the refusal and stop.

Never open a pull request, never merge, and never push to the default branch. Publication happens on merge, and merging is a person's decision.

## 10. Report

Post one comment per run on the issue, giving:

- the branch name and the path;
- how to view it, on the person's own machine: `git fetch origin && git switch <branch> && npm ci && npm run start`, then `http://localhost:3000/changelog`;
- that after a later round `git pull` is enough, because the dev server reloads by itself;
- the full entry;
- what the public-repository gate left out, by kind;
- every empty cell, each marked as either _empty by design_ (the change has no meaning for that reader) or _empty for want of a source_ (it might matter, but the pasted changes do not say). Ask about each cell of the second kind.

When you stopped to ask (section 1, 3 or 6), the comment carries only the question and what you checked, and no file was written.

## 11. Feedback rounds

When a person comments with feedback on an issue where you already pushed a branch:

- Change only what the feedback asks, in the same file on the same branch. Leave the rest of the entry as it is.
- Apply the inputs rules and the gate (sections 1 and 8) to the feedback text too, then run section 9 again from step 1 (later run).
- Report as in section 10.

You never declare the entry final. When the person says it is fine, reply with the branch name and say that the person can open the pull request against `main`; do not open it yourself.
