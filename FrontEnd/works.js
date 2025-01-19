// works.js
export let listeWorks = [];

export async function getAllWorks() {
    try {
        const response = await fetch("http://localhost:5678/api/works");
        const data = await response.json();
        
        if(response.status === 200) {
            listeWorks = data;
            displayAllWorks(); // Affichage initial de tous les travaux
            return data;
        } else {
            console.error("Erreur lors de la récupération des données");
            return null;
        }
    } catch (error) {
        console.error("Erreur du serveur", error);
        return null;
    }
}

// Fonction pour afficher tous les travaux initialement
export function displayAllWorks() {
    try {
        let galleryy = document.getElementById("galleryy");
        if (galleryy) {
            galleryy.innerHTML = listeWorks.map(
                (work) => `
                    <figure>
                        <img width="170" height="530" src="${work.imageUrl}" alt="${work.title}">
                        <figcaption>${work.title}</figcaption>
                    </figure>`
            ).join('');
        }

        let gallery = document.getElementById("gallery");
        if (gallery) {
            gallery.innerHTML = listeWorks.map(
                (work) => `
                    <figure>
                        <img width="170" height="300" src="${work.imageUrl}" alt="${work.title}">
                        <figcaption>${work.title}</figcaption>
                    </figure>`
            ).join('');
        }
    } catch (error) {
        console.error("Erreur lors de l'affichage initial", error);
    }
}

// Initialisation immédiate
getAllWorks();

// Fonction de filtrage par catégorie
export function filterWorksByCategory(categoryId) {
    try {
        let galleryy = document.getElementById("galleryy");
        if (galleryy) {
            galleryy.innerHTML = listeWorks
                .filter(work => categoryId === 0 || categoryId === work.categoryId)
                .map(
                    (work) => `
                        <figure>
                            <img width="170" height="530" src="${work.imageUrl}" alt="${work.title}">
                            <figcaption>${work.title}</figcaption>
                        </figure>`
                )
                .join('');
        }
    } catch (error) {
        console.error("Erreur lors du filtrage par catégorie", error);
    }
}

export async function deleteWork(id_work) {
    const token = localStorage.getItem("tokenvalue");
    try {
        const response = await fetch(`http://localhost:5678/api/works/${id_work}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        
        if (response.ok) {
            listeWorks = listeWorks.filter(work => work.id !== id_work);
            displayAllWorks(); // Rafraîchir l'affichage après suppression
            return true;
        }
        return false;
    } catch (error) {
        console.error("Erreur lors de la suppression", error);
        return false;
    }
}