document.getElementById('btnAjouter').onclick = ()=>{
    // mettre un selecteur sur le template
    const template = document.getElementById('ajouterFruit');
    // cloner le template
    const clone = template.content.cloneNode(true);
    // Récupérer la valeur de l'input
    const item = document.getElementById('fruit').value;
    // modifier le contenu du template
    clone.querySelector('td').innerHTML = item ;

    // Ajouter un bouton "Supprimer"
    const deleteButton = clone.querySelector('button');
    deleteButton.onclick = () => {
    // Supprimer la ligne associée
        deleteButton.closest('tr').remove();
    }

// ajouter le template cloner dans un autre balise
document.getElementById('myTbody').appendChild(clone); 

// Réinitialiser le champ de saisie
document.getElementById('fruit').value = '';

}