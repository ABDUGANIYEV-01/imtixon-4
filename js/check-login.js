var token = window.localStorage.getItem('token')


let button = document.getElementById("logaut")
button.addEventListener('click', token =>{
    
    token = localStorage.clear()
    window.location.replace('login.html')
})

if(!token){
    window.location.replace('login.html')
}
