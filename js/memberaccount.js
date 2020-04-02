$(document).ready(function() {
	// Replace edit boxes with initalised values <--- should be from server tbh
	var fullNameEditMode = $("#fullName").html();
	var deliveryAddrEditMode = $("#deliveryAddr").html();
	var contactEditMode = $("#contactNo").html();
	// console.log(deliveryAddrEditMode);
	$("#fullName").html("XXX");
	$("#deliveryAddr").html("XXX");
	$("#contactNo").html("XXX-XXX XXXX");

    // on click function
	$("#editFullName").on("click", function() {
        // replace the current value with input field
		$("#fullName").html(
			fullNameEditMode.replace(
				'value=""',
				'value="' + $("#fullName").html() + '"'
			)
		);
    });
    
});

// will be called during onkeyup of input to check for Shift + Enter 
const inputFunc = (event) => {
    // if enter key is pressed
    if (event.keyCode == 13) {
        if (event.shiftKey)
        {
            // Replace the input box with its value            
            $("#fullName").html($("#fullNameInput").val());
        }
    }
};