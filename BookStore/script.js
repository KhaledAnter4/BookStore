function buyBook() {
    alert("The book has been added to your cart!");
}


function validateForm(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;

    if (name === "" || email === "" || message === "") {
        alert("Please fill in all fields.");
    } else {
        alert("Your message has been sent successfully!");
        document.getElementById("contact-form").submit(); 
    }
}
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("contact-form").addEventListener("submit", validateForm);
}); 