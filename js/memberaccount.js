// =========================
// Ignore this part thanks
// =========================

// function for web page security, totally pointless i would say since there are no servers here
// the only that this prevents is XSS attacks
var entityMap = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	'"': "&quot;",
	"'": "&#39;",
	"/": "&#x2F;",
	"`": "&#x60;",
	"=": "&#x3D;",
};

// replace html special chars with their respective char code
function escapeHtml(string) {
	return String(string).replace(/[&<>"'`=\/]/g, function (s) {
		return entityMap[s];
	});
}

// =========================
// =========================

// ======================================
// JS to load after the page is loaded
// ======================================

// Global var
var editingStatus = { name: false, addr: false, contact: false }; // to keep track of what is being edited
var html_oldName, html_oldAddr, html_oldContact; // to keep old records
$(document).ready(function () {
	// ==========
	// Init page
	// ==========
	// keep a backup of the input boxes
	var fullNameEditMode = $("#fullName").html();
	var deliveryAddrEditMode = $("#deliveryAddr").html();
	var contactEditMode = $("#contactNo").html();

	// Replace input boxes with initalised values
	$("#fullName").html("XXX");
	$("#deliveryAddr").html(
		`
        <span id="view_addr1" style="display: block;">Address Line 1</span>
        <span id="view_addr2" style="display: block;">Address Line 2 (Optional)</span>
        <span id="view_addr3">Zip Code</span>
        <span id="view_addr4" style="display: inline-block;">City</span>
        <span id="view_addr5" style="display: block;">State</span>
        `
	);
	$("#contactNo").html("XXX-XXX XXXX");
	// ==========
	// ==========

	// ===================
	// on click functions
	// ===================
	// Full Name
	$("#editFullName").on("click", function () {
		// state check
		if (editingStatus.name) {
			return;
		}
		editingStatus.name = true;
		html_oldName = $("#fullName").html();

		// replace the current value with input field
		$("#fullName").html(
			fullNameEditMode.replace(
				'value=""',
				'value="' + escapeHtml($("#fullName").html()) + '"'
			)
		);
		// focus on full name input field and select all
		$("#fullNameInput").focus().select();
	});

	// Delivery Address
	$("#editAddress").on("click", function () {
		// state check
		if (editingStatus.addr) {
			return;
		}
		editingStatus.addr = true;
		html_oldAddr = $("#deliveryAddr").html();

		// Store current address on view
		var addr = [
			$("#view_addr1").html(),
			$("#view_addr2").html(),
			$("#view_addr3").html(),
			$("#view_addr4").html(),
			$("#view_addr5").html(),
		];
		// replace the current value with input fields
		$("#deliveryAddr").html(deliveryAddrEditMode);
		$("#inp_addr1").val(addr[0]);
		$("#inp_addr2").val(addr[1]);
		$("#inp_addr3").val(addr[2]);
		$("#inp_addr4").val(addr[3]);
		$("#inp_addr5").val(addr[4]);
		$("#inp_addr1").focus().select();
	});

	// Contact No
	$("#editContact").on("click", function () {
		// state check
		if (editingStatus.contact) {
			return;
		}
		editingStatus.contact = true;
		html_oldContact = $("#contactNo").html();

		// Replace current viewing value with input box
		$("#contactNo").html(
			contactEditMode.replace(
				'value=""',
				'value="' + escapeHtml($("#contactNo").html()) + '"'
			)
		);
		$("#inp_contact").focus().select();
	});
	// ===================
	// ===================

	// ===================
	// On change events
	// ===================
	// radio buttons on change
	$('input[type="radio"][name="paymentMethod"]').on("change", function () {
		$("#save").removeAttr("disabled");
	});

	// ===================
	// ===================
});
// ======================================
// ======================================

// ===============
// Event Functions
// ===============
// this function will be called during onkeyup of full name input to check for Shift + Enter
const fullname_inputFunc = (event) => {
	// if enter key is pressed
	if (event.keyCode == 13) {
		if (event.shiftKey) {
			if ($("#fullNameInput").val().length == 0) {
				alert("Empty name is not allowed");
				return;
			}
			// Replace the input box with its value
			$("#nameInWelcomeMsg").html(escapeHtml($("#fullNameInput").val()));
			$("#fullName").html(escapeHtml($("#fullNameInput").val()));

			editingStatus.name = false; // state update
			$("#save").removeAttr("disabled");
		}
	} else if (event.key == "Escape") {
		// if ESC is pressed
		$("#fullName").html(html_oldName);
		$("#nameInWelcomeMsg").html(html_oldName);
		editingStatus.name = false; // state update
	}
};

// to detect Shift + Enter for address
const addr_inputFunc = (event) => {
	// if enter key is pressed
	if (event.keyCode == 13) {
		if (event.shiftKey) {
			// checks if any inputs is empty
			var inputValues = [
				escapeHtml($("#inp_addr1").val()),
				escapeHtml($("#inp_addr2").val()),
				escapeHtml($("#inp_addr3").val()),
				escapeHtml($("#inp_addr4").val()),
				escapeHtml($("#inp_addr5").val()),
			];

			var foundEmptyAddr = false;
			// map .length to inputValues and check each element and make sure no length is 0
			inputValues
				.map(function (e) {
					return e.length;
				})
				.forEach(function (item, index) {
					// skip index 1 as it is Address Line 2 (optional)
					if (index != 1 && item == 0 && !foundEmptyAddr) {
                        alert("Empty address is not allowed");
                        $("#inp_addr" + (index+1).toString()).select().focus();
						foundEmptyAddr = true;
					}
				});
			if (foundEmptyAddr) return;
			// Make sure zip code is integer
			if (!Number.isInteger(inputValues[2]) && inputValues[2].length > 5) {
                alert("Zip code must be integer and less than 5 digits !");
                return;
			}

			// reprint the address to the page
			$("#deliveryAddr").html(`
                <span id="view_addr1" style="display: block;"></span>
                <span id="view_addr2" style="display: block;"></span>
                <span id="view_addr3"></span>,
                <span id="view_addr4" style="display: inline-block;"></span>
                <span id="view_addr5" style="display: block;"></span>
            `);
			$("#view_addr1").text(inputValues[0]);
			$("#view_addr2").text(inputValues[1]);
			$("#view_addr3").text(inputValues[2]);
			$("#view_addr4").text(inputValues[3]);
			$("#view_addr5").text(inputValues[4]);

			editingStatus.addr = false; // state update
			$("#save").removeAttr("disabled");
		}
	} else if (event.key == "Escape") {
		// if ESC is pressed
		$("#deliveryAddr").html(html_oldAddr);
		editingStatus.addr = false; // state update
	}
};

const contact_inputFunc = (event) => {
	// if enter key is pressed
	if (event.keyCode == 13) {
		if (event.shiftKey) {
			if (!validate_phoneNumber(escapeHtml($("#inp_contact").val()))) {
				alert("Invalid phone number !");
				return;
			}
			$("#contactNo").html(escapeHtml($("#inp_contact").val()));
			editingStatus.contact = false; // state update
			$("#save").removeAttr("disabled");
		}
	} else if (event.key == "Escape") {
		// if ESC is pressed
		$("#contactNo").html(html_oldContact);
		editingStatus.contact = false; // state update
	}
};

const saveButton_event = () => {
	// if save button have "disabled" property
	if ($("#save").prop("disabled")) {
		return;
	}
	// if none of the field is in edit mode
	if (!editingStatus.addr && !editingStatus.contact && !editingStatus.name) {
		// do your job
		$("#save").prop("disabled", true);
	} else {
		alert("Please exit edit mode before saving changes.");
	}
};

// ===============
// ===============

// =====================
// Validation funcitons
// =====================

const validate_phoneNumber = (num) => {
	var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
	var phoneno2 = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{5})$/;
	if (num.match(phoneno) || num.match(phoneno2)) {
		return true;
	} else {
		return false;
	}
};

// =====================
// =====================
