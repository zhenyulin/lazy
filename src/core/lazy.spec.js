import Lazy from './lazy';

describe('lazy', () => {
	it('handle single function', () => {
		const computation = new Lazy();
		const result = computation
			.add(function timesTwo(a) { return a * 2; })
			.evaluate([1, 5, 3]);
		expect(result).toEqual([2,10,6]);
	});

	it('handles function with extra args', () => {
		const computation = new Lazy();
		const result = computation
			.add(function mutate(a, b, c) { return a + b * c; }, 1, 2)
			.evaluate([1, 5, 3]);
		expect(result).toEqual([3,11,7]);
	});

	it('handles function chain', () => {
		const computation = new Lazy();
		const result = computation
			.add(function timesTwo(a) { return a * 2; })
			.add(function plus(a, b) { return a + b; }, 1)
			.evaluate([1, 2, 3]);
		expect(result).toEqual([3,5,7]);
	});

	it('handles arrow funciton', () => {
		const computation = new Lazy();
		const result = computation
			.add(a => a * 2)
			.evaluate([1, 5, 3]);
		expect(result).toEqual([2,10,6]);
	});

	it('handles arrow funciton chain', () => {
		const computation = new Lazy();
		const result = computation
			.add(a => a * 2)
			.add((a, b) => a + b, 1)
			.evaluate([1, 5, 3]);
		expect(result).toEqual([3,11,7]);
	});

	it('handles funciton without args', () => {
		const computation = new Lazy();
		const result = computation
			.add(Math.sqrt)
			.evaluate([1, 9, 4]);
		expect(result).toEqual([1,3,2]);
	});
});