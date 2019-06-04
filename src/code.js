import Food from './food.js';
import ctx from './context.js';
import Snake from './snake.js';

function newFood() {
    let x = Math.floor( Math.random() * 19 );
    let y = Math.floor( Math.random() * 19 );
    return new Food(x,y);
}



let now,last;
let dt;


let s;
let f;

let range = [0,19];
window.onload = () => {
    s = new Snake(0,0);
    f = newFood();
    last = performance.now();

    requestAnimationFrame(Draw);
};

document.onkeydown = (e) => {
    if (s.direction == 4){
        if (e.key != 'Enter') return;
        s = new Snake(0,0);
        s.direction = 1;
    }
    if (( e.key == 'w' || e.key == 'ArrowUp' ) && s.direction != 2) 
        s.turn(0);
    else if((e.key == 'd' || e.key == 'ArrowRight') && s.direction != 3)
        s.turn(1);
    else if((e.key == 's' || e.key == 'ArrowDown') && s.direction != 0)
        s.turn(2);
    else if((e.key == 'a' || e.key == 'ArrowLeft') && s.direction != 1)
        s.turn(3);
};

function Draw() {
    now = performance.now();
    dt = now - last;
    last = now;

    ctx.clear('black');
    s.draw();
    f.draw();


    s.update(dt);
    if (s.x == f.x && s.y == f.y) {
        s.newTail();
        f = newFood();
    }

    requestAnimationFrame(Draw);
}

