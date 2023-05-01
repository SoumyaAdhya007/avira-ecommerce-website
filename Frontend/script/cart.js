async function loginCheck(){
    let token=localStorage.getItem("token")
    if(!token){
     await Swal.fire({
        icon: 'error',
        title: 'You Are Not Logged In',
        text: 'Please Login to Access Bag.',
      })
      window.location.href="signup.html"
    }
  }
loginCheck()
  
function DOMLoadFun(){
    const Big_screen_sreachbar=document.getElementById("search_bar");
    const small_screen_sreachbar=document.querySelector(".input-box");
    Big_screen_sreachbar.style.display="none"
    small_screen_sreachbar.style.display="none"
}
DOMLoadFun()

let baseurl = "https://powerful-erin-jewelry.cyclic.app"
let totalCartdataPro=document.getElementById("cart-total-length");
const cartLengthSpan= document.getElementById("cart-length")
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
            let data=await cart_res.json();
            totalCartdataPro.innerText=data.length;
            if(data.length==0){
               await  Swal.fire({
                    icon: 'info',
                    text: 'Bag is empty\u{1F6D2}\nRedirecting you to Homepage',
                  })
                  return window.location.href="product.html"
            }
            if(data.length>0){
                cartLengthSpan.style.display="block";
                cartLengthSpan.innerHTML=data.length;
            }
            cartFun(data)
            total()
        }
    } catch (error) {
        console.log(error)
    }
}
cartFetch()
async function cartFun(data){
    document.getElementById("shopping-left-div").innerHTML=""

    let subtotal=0;
    let dataCart= await Promise.all(data.map(async (item)=>{
        try {
            let res = await fetch(`${baseurl}/products?id=${item.productId}`);
            if (res.ok) {
                let dataPro = await res.json();
                subtotal+=dataPro[0]["price"]*item.quantity
                  return `
                    <div class="shoping-cart-middle-left-products-child-div">
                    <div class="shopping-cart-img-div">
                    <img src="${dataPro[0]["img-1"]}"
                    alt="">
                    </div>
                    <div class="product-details">
                    <h3>${dataPro[0]["title"]}</h3>
                    <p>Color: Gulf Stream</p>
                    <p>Size: ${item.size}</p>
                    <p>Style No: ‍FM7253</p>
                    <p>In Stock</p>
                    <div class="product-details-btn-div">
                    <button class="product-edit" data-id=${item.productId} >Edit</button>
                    <p>|</p>
                    <button class="product-remove" data-id=${item.productId}>Remove</button>
                    </div>
                    </div>
                    <div class="product-cart-deatils">
                    <p>&#8377;${dataPro[0]["price"]}</p>
                    
                    <p>${item.quantity}</p>
                    <p>&#8377;${dataPro[0]["price"]*item.quantity}</p>
                    </div>
                    </div>
                    `
                ;
    
            }
        } catch (error) {
            console.log(error)
        }
    }))
    document.getElementById("shopping-left-div").innerHTML=dataCart.join(" ");
    total(subtotal)
    document.getElementById("promo-code-apply").addEventListener("click",()=>{
        let promoCode=document.getElementById("promo-code").value;
        if(promoCode==="Avira20"){
            Swal.fire({
                title: 'Hurray You are getting a 20% discount.',
                width: 600,
                padding: '3em',
                color: '#716add',
                background: '#fff url(/images/trees.png)',
                backdrop: `
                  rgba(0,0,123,0.4)
                  url("/images/nyan-cat.gif")
                  left top
                  no-repeat
                `
              })
           return promo(subtotal)
        }else{
           return Swal.fire('Invalid Promo Code')
        }
    })
    let edit = document.querySelectorAll(".product-edit");
    for(let btn of edit){
        btn.addEventListener("click",(event)=>{
			let id = event.target.dataset.id;
            localStorage.setItem("product-id",id)
            window.location.href="product_view.html"
        })
    }
    let remove = document.querySelectorAll(".product-remove");
      for(let btn of remove){
          btn.addEventListener("click",  (event)=>{ 
			let id = event.target.dataset.id;
            deleteCartData(id)
            
		});
      }
}


async function deleteCartData(id){
    try {
        let cart_res= await fetch(`${baseurl}/carts/remove/${ id}`,{
            method: "DELETE",
            headers: {
                  "Content-Type": "application/json",
                  Authorization: localStorage.getItem("token")

                },
            },
        )
        if(cart_res.ok){
            cartFetch()
        }
    } catch (error) {
        console.log(error)
    }
}
function promo(subtotal){
    

     let total=(subtotal+100+500)
     let discount=Math.floor(total - ( total*20/100 ))
     document.getElementById("order-total").innerText=discount;
    
}
let total_price;
function total(subtotal){
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
let paypal=document.querySelector(".paypal-btn-div")
function checkFun(){

localStorage.setItem("total-price",total_price)
localStorage.setItem("total-card",cartItme.length);
let otp = prompt("Please enter the OTP for reservation"); {
    if (otp == 1234) {
        // alert("Payment Successful")
        Swal.fire(
            'Good job!',
            'Payment Successful',
            'success'
          )
          orderFun()
    } else { 
        Swal.fire(
            'Oops',
            'Wrong OTP Try Again',
            'error'
          )
    }
}

}
paypal.addEventListener("click",()=>{
    Swal.fire('Currently Paypal is not available.')
})

async function orderFun(){
    try {
        let res = await fetch(`${baseurl}/orders/place`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token"),

            },
        })
        if(res.ok){
            Swal.fire(
                'Good job!',
                'Order Placed Sucessfully',
                'success'
              )
              cartFetch()
        }
    } catch (error) {
        console.log(error)
    }
}