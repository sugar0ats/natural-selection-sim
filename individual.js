class Individual {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.genes = this.createGenes();
    this.radius = 10;

    this.fitness;
    this.distance;

  }

  createGenes() {
    let s = [];
    for (let gene = 0; gene < GENE_LENGTH; gene++ ) {
      s.push(p5.Vector.random2D()); // each gene is a random vector describing magnitude and direction
    } // magnitude: a scalar value, one that is numerical (distance between 2 points)
    // direction: the way in which the "arrow" is pointing

    return s;
  }

  draw() {
    fill(255, 255, 255);
    ellipse(this.x, this.y, this.radius);
  }

  calculateFitness() {
    this.distance = dist(this.x, this.y, GOAL_X, GOAL_Y);
    let normalized = this.distance / CANVAS_HEIGHT;
    this.fitness = 1 - normalized;
  }

  calculateDistance() {
    this.distance = dist(this.x, this.y, GOAL_X, GOAL_Y);
    return this.distance;
  }

  crossover(partner) { // pass in the partner
    let new_genes = []; // create a new array for the new genes
    for (let i = 0; i<GENE_LENGTH; i++) { // loop through the individual's genes
      if (i % 2 == 0) { // alternate between the mom and dad's genes when performing the crossover 
        new_genes.push(this.genes[i]);
      } else {
        new_genes.push(partner.getGenes()[i]);
      }
    }

    return new_genes;
  }

  mutate(mutationRate) {
    for (let i = 0; i<GENE_LENGTH; i++) {
      if (random(1) < mutationRate) { // randomly generate a number between 0-1 and see if its less than the mutation rate
        this.genes[i] = p5.Vector.random2D(); // if there is a mutation occurring there, generate a completely new Vector there
      }
    }

  }

  getFitness() {
    return this.fitness;
  }

  // getDistance() {
  //   return this.distance;
  // }

  setX(change) {
    this.x = this.x + change;
  }

  setY(change) {
    this.y = this.y + change;
  }

  getGenes() {
    return this.genes;
  }

  setGenes(genes) {
    this.genes = genes;
  }


}
