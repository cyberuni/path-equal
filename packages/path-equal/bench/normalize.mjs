import { performance } from 'node:perf_hooks'

function normalizeBaseline(path) {
	const normalized = path.replace(/\\/g, '/').replace(/(\w):/, '/$1')
	const segments = []

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

function normalizeFast(path) {
	let normalized = path.replace(/\\/g, '/')
	if (normalized.length > 1 && normalized[1] === ':') {
		normalized = `/${normalized[0]}${normalized.slice(2)}`
	}
	if (!normalized.includes('.') && !normalized.endsWith('/')) return normalized

	const segments = []
	for (const segment of normalized.split('/')) {
		if (segment === '..') {
			if (segments.length > 0 && segments[segments.length - 1] !== '..') segments.pop()
			else if (!normalized.startsWith('/')) segments.push(segment)
		} else if (segment !== '' && segment !== '.') segments.push(segment)
	}
	return `${normalized.startsWith('/') ? '/' : ''}${segments.join('/')}` || '.'
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

for (const [name, normalize] of [['original-regex', normalizeOriginal], ['baseline', normalizeBaseline], ['fast', normalizeFast]]) {
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

	console.log(`${name}: ${((performance.now() - start) * 1_000_000 / iterations).toFixed(1)} ns/op (checksum ${checksum})`)
}
