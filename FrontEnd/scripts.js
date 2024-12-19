async function recupererIdWork(id_work){

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
    
    location.reload();
}

async function afficherWorkParCategorie(idCategorie){
    // elle doit recupere l'id du boutton (idCategorie)

    try {
        const reponse = await fetch("http://localhost:5678/api/works");
        const data = await reponse.json();
        
        if(reponse.status===200){
            const works = data;
            console.log(works);
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
