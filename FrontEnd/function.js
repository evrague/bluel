
const listeMots = ["Cachalot", "Pétunia", "Serviette"]
const listePhrases = ["Pas de panique !", "La vie, l'univers et le reste", "Merci pour le poisson"]


function afficherResultat (score, nombredemotsproposés){
    console.log("Votre score est de " + score + " sur " + nombredemotsproposés)}

function choisirPrasesOuMots (){
    let choix = prompt("Avec quelle liste désirez-vous jouer : 'mots' ou 'phrases' ?")
// Tant que l'utilisateur n'a pas saisi "mots" ou "phrases", on lui redemande de saisir un choix
while (choix !== "mots" && choix !== "phrases") {
    choix = prompt("Avec quelle liste désirez-vous jouer : 'mots' ou 'phrases' ?")
 }return choix}

 function lancerBoucleDeJeu(listePropositions){
    let score=0
        for (let i = 0; i < listePropositions.length; i++) {
            // On demande à l'utilisateur de saisir le mot correspondant à l'indice i
            let motUtilisateur = prompt("Entrez le mot : " + listePropositions[i])
            if (motUtilisateur === listePropositions[i]) {
                // Si le mot saisi par l'utilisateur est correct, on incrémente le score
                score++
            }  
        }return score
    } 
    function lancerJeu(){
        let choix=choisirPrasesOuMots()
        let score=0
        let nombredemotsproposés=0

        if (choix==='mots') {
            score= lancerBoucleDeJeu(listeMots)
            nombredemotsproposés=listeMots.length
        }
        else {
            score= lancerBoucleDeJeu(listePhrases)
            nombredemotsproposés=listePhrases.length
        }




    afficherResultat (score, nombredemotsproposés)  
    }
    lancerJeu()
