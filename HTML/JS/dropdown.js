document.addEventListener("DOMContentLoaded", function() {
    var menuBtn = document.getElementById("menu-btn");
    var menuList = document.getElementById("menu-list");

    menuBtn.addEventListener("click", function() {
        menuList.classList.toggle("active");
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const btnDoeAgora = document.querySelector('.btn-cta');
    btnDoeAgora.addEventListener('click', function(event) {
        event.preventDefault();
        const secaoDoacao = document.getElementById('doacao');
        secaoDoacao.scrollIntoView({ behavior: 'smooth' });
    });
});
