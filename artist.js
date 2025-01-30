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
  .then((artist) => {
    const artistBackground = document.getElementById("artistBackground");
    artistBackground.style.backgroundImage = `url(${artist.picture_medium})`;

    const artistHeader = document.getElementById("artistHeader");

    artistHeader.innerHTML = `
                    <h1>${artist.name}</h1>
                    <p>${artist.nb_fan}</p>`;

    artistBackground.appendChild(artistHeader);

    return fetch(artist.tracklist);
  })
  .then((resp) => {
    if (resp.ok) {
      return resp.json();
    } else {
      throw new Error("Ci dispiace ma non abbiamo trovato la tua canzone");
    }
  })
  .then((tracklistData) => {
    const trackList = document.getElementById("trackList");
    const trackData = tracklistData.data;

    trackList.innerHTML = "";

    trackData.forEach((track) => {
      const li = document.createElement("li");
      li.className = "d-flex align-items-center list-group-item bg-dark text-white py-2";

      li.innerHTML = `
                  <div class="container-fluid">
                    <div class="row">
                      <div class="d-flex align-items-center col-6">
                      <img src="${track.album.cover_small}" alt="Cover" class="ms-2">
                      <p class="ms-3">${track.title}</p>
                      </div>
                        <p class="col-2">${track.rank}</p>
                        <p class="col text-end">${Math.floor(track.duration / 60)}:${(track.duration % 60).toString().padStart(2, "0")}</p>
                    </div>
                  </div>`;

      trackList.appendChild(li);
    });
  })
  .catch((err) => console.log(err));
