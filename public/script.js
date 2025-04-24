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

//FileUpload

function uploadFile() {
    const fileInput = document.getElementById("fileInput");
    const message = document.getElementById("message");

    if (fileInput.files.length === 0) {
        alert("Please select a file!");
        return;
    }

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    fetch("/upload", {
        method: "POST",
        body: formData
    }).then(res => res.json())
      .then(data => console.log("Success:", data))
      .catch(err => console.error("Error:", err));
    
}
