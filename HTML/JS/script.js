window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const scrollPosition = window.scrollY;
    const maxScroll = 200; 
    const opacidadeMinima = 0.5; 
    const opacidade = Math.max(opacidadeMinima, 3 - (scrollPosition / maxScroll));
    header.style.background = `rgba(0, 5, 71, ${opacidade})`;
    header.querySelector('.header-container').style.opacity = opacidade;
});

window.addEventListener('scroll', function() {
    const metaBanner = document.getElementById('metaBanner');
    const scrollPosition = window.scrollY;
    const maxScroll = 200; 
    const opacidade = Math.max(0, 2 - (scrollPosition / maxScroll)); 
    metaBanner.style.opacity = opacidade;
});

let contadorPlasticos = 0;

document.addEventListener('DOMContentLoaded', () => {
    const botoesDoacao = document.querySelectorAll('.botao-doacao');
    const botaoDoar = document.querySelector('.botao-doar');
    const outroValor = document.getElementById('outro-valor');
    const contagemPlasticos = document.getElementById('contagem-plasticos');
    const tabelaLideres = document.getElementById('tabela-lideres');
    const popup = document.getElementById('popup');
    const closePopup = document.querySelector('.close');
    const confirmarDoacao = document.getElementById('confirmar-doacao');
    let valorSelecionado = 0;

    botoesDoacao.forEach(botao => {
        botao.addEventListener('click', function() {
            valorSelecionado = extrairValor(botao.textContent);
            selecionarBotao(botao);
        });
    });

    botaoDoar.addEventListener('click', function() {
        const valor = parseInt(outroValor.value);
        if (!isNaN(valor) && valor > 0) {
            valorSelecionado = valor;
        }
        if (valorSelecionado > 0) {
            popup.style.display = 'flex';
        }
    });

    closePopup.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == popup) {
            popup.style.display = 'none';
        }
    });

    confirmarDoacao.addEventListener('click', () => {
        const nickname = document.getElementById('nickname').value;
        const cpf = document.getElementById('cpf').value;
        const telefone = document.getElementById('telefone').value;

        if (nickname && cpf && telefone) {
            adicionarPlasticos(valorSelecionado);
            adicionarNaLeaderboard(nickname, valorSelecionado);

            valorSelecionado = 0;
            outroValor.value = '';
            limparSelecaoBotoes();
            popup.style.display = 'none';
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });

    function extrairValor(texto) {
        const valor = parseInt(texto.replace(/[^\d]/g, ''));
        return isNaN(valor) ? 0 : valor;
    }

    function selecionarBotao(botao) {
        botoesDoacao.forEach(btn => {
            btn.classList.remove('selecionado');
        });
        botao.classList.add('selecionado');
    }

    function limparSelecaoBotoes() {
        botoesDoacao.forEach(btn => {
            btn.classList.remove('selecionado');
        });
    }

    function adicionarPlasticos(quantidade) {
        const incremento = Math.ceil(quantidade / 100); 
        const contadorAtual = contadorPlasticos;
        const alvo = contadorAtual + quantidade;
    
        function animarContador() {
            contadorPlasticos += incremento;
            if (contadorPlasticos >= alvo) {
                contadorPlasticos = alvo; 
                clearInterval(intervalID); 
            }
            contagemPlasticos.textContent = `R$ ${contadorPlasticos.toLocaleString('pt-BR')}`;
        }
    
        const intervalID = setInterval(animarContador, 10);
    }

    function adicionarNaLeaderboard(nickname, quantidade) {
        const novoItem = document.createElement('li');
        const timestamp = Date.now();
        novoItem.dataset.timestamp = timestamp; 
        novoItem.innerHTML = `<span class="nome-lider">${nickname}:</span> <span class="quantidade-lider">R$ ${quantidade} </span>`;
        const itensLeaderboard = tabelaLideres.querySelectorAll('li');
        const leaderboardArray = [];
        itensLeaderboard.forEach(item => {
            const quantidadeItem = extrairValor(item.querySelector('.quantidade-lider').textContent);
            leaderboardArray.push({ quantidade: quantidadeItem, item });
        });
        leaderboardArray.push({ quantidade: quantidade, item: novoItem });
        leaderboardArray.sort((a, b) => b.quantidade - a.quantidade);
        tabelaLideres.innerHTML = '';
        leaderboardArray.forEach(obj => {
            tabelaLideres.appendChild(obj.item);
        });
    }
});

