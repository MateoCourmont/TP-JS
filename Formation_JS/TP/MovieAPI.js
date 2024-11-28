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
