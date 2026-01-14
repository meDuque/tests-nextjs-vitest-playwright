export function sanitizeStr(s: string): string {
  // return s.replace(/[<>\/\\'"]/g, '');
  const cleaned = !s || typeof s !== 'string' ? '' : s.trim().normalize();
  return cleaned;
}
