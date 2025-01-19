import { listeWorks, getAllWorks } from "./works.js"; // Ajout de l'import getAllWorks

let btn_add_work = document.getElementById("button-add-work");
let categs = document.getElementById("categories");
let new_work_form = document.getElementById("formm");

rafraichirDonnees();          

function rafraichirDonnees() {
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = listeWorks.map(
        (work) => `<figure>
                    <img width="170" height="530" src="${work.imageUrl}" alt="${work.title}">
                    <figcaption>${work.title}</figcaption>
                </figure>`
    ).join('');

    const list_photos = document.getElementById("list-photos");
    list_photos.innerHTML = listeWorks.map(
        (work) => `<figure id="button-corbeille">
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
    let image = document.getElementById("file").files[0];
    let titre = document.getElementById("titre").value;
    let categorie = document.getElementById("categories").value;

    if (image != undefined && (titre != "" && titre != undefined) && categorie != "default"){
        btn_add_work.disabled = false;
        btn_add_work.classList.add("button-form-rempli");
    } else {
        btn_add_work.classList.remove("button-form-rempli");
    }
});

new_work_form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let image = document.getElementById("file").files[0];
    let titre = document.getElementById("titre").value;
    let categorie = document.getElementById("categories").value;

    const token = localStorage.getItem('tokenvalue');
    if (!token) {
        alert("Token non trouvé !");
        return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", titre);
    formData.append("category", categorie);

    try {
        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            body: formData,
        });

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
            listeWorks.push(data)            
            rafraichirDonnees(); // Rafraîchir l'affichage après la mise à jour des données

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