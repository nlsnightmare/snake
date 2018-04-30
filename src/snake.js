import NeuralNetwork from './lib/neural-network';
import Tail from './tail';
import Food from './food';
import ctx from './context';



const info = document.getElementById("info");
const STARVE_LIMIT = 500;



function newFood() {
    let x = Math.floor( Math.random() * 19 * 2 );
    let y = Math.floor( Math.random() * 19  * 2);
    return new Food(x,y);
}

let delay = 80;
export default class Snake {
    constructor(x,y,name) {
	this.name = name;
	this.size = 15;

	this.x = x * this.size;
	this.y = y * this.size;
	this.direction = 1;
	this.timepassed = 0;


	this.lifetime = 0;
	this.liferemaining = STARVE_LIMIT;
	this.tail = [];

	this.food = newFood();
	for(let i = 0; i < 4; i++){
	    this.tail.push(new Tail(this.size));
	}


	this.brain = new NeuralNetwork({
	    inputs: 28,
	    // hidden: [20,20],
	    hidden: [20],
	    outputs: 4,
	    normalizeInput: false
	});

	this.fitness = 0;
    }


    getTailDirection(){
	let t = this.tail[0];
	let xdis = t.x - this.x;
	let ydis = t.y - this.y;
	if (xdis > 0) {
	    return 3;
	}
	if (xdis < 0) {
	    return 1;
	}
	if (ydis > 0) {
	    return 0;
	}
	return 2;
    }

    turn(dir){
	if (this.direction + dir % 2 == 0) {
	    return;
	}
	this.direction = dir;
    }

    calculateDistances(){
	let arr = [];
	let a = this.lookAt(this.size,0); //look right
	arr[0] = a[0];
	arr[1] = a[1];
	arr[2] = a[2];

	a = this.lookAt(-this.size,0); //look left
	arr[3] = a[0];
	arr[4] = a[1];
	arr[5] = a[2];


	a = this.lookAt(0,-this.size); //look up
	arr[6] = a[0];
	arr[7] = a[1];
	arr[8] = a[2];

	a = this.lookAt(0,this.size); //look down
	arr[9] = a[0];
	arr[10] = a[1];
	arr[11] = a[2];


	a = this.lookAt(this.size,this.size); //look down
	arr[12] = a[0];
	arr[13] = a[1];
	arr[14] = a[2];


	a = this.lookAt(this.size,-this.size); //look down
	arr[15] = a[0];
	arr[16] = a[1];
	arr[17] = a[2];


	a = this.lookAt(-this.size,-this.size); //look down
	arr[18] = a[0];
	arr[19] = a[1];
	arr[20] = a[2];


	a = this.lookAt(-this.size,this.size); //look down
	arr[21] = a[0];
	arr[22] = a[1];
	arr[23] = a[2];

	arr[24] = this.direction == 0?1:0;
	arr[25] = this.direction == 1?1:0;
	arr[26] = this.direction == 2?1:0;
	arr[27] = this.direction == 3?1:0;
	return arr;
    }

    turnAI(dir){
	this.direction = 4 + this.direction;
	this.direction += dir; 
	this.direction %= 4;
    }
   
    update(dt){
	this.timepassed += dt;
	if (this.timepassed < delay) {
	    return;
	}
	this.timepassed = 0;

	// this.fitness++;
	this.lifetime++;
	this.liferemaining--;

	let r = this.brain.compute(this.calculateDistances());
	if (( r.max + this.direction ) % 2 != 0) {
	    this.direction = r.max;
	}
	// info.innerHTML += 'direction: ' + r.max;
	if (this.liferemaining == 0) {
	    this.die();
	}

	if (this.x == this.food.x && this.y == this.food.y) {
	    this.eat();
	}



	for (let i = this.tail.length - 1; i >= 1; i--) {
	    let thisTail = this.tail[i];
	    let prev = this.tail[i - 1];

	    if (this.x == thisTail.x && this.y == thisTail.y) {
		this.die();
		return;
	    }
	    thisTail.x = prev.x;
	    thisTail.y = prev.y;
	}

	this.tail[0].x = this.x;
	this.tail[0].y = this.y;
	switch (this.direction) {
	case 0:
	    this.y -= this.size;
	    break;
	case 1:
	    this.x += this.size;
	    break;
	case 2:
	    this.y += this.size;
	    break;
	case 3:
	    this.x -= this.size;
	    break;
	}

	if (this.x < 0 || this.y < 0 || this.x >= ctx.width || this.y >= ctx.height) {
	    this.die();
	}
	this.calculateFitness();
    }

    die(){
	this.direction = 4;
    }

    draw(){
	//TODO add effect?
	if (this.direction != 4) {
	    for (let t of this.tail) {
		t.draw();
	    }
	    this.food.draw();

	    let c = this.name * 2.5;
	    ctx.fillStyle = `rgb(${this.name + 30},${c},${255 - this.name * 2.5})`;
	    ctx.fillRect(this.x,this.y, this.size, this.size);
	}
    }


    eat(){
	this.fitness += 300;
	this.liferemaining += STARVE_LIMIT;
	this.tail.push(new Tail(this.size));

	this.food = newFood();
    }


    isOnTail(x,y){
	for (let t of this.tail) {
	    if (t.x == x && t.y == y) {
		return true;
	    }
	}
	return false;
    }


    lookAt(x,y){
	let pos = {x: this.x, y: this.y};
	let foundFood = false, foundTail = false;
	let ret = [0,0,0];
	let dis = 0;

	while(pos.x <= ctx.width && pos.x >= 0 && pos.y <= ctx.height && pos.y >= 0){
	    dis++;
	    if(!foundFood && this.food.x == pos.x && this.food.y == pos.y){
		foundFood = true;
		ret[0] = 1;
	    }

	    if(!foundTail && this.isOnTail(pos.x,pos.y)){
		foundTail = true;
		ret[1] = 1;
	    }

	    pos.x += x; pos.y += y;
	}
	ret[2] = 1/dis;
	return ret;
    }
    

    calculateFitness(){
	if (this.tail.length < 10) {
	    this.fitness = Math.pow(this.lifetime,2) * Math.pow( this.tail.length - 3,2 )/ 1000;
	}
	else {
	    this.fitness = Math.pow(this.lifetime,2) * Math.pow(this.tail.length,2) / 100;
	}
    }
}
