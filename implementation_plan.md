# Hydrasaurus Agency: Routing Architecture Plan

This plan details the transition of the Hydrasaurus Agency landing page into a fully functional multi-page Next.js application using the App Router.

## User Review Required
Please review the proposed routing structure and the aesthetic direction for the new pages.

## Open Questions
- For the `app/contact/page.tsx`, do you have a preference on the dropdown options for the "Budget Dropdown" (e.g., "$5k-$10k", "$10k-$50k", "$50k+")? If not, I will generate a standard set of premium agency budget tiers.

## Proposed Changes

### Global Navigation Wiring
#### [MODIFY] `src/components/Navbar.tsx`
- Ensure the agency logo/text is properly wrapped in `<Link href="/">`.
- Wrap the "PITCH US" button in a `<Link href="/contact">`.

#### [MODIFY] `src/components/Footer.tsx`
- Update the "Contact" link (currently a `mailto:`) to redirect to `<Link href="/contact">`.

#### [MODIFY] `src/app/page.tsx`
- **Dolly's Card**: Convert the wrapping `<div ref={leftColRef}>` into a `<Link href="/talent/dollyislive" className="block ... hover:scale-[1.02] transition-transform duration-300">` (while maintaining the GSAP ref on a parent wrapper if necessary to preserve parallax without conflict).
- **Selena's Card**: Convert the card wrapper into a `<Link href="/talent/whyisselena">` with identical hover physics.

### New Route Construction
#### [NEW] `src/app/contact/page.tsx`
- **Layout**: A minimalist, brutalist form page.
- **Typography**: Massive "SECURE YOUR DIGITAL REAL ESTATE" hero text.
- **Form Component**: A dark glassmorphism form (`bg-[#050505]/40`, `backdrop-blur-md`, subtle white borders) featuring:
  - Name Input
  - Brand/Company Input
  - Budget Dropdown (Standard Tiers)
  - Message Textarea
- **Fallback**: A direct `mailto:hydrasaurus.agency@gmail.com` link below the form.

#### [NEW] `src/app/talent/[slug]/page.tsx`
- **Dynamic Route**: Scaffolds the dynamic talent template.
- **Logic**: Reads the dynamic `slug` parameter (e.g., `dollyislive`) from the URL.
- **UI**: Renders a massive, edge-to-edge uppercase header of the slug.
- **Navigation**: Includes a subtle `<Link href="/">` "Back to Roster" button at the top to ensure clean UX navigation.

## Verification Plan
### Automated Tests
- Build the app using `npm run build` to ensure the dynamic Next.js App Router links and page params resolve without hydration or type errors.

### Manual Verification
- Navigate through localhost:3000, clicking the Navbar "PITCH US", the Footer Contact, and both Talent cards to verify instant client-side routing.
- Verify that the dynamic `slug` successfully propagates to the giant header on the talent template pages.
