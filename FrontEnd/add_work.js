import { listeWorks } from "./works.js";

let btn_add_work = document.getElementById("button-add-work");
let categs = document.getElementById("categories");
let new_work_form = document.getElementById("formm");

rafraichirDonnees();          

function rafraichirDonnees() {

    const gallery = document.getElementById("gallery");
    gallery.innerHTML = listeWorks.map(
        (work) => `
        
            <figure>
                <img width="170" height="530" src="${work.imageUrl}" alt="${work.title}">
                <figcaption>${work.title}</figcaption>
            </figure>`
    ).join('');

    const list_photos = document.getElementById("list-photos");
    list_photos.innerHTML = listeWorks.map(
        (work) => `
            <figure id="button-corbeille">
                <div class="corbeille-img" onclick="recupererIdWork(${work.id})">
                    <img width="12" height="12" src="https://img.icons8.com/metro/26/FFFFFF/trash.png" alt="trash"/>
                </div>
                <img width="90" height="120" src="${work.imageUrl}" alt="${work.title}">
            </figure>`
    ).join('');
}

function cacherModale(){
    let popup = document.getElementById("popup");
    let btn = document.getElementById("button-add-work");
    let fleche = document.getElementById("fleche");
    let popup2 = document.getElementById("popup-2");
    let popup1 = document.getElementById("popup-1");

    btn.classList.remove("button-form-rempli");
    popup1.style.display = "flex";
    popup2.style.display = "none";
    fleche.style.display = "none";
    popup.style.display = "none";
}

new_work_form.addEventListener("change",() => {
    // Récupération des éléments du formulaire
    let image = document.getElementById("file").files[0]; // Récupère le fichier (image)
    let titre = document.getElementById("titre").value; // Récupère le titre
    let categorie = document.getElementById("categories").value; // Récupère la catégorie

    console.log(titre);

    if (image != undefined && ( titre != "" && titre != undefined ) && categorie != "default"){
        
        btn_add_work.disabled = false;
        btn_add_work.classList.add("button-form-rempli");

    }else{
        
        btn_add_work.classList.remove("button-form-rempli");
    }
})


new_work_form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page.

    // Récupération des éléments du formulaire
    let image = document.getElementById("file").files[0]; // Récupère le fichier (image)
    let titre = document.getElementById("titre").value; // Récupère le titre
    let categorie = document.getElementById("categories").value; // Récupère la catégorie


    // Vérifie que tous les champs sont remplis
    if (!image || !titre || !categorie) {
        alert("Veuillez remplir tous les champs !");
        return;
    }

    // Récupération du token depuis localStorage
    const token = localStorage.getItem('tokenvalue');
    if (!token) {
        alert("Token non trouvé !");
        return;
    }

    // Préparation des données avec FormData
    const formData = new FormData();
    formData.append("image", image); // Ajout du fichier image
    formData.append("title", titre); // Ajout du titre
    formData.append("category", categorie); // Ajout de la catégorie

    try {
        // Envoi de la requête POST
        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`, // Ajout du token
            },
            body: formData, // Les données en multipart/form-data
        });

        // Gestion de la réponse
        if (response.ok) {
            const data = await response.json();
            console.log("Travail ajouté avec succès :", data);
            
            new_work_form.reset();

            let image_a_afficher = document.getElementById("afficher_image");

            let cadre = document.getElementById("image_cadre");
            let cssss = document.getElementById("input-image-difficile");
            let disp1 = document.getElementById("disp1");
            let disp2 = document.getElementById("disp2");

            image_a_afficher.style.display = "none";
            cadre.style.display = "block";
            disp1.style.display = "block";
            disp2.style.display = "block";
            cssss.classList.remove("padding-0");
            
            cacherModale();
            getAllWorks(); 

        } else {
            const errorText = await response.text();
            console.error("Erreur lors de l'ajout :", errorText);
            alert("Erreur : " + errorText);
        }
    } catch (error) {
        console.error("Erreur de requête :", error);
        alert("Une erreur est survenue. Veuillez réessayer.");
    }
});



