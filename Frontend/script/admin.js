let baseurl = "https://powerful-erin-jewelry.cyclic.app"

let dataContainer = document.getElementById("wrapper")
let formDiv = document.getElementById("product-form");

let allproperties = document.getElementById("allproperties");
let dashboradDiv = document.getElementById("dashboard");
formDiv.style.display = "none"


let dashBtn=document.getElementById("dashBtn");
dashBtn.addEventListener("click",dashboard)
function dashboard(){
    dashboradDiv.innerHTML="";
    dashboradDiv.style.display ="block"
    dataContainer.style.display = "none";
    let data= `
    <div class="dash-top">
        <div>
            <h1 id="new-order">${localStorage.getItem("total-card")||5}</h1>
            <p>New Oders</p>
        </div>
        <div>
            <h1 id="total-sale">${localStorage.getItem("total-price")||1600}</h1>
            <p>Total Sales</p>
        </div>
        <div>
            <h1 id="Unique-users">2</h1>
            <p>Unique Users</p>
        </div>
    </div>
`
dashboradDiv.innerHTML=data;

    
}
dashboard()





// let maincontainer=document.getElementById("product-container")
allproperties.addEventListener("click", allproduct)

async function allproduct() {
    try {
        let allData_res = await fetch(`${baseurl}/products/admin/${localStorage.getItem("admin-id")}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("admin-token")
            },
        },
        )
        if (allData_res.ok) {
            let data = await allData_res.json();;
            // cartItme=[...data]
            dataFuntion(data);
            deleteFetch(data)
            // total()
        }
    } catch (error) {
        console.log(error)
    }
}


async function searchProduct() {
    try {
        let searchItem = document.getElementById("search").value;
        let allData_res = await fetch(`${baseurl}/products/admin/${localStorage.getItem("admin-id")}?title=${searchItem}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("admin-token")
            },
        },
        )
        if (allData_res.ok) {
            let data = await allData_res.json();;
            // cartItme=[...data]
            dataFuntion(data);
            // total()
        }
    } catch (error) {
        console.log(error)
    }
}

let addnewProduct = document.getElementById("addnew");
addnewProduct.addEventListener("click", addProductForm);
function addProductForm() {
    dataContainer.style.display = "none";
    formDiv.style.display = "block";



}
let size=""
function sizeRangeFun() {
    let select = document.getElementById('size-range');
    let option = select.options[select.selectedIndex];
    size = option.value
    console.log(option.value)
}
let obj;

function showProduct(){
    let img_1=document.getElementById("img-I").value;
    let img_2=document.getElementById("img-II").value;
    let img_3=document.getElementById("img-III").value;
    let img_4=document.getElementById("img-IV").value;
    let title=document.getElementById("title").value;
    let price=document.getElementById("price").value;
    let type=document.getElementById("product-category").value;
    let category=document.getElementById("category").value;
    let rating=document.getElementById("rating").value;
    let size_range=size;
    let stock=true;
     obj={
        "img-1":img_1,
        "img-2":img_2,
        "img-3":img_3,
        "img-4":img_4,
        "title":title,
        "price":price,
        "product-category":type,
        "category":category,
        "rating":rating,
        // "size":[],
        "size-rage":size_range,
        "stock":stock
    }
    productFun(obj)
    console.log(obj)
}

function productFun(obj) {
    // formDiv.style.display = "none";
    formDiv.innerHTML = "";

    dataContainer.style.display = "none";
    let data = obj;
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
                    <span>${data["rating"]}/5(899)</span>
                    <span class="fa fa-star"></span>
                </div>
                <div class="price-box">
                    <p class="price-price">&#8377;${data["price"]}</p>
                    <strike>&#8377;${+(data["price"]) + 200}</strike>
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
                <button id="add-cart" onclick='addFun()'>
                    <span class="fa fa-shoping-cart"></span>
                    Add Product
                </button>
                `;

    formDiv.innerHTML = productData;

}
function clickimg(smallImg) {
    let fullImg = document.getElementById("imagebox");
    fullImg.src = smallImg.src
}
async function addFun() {
let productObj=obj
    console.log(productObj)
 
        try {

            let res = await fetch(`${baseurl}/products/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("admin-token"),
                },
                body: JSON.stringify(productObj)
            })
            if (res.ok) {
                alert("Your Product Is been Added");
                allproduct()
            }

        }
        catch (error) {
            console.log(error)
        }
    }  

    // console.log("Added to cart section")

let deleteBtn=document.getElementById("delete");
deleteBtn.addEventListener("click",deleteFun)

async function deleteFun(){
    try {
        let allData_res = await fetch(`${baseurl}/products/admin/${localStorage.getItem("admin-id")}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("admin-token")
            },
        },
        )
        if (allData_res.ok) {
            let data = await allData_res.json();;
            // cartItme=[...data]
            // dataFuntion(data);
            deleteFetch(data)
            // total()
        }
    } catch (error) {
        console.log(error)
    }

}


// maincontainer.innerHTML=""
function dataFuntion(data) {
    dashboradDiv.style.display = "none"
    formDiv.style.display = "none"
    dataContainer.style.display = "grid";
    dataContainer.innerHTML = "";
    let allData = data.map((item) => {

        return `<figure class="shop-items-child-div">
        <div class="hover-animation" data-id=${item._id} >
            <img class="img-back" src="${item["img-1"]}" alt="">
            <div class="btn-add" >
                <button onclick="cartAdd()">Edit</button>

            </div>
            <img class="img-front" data-id=${item._id} src="${item["img-2"]}" alt="">
            
        </div>
        <figcaption>
            <h4>${item.title}</h4>
            <div>
                <h3>&#8377;${item.price}</h3>
                <strike>&#8377;${item.price + 200}</strike>
            </div>
            <p>&#8377;offer price ${item.price - 50}</p>
        </figcaption>
    </figure>`
    })
    dataContainer.innerHTML = allData.join(" ");
    // return   maincontainer.innerHTML=dataContainer;
    // let click = document.querySelectorAll(".shop-items-child-div");
    //   for(let btn of click){
    //     // console.log(btn)
    //       btn.addEventListener("click",(event)=>{ 
    // 		let data_id = event.target.dataset.id;
    // 		// console.log(data_id,typeof data_id);
    //         console.log(data_id)
    //         localStorage.setItem("product-id",data_id)
    //         // window.location.href="product.html"
    // 		// DeleteBtn(data_id);
    // 	});
    //   }
}

let admin_peoduct_id=""
function deleteFetch(data){
    formDiv.style.display = "none"
    dataContainer.style.display = "grid";
    dataContainer.innerHTML = "";
    let allData = data.map((item) => {

        return `<figure class="shop-items-child-div">
        <div class="hover-animation" data-id=${item._id} >
            <img class="img-back" src="${item["img-1"]}" alt="">
            <img class="img-front" data-id=${item._id} src="${item["img-2"]}" alt="">
        </div>
        <figcaption>
            <h4>${item.title}</h4>
            <div>
                <h3>&#8377;${item.price}</h3>
                <strike>&#8377;${item.price + 200}</strike>
            </div>
            <p>&#8377;offer price ${item.price - 50}</p>
            <button data-id=${item._id} class="deleteBtn">Delete</button>
        </figcaption>
    </figure>`
    })
    dataContainer.innerHTML = allData.join(" ");
     let click = document.querySelectorAll(".deleteBtn");
      for(let btn of click){
        // console.log(btn)
          btn.addEventListener("click",(event)=>{ 
    		let data_id = event.target.dataset.id;
    		// console.log(data_id,typeof data_id);
            console.log(data_id)
            admin_peoduct_id=data_id
            deleteCartData(data_id)
            // localStorage.setItem("admin-product-id",data_id)
            // window.location.href="product.html"
    		// DeleteBtn(data_id);
    	});
      }
}

async function deleteCartData(data_id){
    try {
        let cart_res= await fetch(`${baseurl}/products/delete/${data_id}`,{
            method: "DELETE",
            headers: {
                  "Content-Type": "application/json",
                  Authorization: localStorage.getItem("admin-token")
                },
            },
        )
        if(cart_res.ok){
            // let data=await cart_res.json();
            // cartFun(data);
            // alert("Your Product Remove From Your Cart");
            deleteFun()
        }
    } catch (error) {
        console.log(error)
    }
}