const audioPlayer = document.getElementById('audioPlayer');
const titulo = document.getElementById('titulo');
const descricao = document.getElementById('descricao');
const capa = document.getElementById('capa');

fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fanchor.fm%2Fs%2F49f0c604%2Fpodcast%2Frss&api_key=h2getljthkrm9zimjvzaxhhc0rxcvwbc0h9cylvb&order_by=pubDate&order_dir=desc&count=1000') 
  .then(response => response.json())
  .then(data => {
    const episodios = data.items;    
    let episodioAtual = 0;
    console.log(episodios.length);

    // Função para carregar e reproduzir episódio
    function carregarEpisodio() {
      const episodio = episodios[episodioAtual];
      titulo.textContent = episodio.title;
      descricao.innerHTML = episodio.description;
      capa.src = episodio.thumbnail;
      audioPlayer.src = episodio.enclosure.link;
      audioPlayer.play();
    }

    function obterEpisodioAleatorio() {
      console.log(episodios.length);
      return Math.floor(Math.random() * episodios.length); 
    } 

    // Carrega o primeiro episódio ao carregar a página
    carregarEpisodio();

    // Controles de reprodução (próximo/anterior)
    audioPlayer.addEventListener('ended', () => {
      episodioAtual = obterEpisodioAleatorio();
      carregarEpisodio();
    });
  })
  .catch(error => console.error('Erro ao carregar o feed RSS:', error));