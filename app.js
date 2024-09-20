<<<<<<< HEAD
if (
  localStorage.theme === "dark" ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.documentElement.classList.add("dark");

  localStorage.theme = "dark";
} else {
  document.documentElement.classList.remove("dark");

  localStorage.theme = "dark";
}

document
  .getElementById("dark-mode-toggle")
  .addEventListener("click", function () {
    if (localStorage.theme == "light") {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  });

document.getElementById("song-saved").addEventListener("click", function () {
  document.getElementById("song-saved").classList.toggle("saved");
});
console.time("Tempo de Execução");
fetch("https://rss-three-pied.vercel.app/api/rss2json")
  .then((response) => response.json())
  .then((data) => {
    const episodios = [];

    data.items.forEach((episodio) => {
      episodios.push({
        name: episodio.title,
        artist: "Radio 24hB <br> 24 horas de Estudos Bíblicos",
        album:
          "Igreja Evangelica Congregacional Vale da Benção em Candeias, Jaboatão, Pernambuco, Brasil",
        url: episodio.enclosure.link,
        cover_art_url: episodio.thumbnail,
      });
    });

    Amplitude.init({
      bindings: {
        37: "prev",
        39: "next",
        32: "play_pause",
      },
      callbacks: {
        timeupdate: function () {
          let percentage = Amplitude.getSongPlayedPercentage();

          if (isNaN(percentage)) {
            percentage = 0;
          }

          let slider = document.getElementById("song-percentage-played");
          slider.style.backgroundSize = percentage + "% 100%";
        },
      },
      songs: episodios,
    });
  })
  .catch((error) => console.error("Erro ao carregar o feed RSS:", error));
console.timeEnd("Tempo de Execução");
window.onkeydown = function (e) {
  return !(e.keyCode == 32);
};
=======
if (localStorage.theme === 'dark' || (!('theme' in localStorage) 
    && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark')

        localStorage.theme = 'dark';
} else {
    document.documentElement.classList.remove('dark')
    
    localStorage.theme = 'dark';
}

document.getElementById('dark-mode-toggle').addEventListener('click', function(){
    if( localStorage.theme == 'light' ){
        document.documentElement.classList.add('dark')
        localStorage.theme = 'dark';
    }else{
        document.documentElement.classList.remove('dark')
        localStorage.theme = 'light';
    }
});

document.getElementById('song-saved').addEventListener('click', function(){
	document.getElementById('song-saved').classList.toggle('saved');
});


fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fanchor.fm%2Fs%2F49f0c604%2Fpodcast%2Frss&api_key=h2getljthkrm9zimjvzaxhhc0rxcvwbc0h9cylvb&order_by=pubDate&order_dir=desc&count=1000') 
  .then(response => response.json())
  .then(data => {
	const episodios=[]

	data.items.forEach(episodio => {
		episodios.push({
			name : episodio.title,
			artist: "Radio 24hB <br> 24 horas de Estudos Bíblicos",			
			album: "Igreja Evangelica Congregacional Vale da Benção em Candeias, Jaboatão, Pernambuco, Brasil",
			url: episodio.enclosure.link,		
			cover_art_url: episodio.thumbnail}
		);
	  });

	  Amplitude.init({
		bindings: {
			37: 'prev',
			39: 'next',
			32: 'play_pause'
		},
		callbacks: {
			timeupdate: function(){
				let percentage = Amplitude.getSongPlayedPercentage();
	
				if( isNaN( percentage ) ){
					percentage = 0;
				}	
				
				let slider = document.getElementById('song-percentage-played');
				slider.style.backgroundSize = percentage + '% 100%';
			}
		},
		songs: episodios,
		autoplay: true
	});

	Amplitude.setShuffle(true);

})
.catch(error => console.error('Erro ao carregar o feed RSS:', error));


window.onkeydown = function(e) {
    return !(e.keyCode == 32);
};
>>>>>>> 259efebc48cf5b4c90fe8cb81713454f611bd928
