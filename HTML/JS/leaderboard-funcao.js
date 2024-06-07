document.addEventListener('DOMContentLoaded', () => {
    const tabelaLideres = document.getElementById('tabela-lideres');
    const botaoPesquisar = document.getElementById('botao-pesquisar');
    const inputPesquisa = document.getElementById('input-pesquisa');
    const popupPesquisa = document.getElementById('popup-pesquisa');
    const closePopupPesquisa = document.getElementById('close-popup-pesquisa');
    const botaoMaisRecentes = document.getElementById('botao-mais-recentes');
    const botaoMaisPlasticos = document.getElementById('botao-mais-plasticos');
    const botaoMaisReais = document.getElementById('botao-mais-reais');

    botaoPesquisar.addEventListener('click', () => {
        popupPesquisa.style.display = 'block';
    });

    closePopupPesquisa.addEventListener('click', () => {
        popupPesquisa.style.display = 'none';
    });

    const botaoConfirmarPesquisa = document.getElementById('confirmar-pesquisa');
    botaoConfirmarPesquisa.addEventListener('click', () => {
        const termoPesquisa = inputPesquisa.value.trim().toLowerCase();
        const itensLeaderboard = tabelaLideres.querySelectorAll('li');

        itensLeaderboard.forEach(item => {
            const nomeDoador = item.querySelector('.nome-lider').textContent.trim().toLowerCase();
            if (nomeDoador.includes(termoPesquisa)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });

        popupPesquisa.style.display = 'none';
        inputPesquisa.value = '';
    });

    botaoMaisRecentes.addEventListener('click', () => {
        const itensLeaderboard = tabelaLideres.querySelectorAll('li');
        ordenarLeaderboardPorTempo(itensLeaderboard);
    });

    botaoMaisPlasticos.addEventListener('click', () => {
        ordenarLeaderboardPorQuantidade(tabelaLideres.querySelectorAll('li'), '.quantidade-lider', true);
    });

    botaoMaisReais.addEventListener('click', () => {
        ordenarLeaderboardPorQuantidade(tabelaLideres.querySelectorAll('li'), '.quantidade-lider', false);
    });

    function ordenarLeaderboardPorTempo(itensLeaderboard) {
        const leaderboardArray = Array.from(itensLeaderboard);

        leaderboardArray.sort((a, b) => {
            const tempoA = parseInt(a.dataset.timestamp);
            const tempoB = parseInt(b.dataset.timestamp);
            return tempoB - tempoA;
        });

        tabelaLideres.innerHTML = '';
        leaderboardArray.forEach(item => {
            tabelaLideres.appendChild(item);
        });
    }

    function ordenarLeaderboardPorQuantidade(itensLeaderboard, selector, isPlasticos) {
        const leaderboardArray = Array.from(itensLeaderboard);

        leaderboardArray.sort((a, b) => {
            const quantidadeA = parseFloat(a.querySelector(selector).textContent.replace(/[^\d.]/g, ''));
            const quantidadeB = parseFloat(b.querySelector(selector).textContent.replace(/[^\d.]/g, ''));
            if (isPlasticos) {
                return quantidadeB - quantidadeA;
            } else {
                return quantidadeA - quantidadeB;
            }
        });

        tabelaLideres.innerHTML = '';
        leaderboardArray.forEach(item => {
            tabelaLideres.appendChild(item);
        });
    }
});
