$(document).ready(function () {
	// load the component using async ajax call
	$("header").load("components/header.html");

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

		$(window).on("resize", function () {
			$(".drop-down-container").css(
				"right",
				`${Math.round(
					window.innerWidth * 0.1 +
						(window.innerWidth * 0.8 * 0.25 - 48) / 2
				)}px`
			);
		});

		// Hope this doesnt override on click in popupHandler
		$("#openLoginBox").on("click", function () {
			$(".drop-down-container").css("display", "none");
		});

		$("#openSignupBtn").on("click", function () {
			$(".drop-down-container").css("display", "none");
		});

		// If Login was done before hand
		if (new URLSearchParams(location.search).get("usrname") != null) {
			let disabled = $(".drop-disabled");
			let enabled = $(".drop-enabled");
			enabled.css("display", "none");
			disabled.addClass("drop-enabled").removeClass("drop-disabled");
			$("#logOutBtn").css("display", "block");
			$("#logOutBtn").on("click", function () {
				alert("You are being logged out.");
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
