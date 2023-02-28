

let navdeatils=()=>{
    let cartTotal=document.getElementById("cart-length");
cartTotal.innerText=""
cartTotal.innerText=`${localStorage.getItem("cart-length")||0}`;

}

module.exports={
    navdeatils
}