// --------------------------------------------- Código do Pong --------------------------------------------- //

// Variáveis da Bolinha
// Define a posição X e Y da bolinha e seu tamanho
let xBolinha = 100;
let yBolinha = 200;
let diametro = 25;
let raio = diametro / 2;

// Velocidade da Bolinha
let velocidadeX = 4;
let velocidadeY = 4;

// Variáveis da minha Raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteWidth = 10;
let raqueteHeight = 90;

let colidiu = false;

// Variáveis da Raquete do Oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let chanceDeErrar = 0;

// Placar do Jogo
let meusPontos = 0;
let pontosDoOponente = 0;

// Sons do jogo
let raquetada;
let ponto;
let trilha;

function preload() {
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  
  desenhaBolinha();
  movimentaBolinha();
  verificaColisao();
  
  desenhaRaquete(xRaquete, yRaquete);
  movimentaRaquete();
  colisaoRaqueteBiblioteca(xRaquete, yRaquete);
  colisaoRaqueteBiblioteca(xRaqueteOponente, yRaqueteOponente);
  
  desenhaRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  
  incluiPlacar();
  marcaPonto();
}

//****** Funções iniciais para o inicio do jogo *******//
function desenhaBolinha() {
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
  xBolinha += velocidadeX;
  yBolinha += velocidadeY;
}

// Verifica se a bolinha bateu na borda, caso bata, ela volta
function verificaColisao() {
  if(xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeX *= -1;
  }
  
  if(yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeY *= -1;
  }
}
// **************************************************** //

// Funções para minha Raquete
function desenhaRaquete(x, y) {
  rect(x, y, raqueteWidth, raqueteHeight);
}

function movimentaRaquete() {
  if(keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }
  
  if(keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }
}

function colisaoRaqueteBiblioteca(x, y) {
  colidiu = collideRectCircle(x, y, raqueteWidth, raqueteHeight, xBolinha, yBolinha, raio);
  
  if(colidiu) {
    velocidadeX *= -1;
    raquetada.play();
  }
}
// ************************************************* //

// Funções da Raquete do Oponente
function movimentaRaqueteOponente() {
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteHeight / 2;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar;
  calculaChanceDeErrar()
}

  function calculaChanceDeErrar() {
    if (pontosDoOponente >= meusPontos) {
      chanceDeErrar += 1
      if (chanceDeErrar >= 39){
      chanceDeErrar = 40
      }
    } else {
      chanceDeErrar -= 1
      if (chanceDeErrar <= 35){
      chanceDeErrar = 35
      }
    }
  }

function incluiPlacar() {
  textAlign(CENTER);
  textSize(16);
  fill(255);
  text(meusPontos, 270, 26);
  text(pontosDoOponente, 321, 26);
}

function marcaPonto() {
  if(xBolinha > 586) {
    meusPontos += 1;
    ponto.play();
  }
  
  if(xBolinha < 14) {
    pontosDoOponente += 1;
    ponto.play();
  }
}