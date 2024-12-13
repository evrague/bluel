export async function loginUser(email, password){
    try {
        const reponse=await fetch("http://localhost:5678/api/users/login",{
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({email: email, password: password}),
        });
        console.log(reponse)
        if(reponse.status===200){
            console.log(reponse.json());
            return reponse.json();
        }
        else{
            console.log("erreur");
            return 0;
        }
        
        
    } catch (error) {
        console.log("erreur du serveur");
        
    }
}

let loginForm=document.getElementById("login-formulaire");
loginForm.addEventListener("submit",async (e)=>{
    e.preventDefault();

    let email=document.getElementById("email");
    let password=document.getElementById("password");
    let valeuremail=email.value;
    let valeurpassword=password.value;
    try {
        const resultat =await loginUser(valeuremail, valeurpassword);
        localStorage.setItem("tokenvalue", resultat.token);
        window.location.replace("index.html");
    }
        
    catch (error) {
        alert("Veuillez corriger vos identifiants");
        
    }
})


