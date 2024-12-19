
try {

    const reponse = await fetch("http://localhost:5678/api/categories");
    const data = await reponse.json();
    
    if(reponse.status===200){
        const categories = data;
        let buttons_category=document.getElementById("categoriess");
        
        buttons_category.innerHTML +=  categories.map(
        (category)=>`
            <button onclick="afficherWorkParCategorie(${category.id})">${category.name}</button>`
        )
        .join('');
    }
    else{
        console.log("erreur");   
    }
  
} catch (error) {
    console.log("erreur du serveur");   
}



try {

    const reponse = await fetch("http://localhost:5678/api/categories");
    const data = await reponse.json();
    
    if(reponse.status===200){
        const categories = data;
        let buttons_category=document.getElementById("categories");
        buttons_category.innerHTML +=  categories.map(
    (category)=>`
        <option value="${category.id}">${category.name}</option>`
    )
    .join('');
    }
    else{
        console.log("erreur");   
    }
     
} catch (error) {
    console.log("erreur du serveur");
    
}


