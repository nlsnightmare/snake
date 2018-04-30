export default class Matrix {
    constructor(n,m) {
	this.n = n;
	this.m = m;
	this.data = new Array(n * m);
	this.size = n * m;

	// By default, return an identity matrix
	for( let x = 0; x < n; x++){
	    for( let y = 0; y < m; y++){
		if (x == y)
		    this.setItem(x,y,1);
		else
		    this.setItem(x,y,0);
	    }
	}
    }

    toArray(){
	return this.data;
    }

    transpose(){
	let m = new Matrix(this.m, this.n);

	for(let x = 0; x < this.n; x++){
	    for(let y = 0; y < this.m; y++){
		m.setItem(y,x,this.getItem(x,y));
	    }
	}
	return m;
    }

    static zero(n,m){
	let mat = new Matrix(n,m);
	for( let i = 0; i < mat.data.length; i++){
	    mat.data[i] = 0;
	}
	return mat;
    }
    loadData(data){
	if (data.length != this.data.length) {
	    throw new Error("Matrix data should be exactly " + this.n * this.m);
	}
	for( let i = 0; i < data.length; i++){
	    this.data[i] = data[i];
	}
    }

    display(){
	for( let x = 0; x < this.n; x++){
	    for( let y = 0; y < this.m; y++){
		console.log(`(${x},${y}) =>`,this.getItem(x,y));
	    }
	}
    }

    setItem(x,y,val){
	if (this.m == 1) {
	    let idx = y + x;
	    this.data[idx] = val;
	    return;
	}
	this.data[x + y * this.n] = val;
    }

    getItem(x,y){
	return this.data[x + y * this.n];
    }

    randomize(){
	for(let i = 0; i < this.data.length; i++){
	    this.data[i] = ( Math.random() * 2 ) - 1;
	}
    }

    copy(){
	let n = new Matrix(this.n, this.m);
	for( let i = 0; i < this.data.length; i++){
	    n.data[i] = this.data[i];
	}

	return n;
    }

    add(num){
	for(let i = 0; i < this.data.length; i++){
	    this.data[i] += num;
	}
    }

    mul(other){
	if (this.m != other.n) {
	    throw new Error(`Trying to multiply a (${this.n},${this.m}) matrix with a (${other.n},${other.m})`);
	}
	let res = Matrix.zero(other.m, this.n);

	for(let i = 0; i < this.n; i++){
	    for(let j = 0; j < other.m; j++){
		let sum = 0;
		for(let k = 0; k < this.m; k++){
		    sum += this.getItem(i,k) * other.getItem(k,j);
		}
		res.setItem(i,j,sum);
	    }
	}


	return res;
    }
}
