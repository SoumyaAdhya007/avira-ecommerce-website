let baseurl="https://powerful-erin-jewelry.cyclic.app"
document.addEventListener('DOMContentLoaded', () => {
    
    // -----------------------big display search bar---------------------------------- 
    const search=document.getElementById("input");
    const search_bar=document.getElementById("search-bar");

    // -----------------------small display search bar---------------------------------- 
    const mobile_search=document.querySelector(".search");

    // -------------------search by enter key press----------------------------
    search.addEventListener("keypress",(e)=>{
        if(e.key=="Enter"){
            let value=document.getElementById("input").value;
            searchProduct(value)
        }
    })
    search_bar.addEventListener("click",(e)=>{
            let value=document.getElementById("input").value;
            searchProduct(value)
    })
    // -------------------search by clicking on search bar----------------------------

    search_bar.addEventListener("click",(e)=>{
            let value=document.getElementById("input").value;
            searchProduct(value)
    })
    
    // -------------------search by enter key press----------------------------
    document.getElementById("mobile-input").addEventListener("keypress",(e)=>{
        if(e.key=="Enter"){
            let value=document.getElementById("mobile-input").value;
            searchProduct(value)
        }
    })
    mobile_search.addEventListener("click",(e)=>{
            let value=document.getElementById("mobile-input").value;
            searchProduct(value)
    })

})
function sortFilter() {
    let select = document.getElementById('filter');
    let option = select.options[select.selectedIndex];
   let sortValue = option.value;
    if(sortValue==="acd"){
        priceFetch(sortValue)
    }else if(sortValue==="dcd"){
        priceFetch(sortValue)
    }else if(sortValue==="top"){
        ratingFetch(sortValue)
    }
}


async function searchProduct(value) {
    try {
        let allData_res = await fetch(`${baseurl}/products/search?title=${value}`)
        if (allData_res.ok) {
            let data = await allData_res.json();;
            dataFuntion(data);
        }
    } catch (error) {
        console.log(error)
    }
}



function sizeRange(checkbox) {
    
    var checkboxes = document.getElementsByName('size-range')
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false
    })

    let size_range=document.querySelector('input[name="size-range"]:checked').value;
    value=size_range||"tall"
    sizeFetchProducts(value)
}
let querry;
let value;

function price(){
    let priceVal=document.querySelector('input[name="price"]:checked').value;
   let priceData=+(priceVal)||500;
    priceFetch(priceData)
}




async function ratingFetch(sortValue){
try {
        let res= await fetch(`${baseurl}/products/rating?rating=${sortValue}`);
        if(res.ok){
            let data=await res.json();
            dataFuntion(data)
        }
    
} catch (error) {
    console.log(error)
}
}
async function priceFetch(priceData){
try {
        let res= await fetch(`${baseurl}/products/price?price=${priceData}`);
        if(res.ok){
            let data=await res.json();
            dataFuntion(data)
        }
    
} catch (error) {
    console.log(error)
}
}
async function sizeFetchProducts(value){
try {
        let res= await fetch(`${baseurl}/products?sizerange=${value}`);
        if(res.ok){
            let data=await res.json();
            dataFuntion(data)
        }
    
} catch (error) {
    console.log(error)
}
}
async function fetchProducts(){
try {
        let res= await fetch(`${baseurl}/products`);
        if(res.ok){
            let data=await res.json();
            dataFuntion(data)
        }
    
} catch (error) {
    console.log(error)
}
}
fetchProducts()

let dataContainer=document.getElementById("wrapper")
function dataFuntion(data){
    dataContainer.innerHTML="";
   let allData= data.map((item)=>{
        
        return`<figure class="shop-items-child-div"  >
        <div class="hover-animation" data-id=${item._id} >
            <img class="img-back" src="${item["img-1"]}" alt="">

            <img class="img-front" data-id=${item._id} src="${item["img-2"]}" alt="">
            
        </div>
        <figcaption>
            <h4>${item.title}</h4>
            <div>
                <h3>&#8377;${item.price}</h3>
                <strike>&#8377;${item.price+200}</strike>
            </div>
            <p class="rating">Rating : ${item.rating}</p>
            <p>&#8377;offer price ${item.price-50}</p>
        </figcaption>
    </figure>`
    })
    dataContainer.innerHTML=allData.join(" ")
    let click = document.querySelectorAll(".shop-items-child-div");
      for(let btn of click){
          btn.addEventListener("click",(event)=>{ 
			let data_id = event.target.dataset.id;
            localStorage.setItem("product-id",data_id)
            window.location.href="product_view.html"
		});
      }
}
