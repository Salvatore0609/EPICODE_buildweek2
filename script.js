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
const thirdCard = document.getElementById("thirdCard")

function fetchAlbum(query) {
    const URL = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${query}`;

    fetch(URL, {
        headers: {
            "Content-Type": "application/json",
            'x-rapidapi-key': 'a0f81ebcf9mshd58ff0b75cbb17ap1a0a4ejsn6ea766dd0c85',
            'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
        }
    })
    .then(resp => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Ci dispiace ma non abbiamo trovato la tua canzone");
        }
    })
    .then(dataAlbum => {
        secondCard.innerHTML = ""; // Svuota il contenitore
        
        const albumList = dataAlbum.data.sort(() => Math.random() - 0.5).slice(0, 6); 
    

        albumList.forEach((albumPar, index) => {  
            const album = albumPar.album;
            
            const div = document.createElement("div");
            div.classList.add("col-md-4");
            
            Math.floor(Math.random(albumPar.album))

            div.innerHTML = `
                <div class="card mb-3 bg-dark border-secondary text-light">
                    <div class="row g-0">
                      <div class="col-md-4">
                        <img src="${album.cover_medium}" class="img-fluid rounded-start" alt="image" />
                      </div>
                      <div class="col-md-8 d-flex align-items-center">
                        <div class="card-body p-0">
                          <p class="card-text ms-2">${album.title}</p>
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
    .catch(err => console.log(err));
}


function fetchAlbum2(query) {
    const URL = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${query}`;

    fetch(URL, {
        headers: {
            "Content-Type": "application/json",
            'x-rapidapi-key': 'a0f81ebcf9mshd58ff0b75cbb17ap1a0a4ejsn6ea766dd0c85',
            'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
        }
    })
    .then(resp => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Ci dispiace ma non abbiamo trovato la tua canzone");
        }
    })
    .then(dataAlbum => {
        thirdCard.innerHTML = ""; 
        
        const albumList = dataAlbum.data.sort(() => Math.random() - 0.5).slice(0, 5); 
    

        albumList.forEach(albumPar => {  
            const album = albumPar.album;
            
            const div = document.createElement("div");
            div.classList.add("col"); 
            
            Math.floor(Math.random(albumPar.album))

            div.innerHTML = `
                
                  <div class="card bg-dark text-secondary border-0">
                    <img src="${album.cover_big}" class="card-img-top" alt="..." />
                    <div class="card-body p-0 pb-2">
                      <h5 class="card-title">${album.title}</h5>
                      <p class="card-text">${album.type}</p>
                    </div>`;

            thirdCard.appendChild(div);
            thirdCard.classList.add("row", "gx-3", "gy-3");
        });
    })
    .catch(err => console.log(err));
}

window.onload = () => {
    fetchAlbum();
    fetchAlbum2("rihanna")
};




