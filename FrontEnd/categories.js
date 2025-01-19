
try {

    const reponse = await fetch("http://localhost:5678/api/categories");
    const data = await reponse.json();
    
    if(reponse.status===200){
        const categories = data;

        let buttons_category_1=document.getElementById("categories");
        buttons_category_1.innerHTML +=  categories.map(
        (category)=>`
            <option value="${category.id}">${category.name}</option>`
        )
        .join('');

        let buttons_category=document.getElementById("categoriess");
        buttons_category.innerHTML +=  categories.map(
        (category)=>`
            <button id=button-${category.id} onclick="afficherWorkParCategorie(${category.id})">
                ${category.name}
            </button>`
        )
        .join('');
    }
    else{
        console.log("erreur");   
    }
  
} catch (error) {
    console.log("erreur du serveur");   
}

let ab = document.getElementById("fc")
ab.addEventListener("submit", (e)=>{
    e.preventDefault();
    let bc=document.getElementById("c")
    bc.innerHTML="Votre message a bien été envoyé"
    ab.reset();

})


