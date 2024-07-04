document.getElementById('resumeLink').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    
    // Collect email address
    var emailAddress = prompt("Please enter your email address:");
    
    // Validate email address (basic validation)
    var emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(emailAddress)) {
        alert("Invalid email address. Please try again.");
        return;
    }
    
    // Store email address (you might want to send it to a server for storage)
    // For now, let's just log it to the console
    console.log("Email address collected: " + emailAddress);
    
    // Now open the resume (replace 'resume.pdf' with your actual file path)
    window.open('/assets/common/Raj_Firke.pdf', '_blank');
});