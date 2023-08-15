let emailIn = document.getElementById("emailIn")
let passwordIn = document.getElementById("passwordIn")
let fillMsg = document.getElementById("fillMsg")
let errorMsg = document.getElementById("errorMsg")
let btnLogin = document.getElementById("btnLogin")

let nameUp = document.getElementById("nameUp")
let emailUp = document.getElementById("emailUp")
let passwordUp = document.getElementById("passwordUp")
let nameAlert = document.getElementById("nameAlert")
let emailAlert = document.getElementById("emailAlert")
let passwordAlert = document.getElementById("passwordAlert")
let confirmMsg = document.getElementById("confirmMsg")
let existMsg = document.getElementById("existMsg")
let failMsg = document.getElementById("failMsg")
let btnSignup = document.getElementById("btnSignup")


let welcome = document.getElementById("welcome")

let userInfo;

if (localStorage.getItem("users") == null) {
    userInfo = []
} else {
    userInfo = JSON.parse(localStorage.getItem("users"))
}

function signUp() {

    if (validateUp() == true && isExist() == false)  {
        let signUpData = {
            nameUp: nameUp.value,
            emailUp: emailUp.value,
            passwordUp: passwordUp.value
        }
        userInfo.push(signUpData)
        localStorage.setItem("users", JSON.stringify(userInfo))
        confirmMsg.classList.replace("d-none", "d-block")
        failMsg.classList.replace("d-block" ,"d-none")

    } else {
        failMsg.classList.replace("d-none", "d-block")
        
    }

}


function validateName() {

    let regex = /^[A-Za-z]{3,10}(\s?[A-Za-z]{3,10})?$/

    if (regex.test(nameUp.value) == true && nameUp.value != "") {
        nameUp.classList.add("is-valid")
        nameUp.classList.remove("is-invalid")
        nameAlert.classList.replace("d-block", "d-none")
       
        return true

    } else {
        nameUp.classList.remove("is-valid")
        nameUp.classList.add("is-invalid")
        nameAlert.classList.replace("d-none", "d-block")
        
        return false
    }
}

function validateemail() {
    let regex = /^[a-zA-Z0-9]{3,15}@[a-z]{5,10}\.com$/
    if (regex.test(emailUp.value) == true && emailUp.value != "") {
        emailUp.classList.add("is-valid")
        emailUp.classList.remove("is-invalid")
        emailAlert.classList.replace("d-block", "d-none")
        
        return true
    } else {
        emailUp.classList.remove("is-valid")
        emailUp.classList.add("is-invalid")
        emailAlert.classList.replace("d-none", "d-block")
        
        return false
    }
}

function validatePass() {
    let regex = /^.{6,15}/
    if (regex.test(passwordUp.value) == true && passwordUp.value != "") {
        passwordUp.classList.add("is-valid")
        passwordUp.classList.remove("is-invalid")
        passwordAlert.classList.replace("d-block", "d-none")
        
        return true
    } else {
        passwordUp.classList.remove("is-valid")
        passwordUp.classList.add("is-invalid")
        passwordAlert.classList.replace("d-none", "d-block")
       
        return false
    }
}


function validateUp() {
    validateName()
    validateemail()
    validatePass()

    if (validateName() == true && validateemail() == true && validatePass()==true) {
       
        return true
    }else{
        
        return false
    }
}

function isExist() {

    for (let i = 0; i < userInfo.length ;i++){
        if (userInfo[i].emailUp== emailUp.value){
            existMsg.classList.replace("d-none" , "d-block")
            emailUp.classList.replace("is-valid", "is-invalid")
            console.log("exit")
            return true
        }
    }
    existMsg.classList.replace("d-block", "d-none")
    return false

}


function logIn(){
    if (emailIn.value == "" || passwordIn.value == ""){
        fillMsg.classList.replace("d-none","d-block")
        return false
    }else {
        fillMsg.classList.replace("d-block", "d-none")
        for (let i=0 ;i<userInfo.length;i++){
            if (emailIn.value == userInfo[i].emailUp && passwordIn.value==userInfo[i].passwordUp){
                errorMsg.classList.replace("d-block", "d-none")
                localStorage.setItem("loged",userInfo[i].nameUp)
                btnLogin.setAttribute("href" , "welcome.html")
            }else {
                errorMsg.classList.replace("d-none" ,"d-block")
            }
        }
        return true
    }
}

function welcomee(){
    let name =localStorage.getItem("loged")
    welcome.textContent ="Welcome " + name;
}

$("#logout").on("click" ,()=>{
    localStorage.removeItem("loged")
    $("#logout").attr("href", "index.html");
})