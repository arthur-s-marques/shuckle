/* =====================================================
   global.js — SHUCKLE
   Inclua este arquivo em TODAS as páginas do jogo:
   <script src="../js/global.js"></script>

   Ele lê as configurações salvas e as aplica
   automaticamente assim que a página carrega.
   ===================================================== */

(function () {
    /* Carrega as configurações do localStorage */
    let cfg = {};
    try { cfg = JSON.parse(localStorage.getItem('shuckle_config')) || {}; } catch {}

    const mudo       = cfg.mudo       ?? false;
    const volMusica  = (cfg.volMusica  ?? 80) / 100;   // 0–1
    const volEfeitos = (cfg.volEfeitos ?? 80) / 100;   // 0–1
    const nome       = cfg.nome        ?? '';

    /* ── Aplica volume assim que o DOM estiver pronto ── */
    function aplicarVolume() {
        document.querySelectorAll('audio').forEach(audio => {
            /* Identifica o tipo pelo atributo data-tipo="musica" ou data-tipo="efeito"
               Se não tiver o atributo, aplica volume de efeitos por padrão */
            if (mudo) {
                audio.volume = 0;
                audio.muted  = true;
            } else {
                audio.muted = false;
                if (audio.dataset.tipo === 'musica') {
                    audio.volume = volMusica;
                } else {
                    audio.volume = volEfeitos;
                }
            }
        });
    }

    /* Roda imediatamente e também quando novos elementos chegarem */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', aplicarVolume);
    } else {
        aplicarVolume();
    }

    /* Observa novos elementos <audio> adicionados dinamicamente */
    const observer = new MutationObserver(mutations => {
        mutations.forEach(m => m.addedNodes.forEach(node => {
            if (node.tagName === 'AUDIO') aplicarVolume();
            if (node.querySelectorAll) node.querySelectorAll('audio').forEach(() => aplicarVolume());
        }));
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });

    /* ── Expõe utilitários globais ── */

    /**
     * Toca um efeito sonoro pelo caminho do arquivo.
     * Já respeita o volume e o mudo automaticamente.
     * Uso: Shuckle.tocarEfeito('../sons/acerto.mp3')
     */
    window.Shuckle = window.Shuckle || {};

    window.Shuckle.tocarEfeito = function (src) {
        if (mudo) return;
        const audio = new Audio(src);
        audio.volume = volEfeitos;
        audio.play().catch(() => {});   // ignora erro de autoplay
    };

    window.Shuckle.tocarMusica = function (src, loop = true) {
        if (mudo) return null;
        const audio = new Audio(src);
        audio.volume = volMusica;
        audio.loop   = loop;
        audio.play().catch(() => {});
        return audio;
    };

    /** Nome do jogador salvo nas configurações */
    window.Shuckle.nome = nome;

    /** Volumes individuais (0–1) */
    window.Shuckle.volMusica  = volMusica;
    window.Shuckle.volEfeitos = volEfeitos;
    window.Shuckle.mudo       = mudo;

})();
