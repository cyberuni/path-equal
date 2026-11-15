/**
 * Compare if the two file paths are considered equal.
 */
export function pathEqual(actual: string, expected: string): boolean {
	return actual === expected || normalizePath(actual) === normalizePath(expected)
}

function normalizePath(path: string): string {
	let normalized = path.replace(/\\/g, '/')
	if (isDrive(normalized)) {
		normalized = `/${normalized[0]!.toLowerCase()}${normalized.slice(2)}`
	}
	if (normalized !== '' && !normalized.includes('.') && !normalized.includes('//') && !normalized.endsWith('/')) {
		return normalized
	}

	const absolute = normalized.startsWith('/')
	const segments: string[] = []

	for (const segment of normalized.split('/')) {
		if (segment === '..') {
			if (segments.length > 0 && segments[segments.length - 1] !== '..') {
				segments.pop()
			} else if (!absolute) {
				segments.push(segment)
			}
		} else if (segment !== '' && segment !== '.') {
			segments.push(segment)
		}
	}

	const prefix = isUnc(normalized) ? '//' : absolute ? '/' : ''
	return `${prefix}${segments.join('/')}` || '.'
}

/**
 * `X:` followed by a separator or the end of the string, where X is an ASCII letter.
 * Drive-relative paths such as `c:foo` are left as they are.
 */
function isDrive(path: string): boolean {
	const letter = path.charCodeAt(0) | 32
	return letter >= 97 && letter <= 122 && path[1] === ':' && (path.length === 2 || path[2] === '/')
}

/** Exactly two leading separators followed by a name, as in `\\server\share`. */
function isUnc(path: string): boolean {
	return path[0] === '/' && path[1] === '/' && path.length > 2 && path[2] !== '/'
}
