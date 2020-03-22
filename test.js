class thing {
	constructor(type) {
		this.type = type;
	}

	kill() {
		delete this
	}
}

let arr = [new thing('a'), new thing('b'), new thing('c')];

// function doThing() {
// 	test(arr[0])
// }

// function test(a) {
// 	console.log('the fuck');

// 	let index = arr.indexOf(a);

// 	if (index !== -1) {
// 		arr.splice(index,1)
// 	}
// }

// doThing()

arr[0].kill()

console.log(arr);
