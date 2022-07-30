let signupForm = document.getElementById("signupForm");
let signupButton = document.getElementById("signupButton");

let signinForm = document.getElementById("signinForm");
let signinButton = document.getElementById("signinButton");


  
const signUpRequest = async (firstName, lastName, email, password) => {
    let response = await fetch(url,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "password": password
        }),
            });
    // if the response is bad
    if(!response.ok){
        throw new Error(`There is an error with status ${response.status}`)
    }
    let usersJson = response.json();
    console.log(usersJson)
    return usersJson;
}

const signUp = async (event) =>{
    event.preventDefault();
    url="http://localhost:8080/api/user/signup";
    let user = await signUpRequest(signupForm.FirstName.value, signupForm.LastName.value, signupForm.email.value, signupForm.password.value);
    let storedUserId=localStorage.setItem("user_id", JSON.stringify(user.id));
}

const signInRequest = async () => {
    let response = await fetch(url);
    // if the response is bad
    if(!response.ok){
        throw new Error(`There is an error with status ${response.status}`)
    }
    let usersJson = response.json();
    console.log(usersJson)
    return usersJson;
}
const signIn = async(event) =>{
event.preventDefault();
    url=`http://localhost:8080/api/user/signin?email=${signinForm.email.value}&password=${signinForm.password.value}`;
    let user = await signInRequest();
    let storedUserId=localStorage.setItem("user_id", JSON.stringify(user.id));
}

if (signupButton != null){
    signupButton.addEventListener('click',signUp);
}
if(signinButton !=null){
    signinButton.addEventListener('click', signIn);
}
