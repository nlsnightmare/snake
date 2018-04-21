import ctx from './context';

export default class Tail {
    constructor(size){
	this.size = size;
    }
    draw(){
	ctx.fillStyle = 'darkgrey';
	ctx.fillRect(this.x,this.y, this.size, this.size);
    }
}
