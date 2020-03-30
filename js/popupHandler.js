// Using load() function in jQuery to load compoenents to div containers
// Reason to put onclick event as second parameter is to allow ajax to finish its work before proceeding
$(document).ready(function() {
    // handlers for login box
	$("#loginContainerBack").load("components/login_box.html", function() {
        // Open Login Button          
		let openLoginbtn = document.getElementById("openLoginBox");
		openLoginbtn.addEventListener("click", function() {
			document.getElementById("loginContainerBack").style.display =
				"block";
			// Wait for 1ms before changing the width to allow CSS transition to work
			setTimeout(function() {
				document.getElementById("loginContainer").style.width = "400px";
			}, 1);
		});

        // Close login button
		let closeLoginBtn = document.getElementById("closeLoginBtn");
		closeLoginBtn.addEventListener("click", function() {
			document.getElementById("loginContainerBack").style.display =
				"none";
			// reset form
			document.getElementById("loginContainer").style.width = "0px";
			document.getElementById("loginForm").reset();
		});
	});

    // handler for signupBox
	$("#signUpContainerBack").load("components/signup_box.html", function() {
		let openSignupBtn = $("#openSignupBtn");
		openSignupBtn.on("click", function() {
			document.getElementById("signUpContainerBack").style.display =
				"block";
			// Wait for 1ms before changing the width to allow CSS transition to work
			setTimeout(function() {
				document.getElementById("signUpContainer").style.width =
					"400px";
			}, 1);
        });

        let closeSignupBtn = $("#closeSignupBtn");
        closeSignupBtn.on("click", function(){
            document.getElementById("signUpContainerBack").style.display = "none";
            document.getElementById("signUpContainer").style.width = "0px";
            document.getElementById("signupForm").reset();
        });
    });
    
    // when all ajax call had been completed
    $(document).ajaxStop(function(){
        // close signup box and open login box
        $("#alreadMemberLink").on("click", function(){
            $("#closeSignupBtn").trigger("click");
            $("#openLoginBox").trigger("click");
        });

        $("#forgetPasswordLink").on("click", function(){
            prompt("Please enter your email that is used to register with us as member.\nIf the email is valid, a password recovery link will be sent to the email.", "example@mail.com");
        });
    });

});
