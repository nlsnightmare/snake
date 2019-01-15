import ctx from './context';
import Snake from './snake';
import best_json from './best.json';
let speed = 1;


const sp = document.getElementById("speed");
const best = document.getElementById("best");
const loadBestButton = document.getElementById("load");

console.log(loadBestButton);
loadBestButton.onclick = loadBestSnake;
sp.oninput = (e) => {
    speed = e.target.value;
};


function newSnake(n) {
    let x = Math.floor(19);
    let y = Math.floor(19);
    return new Snake(x,y,n);
}



const NUM_SNAKES = 1000;
// const NUM_SNAKES = 20;
// const NUM_SNAKES = 1;
const MUT_RATE = 0.2;


const lbl = document.getElementById("lbl");

let now,last;
let dt;
let bestFitness;


let generation = 0;
let deadSnakes = [];
let snakes = [];

let range = [0,19];
window.onload = () => {
    for(let i = 0; i < NUM_SNAKES; i++){
	snakes.push(newSnake(i));
    }
    
    last = performance.now();

    requestAnimationFrame(Draw);
};


function Draw() {
    now = performance.now();
    dt = now - last;
    last = now;
    ctx.clear('black');

    for (let s of snakes) {
	s.draw();
    }
    lbl.innerHTML = `Generation: ${generation} alive: ${snakes.length}`;
    for(let n = 0; n < speed; n++){
	for(let i = snakes.length - 1; i >= 0; i--){
	    if (snakes[i].direction == 4) {
		deadSnakes.push( snakes.splice(i,1)[0] );
		continue;
	    }
	    snakes[i].update(dt);
	}

	if (snakes.length == 0) {
	    NewGeneration();
	}
    }
    requestAnimationFrame(Draw);
}

function NewGeneration() {
    bestFitness = -Infinity;
    let bestSnake;
    let avg = 0;
    for (let snake of deadSnakes) {
	avg += snake.fitness;
	if (snake.fitness > bestFitness) {
	    bestSnake = snake;
	    bestFitness = snake.fitness;
	}
    }
    avg /= deadSnakes.length;
    console.log(`${generation} generation's average: ${avg}`);
    console.log(`${generation} generation's best: ${bestFitness} length: ${bestSnake.tail.length}`);

    for(let i = 0; i < NUM_SNAKES - 1; i++){
	let p1 = AcceptReject();
	let p2 = AcceptReject();

	snakes[i] = newSnake(i);
	snakes[i].brain = p1.brain.crossover(p2.brain,0.02);
    }

    snakes.push(bestSnake);
    saveBestSnake(bestSnake);
    bestSnake.fitness = 0;
    deadSnakes = [];
    generation++;
}

function AcceptReject() {
    let safety = 0;
    while(true) {
	let r = Math.floor(Math.random() * deadSnakes.length);
	let prob = Math.floor(Math.random() * bestFitness);
	if (prob < deadSnakes[r].fitness) {
	    return deadSnakes[r];
	}
	safety++;
    }
    
    if (safety >= 1000) {
	throw new Error("AcceptReject couldn't find a snake!");
    }
}


function saveBestSnake(s) {
    if (typeof localStorage == 'undefined') {
	alert('local storage not supported');
	return;
    }
    let lastBest = localStorage.getItem('bestfitness');
    if (lastBest < s.fitness) {
	console.log('New Best!');
	localStorage.setItem('best',s.brain.getGenes());
	localStorage.setItem('bestfitness', s.fitness);
    }
}
function loadBestSnake() {
    console.log('a');
    snakes = [];
    deadSnakes = [];
    
    let snake = newSnake();
    let bestGenes;
    if(!localStorage.getItem('best'))
        bestGenes = best_json;
    else 
        bestGenes = JSON.parse( '[' + localStorage.getItem('best') + ']');

    console.log(bestGenes);
    snake.brain.setGenes(bestGenes);
    snakes.push(snake);
}



