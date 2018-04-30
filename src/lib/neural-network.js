import Matrix from './matrix';

function relu(item) {
    return Math.max(item/10,item);
}




function softmax(arr) {
    return arr.map(function(value,index) { 
	return Math.exp(value) /
	    arr.map( function(y){ return Math.exp(y); } ).reduce( function(a,b){ return a+b; });
    });
}


export default class NeuralNetwork {
    constructor(...args){
	let inputs, outputs, hidden;
	let normalizeInput, normalizeOutput;
	if (typeof args[0] == 'object') {
	    inputs = args[0].inputs;
	    hidden = args[0].hidden.slice(0);
	    outputs = args[0].outputs;
	    normalizeInput = args[0].normalizeInput;
	    normalizeOutput = args[0].normalizeOutput;
	    hidden.push(outputs);

	    this.options = args[0];
	}
	else {
	    inputs = args[0];
	    hidden = args[1];
	    outputs = args[2];

	    this.options = {
		inputs: args[0],
		hidden: [args[1]],
		outputs: args[2]
	    };
	}
	this.score = 0;
	this.inputs = inputs;
	this.outputs = outputs;

	this.normalizeInput = normalizeInput !== undefined? normalizeInput:true;
	this.normalizeOutput = normalizeOutput !== undefined? normalizeOutput:true;

	this.layers = [];


	this.layers.push(new Matrix(inputs + 1, hidden[0]));
	for (let i = 0; i < hidden.length; i++) {
	    this.layers.push(new Matrix(this.layers[i].m + 1, hidden[i]));
	}
	this.layers.forEach((l) => l.randomize());
    }

    compute(input){
	let inputs = input.slice(0);

	if (this.normalizeInput) {
	    let max = Math.max(...inputs);
	    if (max == 0) {
		max = 1;
	    }

	    inputs = inputs.map((v) => v / max);
	}
	inputs.push(1); // Add the bias


	let input_matrix = new Matrix(1,inputs.length);
	input_matrix.data = inputs;


	let res = input_matrix;
	let i;
	for (i = 0; i < this.layers.length - 1; i++) {
	    let layer = this.layers[i];
	    
	    res = res.mul(layer);
	    res = res.transpose();
	    res.data.push(1);
	    res.m++;
	    // res.data = res.data.map(relu);
	    res.data = res.data.map(Math.tanh);
	}

	let percentages;
	let res2 = res.mul(this.layers[i]);
	if (this.normalizeOutput) 
	{
	    percentages = softmax(res2.data);
	    i = percentages.indexOf(Math.max(...percentages));

	    return {
		percentages,
		max: i
	    };
	}
	else 
	    return res2.data.slice();
    }

    getGenes(){
	let genes = [];
	for (let l of this.layers) {
	    genes = genes.concat(l.data);
	}
	return genes;
    }

    setGenes(genes){
	for (let l of this.layers) {
	    l.data = genes.splice(0,l.size);
	}
    }


    crossover(other,mutationRate){
	let g1 = this.getGenes();
	let g2 = other.getGenes();
	if (g1.length != g2.length) {
	    throw new Error("Can't crossover between two networks of different size!");
	}

	let newGenes = [];
	for(let i = 0; i < g1.length; i++){
	    if (Math.random() > 0.5)
		newGenes.push(g1[i]);
	    else
		newGenes.push(g2[i]);

	    if (Math.random() < mutationRate) {
		let r = Math.random()* 2 - 1;
		// if (Math.random() < 0.6) {
		    newGenes[i] = r;
		// }
		// else
		    // newGenes[i] += r *0.1;
	    }
	}

	let nn = new NeuralNetwork(this.options);
	nn.setGenes(newGenes);
	return nn;
    }
}
