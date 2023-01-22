// var text = ["Welcome", "Hi", "Sup dude"];
// var counter = 0;
// var elem = document.getElementById("changeText");
// var inst = setInterval(change, 1000);

// function change() {
//   elem.innerHTML = text[counter];
//   counter++;
//   if (counter >= text.length) {
//     counter = 0;
//     // clearInterval(inst); // uncomment this if you want to stop refreshing after one cycle
//   }
// }
// <div id="changeText"></div>

// JavaScript to toggle dropdown menu on click

let cartTotal=document.getElementById("cart-length");
cartTotal.innerText=""
cartTotal.innerText=`${localStorage.getItem("cart-length")||0}`;


const dropdownMenus = document.querySelectorAll('nav ul li');

dropdownMenus.forEach(menu => {
  menu.addEventListener('click', () => {
    menu.querySelector('ul').classList.toggle('show');
  });
});

// document.addEventListener("click", closeAllSelect);
function scrollright(){
  document.getElementById("section3").scrollLeft += 400;
}
function scrollleft(){
  document.getElementById("section3").scrollLeft -= 400;
}

window.onscroll = function() {myFunction()};

var navbar = document.querySelector(".header");
var sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}