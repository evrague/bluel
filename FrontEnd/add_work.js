let new_work_form = document.getElementById("formm");

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



