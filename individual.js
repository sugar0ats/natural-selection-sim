class Individual {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.genes = this.createGenes();
    this.radius = 10;

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

  setX(change) {
    this.x = this.x + change;
  }

  setY(change) {
    this.y = this.y + change;
  }

  getGenes() {
    return this.genes;
  }


}
