---
name: imlargo-avoid-ai-writing
description: Audits and rewrites prose to remove AI writing patterns, in English and Spanish. Covers the word and phrase catalog, sentence structures, formatting tells, rhythm, context profiles (chat, email, docs, PRs, posts), what a rewrite must never add, and three modes (rewrite, detect, edit in place). Use on every piece of prose before delivering it (messages, emails, posts, docs, READMEs, issues, PR bodies, reports), and whenever asked to "remove AI-isms", "make this sound human", "sin AI slop", "que no suene a IA", "humaniza esto", or to audit or clean up writing.
metadata:
  author: imlargo
  version: "2026.11.19"
---

# Avoid AI Writing

> Builds on `imlargo-anti-slop`, which routes every kind of output; this skill holds the prose rules. Plain markdown, no scripts: it works the same in Claude Code, claude.ai and the API. A personal voice skill, when installed, decides tone; this one only removes tells.

The patterns here are signals that text reads as generated, not proof of who wrote it. Careful humans, second-language writers and technical genres hit some of them too. Use them to improve writing, never as a verdict on authorship.

## Modes

| Mode | When | Output |
|------|------|--------|
| **rewrite** (default) | Drafts, or "clean this up" | The clean text, then a short list of what changed |
| **detect** | "Audit", "flag only", "what sounds like AI here", someone else's text | Findings grouped by severity, each quoted, marked fix or judgment call. No rewrite |
| **edit** | A file to fix in place | Minimal edits to the flagged spans only, then a list of before → after |

When the audit is a step inside another task (writing a message, a post, a doc), deliver only the clean text. The findings stay out of the deliverable.

## Process

1. Read [patterns](references/patterns.md) in full before a full audit. For a short message, apply the P0 and P1 lists from memory.
2. Pick the context profile (below). It sets what's strict and what's relaxed.
3. Audit: quote every hit. Leave quoted material, code, tables, URLs and text attributed to someone else untouched; flag tells inside them instead of rewriting.
4. Rewrite: fix each hit by saying the thing directly. Keep every fact, number, name and technical detail. Keep the author's structure unless the structure itself is the tell.
5. Second pass: reread the rewrite against the catalog. Rewrites often swap one tell for another (a cut triad becomes a pair of parallel clauses; a removed "crucial" becomes "key" everywhere). Fix those, then deliver.

## Severity

- **P0, credibility:** chatbot artifacts ("Great question!", "I hope this helps"), knowledge-cutoff disclaimers, unsourced authority ("experts agree"), invented facts or numbers, inflated significance on routine events, placeholders left unfilled.
- **P1, obvious AI smell:** the word lists, template phrases, "It's not X, it's Y" reveals, "Let's" and "Here's the thing" openers, rule-of-three padding, hedge stacks, bold on every phrase, bullet lists of bare noun phrases, manufactured punchlines, closing offers and recaps.
- **P2, polish:** em dashes, uniform paragraph and sentence length, transition words (Moreover, Furthermore), copula avoidance ("serves as" for "is"), synonym cycling, title-case headings, excessive structure for short content.

Quick passes fix P0 and P1. Full audits cover all three.

## Context Profiles

| Profile | Strict | Relaxed |
|---------|--------|---------|
| Chat and Slack | P0, chatbot phrasing, filler, closing offers | Fragments, casual punctuation, lists. Keep the author's typos and contractions |
| Email and messages | Openers and closers that say nothing, hedging, effusive thanks | One warm line |
| Docs, READMEs, PRs | Marketing words, vague claims, inflated significance | Lists, tables and bold for a real warning; "may" when it's accurate |
| Posts and articles | Everything, especially reveals, punchlines, triads and engagement bait | Nothing: public text gets the full audit |

## A Rewrite Must Never Add

Removing tells is half the job; the other failure is installing a fake "human" voice.

- **Invented specifics:** a number, name, date, tool or anecdote the source didn't contain. Flag the gap (`[to confirm: ...]`) instead.
- **Fake first person:** "In my experience", "I've seen this a hundred times" in text that had no author presence.
- **Performed candor:** "Let's be honest", "Real talk", "Here's the thing".
- **Staccato drama:** chopping sentences into fragments to manufacture rhythm. Vary length by varying the sentences.
- **Forced contrarianism or stakes:** "Everyone gets this wrong", "Now more than ever", unless the source argued it.
- **New dashes, bold or emojis.**

If the original is already clean, say so and change little. Over-editing a human text is its own failure.

## References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Patterns | The full catalog in English and Spanish: words, phrases, structures, formatting, rhythm, with fixes and before/after examples | [patterns](references/patterns.md) |
