

// ---------------------dom content loading function ------------------------------------------------------ 
document.addEventListener('DOMContentLoaded', () => {

  //   --------------------- header variables ---------------------------------------------------------------- 
  const  menu = document.querySelector('.menu');
  const menuMain = menu.querySelector(".menu-main");
  const goBack = menu.querySelector(".go-back");
  const menuTrigger = document.querySelector(".mobile-menu-trigger");
  const closeMenu = menu.querySelector(".mobile-menu-close");
  const cartLengthSpan= document.getElementById("cart-length")
  const profile=document.getElementById("profile");
  cartLengthSpan.style.display="none";
  
  let subMenu;
  menuMain.addEventListener("click", (e) =>{
     if(!menu.classList.contains("active")){
        return;
     }
    if(e.target.closest(".menu-item-has-children")){
        const hasChildren = e.target.closest(".menu-item-has-children");
       showSubMenu(hasChildren);
    }
  });
  goBack.addEventListener("click",() =>{
      hideSubMenu();
  })
  menuTrigger.addEventListener("click",() =>{
      toggleMenu();
  })
  closeMenu.addEventListener("click",() =>{
      toggleMenu();
  })
  document.querySelector(".menu-overlay").addEventListener("click",() =>{
     toggleMenu();
  })
  
  
  function toggleMenu(){
     menu.classList.toggle("active");
     document.querySelector(".menu-overlay").classList.toggle("active");
  }
  // --------------------show sub menu function -------------------------------------------------------- 
  
  function showSubMenu(hasChildren){
     subMenu = hasChildren.querySelector(".sub-menu");
     subMenu.classList.add("active");
     subMenu.style.animation = "slideLeft 0.5s ease forwards";
     const menuTitle = hasChildren.querySelector("i").parentNode.childNodes[0].textContent;
     menu.querySelector(".current-menu-title").innerHTML=menuTitle;
     menu.querySelector(".mobile-menu-head").classList.add("active");
  }
  
  // --------------------hide sub menu function -------------------------------------------------------- 
  
  function  hideSubMenu(){  
     subMenu.style.animation = "slideRight 0.5s ease forwards";
     setTimeout(() =>{
        subMenu.classList.remove("active");	
     },300); 
     menu.querySelector(".current-menu-title").innerHTML="";
     menu.querySelector(".mobile-menu-head").classList.remove("active");
  }
  
  window.onresize = function(){
     if(this.innerWidth >991){
        if(menu.classList.contains("active")){
           toggleMenu();
        }
  
     }
  }

  
  // -------------------------------------------------------------------------
  // storing sub-category ( gender & sub-category) value in localStorage 
  // --------------------------------------------------------------------------
  // -------------------mens sub category----------------------------------
//   let T_Shirts_men=document.getElementById("T-Shirts-men");
//   T_Shirts_men.addEventListener("click", ()=>{
//      localStorage.setItem("gender","male");
//      localStorage.setItem("category","t-shirt");
  
//   })
//   let Shirts_men=document.getElementById("Shirts-men");
//   Shirts_men.addEventListener("click", ()=>{
//      localStorage.setItem("gender","male");
//      localStorage.setItem("category","casual shirts");
  
//   })
//   // -------------------women sub category----------------------------------
  
//   let kurtas_suits= document.getElementById("kurtas-suits");
//   kurtas_suits.addEventListener("click",()=>{
//      localStorage.setItem("gender","female");
//      localStorage.setItem("category","kurtas suits");
     
//   })
//   let sarees= document.getElementById("sarees");
//   sarees.addEventListener("click",()=>{
//      localStorage.setItem("gender","female");
//      localStorage.setItem("category","sarees");
     
//   })
//   // -------------------kids => boys sub category----------------------------------
  
//   let t_shirts_boys= document.getElementById("t-shirts-boys");
//   t_shirts_boys.addEventListener("click",()=>{
//      localStorage.setItem("gender","male");
//      localStorage.setItem("category","t-shirts boys");
//   })
//   let jeans_boys= document.getElementById("jeans-boys");
//   jeans_boys.addEventListener("click",()=>{
//      localStorage.setItem("gender","male");
//      localStorage.setItem("category","jeans boys");
//   })
//   // -------------------kids => girls sub category----------------------------------
  
//   let dresses_girl= document.getElementById("dresses-girl");
//   dresses_girl.addEventListener("click",()=>{
//      localStorage.setItem("gender","female");
//      localStorage.setItem("category","dresses girl");
//   })
//   let tops_girl= document.getElementById("tops-girl");
//   tops_girl.addEventListener("click",()=>{
//      localStorage.setItem("gender","female");
//      localStorage.setItem("category","tops girl");
//   })
  
  
  // ---------------------------------showing user profile page after login------------------------------------------------
  let token= localStorage.getItem("token")
  let mobile= localStorage.getItem("mobile")
  function profileFun(){
  
     let login_signUp= document.getElementById("login-signup")
     let profile=document.getElementById("profile");
     if(token && mobile){
     login_signUp.style.display="none";
     profile.style.display="block";
     }
     else{
        profile.style.display="none";
     }
  }
  profileFun()
  
  
  // ======================= small display search animation ========================================= 
  
  // ---- ---- Const ---- ---- //
  let imgDiv=document.getElementById("img-div");
  let hambergur= document.querySelector(".mobile-menu-trigger")
  let iconDivs=document.querySelectorAll(".icon-div"),
  iconBagDiv = document.querySelector('.icon-bag-div'),
  inputBox = document.querySelector('.input-box'),
  searchIcon = document.querySelector('.search'),
  closeIcon = document.querySelector('.close-icon');
  
  // ---- ---- Open Input ---- ---- //
  let click = false;
  
  searchIcon.addEventListener('click', () => {
    if (!click) {
      inputBox.classList.add('open');
      imgDiv.style.display = 'none';
      menu.style.display = 'none';
      for (let i = 0; i < iconDivs.length; i++) {
        iconDivs[i].style.display = 'none';
      }
     profileFun()
  
      iconBagDiv.style.display = 'none';
      hambergur.style.display = 'none';
      click = true;
    } else {
      inputBox.classList.remove('open');
      imgDiv.style.display = 'block';
      menu.style.display = 'block';
      for (let i = 0; i < iconDivs.length; i++) {
        iconDivs[i].style.display = 'block';
      }
     profileFun()
  
      iconBagDiv.style.display = 'block';
      hambergur.style.display = 'flex';
      click = false;
    }
  });
  
  // ---- ---- Close Input ---- ---- //
  
  closeIcon.addEventListener('click', () => {
  inputBox.classList.remove('open');
  imgDiv.style.display="block"
  menu.style.display="block";
  
  // iconDiv.style.display="block"
  for (let i = 0; i < iconDivs.length; i++) {
     iconDivs[i].style.display = "block";
  }
  profileFun()
  iconBagDiv.style.display="block";
  hambergur.style.display="flex";
  
  });
  
  
  // --------------------------------function for total cart length -----------------------------------------------------
  async function caertLengthFun(){
     try {
        
        let cartRes= await fetch("https://powerful-erin-jewelry.cyclic.app/carts",{
           method: "GET",
           headers: {
              "Content-Type": "application/json",
              Authorization:localStorage.getItem("token") ,

           },
           
        })
     // console.log(cartRes)
        if(cartRes.ok){
        let data= await cartRes.json();
        if(data.length>0){
     
           cartLengthSpan.style.display="block";
     
           cartLengthSpan.innerHTML=data.length;
        }
           }
     } catch (error) {
        console.log({err:error})
     }
  }
  caertLengthFun()
  
  });
  