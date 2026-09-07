import { expect, it } from 'vitest'
import { pathEqual } from './index.js'

it('exports pathEqual()', () => {
	expect(typeof pathEqual).toBe('function')
})
