export async function loginUser(email, password){
    try {
        const reponse=await axios.post("http://localhost:5678/api/users/login",{email, password});
        if(reponse.status===200){
            console.log(reponse.data);
            return reponse.data;
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
        const {userId, token}=await loginUser(valeuremail, valeurpassword);
        localStorage.setItem("tokenvalue", token);
        window.location.replace("index.html");
    }
        
    catch (error) {
        alert("Veuillez corriger vos identifiants");
        
    }
})
