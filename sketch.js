let player;

let items = [];

let score = 0;

let celebration = false;

function setup() {

  createCanvas(600, 400);

  player = new Player();

  textAlign(CENTER, CENTER);

}

function draw() {

  background(135, 206, 235); // Céu azul

  drawBackground();

  // Desenha o texto na parte superior da tela
  fill(0);  // Cor do texto (preto)
  text('Vamos coletar as frutas! Use as setas para se locomover.', width / 2, 20);

  

  player.show();

  player.move();

  if (frameCount % 60 === 0) {

    items.push(new Item());

  }

  for (let i = items.length - 1; i >= 0; i--) {

    items[i].update();

    items[i].show();

    if (items[i].hits(player)) {

      score++;

      items.splice(i, 1);

    } else if (items[i].offscreen()) {

      items.splice(i, 1);

    }

  }

  fill(0);

  textSize(20);

  text("Pontuação: " + score, width / 2, 40);

  if (score >= 20 && !celebration) {

    celebration = true;

    setTimeout(() => {

      alert("Festa da Conexão! Campo e cidade unidos!");

      score = 0;

      celebration = false;

    }, 100);

  }

}

function drawBackground() {

  // Campo

  fill(34, 139, 34);

  rect(0, height - 100, width / 2, 100);

  // Cidade

  fill(100);

  rect(width / 2, height - 100, width / 2, 100);

  fill(200);

  for (let i = width / 2 + 20; i < width; i += 40) {

    rect(i, height - 130, 20, 30);

  }

}

function keyPressed() {

  if (keyCode === LEFT_ARROW) {

    player.setDir(-1);

  } else if (keyCode === RIGHT_ARROW) {

    player.setDir(1);

  }

}

function keyReleased() {

  if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {

    player.setDir(0);

  }

}

class Player {

  constructor() {

    this.x = width / 2;

    this.dir = 0;

  }

  setDir(dir) {

    this.dir = dir;

  }

  move() {

    this.x += this.dir * 5;

    this.x = constrain(this.x, 0, width - 40);

  }

  show() {

    fill(255, 204, 0);

    rect(this.x, height - 60, 40, 40);

  }

}

class Item {

  constructor() {

    this.x = random(width);

    this.y = 0;

    this.r = 20;

    this.speed = 3;

    this.type = random() > 0.5 ? 'campo' : 'cidade';

  }

  update() {

    this.y += this.speed;

  }

  show() {

    if (this.type === 'campo') {

      fill(255, 0, 0); // fruta

      ellipse(this.x, this.y, this.r);

    } else {

      fill(0, 0, 255); // item tecnológico

      rect(this.x - 10, this.y - 10, 20, 20);

    }

  }

  hits(player) {

    return this.y + this.r / 2 > height - 60 &&

           this.x > player.x &&

           this.x < player.x + 40;

  }

  offscreen() {

    return this.y > height;

  }
}