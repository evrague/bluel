async function recupererIdWork(id_work){

    // On ne peut pas modifier la base de donées sans token
    token = localStorage.getItem("tokenvalue");

    try {
        // Envoi de la requête POST
        const response = await fetch(`http://localhost:5678/api/works/${id_work}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`, // Ajout du token
            },
        });

    } catch (error) {
    }
    
    rafraichirDonnees();
}

async function rafraichirDonnees() {

    try {

        const reponse = await fetch("http://localhost:5678/api/works");
        const data = await reponse.json();
        
        if(reponse.status===200){
            const works = data;

            let gallery=document.getElementById("gallery");
            gallery.innerHTML=works.map(
            (work)=>`
                <figure>
                    <img src="${work.imageUrl}" alt="${work.title}">
                    <figcaption>${work.title}</figcaption>
                </figure>`
            )
            .join('');

            let list_photos=document.getElementById("list-photos");
            list_photos.innerHTML=works.map(
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

}

async function afficherWorkParCategorie(idCategorie){
    // elle doit recupere l'id du boutton (idCategorie)

    let btn0 = document.getElementById("button-0"); // Tous
    let btn1 = document.getElementById("button-1"); // Objets
    let btn2 = document.getElementById("button-2"); // Appartements
    let btn3 = document.getElementById("button-3"); // Hotels & restaurants

    try {
        const reponse = await fetch("http://localhost:5678/api/works");
        const data = await reponse.json();

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
        
        if(reponse.status===200){
            const works = data;
            let gallery=document.getElementById("galleryy");
            gallery.innerHTML = works
            .filter(work => idCategorie === 0 || idCategorie === work.categoryId)
            .map(
                (work)=>
                        `
                        <figure>
                            <img src="${work.imageUrl}" alt="${work.title}">
                            <figcaption>${work.title}</figcaption>
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
}



