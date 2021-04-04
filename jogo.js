console.log('[Daniel] Flappy Bird')

var melhorPontuacao = 0;
let frames = 0;
const somDe_HIT = new Audio();
somDe_HIT.src = './efeitos/efeitos_hit.wav';

const somDe_PULO = new Audio();
somDe_PULO.src = './efeitos/efeitos_pulo.wav'

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

function criaChao() {
  const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,
    atualiza() {
      const movimentoDoChao = 1;
      const repeteEm = chao.largura / 2;
      const movimento = chao.x - movimentoDoChao;
      chao.x = movimento % repeteEm;
    },
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
  return chao
}

function fazColisao(flappyBird, chao) {
  const flappyBirdY = globais.flappyBird.y + globais.flappyBird.altura;
  const chaoY = chao.y;

  if (flappyBirdY >= chaoY) {
    return true
  } else {
    return false
  }
}

function criaFlappyBird() {
  const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura:  24,
    x: 10,
    y: 50,
    gravidade: 0.25,
    velocidade: 0,
    pulo: 4.6,
    pula() {
      somDe_PULO.play();
      flappyBird.y -= 20
      flappyBird.velocidade = - flappyBird.pulo
    },
    movimentos: [
      { spriteX: 0, spriteY: 0 }, // asa pra cima
      { spriteX: 0, spriteY: 26 }, // asa no meio
      { spriteX: 0, spriteY: 52 }, // asa pra baixo
      { spriteX: 0, spriteY: 26 }, // asa no meio
    ],
    frameAtual: 0,
    atualizaOFrameAtual() {
      const intervaloDeFrames = 10;
      const passouOIntervalo = frames % intervaloDeFrames === 0;

      if (passouOIntervalo) {
        const baseDoIncremento = 1;
        const incremento = baseDoIncremento + flappyBird.frameAtual;
        const baseRepeticao = flappyBird.movimentos.length;
        flappyBird.frameAtual = incremento % baseRepeticao
      }
    },
    desenha() {
      flappyBird.atualizaOFrameAtual();
      const { spriteX, spriteY } = flappyBird.movimentos[flappyBird.frameAtual];

      contexto.drawImage(
        sprites,
        spriteX, spriteY,
        flappyBird.largura, flappyBird.altura,
        flappyBird.x, flappyBird.y,
        flappyBird.largura, flappyBird.altura,
      );
    },
    atualiza() {
      if (fazColisao(flappyBird, globais.chao)) {
        somDe_HIT.play();

        mudaParaTela(telas.game_over);
        return
      }
  
      flappyBird.velocidade += flappyBird.gravidade
      flappyBird.y += flappyBird.velocidade
    }
  }
  return flappyBird
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

const mensagemGameOver = {
  spriteX: 134,
  spriteY: 153,
  largura: 226,
  altura:  200,
  x: (canvas.width / 2) - 226 / 2,
  y: 50,
  desenha() {
    contexto.drawImage(
      sprites,
      mensagemGameOver.spriteX, mensagemGameOver.spriteY,
      mensagemGameOver.largura, mensagemGameOver.altura,
      mensagemGameOver.x, mensagemGameOver.y,
      mensagemGameOver.largura, mensagemGameOver.altura,
    );
  },
}

function criaCanos() {
  const canos = {
    largura: 52,
    altura: 400,
    chao: {
      spriteX: 0,
      spriteY: 169
    },
    ceu: {
      spriteX: 52,
      spriteY: 169
    },
    espaço: 80,
    desenha() {
      canos.pares.forEach(function(par) {
        const yRandom = par.y
        const espacamentoEntreCanos = 90;
  
        const canoCeuX = par.x;
        const canoCeuY = yRandom;
  
        contexto.drawImage(
          sprites,
          canos.ceu.spriteX, canos.ceu.spriteY,
          canos.largura, canos.altura,
          canoCeuX, canoCeuY,
          canos.largura, canos.altura
        )

        const canoChaoX = par.x;
        const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom;

        contexto.drawImage(
          sprites,
          canos.chao.spriteX, canos.chao.spriteY,
          canos.largura, canos.altura,
          canoChaoX, canoChaoY,
          canos.largura, canos.altura
        )

        par.canoCeu = {
          x: canoCeuX,
          y: canos.altura + canoCeuY
        }
        par.canoChao = {
          x: canoChaoX,
          y: canoChaoY
        }
      })
    },
    temcolisaoComOFlappyBird(par) {
      const cabecaDoFlappy = globais.flappyBird.y;
      const peDoFlappy = globais.flappyBird.y + globais.flappyBird.altura;
      if (globais.flappyBird.x + globais.flappyBird.largura >= par.x) {
        if (cabecaDoFlappy <= par.canoCeu.y) {
          return true
        }

        if (peDoFlappy >= par.canoChao.y) {
          return true
        }
      }
      return false
    },
    pares: [],
    atualiza() {
      const passou100Frames = frames % 100 === 0;
      if (passou100Frames) {
        canos.pares.push({
          x: canvas.width,
          y: -150 * (Math.random() + 1)
        });
      }



      canos.pares.forEach(function(par) {
        par.x -= 2;

        if (canos.temcolisaoComOFlappyBird(par)) {
          somDe_HIT.play();
          mudaParaTela(telas.game_over);
        }

        if (par.x + canos.largura <= 0) {
          canos.pares.shift();
        }
      })
    }
  }
  return canos
}

function criaPlacar(x, y) {
  const placar = {
    pontuacao: 0,
    desenha(x, y) {
      contexto.font = '35px "VT323';
      contexto.textAlign = 'right'
      contexto.fillStyle = 'black'
      contexto.fillText(`${placar.pontuacao}`, x, y);
    },
    desenhaBest(a) {
      contexto.font = '35px "VT323';
      contexto.textAlign = 'right'
      contexto.fillStyle = 'black'
      contexto.fillText(`${a}`, canvas.width - 73, 190);
    },
    atualiza() {
      const intervaloDeFrames = 20;
      const passouOIntervalo = frames % intervaloDeFrames === 0;
      if (passouOIntervalo) {
        placar.pontuacao++
      }
    }
  }
  return placar
}

function criaMedalha() {
  const medalhaNormal = {
    spriteX: 0,
    spriteY: 78,
    largura: 44,
    altura:  44,
    x: 73,
    y: 138,
    desenha() {
      contexto.drawImage(
        sprites,
        medalhaNormal.spriteX, medalhaNormal.spriteY,
        medalhaNormal.largura, medalhaNormal.altura,
        medalhaNormal.x, medalhaNormal.y,
        medalhaNormal.largura, medalhaNormal.altura,
      );
    }
  }

  const medalhaBronze = {
    spriteX: 48,
    spriteY: 124,
    largura: 44,
    altura:  44,
    x: 73,
    y: 138,
    desenha() {
      contexto.drawImage(
        sprites,
        medalhaBronze.spriteX, medalhaBronze.spriteY,
        medalhaBronze.largura, medalhaBronze.altura,
        medalhaBronze.x, medalhaBronze.y,
        medalhaBronze.largura, medalhaBronze.altura,
      );
    }
  }

  const medalhaPrata = {
    spriteX: 48,
    spriteY: 78,
    largura: 44,
    altura:  44,
    x: 73,
    y: 138,
    desenha() {
      contexto.drawImage(
        sprites,
        medalhaPrata.spriteX, medalhaPrata.spriteY,
        medalhaPrata.largura, medalhaPrata.altura,
        medalhaPrata.x, medalhaPrata.y,
        medalhaPrata.largura, medalhaPrata.altura,
      );
    }
  }

  const medalhaOuro = {
    spriteX: 0,
    spriteY: 124,
    largura: 44,
    altura:  44,
    x: 73,
    y: 138,
    desenha() {
      contexto.drawImage(
        sprites,
        medalhaOuro.spriteX, medalhaOuro.spriteY,
        medalhaOuro.largura, medalhaOuro.altura,
        medalhaOuro.x, medalhaOuro.y,
        medalhaOuro.largura, medalhaOuro.altura,
      );
    }
  }

  if (globais.placar.pontuacao >= 90) {
    return medalhaOuro;
  } else if (70 <= globais.placar.pontuacao) {
    return medalhaPrata;
  } else if (50 <= globais.placar.pontuacao) {
    return medalhaBronze;
  } else {
    return medalhaNormal;
  }
}

const globais = {};
let telaAtiva = {};
function mudaParaTela(novaTela) {
  telaAtiva = novaTela
  if (telaAtiva.inicializa) {
    telaAtiva.inicializa();
  }
}

const telas = {
  inicio: {
    inicializa() {
      globais.flappyBird = criaFlappyBird();
      globais.chao = criaChao();
      globais.canos = criaCanos();
    },
    desenha() {
      fundo.desenha();
      globais.chao.desenha();
      globais.flappyBird.desenha();
      mensagemGetReady.desenha();
    },
    click() {
      mudaParaTela(telas.jogo);
    },
    atualiza() {
      globais.chao.atualiza();
    }
  }
}

telas.jogo = {
  inicializa() {
    globais.placar = criaPlacar();
  },
  desenha() {
    fundo.desenha();
    globais.canos.desenha();
    globais.flappyBird.desenha();
    globais.chao.desenha();
    globais.placar.desenha(canvas.width - 35, 35);
  },
  click() {
    globais.flappyBird.pula();
  },
  atualiza() {
    globais.chao.atualiza();
    globais.flappyBird.atualiza();
    globais.canos.atualiza();
    globais.placar.atualiza();
  }
}

telas.game_over = {
  desenha() {
    if (globais.placar.pontuacao > melhorPontuacao) {
      melhorPontuacao = globais.placar.pontuacao;
    }

    globais.medalha = criaMedalha();
    mensagemGameOver.desenha();
    globais.placar.desenha(canvas.width - 73, 148);
    globais.placar.desenhaBest(melhorPontuacao);

    if (globais.placar.pontuacao < 30) {
      return
    }
    globais.medalha.desenha();
  },
  atualiza() {
    
  },
  click() {
    mudaParaTela(telas.inicio);
  }
}

function loop() {
  telaAtiva.desenha();
  telaAtiva.atualiza();
  
  frames++
  requestAnimationFrame(loop);
}

window.addEventListener('click', function() {
  if (telaAtiva.click) {
    telaAtiva.click();
  }
});

mudaParaTela(telas.inicio);
loop();
