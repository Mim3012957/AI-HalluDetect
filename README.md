# HalluDetect
### AI Code Hallucination Scanner

> A browser based tool that detects hallucinations in AI-generated code that built on a Systematic Literature Review of 6 peer-reviewed papers.

## What is this?

When AI tools like ChatGPT or GitHub Copilot generate code, they sometimes "hallucinate" they confidently write code that looks correct but doesn't actually work. This includes:

- **Fabricated packages** — `from sklearn.magic import AutoFix` (doesn't exist)
- **Non-existent methods** — `Promise.sleep(1000)` (not a real JS method)
- **Wrong syntax confidence** — `Object.deepClone()` (hallucinated utility)

HalluDetect scans your code for these patterns and explains **why** each issue is a hallucination — with references to published research.

## Why I built this

I'm self-teaching software engineering while studying for a degree in a different field. I rely heavily on AI-generated code — and I kept running into bugs caused by hallucinations I couldn't immediately recognize.

While writing a Systematic Literature Review (SLR) on AI code hallucination, I noticed a gap: existing detection tools require large infrastructure or automated testing environments. There was nothing lightweight, browser-based, and accessible for solo developers.

So I built one.

## Research basis

Every detection pattern in HalluDetect maps to a hallucination category from peer-reviewed research 
| CodeHalu | Tian et al. | 2024 | Execution-based hallucination detection |
| CodeMirage | Agarwal et al. | 2024 | Static analysis of hallucination patterns |
| Zhang et al. ISSTA | Zhang et al. | 2025 | Empirical study across multiple LLMs |
| HALLUCODE | Liu et al. | 2024 | Benchmark for code hallucination evaluation |
| Gao et al. SLR | Gao et al. | 2025 | Systematic literature review on LLM hallucination |
| Li et al. | Li et al. | 2024 | Hallucination mitigation strategies |

## Features
-Live code scanner — paste any AI-generated code and scan instantly
- Hallucination type classifier — Fabricated Package / Non-existent Method / Wrong Syntax Confidence
- Severity scoring — High / Medium / Low with animated risk meter
- Suggested fixes— every flagged issue includes a correct alternative
- Research sidebar — each detection links back to the paper that documented it
- No API required — works entirely in the browser, no internet needed after load
- Python + JavaScript — covers both languages

## How to use

1. Open `index.html` in your browser
2. Paste any AI-generated code into the input area
3. Click **Scan for hallucinations**
4. Review flagged issues, explanations, and suggested fixes

Or click **Load example** to see a demonstration.

## Tech stack

- HTML5
- CSS3 (no framework)
- Vanilla JavaScript (no libraries, no API)

Deliberately kept dependency-free so it works in any environment — including low-resource settings.

## Project structure
halludetect/
├── index.html      — UI structure
├── style.css       — All styles
├── patterns.js     — Hallucination detection rules (from SLR)
├── papers.js       — Research paper data
└── app.js          — Scanner logic and UI updates
## Limitations

- Pattern-based detection only — cannot catch all hallucinations
- May produce false positives for custom-named functions
- Does not execute code — static analysis only
- Pattern library grows as more research is published
  
## About
Built by Taslima  a self-taught frontend developer from Bangladesh, currently writing a Systematic Literature Review on AI-generated code hallucination.

This tool is a research companion, not a replacement for verifying code against official documentation.
