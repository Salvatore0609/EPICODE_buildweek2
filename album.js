const params = new URLSearchParams(window.location.search);
const albumId = params.get("albumId");

fetch("https://deezerdevs-deezer.p.rapidapi.com/album/" + albumId, {
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
  .then((album) => {
    const albumHeader = document.getElementById("albumHeader");
    const artist = album.artist;
    albumHeader.innerHTML = `
                  <img src="${album.cover_big}" alt="" />
                  <div class="position-relative d-flex flex-column justify-content-center ms-5">
                    <h1>${album.title}</h1>
                    <p>${artist.name}</p>
                    <p>Acolta il nuovo brano</p>
                  </div>`;


    const songsList = album.tracks.data;
    const listSong = document.getElementById("listSong");

    listSong.innerHTML = "";

    songsList.forEach((song) => {
      listSong.innerHTML += `
                    <li class="list-group list-group-horizontal rounded-0 bg-dark text-white border-0">
                      <div class="container-fluid">
                        <div class="row">
                          <p class="col-6">${song.title}</p>
                          <p class="col-2">${song.rank}</p>
                          <p class="col text-end">${Math.floor(song.duration / 60)}:${(song.duration % 60).toString().padStart(2, "0")}</p>
                        </div>
                      </div>
                    </li>`;
    });
  })
  .catch((err) => console.log(err));



/* const tracklist = () => {
  fetch("https://api.deezer.com/album/661305731/tracks", {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Ci dispiace ma non abbiamo trovato la tua canzone");
      }
    })
    .then((dataSongs) => {

      const listSongs = dataSongs.data;

      listSongs.forEach((element) => {
        
      

      });
    });
}; */
