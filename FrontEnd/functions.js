import { getAllWorks, listeWorks, deleteWork } from './works.js';

async function initializeGallery() {
    await getAllWorks();
    rafraichirDonnees();
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
                <div class="corbeille-img" onclick="handleDelete(${work.id})">
                    <img width="12" height="12" src="https://img.icons8.com/metro/26/FFFFFF/trash.png" alt="trash"/>
                </div>
                <img width="90" height="120" src="${work.imageUrl}" alt="${work.title}">
            </figure>`
    ).join('');
}

async function handleDelete(id_work) {
    const success = await deleteWork(id_work);
    if (success) {
        rafraichirDonnees();
    }
}

async function afficherWorkParCategorie(idCategorie) {
    const btn0 = document.getElementById("button-0");
    const btn1 = document.getElementById("button-1");
    const btn2 = document.getElementById("button-2");
    const btn3 = document.getElementById("button-3");

    // Reset all buttons
    [btn0, btn1, btn2, btn3].forEach(btn => btn.classList.remove("button-clique"));
    
    // Add active class to selected button
    document.getElementById(`button-${idCategorie}`).classList.add("button-clique");

    try {
        const gallery = document.getElementById("galleryy");
        gallery.innerHTML = listeWorks
            .filter(work => idCategorie === 0 || idCategorie === work.categoryId)
            .map(work => `
                <figure>
                    <img width="170" height="530" src="${work.imageUrl}" alt="${work.title}">
                    <figcaption>${work.title}</figcaption>
                </figure>`
            )
            .join('');
    } catch (error) {
        console.error("Erreur lors de l'affichage par catégorie", error);
    }
}

// Initialize the gallery when the page loads
initializeGallery();

// Export functions that need to be accessed globally
window.afficherWorkParCategorie = afficherWorkParCategorie;
window.handleDelete = handleDelete;