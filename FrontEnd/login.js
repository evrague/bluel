

let loginForm=document.getElementById("login-formulaire");

loginForm.addEventListener("submit",async (e)=>{
    e.preventDefault();

    let email=document.getElementById("email");
    let password=document.getElementById("password");
    let valeuremail=email.value;
    let valeurpassword=password.value;

    try {

        const reponse = await fetch("http://localhost:5678/api/users/login",{
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({email: valeuremail, password: valeurpassword}),
        });

        const data = await reponse.json();

        if(reponse.status == 200){

            localStorage.setItem("tokenvalue", data.token);
            window.location.replace("accueil.html");            
        }

        else{
            console.log("erreur");
            let p = document.getElementById("zonemessage")
            p.innerHTML="Identifiants non reconnus"

        }

    }
        
    catch (error) {
        alert("Veuillez corriger vos identifiants");
        
    }
})


