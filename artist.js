const URL = "https://deezerdevs-deezer.p.rapidapi.com/search"; 

const search = document.getElementById("search");
const btnSearch = document.getElementById("btnSearch");
const formSpotifySearch = document.getElementById("formSpotifySearch");

formSpotifySearch.addEventListener("submit", function (event) {
    event.preventDefault(); 
    const query = search.value.trim();
    if (query) {
        fetchSongs(query);
    } else {
        alert("Inserisci una canzone da cercare!");
    }
});


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
              <a href="#" class="text-light text-decoration-none track-link">
                <p class="ms-3">${track.title}</p>
              </a>
            </div>
            <p class="col-2">${track.rank}</p>
            <p class="col text-end">${Math.floor(track.duration / 60)}:${(track.duration % 60).toString().padStart(2, "0")}</p>
          </div>
        </div>`;

      trackList.appendChild(li);

      
      li.addEventListener("click", function (event) {
        event.preventDefault();
        
        localStorage.setItem("currentTrack", JSON.stringify(track))

        const existingToast = document.getElementById("playToast");
        if (existingToast) {
          existingToast.remove();
        }

        const toast = createToast(track);
        document.body.appendChild(toast);
      
        const toastElement = document.getElementById("playToast");
        const toastInstance = new bootstrap.Toast(toastElement);
        toastInstance.show();
      
       
        toastElement.addEventListener("hidden.bs.toast", function () {
          toast.remove();
        });
      });
    });
  })
  .catch((err) => console.log(err));


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


  
  
  
  