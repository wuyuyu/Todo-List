// logic variable
let toDoListArray = [];
let doListArray = []; // archives
// ui variables 
const form = document.querySelector('.form')
const input = form.querySelector(".form__input");
const toDoContainer = document.querySelector("#toDoList");
const doContainer = document.querySelector("#doList");

//Event Listeners List Item Création

form.addEventListener('submit', e => {
    e.preventDefault();
    let itemId = String(Date.now());
    let toDoItem = input.value; // verifier la taille ici !
    addItemToDOM(itemId, toDoItem);
    addItemToARRAY(itemId, toDoItem, toDoListArray)
    input.value = '';
})
//Event Listeners List Item Drag & Drop

var dragged;
      
/* Les événements sont déclenchés sur les objets glissables */
document.addEventListener("drag", function( event ) {

}, false);

document.addEventListener("dragstart", function( event ) {
    // Stocke une référence sur l'objet glissable;
    dragged = event.target;
    // transparence 50%
    event.target.style.opacity = .5;
}, false);

document.addEventListener("dragend", function( event ) {
    // reset de la transparence
    event.target.style.opacity = "";
}, false);

/* Les événements sont déclenchés sur les cibles du drop */
document.addEventListener("dragover", function( event ) {
    // Empêche default d'autoriser le drop
    event.preventDefault();
}, false);

document.addEventListener("dragenter", function( event ) {
    // Met en surbrillance la cible de drop potentielle lorsque l'élément glissable y entre
    if ( event.target.className == "dropzone" ) {
        event.target.style.background = "purple";
    }

}, false);

document.addEventListener("dragleave", function( event ) {
    /* reset de l'arrière-plan des potentielles cible du drop lorsque les éléments glissables les quittent */
    if ( event.target.className == "dropzone" ) {
        event.target.style.background = "";
    }

}, false);

document.addEventListener("drop", function( event ) {
    // Empêche l'action par défaut (ouvrir comme lien pour certains éléments)
    event.preventDefault();
    // Déplace l'élément traîné vers la cible du drop sélectionnée
    if ( event.target.className == "dropzone" ) {
        event.target.style.background = "";
        console.log(dragged.parentNode)
        dragged.parentNode.removeChild( dragged );
        event.target.appendChild( dragged );
    }
    
}, false);

//Event Listeners List Item destruction

toDoContainer.addEventListener('click', e => {
    let id = e.target.getAttribute('data-id')
    if (!id) return // user clicked in something else      
    //pass id through to functions
    removeItemFromDOM(id);
    removeItemFromArray(id);
  });


//Logic Function

function addItemToDOM(itemId, toDoItem){
    // création d'un li 
    const div = document.createElement('div');
    div.setAttribute("data-id", itemId);
    //pour le drag & drop
    div.setAttribute("draggable", true);
    div.setAttribute("ondragstart","event.dataTransfer.setData('text/plain',null)")
    // Le text : 
    div.innerHTML = toDoItem;
    // Append
    toDoContainer.appendChild(div);
}

function addItemToARRAY(itemId, toDoItem, array){
    array.push({ itemId, toDoItem})
}

function removeItemFromDOM(itemId){
    let li = document.querySelector('[data-id ="' + itemId +'" ]');
    toDoContainer.removeChild(li);
}

function removeItemFromARRAY(itemId, array){
    array = array.filter(item => item.itemId !== itemId)
    //console.log(array)
}