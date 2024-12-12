```const tab1 = [];
for (let i = 0; i <= 11; i++) {
  tab1.push(i);
}

let tab2 = tab1.concat(tab1);

let timer;
const timerElement = document.getElementById("timer");

// Fonction pour démarrer le chrono
function startTimer() {
  count = 30; // Réinitialiser le chrono à 60 secondes

  // Si un intervalle existe déjà, on l'arrête avant de démarrer un nouveau chrono
  if (timer) {
    clearInterval(timer);
  }

  timer = setInterval(function () {
    count--;
    timerElement.textContent = `Temps restant : ${count}s`;
    console.log(count);
    if (count === 0) {
      clearInterval(timer);
      const gameMessage = document.getElementById("gameDone");
      gameMessage.innerHTML = "PERDU !";
      gameMessage.style.display = "block";
      setTimeout(resetGame, 4000);
      console.log("Temps écoulé !");
    }
  }, 1000);
}

// console.log(tab1)

//console.log(tab2)

function melanger(tab) {
  let shuffled = [];
  for (let i = 0; i < tab.length; i++) {
    do {
      // je genere un nb alea de 0 à taille du tableau
      x = Math.floor(Math.random() * tab.length);
    } while (shuffled[x] != undefined);
    // tant que l'emplacement n'est pas vide
    shuffled[x] = tab[i];
  }

  return shuffled;
}

tab2 = melanger(tab2);

// console.log(tab2)

let firstCard = null;
let secondCard = null;

function gameDone() {
  if (tab2.length === 0) {
    // Récupérer l'élément h1 et afficher un message de fin de jeu
    const gameMessage = document.getElementById("gameDone");
    gameMessage.innerHTML = "Félicitations ! Vous avez gagné !";
    gameMessage.style.display = "block";

    console.log("tableau vide");

    setTimeout(resetGame, 4000);
  } else {
    console.log("tableau PAS vide");
  }
}

function resetGame() {
  // Réinitialiser le tableau tab2
  tab2 = melanger(tab1.concat(tab1)); // Mélanger

  // Cacher le message de fin de jeu
  const gameMessage = document.getElementById("gameDone");
  gameMessage.style.display = "none"; // Cacher le message

  // Réinitialiser le container
  const container = document.querySelector(".container");
  container.innerHTML = "";

  // Relancer le jeu
  ManageCard();
  // Relancer le timer
  startTimer();
}

function ManageCard() {
  // Sélectionner le conteneur pour insérer les cartes
  const container = document.querySelector(".container");

  // Parcourir le tableau mélangé
  for (let i = 0; i < tab2.length; i++) {
    const template = document.getElementById("individualCard");
    const clone = template.content.cloneNode(true);

    // Utiliser la valeur de tab2[i] pour créer l'image correspondante
    const imageNumber = tab2[i];

    // Récupérer l'élément image dans le clone et définir le numéro de l'image
    const imageIndex = clone.querySelector("img");
    imageIndex.src = `img/${imageNumber}.webp`;
    // Ajouter le clone (carte) au conteneur
    container.appendChild(clone);

    //Suppression d'image lors du clic
    imageIndex.onclick = () => {
      if (imageIndex.classList.contains("click")) {
        return; // Si la carte est déjà retournée, on ne fait rien
      }
      // Marquer la carte comme retournée
      imageIndex.classList.add("click");

      if (firstCard == null) {
        firstCard = { imageNumber, imageElement: imageIndex };
        return;
      }
      // Si c'est la deuxième carte, la mémoriser
      secondCard = { imageNumber, imageElement: imageIndex };

      // Vérifier si les cartes correspondent
      if (firstCard.imageNumber === secondCard.imageNumber) {
        // Les cartes sont identiques donc -> supprimer les éléments du tableau
        firstCard.imageElement.remove();
        secondCard.imageElement.remove();

        // Supprimer les cartes du tableau
        const firstIndex = tab2.indexOf(firstCard.imageNumber);
        if (firstIndex > -1) tab2.splice(firstIndex, 1);
        const secondIndex = tab2.indexOf(secondCard.imageNumber);
        if (secondIndex > -1) tab2.splice(secondIndex, 1);

        console.log(tab2);
        console.log(tab2.length);

        // Réinitialiser les cartes après avoir trouvé une paire
        firstCard = null;
        secondCard = null;

        gameDone();
      } else {
        // Supprimer la classe click si les cartes ne sont pas identiques
        firstCard.imageElement.classList.remove("click");
        secondCard.imageElement.classList.remove("click");

        // Réinitialiser les cartes
        firstCard = null;
        secondCard = null;
      }
    };
  }
}

ManageCard();
startTimer();
```
