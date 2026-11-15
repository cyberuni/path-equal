/**
 * Compare if the two file paths are considered equal.
 */
export function pathEqual(actual: string, expected: string): boolean {
	return actual === expected || normalizePath(actual) === normalizePath(expected)
}

function normalizePath(path: string): string {
	let normalized = path.replace(/\\/g, '/')
	if (normalized.length > 1 && normalized[1] === ':') {
		normalized = `/${normalized[0]}${normalized.slice(2)}`
	}
	if (!normalized.includes('.') && !normalized.endsWith('/')) return normalized

	const segments: string[] = []

	for (const segment of normalized.split('/')) {
		if (segment === '..') {
			if (segments.length > 0 && segments[segments.length - 1] !== '..') {
				segments.pop()
			} else if (!normalized.startsWith('/')) {
				segments.push(segment)
			}
		} else if (segment !== '' && segment !== '.') {
			segments.push(segment)
		}
	}

	return `${normalized.startsWith('/') ? '/' : ''}${segments.join('/')}` || '.'
}
