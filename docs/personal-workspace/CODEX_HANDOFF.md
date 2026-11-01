# Personal portfolio — Codex handoff

Owner: Mahdi Arghyani  
Repository: `mahdiarghyani/modern-nuxt-portfolio`  
Started: 2026-11-01

## Goal
Strengthen the bilingual Nuxt portfolio and Persian/English resumes for frontend engineering roles at established Iranian technology companies. Demonstrate concrete engineering contributions and explain technical decisions, not merely enumerate frameworks or AI tools.

## Working agreement
- Keep `main` unchanged until changes are reviewed in a pull request.
- Never commit internal employer code, non-public financial or product information, secrets, private documents, or unapproved screenshots.
- Do not invent job dates, titles, metrics, seniority, or contributions.
- Prioritize readable, demonstrable work and consistent contact information.
- Work in small, testable increments and report files changed plus test results.
- For content updates, keep FA and EN consistent and check RTL output.

## Existing implementation
- Nuxt 4, Nuxt UI 4, Tailwind CSS 4, TypeScript, i18n, resume/PDF generation.
- Homepage: `app/pages/index.vue`.
- Public profile and work/project data: `app/data/portfolio.ts` and `app/data/portfolio.fa.ts`.
- Resume data: `app/data/resume.en.ts`, `app/data/resume.fa.ts`.
- Contact/email action: `app/components/portfolio/Hero.vue`.
- AI tool catalogue: `app/data/aiStack.ts`.

## Current prioritized backlog
| ID | Priority | Task | Acceptance criteria |
| --- | --- | --- | --- |
| CAREER-001 | P0 | Confirm factual baseline, job dates, actual roles and public-safe outcomes | Approved evidence/fact sheet |
| CAREER-002 | P0 | Audit inconsistent email, LinkedIn and project URLs | Correct single source, links verified |
| CAREER-003 | P0 | Rewrite bilingual summaries without unverified claims | Concise, accurate FA and EN |
| CAREER-004 | P0 | Reflect verified recent professional product experience | Contributions checked with owner; no confidential material |
| CAREER-005 | P1 | Refresh skills to match actual frontend stack | Ranked by real experience |
| CAREER-006 | P1 | Prioritize work and projects on homepage | Responsive, accessible in both locales |
| CAREER-007 | P1 | Add safe technical project case studies | Problem, role, decision, result/evidence |
| CAREER-008 | P1 | Consolidate duplicated professional facts | Locales and PDF generated from consistent data |
| CAREER-009 | P1 | Validate PDF and accessibility | Selectable text, correct RTL, working links |
| CAREER-010 | P2 | Run live performance and cross-device checks | Reproducible before/after measurements |

## Known issues — verify before publishing changes
1. The public portfolio social email currently uses a placeholder while `Hero.vue` copies another hard-coded email. Resume PDFs/source include a third email. **Do not guess which is preferred.**
2. Public portfolio LinkedIn address differs from the address in both resume data files.
3. Current resume and portfolio omit the newer product work discussed with the owner. The precise job title, dates and allowed details require verification.
4. Current summaries and some experience bullets claim percentage speed-ups and fixed delivery outcomes without supporting measurements.
5. Most projects are shown as small cards without case studies; they need evidence and clearer individual contribution.

## Implementation and review protocol
1. Read source files before modifications and inspect any uncommitted changes.
2. Make changes on a named branch; create a PR to `main`, never auto-merge.
3. Prefer clear code and existing dependencies over a redesign or new dependencies.
4. Run `pnpm check`, `pnpm typecheck`, `pnpm generate` whenever an execution environment is available; document any test not run.
5. Validate Persian/English content, mobile layout, keyboard usability and actual PDF output when affected.
6. In PR summary, state task IDs, diff scope, verification results, limitations and outstanding facts.
7. Do not imply Codex, GitHub and Google Drive automatically synchronize. Keep planning state deliberately updated.

## First change set
- Introduce this safe coordination note.
- Put existing professional experience and projects ahead of tool inventories on the homepage.
- Correct the inaccurate expansion/description of MCP in the AI catalogue.
- Defer job-history claims and email selection pending factual confirmation.
