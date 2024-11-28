// Ajouter pour la touche "Entrée"
document.getElementById('fruit').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      ajouterFruit();
      event.preventDefault();
    }
  });

class Personne {
    constructor(prenom, nom, status) {
      this.prenom = prenom;
      this.nom = nom;
      this.status = status;
    }
  }
  