let series = [];
let tabFav = [];

const getSeries = async () => {
  let key = "efdc2275";
  let search = document.getElementById("search");
  let url = `http://www.omdbapi.com/?apikey=${key}&s=${search}`;
  const response = await fetch(url);
  const serie = await response.json();
  return serie;
};

let showSeries = () => {
  const tbody1 = document.getElementById("myTbody1");
  tbody1.innerHTML = "";
  for (let n of series) {
    const template = document.getElementById("template1");
    // cloner le template
    const clone1 = template.content.cloneNode(true);
    // selection des td et ajout des infos
    const td = clone.querySelectorAll("td");
    td[0].innerHTML = n.Title;
    td[1].innerHTML = n.Year;
    // selection de img et ajout des infos
    clone1.querySelector("img").src = s.Poster;
    clone1.querySelector("img").alt = s.Title;
  }
  tbody1.append(clone1);
};

const fav = () => {
  const tbody2 = document.getElementById("myTbody2");
  tbody2.innerHTML = "";
  for (let f of tabFav) {
    const template = document.getElementById("template2");
    // cloner le template
    const clone2 = template.content.cloneNode(true);
    // selection des td et ajout des infos
    const td = clone.querySelectorAll("td");
    td[0].innerHTML = f.Title;
    td[1].innerHTML = f.Year;
    td[2].innerHTML = f.imdbRating;
    // selection de img et ajout des infos
    clone2.querySelector("img").src = f.Poster;
    clone2.querySelector("img").alt = f.Title;
  }
  tbody2.append(clone2);
};

document.getElementById("btnSearch").onclick = async () => {
  let film = document.getElementById("search").value;
  document.getElementById("search").value = "";
  let key = "efdc2275";
  let url = `http://www.omdbapi.com/?apikey=${key}&s=${search}&type=series`;
  const response = await fetch(url);
  const data = await response.json();

  series = data.Search;
  showSeries();
};
