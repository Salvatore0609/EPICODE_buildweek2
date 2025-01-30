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
    currentTrack() 
    fetchAlbum();
    fetchAlbum2();
};

function currentTrack() {
     // Recupera i dati della traccia dal localStorage
     const currentTrack = JSON.parse(localStorage.getItem("currentTrack"));
  
     // Se i dati esistono, crea e mostra il toast automaticamente
     if (currentTrack) {
       const toast = createToast(currentTrack);
       document.body.appendChild(toast);
   
       const toastElement = document.getElementById("playToast");
       const toastInstance = new bootstrap.Toast(toastElement);
       toastInstance.show();
   
       // Rimuovi il toast quando è nascosto
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
      <div class="">
        <div class="toast-body">
          <div class="container-fluid toast-content" style="width: 100%; max-width: none;" data-bs-autohide="false">
            <div class="row align-items-center">
              <!-- Colonna 1: Copertina album e titolo -->
              <div class="col-4 d-flex align-items-center">
                <img src="${track.album.cover_small}" class="rounded me-2" alt="Album Cover" style="width: 50px;">
                <strong class="me-3">${track.title}</strong>
                <i class="far fa-heart"></i>
              </div>
    
            
              <div class="col-4 d-flex flex-column align-items-center justify-content-center">
                <div class="d-flex align-items-center mb-2">
                  <button id="prevButton" class="btn btn-dark rounded-circle d-flex justify-content-center me-2" style="width: 40px; height: 40px;">
                    <i class="fa-solid fa-shuffle"></i>
                  </button>
                  <button id="prevButton" class="btn btn-dark rounded-circle d-flex justify-content-center me-2" style="width: 40px; height: 40px;">
                    <i class="fa-solid fa-backward-step" style="color: white;"></i>
                  </button>
                  <button id="playPauseButton" class="btn btn-light rounded-circle d-flex justify-content-center me-2" style="width: 40px; height: 40px;">
                    <i class="bi bi-play-fill" style="color: black;"></i>
                  </button>
                  <button id="nextButton" class="btn btn-dark rounded-circle d-flex justify-content-center me-2" style="width: 40px; height: 40px;">
                    <i class="fa-solid fa-forward-step" style="color: white;"></i>
                  </button>
                  <button id="prevButton" class="btn btn-dark rounded-circle d-flex justify-content-center me-2" style="width: 40px; height: 40px;">
                    <i class="fa-solid fa-retweet"></i>
                  </button>
                </div>
                <div class="d-flex align-items-center w-100">
                  <span class="me-2">00:58</span>
                  <div class="progress flex-grow-1 bg-secondary" style="height: 5px;">
                    <div class="progress-bar bg-white" role="progressbar" style="width: 18%; height: 5px" aria-valuenow="18" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <span class="ms-2">${Math.floor(track.duration / 60)}:${(track.duration % 				60).toString().padStart(2, "0")}</span>
                </div>
              </div>
            <div class="col-4 d-flex align-items-center justify-content-end">
              <i class="fas fa-microphone me-3"></i>
              <i class="fas fa-bars me-3"></i>
              <i class="bi bi-speaker me-3"></i>
              <i class="fa-solid fa-volume-high me-3"></i>
              <i class="fas fa-expand-alt me-3"></i>
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

document.getElementById("prevCommand").addEventListener("click", function (event) {
  event.preventDefault();
  prevCommand();
});

document.getElementById("nextCommand").addEventListener("click", function (event) {
  event.preventDefault();
  nextCommand();
});