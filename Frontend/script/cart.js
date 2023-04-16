let baseurl = "https://powerful-erin-jewelry.cyclic.app"


    // let cartTotal=document.getElementById("cart-length");
  

let totalCartItem=document.getElementById("cart-total-length");
let cartItme=[]
let cart_total_length;
async function cartFetch(){
    try {
        let cart_res= await fetch(`${baseurl}/carts/`,{
            method: "GET",
            headers: {
                  "Content-Type": "application/json",
                  Authorization: localStorage.getItem("token")
                },
            },
        )
        if(cart_res.ok){
            let data=await cart_res.json();;
            console.log(data.length)
            localStorage.setItem("cart-length",data.length);
            // cart_total_length=data.length;
            cartItme=[...data];
            cartFun(data);
            total()
        }
    } catch (error) {
        console.log(error)
    }
}
cartFetch()
function cartFun(data){
    totalCartItem.innerText=""
    document.getElementById("shopping-left-div").innerHTML=""
    // cartTotal.innerText=""
    // cartTotal.innerText=`${localStorage.getItem("cart-length")||0}`;

    let dataCart=data.map((item)=>{
        return`
        <div class="shoping-cart-middle-left-products-child-div">
        <div class="shopping-cart-img-div">
        <img src="${item["img-1"]}"
        alt="">
        </div>
        <div class="product-details">
        <h3>${item["title"]}</h3>
        <p>Color: Gulf Stream</p>
        <p>Size: ${item.size||"S"}</p>
        <p>Style No: ‍FM7253</p>
        <p>In Stock</p>
        <div class="product-details-btn-div">
        <button class="product-edit" >Edit</button>
        <p>|</p>
        <button class="product-remove" data-id=${item._id}>Remove</button>
        </div>
        </div>
        <div class="product-cart-deatils">
        <p>&#8377;${item["price"]}</p>
        
        <p>${item["quantity"]||1}</p>
        <p>&#8377;${item["subtotal"]}</p>
        </div>
        </div>
        `
    });
    document.getElementById("shopping-left-div").innerHTML=dataCart.join(" ");
    totalCartItem.innerText=`${localStorage.getItem("cart-length")}`

    // let cartDataId;
    let remove = document.querySelectorAll(".product-remove");
      for(let btn of remove){
        // console.log(btn)
          btn.addEventListener("click",  (event)=>{ 
			let data_id = event.target.dataset.id;
            console.log(data_id)
            cartDataId=data_id;
            deleteCartData(data_id)
            // localStorage.setItem("product-id",data_id)
            // window.location.href="product.html"
			// DeleteBtn(data_id);
		});
      }
}


async function deleteCartData(data_id){
    try {
        let cart_res= await fetch(`${baseurl}/carts/delete/${data_id}`,{
            method: "DELETE",
            headers: {
                  "Content-Type": "application/json",
                  Authorization: localStorage.getItem("token")
                },
            },
        )
        if(cart_res.ok){
            // let data=await cart_res.json();
            // cartFun(data);
            // alert("Your Product Remove From Your Cart");
            cartFetch()
        }
    } catch (error) {
        console.log(error)
    }
}
// 63cc35db125de9d8dec81673
// 63cc35db125de9d8dec81673


// function displayCart(cartItme){
//     document.querySelector(".shoping-cart-middle-right-div").innerHTML=null;
//     let cartTotal=cartItme.reduce((a,b)=>{
//         return a+Number(b.price)*b.quantity;;
//     },0)
//     document.getElementById("oder-subtotal").innerText= `₹${cartTotal}`;
//     document.querySelector("#total").innerText=`₹${cartTotal}`;
//     localStorage.setItem("cart-total",JSON.stringify(cartTotal));

function promo(){
    let promoCode=document.getElementById("promo-code").value;
    if(promoCode==="Masai"){
        let subtotal=0
     for(let i=0;i<cartItme.length;i++){
       subtotal+= cartItme[i].subtotal;
     }

     let total=(subtotal+100+500)
     let discount=Math.floor(total - ( total*20/100 ))
     document.getElementById("order-total").innerText=discount;
        console.log(discount)
    }
}
let total_price;
function total(){
    let subtotal=0
    for(let i=0;i<cartItme.length;i++){
        subtotal+= cartItme[i].subtotal;
      }
      let delevary=Math.floor(((subtotal/100)*8)+100)
      let tax=Math.floor((subtotal/100)*18);
      total_price=Math.floor(subtotal+100+500)

     document.getElementById("oder-subtotal").innerText=`₹${subtotal}`;
     document.getElementById("order-total").innerText=`₹${total_price}`;
     document.getElementById("oder-delevary-charge").innerText=`₹${delevary}`;
     document.getElementById("oder-tax").innerText=`₹${tax}`;


}

let checkOutBtn=document.getElementById("checkout");
checkOutBtn.addEventListener("click",checkFun);

function checkFun(){

localStorage.setItem("total-price",total_price)
localStorage.setItem("total-card",cartItme.length);
let otp = prompt("Please enter the OTP for reservation"); {
    if (otp == 1234) {
        alert("Payment Successful")
    } else {
        alert("Wrong OTP Try Again")
    }
}

}