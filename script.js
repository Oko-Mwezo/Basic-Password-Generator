document.addEventListener("DOMContentLoaded", () => {
    const passwordOutput = document.getElementById("passwordOutput");
    const copyBtn = document.getElementById("copyBtn");
    const generateBtn = document.getElementById("generateBtn");
    const lengthSlider = document.getElementById("length");
    const lengthValue = document.getElementById("lengthValue");
    const uppercaseCheckbox = document.getElementById("uppercase");
    const lowercaseCheckbox = document.getElementById("lowercase");
    const numbersCheckbox = document.getElementById("numbers");
    const symbolsCheckbox = document.getElementById("symbols");
    const strengthBar = document.querySelector(".strength-bar");
    const strengthText = document.getElementById("strengthText");

    // Update length display
    lengthSlider.addEventListener("input", () => {
        lengthValue.textContent = lengthSlider.value;
    });

    // Generate password
    generateBtn.addEventListener("click", () => {
        const length = parseInt(lengthSlider.value);
        const includeUppercase = uppercaseCheckbox.checked;
        const includeLowercase = lowercaseCheckbox.checked;
        const includeNumbers = numbersCheckbox.checked;
        const includeSymbols = symbolsCheckbox.checked;

        if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
            alert("Please select at least one character type!");
            return;
        }

        const password = generatePassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols);
        passwordOutput.value = password;
        updateStrengthMeter(password);
    });

    // Copy to clipboard
    copyBtn.addEventListener("click", () => {
        if (!passwordOutput.value) {
            alert("Generate a password first!");
            return;
        }
        passwordOutput.select();
        document.execCommand("copy");
        alert("Password copied to clipboard!");
    });

    // Password generation logic
    function generatePassword(length, uppercase, lowercase, numbers, symbols) {
        let chars = "";
        if (uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
        if (numbers) chars += "0123456789";
        if (symbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";

        let password = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            password += chars[randomIndex];
        }
        return password;
    }

    // Update password strength meter
    function updateStrengthMeter(password) {
        const strength = calculatePasswordStrength(password);
        const strengthPercent = Math.min(100, strength * 25); // Scale to 100%
        const bar = strengthBar;

        bar.style.setProperty("--width", `${strengthPercent}%`);

        // Update color and text
        if (strength <= 2) {
            bar.style.backgroundColor = "#e74c3c";
            strengthText.textContent = "Strength: Weak";
        } else if (strength === 3) {
            bar.style.backgroundColor = "#f39c12";
            strengthText.textContent = "Strength: Moderate";
        } else {
            bar.style.backgroundColor = "#27ae60";
            strengthText.textContent = "Strength: Strong";
        }
    }

    // Calculate password strength (1-4 scale)
    function calculatePasswordStrength(password) {
        let strength = 0;
        if (password.length >= 12) strength++;
        if (/[A-Z]/.test(password) && /[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        return strength;
    }

    // Generate a password on page load
    generateBtn.click();
});
