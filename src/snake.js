import Tail from './tail';


import ctx from './context';

let delay = 80;
export default class Snake {
    constructor(x,y) {
	this.size = 30;

	this.x = x * this.size;
	this.y = y * this.size;
	this.len = 3;


	this.direction = 1;

	this.timepassed = 0;

	this.tail = [];

	for(let i = 0; i < 3; i++){
	    this.tail.push(new Tail(this.size));
	}
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

    update(dt){
	this.timepassed += dt;
	if (this.timepassed < delay) {
	    return;
	}
	this.timepassed = 0;

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


	if (this.x < 0 || this.y < 0 || this.x > ctx.width || this.y > ctx.height) {

	    console.log(this.x, this.y);
	    this.die();
	}

    }

    die(){
	this.direction = 4;
	console.log('im dead');
    }

    draw(){
	//TODO add effect?
	if (this.direction != 4) {
	    for (let t of this.tail) {
		t.draw();
	    }

	    ctx.fillStyle = 'white';
	    ctx.fillRect(this.x,this.y, this.size, this.size);

	}
    }


    newTail(){
	this.tail.push(new Tail(this.size));
    }
    
}
