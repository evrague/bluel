try {
    const reponse=await fetch("http://localhost:5678/api/works");
    if(reponse.status===200){
        works=reponse.data;
        console.log(reponse.data);
        let gallery=document.getElementById("gallery");
gallery.innerHTML=works.map(
    (work)=>`
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

