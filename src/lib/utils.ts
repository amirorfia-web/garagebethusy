/**
 * Utility: concaténation conditionnelle de classes CSS.
 * Usage: cn('base', condition && 'extra', undefined, 'autre')
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}
