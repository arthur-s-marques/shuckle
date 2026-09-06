document.addEventListener('click', (e) => {
    const card = e.target.closest('.game-card');

    if (!card) return;

    const url = card.dataset.url;

    if (url) {
        window.location.href = url;
    }
});

function irConfiguracoes() {
    window.location.href = '../assets/configuracoes.html';
}

const music = document.getElementById('bgMusic');

  function startMusic() {
    music.play()
      .then(() => {
        // Música tocando, remove os listeners para não chamar de novo
        document.removeEventListener('click', startMusic);
        document.removeEventListener('touchstart', startMusic);
        document.removeEventListener('keydown', startMusic);
      })
      .catch(err => {
        console.warn('Não foi possível tocar o áudio:', err);
      });
  }

  document.addEventListener('click', startMusic);
  document.addEventListener('touchstart', startMusic); // mobile
  document.addEventListener('keydown', startMusic);    // teclado