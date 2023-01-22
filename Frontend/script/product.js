let baseurl = "http://localhost:7070"

function clickimg(smallImg) {
    let fullImg = document.getElementById("imagebox");
    fullImg.src = smallImg.src
}



let dataArr = []
async function productfetch() {
    let productId = localStorage.getItem("product-id");
    // console.log(productId)
    try {
        let res = await fetch(`${baseurl}/products?id=${productId}`);
        if (res.ok) {
            let dataPro = await res.json();
            // console.log(dataPro)
            dataArr = [...dataPro]
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
                    <!-- <span>55.00</span> -->
                    <span>${data.rating}/5(899)</span>
                    <span class="fa fa-star"></span>
                </div>
                <div class="price-box">
                    <p class="price">$${data.price}</p>
                    <strike>${data.price + 200}</strike>
                </div>
                <div class="klarna-log-div">
                    <div class="klarna-log-child-div">
                        <div></div>
                    </div>
                    <div>
                        <p>4 interest-free payments of $92.72.</p>
                        <span>Learn More</span>
                    </div>
                </div>
                <div class="sale">
                    <p> <i class="fa-solid fa-tag"></i>Sale</p>
                </div>
                <button>Standard</button>
                <p class="select-text">Size:</p>
                <select name="size" id="size" onclick='sizefun()'>
                    <option value="select size">Select Size</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="X">X</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                </select>
                <p class="select-text">Ouantitiy</p>
                <select name="QTY" id="QTY"  onclick='qtyFun()'>
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

let size = "";
let quantity = ""
function sizefun() {
    let select = document.getElementById('size');
    let option = select.options[select.selectedIndex];
    size = option.value
    console.log(option.value)
}
function qtyFun() {
    let select = document.getElementById('QTY');
    let option = select.options[select.selectedIndex];

    quantity = +(option.value)||1;
    console.log(quantity)
}

// let addCart= document.getElementById("add-cart");
// addCart.addEventListener("click",addFun);
let checkArr = []
async function cartFetch() {
    try {
        let cart_res = await fetch(`${baseurl}/carts/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token")
            },
        },
        )
        if (cart_res.ok) {
            let data = await cart_res.json();
            checkArr = [...data]
        }
    } catch (error) {
        console.log(error)
    }
}
cartFetch();

async function addFun() {
    let cartAddData = dataArr[0];
    let obj = {
        "img-1": cartAddData["img-1"],
        "img-2": cartAddData["img-2"],
        "img-3": cartAddData["img-3"],
        "img-4": cartAddData["img-4"],
        "title": cartAddData["title"],
        "price": cartAddData["price"],
        "category": cartAddData["category"],
        "rating": cartAddData["rating"],
        "size": size,
        "quantity": quantity,
        "subtotal":+(cartAddData["price"]) * quantity||+(cartAddData["price"]) * 1,
        "stock": cartAddData["stock"],
        "adminId": cartAddData['adminId']
    }
    console.log(obj)
    let count = 0;
    for (let i = 0; i < checkArr.length; i++) {
        if (checkArr[i]["title"] == cartAddData["title"]) {
            count++;
        }
        // console.log(checkArr[i]["title"])
    }

    console.log(count)
    if (count == 0) {
        try {

            let res = await fetch(`${baseurl}/carts/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
                body: JSON.stringify(obj)
            })
            if (res.ok) {
                productfetch()
                alert("Added To cart");
            }

        }
        catch (error) {
            console.log(error)
        }
    }  
    else {
        productfetch()
        alert("Product Already dded to Your Cart");
    }
    // console.log("Added to cart section")
}
