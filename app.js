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

    data.forEach((episodio) => {
      episodios.push({
        name: episodio.name,
        artist: "Radio 24hB <br> 24 horas de Estudos Bíblicos",
        album:
          "Igreja Evangelica Congregacional Vale da Benção em Candeias, Jaboatão, Pernambuco, Brasil",
        url: episodio.url,
        cover_art_url: episodio.cover_art_url,
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
