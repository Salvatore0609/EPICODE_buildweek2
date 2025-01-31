const URL = "https://deezerdevs-deezer.p.rapidapi.com/search";

const search = document.getElementById("search");
const btnSearch = document.getElementById("btnSearch");
const formSpotifySearch = document.getElementById("formSpotifySearch");

formSpotifySearch.addEventListener("submit", function (event) {
  event.preventDefault(); // Evita il refresh della pagina
  const query = search.value.trim();
  if (query) {
    fetchSongs(query);
  } else {
    alert("Inserisci una canzone da cercare!");
  }
});

const secondCard = document.getElementById("secondCard");
const thirdCard = document.getElementById("thirdCard");

function fetchAlbum(query) {
  const URL = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${query}`;
  fetch(URL, {
    headers: {
      "Content-Type": "application/json",
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
    .then((dataInformation) => {
      secondCard.innerHTML = ""; // Svuota il contenitore

      const albumList = dataInformation.data.sort(() => Math.random() - 0.5).slice(0, 6);
      const artists = dataInformation.data;

      albumList.forEach((par, index) => {
        const album = par.album;
        const artist = par.artist;

        const div = document.createElement("div");
        div.classList.add("col-lg-4", "col-sm-6");

        Math.floor(Math.random(par.album));

        div.innerHTML = `
                <div class="card mb-3 bg-dark border-secondary text-light">
                    <div class="row g-0">
                      <div class="col-md-4">
                        <img src="${album.cover_medium}" class="img-fluid w-100 rounded-start" alt="image" />
                      </div>
                      <div class="col-md-8 d-flex align-items-center">
                        <div class="card-body p-0">
                          <a href="./pageAlbum.html?albumId=${album.id}" class="text-white text-decoration-none">
                            <p class="card-text ms-2 mb-4">${album.title}</p>
                          </a>
                          <a href="./pageArtist.html?artistId=${artist.id}" class="text-white text-decoration-none">
                            <p class="card-text ms-2">${artist.name}</p>
                          </a>
                        </div>
                      </div>
                    </div>
                </div>`;

        secondCard.appendChild(div);

        // Ogni 3 card, crea una nuova riga
        if ((index + 1) % 3 === 0) {
          secondCard.classList.add("row", "gx-3", "gy-3");
        }
      });
    })
    .catch((err) => console.log(err));
}

function fetchAlbum2(query) {
  const URL = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${query}`;

  fetch(URL, {
    headers: {
      "Content-Type": "application/json",
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
    .then((dataAlbum) => {
      thirdCard.innerHTML = "";

      const albumList = dataAlbum.data.sort(() => Math.random() - 0.5).slice(0, 5);

      albumList.forEach((albumPar) => {
        const album = albumPar.album;

        const div = document.createElement("div");
        div.classList.add("col-12", "col-sm-6", "col-md");

        Math.floor(Math.random(albumPar.album));

        div.innerHTML = `
                
                  <div class="card bg-dark text-secondary border-0">
                    <img src="${album.cover_big}" class="card-img-top" alt="..." />
                    <div class="card-body text-white p-0 pb-2">
                        <a href="./pageAlbum.html?albumId=${album.id}" class="text-white text-decoration-none">
                            <h5 class="card-text">${album.title}</h5>
                        </a>
                      <p class="card-text">${album.type}</p>
                    </div>`;

        thirdCard.appendChild(div);
        thirdCard.classList.add("row", "gx-3", "gy-3");
      });
    })
    .catch((err) => console.log(err));
}

window.onload = () => {
  currentTrack();
  fetchAlbum();
  fetchAlbum2();
};

function currentTrack() {
  const currentTrack = JSON.parse(localStorage.getItem("currentTrack"));

  if (!currentTrack) {
    console.warn("Nessun brano salvato in localStorage");
    return;
  }

  const firstCard = document.getElementById("firstCard");
  if (!firstCard) {
    console.error("Elemento #firstCard non trovato nel DOM");
    return;
  }

  firstCard.innerHTML = `
    <img src="${currentTrack.album.cover_medium || "default-image.jpg"}" alt="" />
    <div class="position-relative d-flex flex-column justify-content-center ms-5">
      <h1>${currentTrack.title || "Titolo non disponibile"}</h1>
      <p>${currentTrack.artist.name || "Artista sconosciuto"}</p>
      <p>Ascolta il nuovo brano</p>
      <div class="mt-5 d-flex">
        <button id="playButton" class="btn btn-success text-black rounded-pill px-4 me-3">Play</button>
        <button class="btn btn-dark rounded-pill text-white border-white px-4 me-3">Salva</button>
        <button class="btn btn-dark border-0"><i class="bi bi-three-dots"></i></button>
      </div>
    </div>`;

  if (currentTrack) {
    const toast = createToast(currentTrack);
    document.body.appendChild(toast);

    const toastElement = document.getElementById("playToast");
    const toastInstance = new bootstrap.Toast(toastElement);
    toastInstance.show();

    toastElement.addEventListener("hidden.bs.toast", function () {
      toast.remove();
      localStorage.removeItem("currentTrack");
    });
  }
}

function createToast(track) {
  const toast = document.createElement("div");
  toast.id = "playToast";
  toast.classList.add("toast", "align-items-center", "text-bg-dark");
  toast.style.position = "fixed";
  toast.style.bottom = "0";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.width = "100vw";
  toast.style.zIndex = "1050";
  toast.style.borderTop = "1px secondary solid";

  toast.setAttribute("data-bs-autohide", "false");

  toast.innerHTML = `
      <div>
        <div class="toast-body">
          <div class="container-fluid toast-content" style="width: 100%; max-width: none;" data-bs-autohide="false">
            <div class="row justify-content-center align-items-center">
      
              <div class="col-4 d-none d-sm-flex align-items-center">
                <img src="${track.album.cover_small}" class="rounded me-2" alt="Album Cover" style="width: 50px;">
                <strong class="me-3">${track.title}</strong>
                <i class="far fa-heart d-none d-md-block"></i>
              </div>
    
            
              <div class="col-4 d-flex flex-column align-items-center justify-content-center">
                <div class="d-flex align-items-center mb-2">
                  <button class="btn btn-dark rounded-circle d-flex align-items-center justify-content-center me-2" style="width: 40px; height: 40px;">
                    <i class="fa-solid fa-shuffle"></i>
                  </button>
                  <button class="btn btn-dark rounded-circle d-flex align-items-center justify-content-center me-2" style="width: 40px; height: 40px;">
                    <i class="fa-solid fa-backward-step" style="color: white;"></i>
                  </button>
                  <button id="playPauseButton" class="btn btn-light rounded-circle d-flex align-items-center justify-content-center me-2" style="width: 40px; height: 40px;">
                    <i class="bi bi-play-fill" style="color: black;"></i>
                  </button>
                  <button class="btn btn-dark rounded-circle d-flex align-items-center justify-content-center me-2" style="width: 40px; height: 40px;">
                    <i class="fa-solid fa-forward-step" style="color: white;"></i>
                  </button>
                  <button class="btn btn-dark rounded-circle d-flex align-items-center justify-content-center me-2" style="width: 40px; height: 40px;">
                    <i class="fa-solid fa-retweet"></i>
                  </button>
                </div>
                <div class="d-none d-sm-flex align-items-center w-100">
                  <span class="me-2">00:58</span>
                  <div class="progress flex-grow-1 bg-secondary" style="height: 5px;">
                    <div class="progress-bar bg-white" role="progressbar" style="width: 18%; height: 5px" aria-valuenow="18" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <span class="ms-2">${Math.floor(track.duration / 60)}:${(track.duration % 60)
    .toString()
    .padStart(2, "0")}</span>
                </div>
              </div>
            <div class="col-4 d-none d-sm-flex align-items-center justify-content-end">
              <button class="btn btn-dark rounded-circle  d-none d-md-block" style="width: 40px; height: 40px;">
                <i class="fas fa-microphone me-3"></i>
              </button>
              <button class="btn btn-dark rounded-circle" style="width: 40px; height: 40px;">
                <i class="fas fa-bars me-3"></i>
              </button>
              <button class="btn btn-dark rounded-circle d-none d-md-block" style="width: 40px; height: 40px;">
                <i class="bi bi-speaker me-3"></i>
              </button>
              <button class="btn btn-dark rounded-circle" style="width: 40px; height: 40px;">
                <i class="fa-solid fa-volume-high me-3"></i>
              </button>
              <button class="btn btn-dark rounded-circle d-none d-md-block" style="width: 40px; height: 40px;">
                <i class="fas fa-expand-alt me-3"></i>
              </button>
              <button type="button" class="btn-close btn-close-white me-2" data-bs-dismiss="toast" aria-label="Chiudi"></button>
            </div>
          </div>
        </div>
      </div>
    </div>`;

  return toast;
}

document.getElementById("playButton").addEventListener("click", function () {
  const toast = createToast();
  document.body.appendChild(toast);

  const toastElement = document.getElementById("playToast");
  const toastInstance = new bootstrap.Toast(toastElement);

  toastInstance.show();

  toastElement.addEventListener("hidden.bs.toast", function () {
    toast.remove();
  });
});

function prevCommand() {
  history.back();
}

function nextCommand() {
  history.forward();
}

const prevButton = document.getElementById("prevCommand");
if (prevButton) {
  // 👈 Controlla se il bottone esiste
  prevButton.addEventListener("click", function (event) {
    event.preventDefault();
    prevCommand();
  });
} else {
  console.warn("Bottone prevCommand non trovato nel DOM");
}

const nextButton = document.getElementById("nextCommand");
if (nextButton) {
  // 👈 Controlla se il bottone esiste
  nextButton.addEventListener("click", function (event) {
    event.preventDefault();
    nextCommand();
  });
} else {
  console.warn("Bottone nextCommand non trovato nel DOM");
}

function fetchSongs(query) {
  fetch(`${URL}?q=${query}`, {
    headers: {
      "Content-Type": "application/json",
      "x-rapidapi-key": "a0f81ebcf9mshd58ff0b75cbb17ap1a0a4ejsn6ea766dd0c85",
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ci dispiace ma non abbiamo trovato la tua canzone");
      }
      return response.json();
    })
    .then((dataSong) => {
      console.log("Risultati ricerca:", dataSong);

      if (dataSong.data.length === 0) {
        alert("Nessun risultato trovato.");
        return;
      }

      const firstResult = dataSong.data[0];

      if (firstResult.artist && firstResult.artist.name.toLowerCase() === query.toLowerCase()) {
        window.location.href = `./pageArtist.html?artistId=${firstResult.artist.id}`;
        return;
      }

      if (firstResult.album && firstResult.album.title.toLowerCase() === query.toLowerCase()) {
        window.location.href = `./pageAlbum.html?albumId=${firstResult.album.id}`;
        return;
      }

      if (firstResult.album) {
        window.location.href = `./pageAlbum.html?albumId=${firstResult.album.id}`;
      } else if (firstResult.artist) {
        window.location.href = `./pageArtist.html?artistId=${firstResult.artist.id}`;
      } else {
        alert("Nessun risultato valido trovato.");
      }
    })
    .catch((err) => {
      console.error("Errore nella ricerca dell'album:", err);
    });
}
