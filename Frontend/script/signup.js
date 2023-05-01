document.addEventListener('DOMContentLoaded', () => {
    
    const Big_screen_sreachbar=document.getElementById("search_bar");
    const small_screen_sreachbar=document.querySelector(".input-box");
    Big_screen_sreachbar.style.display="none"
    small_screen_sreachbar.style.display="none"
})
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
	if(phoneno.length!=10){
		return Swal.fire("Phone Number Should Be 10 Digits")
	}
	if(password!=confirmPassword){
		return Swal.fire("Give Correct Password")
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
			  if(signup_res.status==400){
				return await Swal.fire({
					position: 'middle',
					icon: 'error',
					title: 'You Are Already Registered',
					showConfirmButton: false,
					timer: 1500
				  })
			  }
			  if(signup_res.ok){
				return await Swal.fire(
					'Signup Successful',
					'You are now Registered',
					'success'
				  )
			  }
		} catch (error) {
			Swal.fire("We are facing some server problem. Try again later")
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
	  let login_request= await fetch(`${baseURL}/users/login`,{
		method:"POST",
		headers:{
		  "Content-Type":"application/json"
		},
		body:JSON.stringify(obj)
	  })
	  if(login_request.status===400){
		let response= await login_request.json()
		return  await Swal.fire({
			position: 'middle',
			icon: 'error',
			title: `${response.msg}`,
			showConfirmButton: false,
			timer: 1500
		  })
	  }
	  if(login_request.ok){
		let token =await login_request.json();
		localStorage.setItem("token",token.token)
		await  Swal.fire(
			"Welcome to Avira",
			"Lets Explore, Redirecting to Home page....",
			"success"
		  );
		//   return await Swal.fire({
		// 	position: 'middle',
		// 	icon: 'error',
		// 	title: 'You Are Already Registered',
		// 	showConfirmButton: false,
		// 	timer: 1500
		//   })
		window.location.href = "index.html";
  
	  }
	//   else{
	// 	alert("User not found.");
  
	//   }
	} catch (error) {
	  alert("wrong username or password. Please try again later.");
	  console.log(error)
	  
	}
  }