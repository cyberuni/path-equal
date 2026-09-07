import { basename } from 'node:path'
import { expect, it } from 'vitest'

it('is func', () => {
	expect(typeof basename).toBe('function')
})
