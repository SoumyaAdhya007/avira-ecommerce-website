const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});


function signUpFun() {
	let name = document.getElementById("name").value;
	let email = document.getElementById("email").value;
	let zipcode = document.getElementById("zipcode").value;
	let phoneno = document.getElementById("phoneno").value;
	let gender = document.querySelector('input[name="gender"]:checked').value;
	let password = document.getElementById("password").value;
	let confirmPassword = document.getElementById("confirmpassword").value;

	let obj = {
		name: name,
		email: email,
		password: confirmPassword,
		zipcode: zipcode,
		phoneNo: phoneno,
		gender: gender
	}

	console.log(obj)
	localStorage.setItem("obj",JSON.stringify(obj))

}
