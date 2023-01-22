let baseurl="http://localhost:7070"


function sizeRange(checkbox) {
    
    var checkboxes = document.getElementsByName('size-range')
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false
    })

    // let size_range=document.querySelector('input[name="size-range"]:checked').value;
    // console.log(size_range);
    // query=""
    // value=size_range||"tall"
    // fetchProducts(value)
}
// function sizeRange(){
//     let size_range=document.querySelector('input[name="size-range"]:checked').value;
//     console.log(size_range)
// }

// let divbtn=document.querySelector(".shop-items-child-div");
// divbtn.addEventListener("click",aclick)


// function cartAdd(){
//     console.log("Added to cart")
// }
let querry;
let value;



let category="Men"
async function fetchProducts(){
try {
        let res= await fetch(`${baseurl}/products?category=Men`);
        if(res.ok){
            let data=await res.json();
            dataFuntion(data)
            console.log(data)
        }
    
} catch (error) {
    console.log(error)
    // alert("Fetching problem")
}
}
fetchProducts()

async function price(){
	let price = document.querySelector('input[name="price"]:checked').value;
   
    // console.log(querry,value)
    // fetchProducts(querry,value)
    console.log(price)
    try {
        let res= await fetch(`${baseurl}/products?price=${price}&category=Men`);
        if(res.ok){

            let data=await res.json();
            dataFuntion(data)
            console.log(data)
        }
    } catch (error) {
        console.log(error)
    }
}
let dataContainer=document.getElementById("wrapper")
function dataFuntion(data){
    dataContainer.innerHTML="";
   let allData= data.map((item)=>{
        
        return`<figure class="shop-items-child-div"  >
        <div class="hover-animation" data-id=${item._id} >
            <img class="img-back" src="${item["img-1"]}" alt="">
            <div class="btn-add" >
                <button onclick="cartAdd()">Add to Cart</button>

            </div>
            <img class="img-front" data-id=${item._id} src="${item["img-2"]}" alt="">
            
        </div>
        <figcaption>
            <span>Brand Heading</span>
            <h4>${item.title}</h4>
            <div>
                <h3>&#8377;${item.price}</h3>
                <strike>&#8377;${item.price+200}</strike>
            </div>
            <p>&#8377;offer price ${item.price-50}</p>
        </figcaption>
    </figure>`
    })
    dataContainer.innerHTML=allData.join(" ")
    let click = document.querySelectorAll(".shop-items-child-div");
      for(let btn of click){
        // console.log(btn)
          btn.addEventListener("click",(event)=>{ 
			let data_id = event.target.dataset.id;
			// console.log(data_id,typeof data_id);
            // console.log(data_id)
            localStorage.setItem("product-id",data_id)
            window.location.href="product.html"
			// DeleteBtn(data_id);
		});
      }
}
