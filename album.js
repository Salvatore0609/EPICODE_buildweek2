const params = new URLSearchParams(window.location.search);
const songId = params.get("songId");

fetch("https://deezerdevs-deezer.p.rapidapi.com/album" + songId, {
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
  .then((song) => {
    const listSong = document.getElementById("listSong");
    const li = document.createElement("li");
    li.classList.add("d-flex", "list-group-item", "bg-dark", "text-white", "border-0");
    li.innerHTML = `
                  <p class="me-auto">${song.title}</p>
                  <p class="me-auto">244.242</p>
                  <p class="me-1">1.28</p>
                `;
    listSong.appendChild("li");
  })
  .catch((err) => console.log(err));
