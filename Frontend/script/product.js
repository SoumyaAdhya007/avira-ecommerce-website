function DOMLoadFun(){
    const Big_screen_sreachbar=document.getElementById("search_bar");
    const small_screen_sreachbar=document.querySelector(".input-box");
    Big_screen_sreachbar.style.display="none"
    small_screen_sreachbar.style.display="none"
}
DOMLoadFun()
const cartLengthSpan= document.getElementById("cart-length")
let baseurl = "https://powerful-erin-jewelry.cyclic.app";

async function caertLengthFun(){
    try {
       
       let cartRes= await fetch(`${baseurl}/carts`,{
          method: "GET",
          headers: {
             "Content-Type": "application/json",
             Authorization:localStorage.getItem("token") ,

          },
          
       })
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


function clickimg(smallImg) {
    let fullImg = document.getElementById("imagebox");
    fullImg.src = smallImg.src
}



let dataArr = []
async function productfetch() {
    let productId = localStorage.getItem("product-id");
    try {
        let res = await fetch(`${baseurl}/products?id=${productId}`);
        if (res.ok) {
            let dataPro = await res.json();
            dataArr = [...dataPro]
            localStorage.setItem("adminId", dataPro[0].adminId)
            productFun(dataPro)

        }
    } catch (error) {
        console.log(error)
    }
}
productfetch();


let container = document.querySelector(".container")
function productFun(dataPro) {
    container.innerHTML=""
    let data = dataPro[0];
    let productData =

        `<div class="wraper">
        <div class="product-box">
            <div class="all-images">

                <div class="small-images">
                    <img src="${data["img-1"]}"
                        onclick="clickimg(this)">
                    <img src="${data["img-2"]}"
                        onclick="clickimg(this)">
                    <img src="${data["img-3"]}"
                        onclick="clickimg(this)">
                    <img src="${data["img-4"]}"
                        onclick="clickimg(this)">
                </div>
                <div class="main-images">
                    <img src="${data["img-1"]}"
                        id="imagebox">

                </div>
            </div>

        </div>
        <div class="text">
            <div class="content">
                <h2>${data["title"]}</h2>
                <div class="review">
                    <span>${data.rating}/5(899)</span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>
                </div>
                <div class="price-box">
                    <p class="price-price">&#8377;${data.price}</p>
                    <strike>&#8377;${data.price + 200}</strike>
                </div>
                <div class="klarna-log-div">
                    <div class="klarna-log-child-div">
                        <div></div>
                    </div>
                    <div>
                        <p>4 interest-free payments of &#8377;92.72.</p>
                        <span>Learn More</span>
                    </div>
                </div>
                <div class="sale">
                    <p> <i class="fa-solid fa-tag"></i>Sale</p>
                </div>
                <button>${data["size-rage"]}</button>
                <p class="select-text">Size:</p>
                <select name="size" id="size" onclick='sizefun()' required>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="X">X</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                </select>
                <p class="select-text">Ouantitiy</p>
                <select name="QTY" id="QTY"  onclick='qtyFun()' required>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="10">10</option>
                </select>
                <p><i class="fa-solid fa-circle-exclamation"></i>Runs Large <span
                        style="text-decoration: underline;font-weight: bold;">Consider sizing down</span></p>
                <button id="add-cart" onclick='addFun()'>
                    <span class="fa fa-shoping-cart"></span>
                    Add to Cart
                </button>
                <p class="select-text"><i class="fa-solid fa-dollar-sign"></i> Members get <span
                        style="text-decoration: underline;font-weight: bold;">Members get free shipping + $1.40 in
                        rewards</span></p>
            </div>
        </div>
    </div>
    <hr>
    <div id="details">

            <h3 >Details</h3>
                <h3>ON AND OFF THE WATER</h3>
                <p>Made for comfort and functionality while fishing or just enjoying the outdoors. The Tamiami
                    features wicking, sun-shielding fabric.</p>
                <h3>COOLING</h3>
                <p>Mesh-lined back vents let in and out a cooling breeze in the hottest, muggiest weather.</p>
                <h3>SUBTLE UTILITY</h3>
                <p>A rod holder and plenty of low-profile pockets free up your hands, while the sleeves roll-up for
                    versatility.</p>
                <ul>
                    <li>Omni-Shade UPF 40 provides maximum protection for long hours in the sun</li>
                    <li>Omni-Wick technology actively breathes and pulls moisture away from your skin</li>
                    <li>Quick dry</li>
                    <li>Roll-up sleeves with tab holders</li>
                    <li>Antimicrobial treatment protects this product from bacterial growth</li>
                    <li>Mesh-lined vent at center back</li>
                    <li>Rod holder</li>
                    <li>Center Back Length: 30.5"</li>
                    <li>Imported</li>
                </ul>

    </div>`;

    container.innerHTML = productData;
}

async function addFun() {
        try {
            let obj={
                productId:localStorage.getItem("product-id"),
                adminId:localStorage.getItem("adminId"),
                quantity:document.getElementById("QTY").value,
                size:document.getElementById("size").value,
            }
            console.log(obj)
            let res = await fetch(`${baseurl}/carts/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),

                },
                body: JSON.stringify(obj)
            })
            let data= await res.json()
            console.log(data)
            if(res.status==401){
               return Swal.fire({
                    title: 'Please log in or create an account to add this item to your bag',
                    showClass: {
                      popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                      popup: 'animate__animated animate__fadeOutUp'
                    }
                  })
            }
            if(res.status==409){
                
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Product already in cart',
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
            if (res.ok) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Added To bag',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  document.getElementById("add-cart").innerText="Added To bag";
                    caertLengthFun()
                  return;
            }

        }
        catch (error) {
            console.log(error)
        }
    }  

