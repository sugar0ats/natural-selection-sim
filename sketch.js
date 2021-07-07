/*
below are all of our constants:
*/

const GENE_LENGTH = 1000;
const CANVAS_WIDTH = 600;
const GOAL_DIM = 30;
const POP_SIZE = 20;

let generation = 1;

let currPop = []; // array that will house all of the current living dots
let time = 0; // time, dictating which gene will be used to alter the dot's position
let wait = 0;

let example_genes; // temporary

function setup() {
  createCanvas(CANVAS_WIDTH, windowHeight); // create canvas
  background(153);

  example_genes = createGenes(); // temporary

  for (let i = 0; i<POP_SIZE; i++) { // repeat until you have the entire population size
    currPop.push(new Individual(CANVAS_WIDTH/2, windowHeight-70)); // create a new Individual object
  }

}

function draw() {


  background(153); // refresh background each frame
  fill(255,255,255);
  noStroke();
  rect(CANVAS_WIDTH / 2 - (GOAL_DIM/2), 10, GOAL_DIM, GOAL_DIM); // create goal

  for (let i = 0; i < POP_SIZE && time < GENE_LENGTH; i++) { // go through each dot as long as we are under the gene-length
    currPop[i].setX(currPop[i].getGenes()[time].x * 4); // change the x and y by an amount dictated by the selected gene at the given time
    currPop[i].setY(currPop[i].getGenes()[time].y * 4);
    currPop[i].draw(); // draw the dot at its new position
  }

  if (wait == 2) { // only change the gene every 2 frames instead of every frame
    wait = 0;
    time ++;
  } else {
    wait ++;
  }

}

function createGenes() {
  let s = [];
  for (let gene = 0; gene < GENE_LENGTH; gene++ ) { // populate the array with GENE_LENGTH # of random vectors
    s.push(p5.Vector.random2D()); // each gene is a random vector describing magnitude and direction
  }
  return s;
}
