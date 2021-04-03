console.log('[Daniel] Flappy Bird')

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

const fundo = {
  spriteX: 390,
  spriteY: 0,
  largura: 275,
  altura: 204,
  x: 0,
  y: canvas.height - 204,
  desenha() {
    contexto.fillStyle = '#70c4ce'
    contexto.fillRect(0, 0, canvas.width, canvas.height)

    contexto.drawImage(
      sprites,
      fundo.spriteX, fundo.spriteY,
      fundo.largura, fundo.altura,
      fundo.x, fundo.y,
      fundo.largura, fundo.altura,
    );

    contexto.drawImage(
      sprites,
      fundo.spriteX, fundo.spriteY,
      fundo.largura, fundo.altura,
      (fundo.x + fundo.largura), fundo.y,
      fundo.largura, fundo.altura,
    );
  }
}

const chao = {
  spriteX: 0,
  spriteY: 610,
  largura: 224,
  altura: 112,
  x: 0,
  y: canvas.height - 112,
  desenha() {
    contexto.drawImage(
      sprites,
      chao.spriteX, chao.spriteY,
      chao.largura, chao.altura,
      chao.x, chao.y,
      chao.largura, chao.altura,
    );

    contexto.drawImage(
      sprites,
      chao.spriteX, chao.spriteY,
      chao.largura, chao.altura,
      (chao.x + chao.largura), chao.y,
      chao.largura, chao.altura,
    );
  }
}

const flappyBird = {
  spriteX: 0,
  spriteY: 0,
  largura: 33,
  altura:  24,
  x: 10,
  y: 50,
  gravidade: 0.25,
  velocidade: 0,
  desenha() {
    contexto.drawImage(
      sprites,
      flappyBird.spriteX, flappyBird.spriteY,
      flappyBird.largura, flappyBird.altura,
      flappyBird.x, flappyBird.y,
      flappyBird.largura, flappyBird.altura,
    );
  },
  atualiza() {
    flappyBird.velocidade += flappyBird.gravidade
    flappyBird.y += flappyBird.velocidade
  }
}

const mensagemGetReady = {
  spriteX: 134,
  spriteY: 0,
  largura: 174,
  altura:  152,
  x: (canvas.width / 2) - 174 / 2,
  y: 50,
  desenha() {
    contexto.drawImage(
      sprites,
      mensagemGetReady.spriteX, mensagemGetReady.spriteY,
      mensagemGetReady.largura, mensagemGetReady.altura,
      mensagemGetReady.x, mensagemGetReady.y,
      mensagemGetReady.largura, mensagemGetReady.altura,
    );
  },
}

let telaAtiva = {};
function mudaParaTela(novaTela) {
  telaAtiva = novaTela
}

const telas = {
  inicio: {
    desenha() {
      fundo.desenha();
      chao.desenha();
      flappyBird.desenha();
      mensagemGetReady.desenha();
    },
    click() {
      mudaParaTela(telas.jogo);
    },
    atualiza() {

    }
  }
}

telas.jogo = {
  desenha() {
    fundo.desenha();
    chao.desenha();
    flappyBird.desenha();
  },
  atualiza() {
    flappyBird.atualiza();
  }
}

function loop() {
  telaAtiva.desenha();
  telaAtiva.atualiza();
  
  requestAnimationFrame(loop);
}

window.addEventListener('click', function() {
  if (telaAtiva.click) {
    telaAtiva.click();
  }
})

mudaParaTela(telas.inicio);
loop();
