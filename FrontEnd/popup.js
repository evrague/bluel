
const button_modifier = document.getElementById("button-modifier");
const section_popup = document.getElementById("popup");

// afficher le popup
button_modifier.addEventListener("click", ()=> {

    section_popup.style.display = "flex";
});


// cacher (fermer) le popup 
const button_croix = document.getElementById("croix");

button_croix.addEventListener("click", ()=>{

    section_popup.style.display = "none";
});


try {

    const reponse = await fetch("http://localhost:5678/api/works");
    const data = await reponse.json();
    
    if(reponse.status===200){
        const works = data;
        let gallery=document.getElementById("list-photos");
        gallery.innerHTML=works.map(
    (work)=>`
        <figure id="button-corbeille" >
            <div class="corbeille-img" onclick="recupererIdWork(${work.id})">
                <img width="12" height="12" src="https://img.icons8.com/metro/26/FFFFFF/trash.png" alt="trash"/>
            </div>
			<img width="90" height="120" src="${work.imageUrl}" alt="${work.title}">
		</figure>`
    )
    .join('');
    }
    else{
        console.log("erreur");
        
    }
    
} catch (error) {
    console.log("erreur du serveur");
    
}

const button_ajouter_photo = document.getElementById("ajouter-photo");
const fleche = document.getElementById("fleche");

const popup_1 = document.getElementById("popup-1");
const popup_2 = document.getElementById("popup-2");

button_ajouter_photo.addEventListener("click", ()=>{
    popup_2.style.display = "flex";
    popup_1.style.display = "none";
    fleche.style.display = "block";
});

fleche.addEventListener("click", ()=>{
    popup_2.style.display = "none";
    popup_1.style.display = "flex";
    fleche.style.display = "none";
});




