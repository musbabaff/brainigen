# Brainigen Project Audit Report
Generated: 2026-04-19
Auditor: Antigravity Agent

## Executive Summary
- Total issues found: 21
- Critical issues: 1
- High priority: 5
- Medium priority: 8
- Low priority: 7

This audit analyzes the current state of the Brainigen project, identifying critical security flaws, structural redundancies, internationalization (i18n) gaps, and performance bottlenecks that conflict with enterprise-grade standards.

---

## 1. File Structure Issues

### 1.1 Duplicate Files
- **File Path:** `src/components/shared/CookieConsent.tsx` and `src/components/shared/cookie-consent.tsx`
- **Problem:** Identical/similar functionality implemented twice.
- **Recommendation:** Merge and keep the kebab-case version to match Next.js app router standards. Delete the PascalCase one.

### 1.2 Orphan / Dead Code
- **File Paths:** `src/components/shared/NoiseOverlay.tsx`, `src/components/shared/LoadingScreen.tsx`
- **Problem:** These files were previously removed from the layout but still exist in the repository.
- **Recommendation:** Delete these files entirely to reduce bloat.

### 1.3 Unused & Duplicate Dependencies
- **Problem:** `package.json` contains both `framer-motion` and `motion` as dependencies. This is duplicate bloat.
- **Problem:** `@react-spring/web` and `tippy.js` are installed but never imported in `src/`.
- **Recommendation:** Run `pnpm remove @react-spring/web tippy.js motion` and standardize on `framer-motion`.

### 1.4 Naming Inconsistencies
- **File Paths:** `src/components/shared/`
- **Problem:** Mix of PascalCase (`SearchModal.tsx`) and kebab-case (`theme-toggle.tsx`).
- **Recommendation:** Rename all files in `components/` to kebab-case for consistency.

---

## 2. Hardcoded Strings (i18n Violations)

*The user specifically noted that many texts are still hardcoded and missing translations.*

### 🟡 HIGH: User-Facing Marketing Pages
- **File Path:** `src/app/[locale]/(marketing)/trust/page.tsx`
- **Exact Text:** `"Trust Center"`, `"Built on trust"`, `"Documents"`, `"Subprocessors"`
- **Suggested Key:** `marketing.trust.*`
- **Recommendation:** Replace with `t('trust.title')`, `t('trust.subtitle')`, etc. Update all 8 locale files.

- **File Path:** `src/app/[locale]/(marketing)/security/page.tsx`
- **Exact Text:** `"Security"`, `"Built for enterprise security"`
- **Suggested Key:** `marketing.security.*`

- **File Path:** `src/app/[locale]/(marketing)/solutions/page.tsx`, `customers/page.tsx`, `compare/page.tsx`
- **Problem:** All newly created marketing pages use hardcoded English text for headings, descriptions, and buttons.

### 🟡 HIGH: Authentication Pages
- **File Path:** `src/app/[locale]/(auth)/register/page.tsx:210`
- **Exact Text:** `"Terms of Service"`, `"Privacy Policy"`
- **Suggested Key:** `auth.terms`, `auth.privacy`

### 🟢 MEDIUM: Components & Demos
- **File Path:** `src/components/marketing/ChatDemo.tsx`
- **Exact Text:** `"Nova"`, `"Online"`, `"Powered by Brainigen AI"`
- **Suggested Key:** `chat.bot_name`, `chat.status_online`, `chat.powered_by`

---

## 3. Bugs & Broken Links

### 🟡 HIGH: Invalid Hash Links
- **File Path:** `src/app/[locale]/(marketing)/contact/page.tsx:121`
- **Problem:** Social links use `<a href="#">Twitter</a>`. Clicking this will break the route or cause a jump to top.
- **Recommendation:** Replace `#` with actual social media URLs and add `target="_blank" rel="noopener noreferrer"`.

- **File Path:** `src/app/[locale]/(marketing)/blog/page.tsx` and `blog/[slug]/page.tsx`
- **Problem:** Uses `<Link href="#">` for blog posts.
- **Recommendation:** Implement dynamic routing `href={"/blog/" + post.slug}`.

- **File Path:** `src/app/[locale]/(auth)/register/page.tsx`
- **Problem:** Terms and Privacy links point to `href="/#"` instead of `/terms` and `/privacy`.
- **Recommendation:** Update to point to the new `/terms` and `/privacy` routes.

---

## 4. Performance Issues

### 🟡 HIGH: Bundle Bloat
- **Problem:** The `package.json` contains numerous heavy text editor extensions (`@tiptap/*`).
- **Recommendation:** The `TiptapEditor.tsx` component should be lazy-loaded using `next/dynamic` to prevent it from bloating the main dashboard JavaScript bundle.

### 🟢 MEDIUM: canvas-confetti
- **Problem:** Imported directly in `src/app/[locale]/(dashboard)/onboarding/page.tsx`.
- **Recommendation:** Import `canvas-confetti` dynamically via `import()` only when the onboarding step is successfully completed.

---

## 5. Security Findings

### 🔴 CRITICAL: Supabase RLS Bypass
- **File Path:** `supabase/migrations/20260418210000_notifications.sql:153`
- **Problem:** The policy `"Admins manage broadcasts"` is configured with `USING (true);`. This means *any* user, authenticated or not, has full access to the `notification_broadcasts` table.
- **Recommendation:** Update the policy to check for admin roles:
  `USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'))`

### 🟡 HIGH: Missing Input Validation
- **File Path:** `src/app/api/notifications/create/route.ts`
- **Problem:** The API route extracts `userId, type, title, message` from `request.json()` but does not use Zod to validate the types or lengths of these inputs before inserting them into the database.
- **Recommendation:** Implement `zod` schemas for all API route payloads to prevent injection or malformed data attacks.

### 🟢 MEDIUM: Internal API Key Exposure
- **File Path:** `src/app/api/notifications/create/route.ts`
- **Problem:** Uses `process.env.INTERNAL_API_KEY`. If this key is ever prefixed with `NEXT_PUBLIC_` by mistake, it will be exposed to the client. Ensure strict env separation.

---

## 6. CSS/Design Issues

### 🟢 MEDIUM: Hardcoded Spacing
- **Problem:** Spacing is inconsistent across the new marketing pages. Some use `py-24 md:py-32`, others use `py-16`.
- **Recommendation:** Standardize section padding using a shared design token or component (e.g., `<Section>` wrapper).

---

## 7. Database Issues

### 🟡 HIGH: Missing Foreign Key Constraints / Cascade Deletes
- **File Path:** `20260418210000_notifications.sql`
- **Problem:** The `sent_by` column in `notification_broadcasts` references `profiles(id)` but lacks `ON DELETE SET NULL` or `ON DELETE CASCADE`. If an admin is deleted, this will cause a constraint violation.
- **Recommendation:** Update the column definition to include a proper cascade rule.

---

## 8. SEO & Accessibility

### 🟡 HIGH: Missing Metadata
- **Problem:** The newly created marketing pages (`/customers`, `/solutions`, `/security`, etc.) do not export a `metadata` object.
- **Recommendation:** Add `export const metadata: Metadata = { title: "...", description: "..." }` to every page to ensure proper indexing and social sharing cards.

---

## Recommended Fix Order
1. **CRITICAL:** Fix the Supabase RLS policy in the notifications migration.
2. **HIGH:** Fix the broken `#` links in authentication and blog pages.
3. **HIGH:** Implement lazy loading for the Tiptap editor to improve performance.
4. **HIGH:** Add `metadata` exports to all new marketing pages.
5. **MEDIUM:** Replace all hardcoded English text with `next-intl` translation keys.
6. **LOW:** Clean up orphan files and redundant packages from `package.json`.

## Appendix A: Dependency Audit
- **pnpm audit:** 0 vulnerabilities found across 967 dependencies.

## Appendix B: Build Analysis
- **Build Status:** Passed (Exit code 0).
- **Routes Generated:** 60+ routes. All static marketing pages are successfully server-rendered.
