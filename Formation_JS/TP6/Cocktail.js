// Ajouter pour la touche "Entrée"
document.getElementById("Prenom").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    ajouterVIP();
    event.preventDefault();
  }
});

document.getElementById("Nom").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    ajouterVIP();
    event.preventDefault();
  }
});

class Personne {
  constructor(prenom, nom) {
    this.prenom = prenom;
    this.nom = nom;
    this.status = true;
  }
}

personnes = [];

let ajouterVIP = () => {
  // Récupérer la valeur de l'input Prenom
  const prenom = document.getElementById("Prenom").value;
  // Récupérer la valeur de l'input Nom
  const nom = document.getElementById("Nom").value;
  // Vérifier si les deux champs sont remplis
  if (prenom === "" || nom === "") {
    // Afficher une alerte si un des champs est vide
    alert("Veuillez remplir les deux champs !");
    return;
  }

  const p = new Personne(prenom, nom);

  personnes.push(p);
  // selection du template
  const template = document.querySelector("template");
  // cloner le template
  const clone = template.content.cloneNode(true);
  // selection du tr
  let tr = clone.querySelector("tr");
  // if true ligne verte if false rouge
  if (p.status) {
    tr.classList.add("table-success");
  } else {
    tr.classList.add("table-danger");
  }
  // modifier le contenu du premier td du template
  clone.querySelectorAll("td")[0].innerHTML = p.prenom;
  // modifier le contenu du second td du template
  clone.querySelectorAll("td")[1].innerHTML = p.nom;
  // log du tableau
  console.log(personnes);
  // supprimer une personne
  del = clone.querySelector(".btn-danger");
  del.onclick = (event) => {
    let tr = event.target.closest("tr");
    let i = tr.rowIndex - 1;
    personnes.splice(i, 1);
    tr.remove();

    //console.log(personnes);
  };

  modify = clone.querySelector(".btn-warning");
  modify.onclick = (event) => {
    let tr = event.target.closest("tr");
    let i = tr.rowIndex - 1;

    personnes[i].status = !personnes[i].status;
    if (personnes[i].status) {
      tr.classList.remove("table-danger");
      tr.classList.add("table-success");
    } else {
      tr.classList.remove("table-success");
      tr.classList.add("table-danger");
    }
  };
  // ajouter le template cloner dans un autre balise
  document.getElementById("MyTbody").appendChild(clone);
  // Réinitialiser le champ de saisie Prenom
  document.getElementById("Prenom").value = "";
  // Réinitialiser le champ de saisie Nom
  document.getElementById("Nom").value = "";
};

document.getElementById("ajouter").onclick = ajouterVIP;
