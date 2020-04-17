// Using load() function in jQuery to load compoenents to div containers
// Reason to put onclick event as second parameter is to allow ajax to finish its work before proceeding
$(document).ready(function () {
	// load the component using async ajax call
	$("#loginContainerBack").load("components/login_box.html");
	$("#signUpContainerBack").load("components/signup_box.html");

	// when all ajax call had been completed
	$(document).ajaxStop(function () {
		// handlers for login box
		// Open Login Button
		let openLoginbtn = document.getElementById("openLoginBox");
		openLoginbtn.addEventListener("click", function () {
			document.getElementById("loginContainerBack").style.display =
				"block";
			// Wait for 1ms before changing the width to allow CSS transition to work
			setTimeout(function () {
				document.getElementById("loginContainer").style.width = "400px";
			}, 1);
			$("#usrname").focus();
		});

		// Close login button
		let closeLoginBtn = document.getElementById("closeLoginBtn");
		closeLoginBtn.addEventListener("click", function () {
			document.getElementById("loginContainerBack").style.display =
				"none";
			// reset form
			document.getElementById("loginContainer").style.width = "0px";
			document.getElementById("loginForm").reset();
		});

		let openSignupBtn = $("#openSignupBtn");
		openSignupBtn.on("click", function () {
			document.getElementById("signUpContainerBack").style.display =
				"block";
			// Wait for 1ms before changing the width to allow CSS transition to work
			setTimeout(function () {
				document.getElementById("signUpContainer").style.width =
					"400px";
			}, 1);
			$("#newuser_usrname").focus();
		});

		// handler for signupBox
		let closeSignupBtn = $("#closeSignupBtn");
		closeSignupBtn.on("click", function () {
			document.getElementById("signUpContainerBack").style.display =
				"none";
			document.getElementById("signUpContainer").style.width = "0px";
			document.getElementById("signupForm").reset();
		});

		// close signup box and open login box
		$("#alreadMemberLink").on("click", function () {
			$("#closeSignupBtn").trigger("click");
			$("#openLoginBox").trigger("click");
		});

		$("#forgetPasswordLink").on("click", function () {
            // Not gonna make a new form for this
			if (
				prompt(
					"Please enter your email that is used to register with us as member.\nIf the email is valid, a password recovery link will be sent to the email.",
					"example@mail.com"
				) != null
			) {
                alert("Comfirmation email have been sent !");
			}
		});

		$("#signupForm").on("submit", function () {
			if ($("#newuser_pass").val() != $("#newuser_confirmPass").val()) {
				alert("Password doesnt match.");
				return false;
			}
		});
	});
});
