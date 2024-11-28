// Ajouter pour la touche "Entrée"
document.getElementById("fruit").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    ajouterFruit();
    event.preventDefault();
  }
});

document.getElementById("btnAjouter").onclick = ajouterFruit;

const fruits = [];
const item = document.getElementById("fruit");

function ajouterFruit() {
  const fruit = item.value;
  //Ajouter un fruit au tableau
  fruits.push(fruit);
  //Afficher le tableau en console
  console.log(fruits);
  // mettre un selecteur sur le template
  const template = document.getElementById("ajouterFruit");
  // cloner le template
  const clone = template.content.cloneNode(true);
  // Ajouter la ligne
  clone.querySelector("td").innerHTML = fruit;
  // Ajouter un bouton "Supprimer"
  const deleteButton = clone.querySelector("button");
  deleteButton.onclick = () => {
    // Supprimer la ligne associée
    deleteButton.closest("tr").remove();

    const index = fruits.indexOf(fruit);
    if (index > -1) {
      fruits.splice(index, 1); // Retirer du tableau
      console.log(fruits);
    }
  };
  // ajouter le template cloner dans le Tbody
  document.getElementById("myTbody").appendChild(clone);

  // Réinitialiser le champ de saisie
  document.getElementById("fruit").value = "";
}
