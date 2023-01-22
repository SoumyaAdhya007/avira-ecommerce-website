let baseurl = "http://localhost:7070"








let maincontainer=document.getElementById("displayArea")
let dataContainer=document.getElementById("wrapper")


async function allproduct(){
    try {
        let allData_res= await fetch(`${baseurl}/products/admin/`,{
            method: "GET",
            headers: {
                  "Content-Type": "application/json",
                  Authorization: localStorage.getItem("token")
                },
            },
        )
        if(allData_res.ok){
            let data=await allData_res.json();;
            // cartItme=[...data]
            allproduct(data);
            // total()
        }
    } catch (error) {
        console.log(error)
    }
}







function dataFuntion(data){
    maincontainer.innerHTML=""
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
    dataContainer.innerHTML=allData.join(" ");
    maincontainer=dataContainer;
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