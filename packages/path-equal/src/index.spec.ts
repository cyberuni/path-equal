import { describe, expect, it } from 'vitest'
import { pathEqual } from './index.js'

type Case = [actual: string, expected: string]

function expectEqual(actual: string, expected: string, result: boolean) {
	expect(pathEqual(actual, expected)).toBe(result)
	expect(pathEqual(expected, actual)).toBe(result)
}

describe('identical strings', () => {
	it.each<Case>([
		['a', 'a'],
		['a/b', 'a/b'],
		['a\\b', 'a\\b'],
	])('%j equals %j', (a, b) => expectEqual(a, b, true))
})

describe('different paths', () => {
	it.each<Case>([
		['a', 'b'],
		['/a', 'a'],
		['A', 'a'],
		['../a', 'a'],
		['../..', '..'],
		['/D/foo', '/d/foo'],
	])('%j does not equal %j', (a, b) => expectEqual(a, b, false))
})

describe('separators', () => {
	it.each<Case>([
		['a/b', 'a\\b'],
		['a/b/c', 'a\\b\\c'],
		['a\\b\\c\\', 'a/b/c'],
		['a/', 'a'],
		['a//b', 'a/b'],
		['a//b/.', 'a/b'],
		['a\\\\b', 'a/b'],
	])('%j equals %j', (a, b) => expectEqual(a, b, true))
})

describe('root', () => {
	it.each<Case>([
		['/', '\\'],
		['/', '//'],
		['///a', '/a'],
		['/..', '/'],
	])('%j equals %j', (a, b) => expectEqual(a, b, true))
})

describe('drive letters', () => {
	it.each<Case>([
		['/d/foo', 'd:\\foo'],
		['/d/foo', 'd:/foo'],
		['/d/foo', 'D:\\foo'],
		['d:\\foo', 'D:/foo'],
		['/d', 'd:'],
		['/d', 'd:\\'],
		['/', 'd:\\..'],
	])('%j equals %j', (a, b) => expectEqual(a, b, true))

	it.each<Case>([
		['c:foo', '/cfoo'],
		['c:foo', '/c/foo'],
		['a:b', '/ab'],
		['1:\\foo', '/1/foo'],
	])('%j does not equal %j', (a, b) => expectEqual(a, b, false))
})

describe('UNC paths', () => {
	it.each<Case>([
		['\\\\server\\share', '//server/share'],
		['\\\\server\\share\\', '//server/share'],
	])('%j equals %j', (a, b) => expectEqual(a, b, true))

	it.each<Case>([
		['\\\\server\\share', '/server/share'],
		['\\\\server\\share\\', '/server/share'],
		['//a', '/a'],
	])('%j does not equal %j', (a, b) => expectEqual(a, b, false))
})

describe(`'.' (current dir)`, () => {
	it.each<Case>([
		['./a', 'a'],
		['a/b/.', 'a/b'],
		['a/b/./', 'a/b'],
		['a/b/./c', 'a/b/c'],
		['a/b/./c/d/./e', 'a/b/c/d/e'],
		['', '.'],
		['', './'],
	])('%j equals %j', (a, b) => expectEqual(a, b, true))
})

describe(`'..' (parent dir)`, () => {
	it.each<Case>([
		['a/../b', 'b'],
		['a/b/../', 'a'],
		['a/b/..', 'a'],
		['a/ba/../c/../d', 'a/d'],
		['../a', '../a'],
		['../a/b/..', '../a'],
		['..', '../'],
		['dir/sub-dir/../file.txt', 'dir/file.txt'],
		['node_modules/pkg-name/../other', 'node_modules/other'],
		['src/v1.2/../x', 'src/x'],
		['m/h/d/c/../a/b/../../../..', 'm'],
		['k/m/h/d/c/../a/b/../../../../..', 'k'],
		['k/m/h/d/c/../a/b/../../../../h/d', 'k/m/h/d'],
		['k\\m\\h\\d\\c\\..\\a\\b\\..\\..\\..\\..\\h\\d', 'k/m/h/d'],
		['../../a', '../../a'],
		['/a/../../b', '/b'],
		['/a/..', '/'],
		['a/../../b', '../b'],
		['a/..', '.'],
		['a/b/../..', '.'],
	])('%j equals %j', (a, b) => expectEqual(a, b, true))
})

describe('dot-like names stay names', () => {
	it.each<Case>([
		['./.git', '.git'],
		['a/..b', 'a/..b'],
		['a/.../b', 'a/.../b'],
	])('%j equals %j', (a, b) => expectEqual(a, b, true))

	it.each<Case>([
		['a/.../b', 'a/b'],
		['a/..b', 'b'],
		['a/.b', 'a/b'],
	])('%j does not equal %j', (a, b) => expectEqual(a, b, false))
})
