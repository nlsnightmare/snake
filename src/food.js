import ctx  from './context';
export default class Food {
    constructor(x,y) {
	this.size = 30;

	this.x = x * this.size;
	this.y = y * this.size;
    }


    draw(){
	ctx.fillStyle = 'red';
	ctx.fillRect(this.x,this.y, this.size, this.size);
    }
}
