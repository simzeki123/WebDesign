$(document).ready(function () {
	// load the component using async ajax call
	$("header").load("components/header.html", function (res, text, request) {
        // console.log(res);
        // console.log(text);
        // console.log(request);
		if (text == "error") {
			$("header").html(
				"AJAX request to local resource was blocked. Did you deploy the website on a server ?"
			);
		}
	});
	$("footer").load("components/footer.html", function (res, text, request) {
		if (text == "error") {
			$("footer").html(
				"AJAX request to local resource was blocked. Did you deploy the website on a server ?"
			);
		}
	});

	// when all ajax call had been completed
	$(document).ajaxStop(function () {
		$("#profileIco").on("click", function () {
			$(".drop-down-container").css(
				"display",
				$(".drop-down-container").css("display") == "block"
					? "none"
					: "block"
			);
		});

		// I will set the margin too on load
		$(".drop-down-container").css(
			"right",
			// I don't know why, i don't know how, if it works, dont touch it
			`${Math.round(
				window.innerWidth * 0.1 +
					(window.innerWidth * 0.8 * 0.25 - 48) / 2
			)}px`
		);
		// set right margin on window resize to ensure correct position
		$(window).on("resize", function () {
			$(".drop-down-container").css(
				"right",
				// I don't know why, i don't know how, if it works, dont touch it
				`${Math.round(
					window.innerWidth * 0.1 +
						(window.innerWidth * 0.8 * 0.25 - 48) / 2
				)}px`
			);
		});

		// If searcH_query exist, make sure the search input box have the correct value
		let params = new URLSearchParams(location.search);
		if (params.get("search_query") != null) {
			$("#search_query").val(params.get("search_query"));
		}

		// Hope this doesnt override on click in popupHandler
		$("#openLoginBox").on("click", function () {
			$(".drop-down-container").css("display", "none");
		});

		$("#openSignupBtn").on("click", function () {
			$(".drop-down-container").css("display", "none");
		});

		// If Login was done before hand
		if (sessionStorage.getItem("login") == "true") {
			let disabled = $(".drop-disabled");
			let enabled = $(".drop-enabled");
			enabled.css("display", "none");
			disabled.addClass("drop-enabled").removeClass("drop-disabled");
			$("#logOutBtn").css("display", "block");
			$("#logOutBtn").on("click", function () {
				alert("You are being logged out.");
				sessionStorage.setItem("login", false);
				window.location.href = window.location.href.substring(
					0,
					window.location.href.indexOf("?")
				);
			});
			$("#myProfileBtn").on("click", function () {
				window.location.href = "memberaccount.html";
			});
			$("#trackOrderBtn").on("click", function () {
				window.location.href = "track_order.html";
			});
			$("#mycartBtn").on("click", function () {
				window.location.href = "shoppingCart.html";
			});
		}
	});
});

