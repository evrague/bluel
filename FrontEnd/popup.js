import { listeWorks } from "./works.js";

const button_modifier = document.getElementById("button-modifier");
const section_popup = document.getElementById("popup");
let gallery=document.getElementById("list-photos");
const button_ajouter_photo = document.getElementById("ajouter-photo");

const button_croix = document.getElementById("croix");
const fleche = document.getElementById("fleche");

const popup_1 = document.getElementById("popup-1");
const popup_2 = document.getElementById("popup-2");
 
let image_a_afficher = document.getElementById("afficher_image");
let cadre = document.getElementById("image_cadre");
let input_file = document.getElementById("file");
let cssss = document.getElementById("input-image-difficile");

let disp1 = document.getElementById("disp1");
let disp2 = document.getElementById("disp2");


// afficher le popup
button_modifier.addEventListener("click", ()=> {
    section_popup.style.display = "flex";
});

// cacher (fernpmmer) le popup 
button_croix.addEventListener("click", ()=>{
    section_popup.style.display = "none";
});



gallery.innerHTML=listeWorks.map(
    (work)=>`
        <figure id="button-corbeille" >
            <div class="corbeille-img" onclick="recupererIdWork(${work.id})">
                <img width="12" height="12" src="https://img.icons8.com/metro/26/FFFFFF/trash.png" alt="trash"/>
            </div>
            <img width="90" height="120" src="${work.imageUrl}" alt="${work.title}">
        </figure>`
    )
.join('');

    

fleche.addEventListener("click", ()=>{
    popup_2.style.display = "none";
    popup_1.style.display = "flex";
    fleche.style.display = "none";
});


button_ajouter_photo.addEventListener("click", ()=>{
    popup_2.style.display = "flex";
    popup_1.style.display = "none";
    fleche.style.display = "block";
});


input_file.addEventListener("change", () => {

    let file = input_file.files[0];

    if (file){

        const reader = new FileReader();

        // Quand le fichier est chargé
        reader.onload = function (event) {

            image_a_afficher.src = event.target.result;
            image_a_afficher.style.display = "block";
            cadre.style.display = "none";
            disp1.style.display = "none";
            disp2.style.display = "none";
            cssss.classList.add("padding-0");
            
          };
  
        reader.readAsDataURL(file); 
    }

});

