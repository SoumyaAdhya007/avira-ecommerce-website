
document.addEventListener('DOMContentLoaded', () => {
    
  const Big_screen_sreachbar=document.getElementById("search_bar");
  const small_screen_sreachbar=document.querySelector(".input-box");
  Big_screen_sreachbar.style.display="none"
  small_screen_sreachbar.style.display="none"
})
function scrollright(){
  document.getElementById("section3").scrollLeft += 400;
}
function scrollleft(){
  document.getElementById("section3").scrollLeft -= 400;
}

