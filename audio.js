function carregarConfigAudio() {
    try {
        return JSON.parse(localStorage.getItem('shuckle_config')) || {};
    } catch {
        return {};
    }
}

function somEstaAtivo() {
    const cfg = carregarConfigAudio();
    return cfg.somAtivo ?? true;
}

function volumeMusica() {
    const cfg = carregarConfigAudio();
    return (cfg.volMusica ?? 80) / 100;
}

function volumeEfeitos() {
    const cfg = carregarConfigAudio();
    return (cfg.volEfeitos ?? 80) / 100;
}

function tocarMusica(audio) {
    if (!somEstaAtivo()) return;

    audio.volume = volumeMusica();
    audio.play().catch(() => {});
}

function tocarEfeito(audio) {
    if (!somEstaAtivo()) return;

    audio.volume = volumeEfeitos();
    audio.currentTime = 0;
    audio.play().catch(() => {});
}