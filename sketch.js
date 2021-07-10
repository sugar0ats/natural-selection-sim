/*
below are all of our constants:
*/

const GENE_LENGTH = 100;
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;
const GOAL_DIM = 30;
const POP_SIZE = 50;
const MUTATION_RATE = 0.02;
const BACKGROUND_COLOR = [112, 136, 255];

const GOAL_X = CANVAS_WIDTH / 2 - (GOAL_DIM/2);
const GOAL_Y = 10;

let generation = 1;

let currPop = []; // array that will house all of the current living dots
let matingPool = [] // the individuals that will reproduce to create the next generation
let time = 0; // time, dictating which gene will be used to alter the dot's position
let wait = 0;

let bestTime = 100;

let example_genes; // temporary

function setup() {
  //CANVAS_HEIGHT = windowHeight;

  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT); // create canvas
  background(...BACKGROUND_COLOR);

  example_genes = createGenes(); // temporary

  for (let i = 0; i<POP_SIZE; i++) { // repeat until you have the entire population size
    currPop.push(new Individual(CANVAS_WIDTH/2, windowHeight-70)); // create a new Individual object
  }

}

function draw() {


  background(...BACKGROUND_COLOR); // refresh background each frame
  fill(255,255,255);
  textSize(20);
  noStroke();
  rect(GOAL_X, GOAL_Y, GOAL_DIM, GOAL_DIM); // create goal
  text('Generation: ' + generation, 10, windowHeight-70);
  text('Best time: ' + bestTime, 10, windowHeight-100);
  text(time, CANVAS_WIDTH-50, 50);

  for (let i = 0; i < POP_SIZE && time < GENE_LENGTH; i++) { // go through each dot as long as we are under the gene-length
    currPop[i].setX(currPop[i].getGenes()[time].x * 6); // change the x and y by an amount dictated by the selected gene at the given time
    currPop[i].setY(currPop[i].getGenes()[time].y * 6);
    currPop[i].draw(); // draw the dot at its new position

    if (currPop[i].calculateDistance() <= 50) { // if the dots actually reach the goal
      if (time < bestTime) { // if the time is better than the best time so far...
        bestTime = time; // set the time to the bestTime
      }
      time = GENE_LENGTH; // cut the generation's time short by setting time to GENE_LENGTH
    }
  }

  if (wait == 3) { // only change the gene every 3 frames instead of every frame
    wait = 0;
    time ++;
  } else {
    wait ++;
  }
  //time++;

  if (time >= GENE_LENGTH) {
    for (let x in currPop) {
      currPop[x].calculateFitness(); // at the end of the generation's time, calculate each individual's fitness
    }

    naturalSelection();

    reproduce(); // create the next generation, replace them in the currPop array

    generation++; // next generation, increment var by 1
    time = 0;
    //console.log(currPop.length);
  }

}

function createGenes() {
  let s = [];
  for (let gene = 0; gene < GENE_LENGTH; gene++ ) { // populate the array with GENE_LENGTH # of random vectors
    s.push(p5.Vector.random2D()); // each gene is a random vector describing magnitude and direction
  }
  return s;
}

function naturalSelection() {
  matingPool = []; // array consisting of individuals that will reproduce, reset it when the generation's time is up
  for (let x in currPop) { // for each individual in the current population...
    let num = floor(currPop[x].getFitness() * 100) // their fitness corresponds with the # of times they are added to the mating pool
    for (let i = 0; i<num; i++) {
      matingPool.push(currPop[x]);
    }
  }
}

function reproduce() {
  currPop = []; // reset the current population

  for (let i = 0; i<POP_SIZE; i++) {
    let mom = matingPool[floor(random(matingPool.length))]; // select the mom randomly from the mating pool
    let dad = matingPool[floor(random(matingPool.length))]; // select the dad the same way

    let child_genes = mom.crossover(dad); // create the child's genes using a parent's crossover method

    let new_child = new Individual(CANVAS_WIDTH/2, windowHeight-70); // create a new Individual object called 'new_child'
    new_child.setGenes(child_genes); // set the genes created by crossover() to the new child's genes
    new_child.mutate(MUTATION_RATE); // mutate the genes using the mutation rate

    currPop.push(new_child); // add the child to the current population
  }

}
