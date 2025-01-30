/* const URL = "https://deezerdevs-deezer.p.rapidapi.com/search" */

/* const firstCard = document.getElementById("firstCard");
const search = document.getElementById("search")
const btnSearch = document.getElementById("btnSearch")
const formSpotifySearch = document.getElementById("formSpotifySearch")




spotifySearch.onsubmit = (event) => {
    event.preventDefault();

    const query = search.value.trim();
    
    if (query) {
       fetchSongs(query);
    } else {
       alert("Per favore, inserisci un testo per la ricerca.");
    }
}

function fetchSongs(query) {
    fetch(`${URL}?q=${query}`, {
        headers: {
            "Content-Type": "application/json",
            'x-rapidapi-key': 'a0f81ebcf9mshd58ff0b75cbb17ap1a0a4ejsn6ea766dd0c85',
            'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
        }
    })
    .then(resp => {
        console.log(resp);
    
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Ci dispiace ma non abbiamo le tua canzone");
        }
    })
    .then(dataSong => {
        console.log(dataSong)
        dataSong.data.forEach(song => {
          console.log(song);
    
          const div = document.createElement("div");
    
            div.innerHTML = `
                    <img src="${song.artist.picture_medium}" alt="" />
                      <div class="position-relative d-flex flex-column justify-content-center ms-5">
                        <h1>${song.title}</h1>
                        <p>${song.artist.name}</p>
                        <p>Ascolta il nuovo brano</p>
                        <div class="position-absolute bottom-0 start-0 mb-2 ms-2 d-flex">
                          <button class="btn btn-success rounded-pill px-4 me-3">Play</button>
                          <button class="btn btn-dark rounded-pill text-white border-white px-4 me-3">Salva</button>
                          <button class="btn btn-dark border-0"><i class="bi bi-three-dots"></i></button>
                        </div>
                      </div>`;
    
            firstCard.appendChild(div);
        });
    })
    .catch(err => {
        console.log(err);
    })
} */

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
        div.classList.add("col-md-4");

        Math.floor(Math.random(par.album));

        div.innerHTML = `
                <div class="card mb-3 bg-dark border-secondary text-light">
                    <div class="row g-0">
                      <div class="col-md-4">
                        <img src="${album.cover_medium}" class="img-fluid rounded-start" alt="image" />
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
        div.classList.add("col");

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
  fetchAlbum();
  fetchAlbum2();
};
/* 
// Funzione per creare il Toast
function createToast() {
  // Crea il contenitore del Toast
  const toastContainer = document.createElement("div");
  toastContainer.classList.add("position-fixed", "bottom-0", "start-50", "translate-middle-x", "p-3");
  toastContainer.style.zIndex = "1050";

  // Crea il Toast
  const toast = document.createElement("div");
  toast.id = "playToast";
  toast.classList.add("toast", "align-items-center", "text-bg-dark", "border-0");

  // Crea il contenuto del Toast
  const toastContent = document.createElement("div");
  toastContent.classList.add("d-flex");

  const toastBody = document.createElement("div");
  toastBody.classList.add("toast-body");
  toastBody.innerHTML = `
                    <div class="toast-content d-flex" style="width: 100%; max-width: none;" data-bs-autohide="false">
                      <div class="toast-header bg-dark text-white d-flex">
                        <img src="path/to/album-cover.jpg" class="rounded me-2" alt="Album Cover" style="width: 50px;">
                        <strong class="me-auto">Fat Funny Friend - Maddie Zahm</strong>
                      </div>
                      <div class="toast-body bg-dark text-white">
                        <div class="d-flex align-items-center">
                          <button id="playPauseButton" class="btn btn-primary me-2">Play</button>
                          <div class="progress flex-grow-1 me-2" style="height: 5px;">
                            <div class="progress-bar" role="progressbar" style="width: 18%;" aria-valuenow="18" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                          <span>00:58 / 03:20</span>
                        </div>
                      </div>
                    </div>`;

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.classList.add("btn-close", "btn-close-white", "me-2", "m-auto");
  closeButton.setAttribute("data-bs-dismiss", "toast");
  closeButton.setAttribute("aria-label", "Chiudi");

  toastContent.appendChild(toastBody);
  toastContent.appendChild(closeButton);
  toast.appendChild(toastContent);

  toastContainer.appendChild(toast);

  // Restituisci il contenitore del Toast
  return toastContainer;
}

// Aggiungi il Toast al DOM quando clicchi su "Play"
document.getElementById("playButton").addEventListener("click", function () {
  const toastContainer = createToast();

  document.body.appendChild(toastContainer);

  // Inizializza il Toast di Bootstrap
  const toastElement = document.getElementById("playToast");
  const toast = new bootstrap.Toast(toastElement);

  toast.show();

  toastElement.addEventListener("hidden.bs.toast", function () {
    toastContainer.remove();
  });
}); */

function createToast() {
  // Crea il Toast (senza contenitore esterno per occupare tutta la larghezza)
  const toast = document.createElement("div");
  toast.id = "playToast";
  toast.classList.add("toast", "align-items-center", "text-bg-dark", "border-0");
  toast.style.position = "fixed"; // Posizionamento fisso nella parte inferiore
  toast.style.bottom = "0"; // Posizione in basso
  toast.style.left = "50%"; // Posizionato al centro orizzontale
  toast.style.transform = "translateX(-50%)"; // Centro orizzontalmente
  toast.style.width = "100vw"; // Estendi il toast su tutta la larghezza della finestra
  toast.style.zIndex = "1050"; // Assicurati che sia sopra ad altri elementi
  toast.setAttribute("data-bs-autohide", "false");

  // Crea il contenuto del Toast
  const toastContent = document.createElement("div");
  toastContent.classList.add("d-flex");

  const toastBody = document.createElement("div");
  toastBody.classList.add("toast-body");
  toastBody.innerHTML = `
                    <div class="toast-content d-flex" style="width: 100%; max-width: none;" data-bs-autohide="false">
                      <div class="toast-header bg-dark text-white d-flex">
                        <img src="path/to/album-cover.jpg" class="rounded me-2" alt="Album Cover" style="width: 50px;">
                        <strong class="me-auto">Fat Funny Friend - Maddie Zahm</strong>
                      </div>
                      <div class="toast-body bg-dark text-white">
                        <div class="d-flex align-items-center">
                          <button id="playPauseButton" class="btn btn-success rounded-circle d-flex align-items-center justify-content-center me-2" style="width: 40px; height: 40px;">
                            <i class="bi bi-play-fill" style="color: black;"></i>
                          </button>
                          <div class="progress flex-grow-1 me-2" style="height: 5px;">
                            <div class="progress-bar" role="progressbar" style="width: 18%;" aria-valuenow="18" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                          <span>00:58 / 03:20</span>
                        </div>
                      </div>
                    </div>`;

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.classList.add("btn-close", "btn-close-white", "me-2", "m-auto");
  closeButton.setAttribute("data-bs-dismiss", "toast");
  closeButton.setAttribute("aria-label", "Chiudi");

  toastContent.appendChild(toastBody);
  toastContent.appendChild(closeButton);
  toast.appendChild(toastContent);

  // Restituisci il Toast
  return toast;
}

// Aggiungi il Toast al DOM quando clicchi su "Play"
document.getElementById("playButton").addEventListener("click", function () {
  const toast = createToast();
  document.body.appendChild(toast);

  // Inizializza il Toast di Bootstrap
  const toastElement = document.getElementById("playToast");
  const toastInstance = new bootstrap.Toast(toastElement);

  toastInstance.show();

  // Rimuovi il Toast quando è nascosto
  toastElement.addEventListener("hidden.bs.toast", function () {
    toast.remove();
  });
});
