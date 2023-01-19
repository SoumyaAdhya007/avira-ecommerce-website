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