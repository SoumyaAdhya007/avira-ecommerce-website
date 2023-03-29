let baseURL="https://powerful-erin-jewelry.cyclic.app"
let container = document.getElementById('container')


toggle = () => {
	container.classList.toggle('sign-in')
	container.classList.toggle('sign-up')
}

setTimeout(() => {
	container.classList.add('sign-in')
}, 200)


async function signUpFun() {
	let name = document.getElementById("name").value;
	let email = document.getElementById("email").value;
	let zipcode = document.getElementById("zipcode").value;
	let phoneno = document.getElementById("phoneno").value;
	// let gender = document.querySelector('input[name="gender"]:checked').value;
	let password = document.getElementById("password").value;
	let confirmPassword = document.getElementById("confirmpassword").value;
	if(password!=confirmPassword){
		alert("Give Correct Password")
	}else{
		let obj = {
			name: name,
			email: email,
			password: confirmPassword,
			zipcode: zipcode,
			phoneNo: phoneno,
			// gender: gender
		}
	
		try {
			let signup_res= await fetch(`${baseURL}/users/register`,{
				method:"POST",
				headers:{
				  "Content-Type":"application/json"
				},
				body:JSON.stringify(obj)
			  })
			  if(signup_res.ok){
				  let massage= await signup_res.json()
				console.log(massage.msg)
				alert(`${massage.msg}`)
			  }
		} catch (error) {
			alert("Something went wrong")
		}
	}
	
}

async function signin(){
	try {
	  let email=document.getElementById("login_email").value;
	  let password=document.getElementById("login_pass").value;
	  
	  let obj={
		email,
		password
	  }
	  console.log(obj)
	  let login_request= await fetch(`${baseURL}/users/login`,{
		method:"POST",
		headers:{
		  "Content-Type":"application/json"
		},
		body:JSON.stringify(obj)
	  })
	  if(login_request.ok){
		let token =await login_request.json();
		localStorage.setItem("token",token.token)
		console.log(token.token)
		alert(`${token.msg}`)
		window.location.href = "index.html";
  
	  }
	  else{
		alert("User not found.");
  
	  }
	} catch (error) {
	  alert("wrong username or password. Please try again later.");
	  console.log(error)
	  
	}
  }