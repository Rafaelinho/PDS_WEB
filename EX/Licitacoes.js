
document.addEventListener("DOMContentLoaded", function() {
    const MBway = document.getElementById("MBway");
    const lecitacao = document.getElementById("licitacao");
    const lecitacaoResult = document.getElementById("licitacaoResult");

    if (lecitacao) {
        lecitacao.onclick = function() {
            if (MBway.checked) {
                lecitacaoResult.textContent = 'Pago!';
            } else {
                lecitacaoResult.textContent = 'Não Pago!';
            }
        }
    }
});