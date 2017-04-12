export default class Lazy {
	constructor() {
		this.chain = [];
	}

	add(f, ...args) {
		const step = e => f(...args, e);
		this.chain.push(step);
		return this;
	}

	evaluate(target) {
		let output = target;
		for (let step of this.chain){
			output = output.map(e => step(e));
		}
		return output;
	}
}