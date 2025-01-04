const listeMots = ['Cachalot', 'Pétunia', 'Serviette']
const listePhrases = ['Pas de panique !', "La vie, l'univers et le reste", 'Merci pour le poisson']
let score = 0
let choix = prompt("Veuillez choisir liste de Mots ou de Phrases")
while (choix !==mots && choix !==phrases){
    choix = prompt("Veuillez choisir liste de Mots ou de Phrases")
}
if (choix===mots) {
    for (i=0; i<listedeMots.lenght; i++){
        let motUtilisateur = prompt('Entrez le mot : ' + listeMots[i])
        if (motUtilisateur === listeMots[i]) {
            score++
            }}
        console.log("Votre score est de " + score + " sur 3")    

}
else if(choix===phrases) {
    for (i=0; i<listePhrases.lenght; i++){
        let motUtilisateur = prompt('Entrez le mot : ' + listePhrases[i])
        if (motUtilisateur === listePhrases[i]) {
            score++
            }}
        console.log("Votre score est de " + score + " sur 3")    



        }
