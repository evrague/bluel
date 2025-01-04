
let listeWorks = [];

getAllWorks(); 

async function getAllWorks() {
    try {
        const response = await fetch("http://localhost:5678/api/works");
        const data = await response.json();
        
        if(response.status === 200) {
            listeWorks = data; // Stockage des données dans la liste
            rafraichirDonnees(); // Affichage initial des données
        } else {
            console.error("Erreur lors de la récupération des données");
        }
    } catch (error) {
        console.error("Erreur du serveur", error);
    }
}


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

async function recupererIdWork(id_work) {
    const token = localStorage.getItem("tokenvalue");

    try {
        // Suppression d'un élément par son id
        await fetch(`http://localhost:5678/api/works/${id_work}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`, // Ajout du token
            },
        });

        // Mise à jour de la liste locale
        listeWorks = listeWorks.filter(work => work.id !== id_work);
        rafraichirDonnees(); // Rafraîchissement de l'affichage

    } catch (error) {
        console.error("Erreur lors de la suppression", error);
    }
}

async function afficherWorkParCategorie(idCategorie){
    // elle doit recupere l'id du boutton (idCategorie)

    let btn0 = document.getElementById("button-0"); // Tous
    let btn1 = document.getElementById("button-1"); // Objets
    let btn2 = document.getElementById("button-2"); // Appartements
    let btn3 = document.getElementById("button-3"); // Hotels & restaurants

    try {

        if(idCategorie == 0){
            btn0.classList.add("button-clique");
            btn1.classList.remove("button-clique");
            btn2.classList.remove("button-clique");
            btn3.classList.remove("button-clique");
        }

        if(idCategorie == 1){
            btn0.classList.remove("button-clique");
            btn1.classList.add("button-clique");
            btn2.classList.remove("button-clique");
            btn3.classList.remove("button-clique");
        }

        if(idCategorie == 2){
            btn0.classList.remove("button-clique");
            btn2.classList.add("button-clique");
            btn1.classList.remove("button-clique");
            btn3.classList.remove("button-clique");
        }

        if(idCategorie == 3){
            btn0.classList.remove("button-clique");
            btn3.classList.add("button-clique");
            btn2.classList.remove("button-clique");
            btn1.classList.remove("button-clique");
        }
        
        let gallery=document.getElementById("galleryy");
        gallery.innerHTML = listeWorks
        .filter(work => idCategorie === 0 || idCategorie === work.categoryId)
        .map(
            (work)=>
                    `
                    <figure>
                        <img width="170" height="530" src="${work.imageUrl}" alt="${work.title}">
                        <figcaption>${work.title}</figcaption>
                    </figure>`      
        )
        .join('');
            
    } catch (error) {
        console.log("erreur du serveur");
        
    }
}

