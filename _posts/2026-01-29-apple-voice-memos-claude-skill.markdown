---
layout: post
title: A Claude Skill to access Apple Voice Memos
date: 2026-01-29 20:00:00 +1100
comments: true
categories: workflow
---

A core productivity workflow I've developed over the last year involves recording voice memos of my thoughts and cleaning it up with an LLM generated summary I keep as reference material. It saves a lot of typing and I can recorded notes away from my desk. The output of note taking sesisons are long, often repetitive stream-of-consious transcripts provided by Apple's Voice Memos app. Fine tuning this workflow and summarization prompt has been a huge productivity gain, but the missing link has been the ability to automate the summarizastion by giving the LLM direct access to the transcripts on my machine.

I recently published a [Claude Skill][github-repo] that solves this issue, and gives Claude Code the ability to access local Voice Memos and their transcripts - enabling the potential to automate this workflow completely.

### My Manual Workflow

Apple's on-device transcription of Voice Memos are surprisingly good, but the end up buried inside the `.m4a` files it creates and are not exposed through any obvious API (e.g. via Apple Script automations). My existing workflow looked something like this:

1. Record a voice memo on my phone
2. Open Voice Memos on macOS and find the recording
3. Copy the transcript text manually
4. Paste it into Claude or [Goose][block-goose]  and ask for a clean summary

### The Apple Voice Memos Skill

The [apple-voice-memos skill][github-repo] gives Claude Code two capabilities:

- **List and search voice memos** — queries the local `CloudRecordings.db` SQLite database that Voice Memos maintains on macOS, filtering by date range and title
- **Extract transcripts** — parses the `tsrp` atom inside `.m4a` files to pull out Apple's on-device transcript data

Everything runs locally. Claude just gets the metadata to aid its searching and the raw transcript text to add to its context.

Once installed, a typical interaction via Claude Code's slash commands look like:

```
/apple-voice-memos days:7 search:standup
```

Claude lists your recent memos, and you can ask it to read the transcript of any memo, summarise it, extract action items, or whatever else you need.

```
TODO: Example of input and output
```

### Built in an Evening, Refined Over a Day

After some preliminary research, the whole skill was built in a single evening using Claude Code itself. I specified the skill requirements and worked with Claud's planning mode to create the skill structure. After some iteration and re-confirmation that the format it created wasa correct, we were ready to go. 

After the initial version and commits, it took testing and refinement to get to a working skill.


The core transcript extraction is based on [Tomoki Aonuma's work][uasi-repo] parsing the MP4 atom structure, and I built the metadata extraction that queries the CloudRecordings database in a separate Claude Code session.

Both tools are Python scripts using only the standard library — no dependencies to install beyond Python 3 and Claude Code itself.

### Installation

Copy the skill directory into your Claude global skills folder:

```bash
cp -r apple-voice-memos ~/.claude/skills/apple-voice-memos
```

Alternatively, [download a release][github-releases] and add it directly to the Claude desktop app. 

The full source and documentation are available on [GitHub][github-repo].

[github-repo]: https://github.com/jessedc/claude-apple-voice-memos-skill
[claude-code]: https://docs.anthropic.com/en/docs/claude-code
[claude-skills]: https://docs.anthropic.com/en/docs/claude-code/skills
[uasi-repo]: https://github.com/uasi/extract-apple-voice-memos-transcript
[block-goose]: https://github.com/block/goose
[github-releases]: https://github.com/jessedc/claude-apple-voice-memos-skill/releases