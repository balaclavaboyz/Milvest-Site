const cookie=document.querySelector(".cookie")
const cookie_button=document.querySelector(".cookie-btn")

cookie_button.addEventListener("click",()=>{
    cookie.classList.remove("active");
    localStorage.setItem("cookieBanner","True")
})

setTimeout(()=>{
    if(!localStorage.getItem("cookieBanner")){
        cookie.classList.add("active")
    }
}, 2000)
