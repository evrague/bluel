
export async function getAllWorks() {

    try {
        const reponse = await fetch("http://localhost:5678/api/works");
        const data = await reponse.json();
            
        if(reponse.status===200){
            return data;
        } 
    }
    catch (error) {
        return "error";
    }
}

export let listeWorks = await getAllWorks();
            
try {

    let galleryy = document.getElementById("galleryy");
    
    galleryy.innerHTML = listeWorks.map(
        (work)=>`
            <figure>
                <img width="170" height="530" src="${work.imageUrl}" alt="${work.title}">
                <figcaption>${work.title}</figcaption>
            </figure>`
    )
    .join('');

    let gallery=document.getElementById("gallery");
    gallery.innerHTML=listeWorks.map(
    (work)=>`
        <figure>
            <img width="170" height="300" src="${work.imageUrl}" alt="${work.title}">
            <figcaption>${work.title}</figcaption>
        </figure>`
    )
    .join('');

    
} catch (error) {
    console.log("erreur du serveur");
    
}









