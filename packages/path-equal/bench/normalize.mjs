import { performance } from 'node:perf_hooks'

function isDrive(path) {
	const letter = path.charCodeAt(0) | 32
	return letter >= 97 && letter <= 122 && path[1] === ':' && (path.length === 2 || path[2] === '/')
}

function isUnc(path) {
	return path[0] === '/' && path[1] === '/' && path.length > 2 && path[2] !== '/'
}

function toPosix(path) {
	const normalized = path.replace(/\\/g, '/')
	return isDrive(normalized) ? `/${normalized[0].toLowerCase()}${normalized.slice(2)}` : normalized
}

function resolveSegments(normalized) {
	const absolute = normalized.startsWith('/')
	const segments = []
	for (const segment of normalized.split('/')) {
		if (segment === '..') {
			if (segments.length > 0 && segments[segments.length - 1] !== '..') segments.pop()
			else if (!absolute) segments.push(segment)
		} else if (segment !== '' && segment !== '.') segments.push(segment)
	}
	const prefix = isUnc(normalized) ? '//' : absolute ? '/' : ''
	return `${prefix}${segments.join('/')}` || '.'
}

function normalizeBaseline(path) {
	return resolveSegments(toPosix(path))
}

function normalizeFast(path) {
	const normalized = toPosix(path)
	if (normalized !== '' && !normalized.includes('.') && !normalized.includes('//') && !normalized.endsWith('/')) {
		return normalized
	}
	return resolveSegments(normalized)
}

function normalizeOriginal(path) {
	const replacements = [
		[/\\/g, '/'],
		[/(\w):/, '/$1'],
		[/(\w+)\/\.\.\/?/g, ''],
		[/^\.\//, ''],
		[/\/\.\//, '/'],
		[/\/\.$/, ''],
		[/\/$/, ''],
	]
	for (const [pattern, replacement] of replacements) {
		while (pattern.test(path)) path = path.replace(pattern, replacement)
	}
	return path
}

const paths = [
	'src/index.ts',
	'src/sub-dir/../index.ts',
	'C:\\work\\project\\src\\..\\index.ts',
	'a/b/c/d/e/f/../../../../g',
	'../../some/relative/path',
	'/a/../../b',
	'./src/index.ts/',
]
const iterations = Number(process.argv[2]) || 1_000_000

for (const [name, normalize] of [
	['original-regex', normalizeOriginal],
	['baseline', normalizeBaseline],
	['fast', normalizeFast],
]) {
	if (name !== 'original-regex') {
		for (const path of paths) {
			if (normalizeBaseline(path) !== normalizeFast(path)) throw new Error(`Mismatch for ${path}`)
		}
	}

	const start = performance.now()
	let checksum = 0

	for (let iteration = 0; iteration < iterations; iteration++) {
		checksum += normalize(paths[iteration % paths.length]).length
	}

	console.info(
		`${name}: ${(((performance.now() - start) * 1_000_000) / iterations).toFixed(1)} ns/op (checksum ${checksum})`,
	)
}
