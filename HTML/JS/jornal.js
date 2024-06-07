document.addEventListener('DOMContentLoaded', function() {
    const paginas = document.querySelectorAll('.page');
    const containerJornal = document.getElementById('jornal-container');
    let paginaAtual = 0;
    let estaAnimando = false;

    function mudarPagina(delta) {
        if (estaAnimando) return;

        const novaPagina = paginaAtual + delta;

        if (novaPagina < 0 || novaPagina >= paginas.length) return;

        estaAnimando = true;

        const ehPrimeiraPagina = novaPagina === 0;
        const ehUltimaPagina = novaPagina === paginas.length - 1;

        if (delta > 0) {
            paginas[paginaAtual].classList.add('fade-out');
            paginas[novaPagina].classList.add('fade-in');
        } else {
            paginas[paginaAtual].classList.add('fade-out');
            paginas[novaPagina].classList.add('fade-in');
        }

        setTimeout(() => {
            paginas[paginaAtual].classList.remove('active', 'fade-out');
            paginas[novaPagina].classList.add('active');
            paginas[novaPagina].classList.remove('fade-in');
            paginaAtual = novaPagina;

            if (ehPrimeiraPagina || ehUltimaPagina) {
                document.body.classList.remove('no-scroll');
            } else {
                document.body.classList.add('no-scroll');
            }

            estaAnimando = false;
        }, 500); 
    }

    document.getElementById('prev-btn').addEventListener('click', () => mudarPagina(-1));
    document.getElementById('next-btn').addEventListener('click', () => mudarPagina(1));

    paginas[0].classList.add('active');
});
