/**
 * Hydrasaurus Agency - Administrative Authorization Configuration
 */

export const ALLOWED_ADMIN_EMAILS = [
  'shindesarvesh727@gmail.com',
  'shindesarvesh2005@gmail.com',
  'snfx111@gmail.com'
];

/**
 * Checks if a given email address is in the authorized admin whitelist.
 */
export function isEmailAdmin(email?: string | null): boolean {
  if (!email) return false;
  return ALLOWED_ADMIN_EMAILS.some(
    allowed => allowed.trim().toLowerCase() === email.trim().toLowerCase()
  );
}
