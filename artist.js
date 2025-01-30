const params = new URLSearchParams(window.location.search);
const artistId = params.get("artistId");

fetch("https://striveschool-api.herokuapp.com/api/deezer/artist/" + artistId, {
  headers: {
    "x-rapidapi-key": "a0f81ebcf9mshd58ff0b75cbb17ap1a0a4ejsn6ea766dd0c85",
    "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
  },
})
  .then((resp) => {
    if (resp.ok) {
      return resp.json();
    } else {
      throw new Error("Ci dispiace ma non abbiamo trovato la tua canzone");
    }
  })
  .then((artists) => {
    const artistBackground = document.getElementById("artistBackground");
    artistBackground.style.backgroundImage = `url(${artist.picture_xl})`;

    const artistHeader = document.getElementById("artistHeader");
    const artist = artists.artist;

    artistHeader.innerHTML = `
                    <h1>${artist.name}</h1>
                    <p>${artist.nb_fan}</p>`;

    artistBackground.appendChild(artistBackground);
  });
