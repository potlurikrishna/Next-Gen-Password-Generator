function generatePassword() {
    const length = parseInt(document.getElementById("length").value) || 12;
    const useUppercase = document.getElementById("uppercase").checked;
    const useLowercase = document.getElementById("lowercase").checked;
    const useNumbers = document.getElementById("numbers").checked;
    const useSymbols = document.getElementById("symbols").checked;
    const customText = document.getElementById("customText").value;

    let charset = "";

    // If checkboxes are checked, include corresponding characters
    if (useUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (useNumbers) charset += "0123456789";
    if (useSymbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    // Add custom text directly to the password, no matter what
    let password = customText;

    // Fill the remaining password length with random characters from charset
    for (let i = customText.length; i < length; ++i) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    // Shuffle the password to mix custom characters with random ones
    password = shufflePassword(password);

    document.getElementById("password").value = password;
    updateStrengthBar();
}

// Function to shuffle the generated password
function shufflePassword(password) {
    return password.split('').sort(() => Math.random() - 0.5).join('');
}

// Update the strength bar based on the selected options
function updateStrengthBar() {
    const length = parseInt(document.getElementById("length").value) || 12;
    const useUppercase = document.getElementById("uppercase").checked;
    const useLowercase = document.getElementById("lowercase").checked;
    const useNumbers = document.getElementById("numbers").checked;
    const useSymbols = document.getElementById("symbols").checked;

    let strength = 0;

    if (length >= 8) strength += 1;
    if (length >= 12) strength += 1;
    if (length >= 16) strength += 1;
    if (useUppercase) strength += 1;
    if (useLowercase) strength += 1;
    if (useNumbers) strength += 1;
    if (useSymbols) strength += 1;

    const strengthFill = document.getElementById("strengthFill");
    const strengthLabel = document.getElementById("strengthLabel");

    switch (strength) {
        case 0:
        case 1:
            strengthFill.style.width = "0%";
            strengthFill.style.backgroundColor = "red";
            strengthLabel.innerText = "Strength: Too Weak";
            break;
        case 2:
        case 3:
            strengthFill.style.width = "50%";
            strengthFill.style.backgroundColor = "orange";
            strengthLabel.innerText = "Strength: Moderate";
            break;
        case 4:
        case 5:
            strengthFill.style.width = "75%";
            strengthFill.style.backgroundColor = "yellow";
            strengthLabel.innerText = "Strength: Fair";
            break;
        case 6:
            strengthFill.style.width = "100%";
            strengthFill.style.backgroundColor = "green";
            strengthLabel.innerText = "Strength: Strong";
            break;
        default:
            strengthFill.style.width = "0%";
            strengthLabel.innerText = "Strength: Weak";
            break;
    }
}

document.getElementById("togglePassword").addEventListener("click", function () {
    const passwordField = document.getElementById("password");
    if (passwordField.type === "password") {
        passwordField.type = "text";
        this.innerText = "🙈";
    } else {
        passwordField.type = "password";
        this.innerText = "👁️";
    }
});

document.getElementById("copyPassword").addEventListener("click", function () {
    const passwordField = document.getElementById("password");
    passwordField.select();
    document.execCommand("copy");
    alert("Password copied to clipboard!");
});
