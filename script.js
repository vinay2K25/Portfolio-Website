document.addEventListener('DOMContentLoaded', () => {
    const nameInput    = document.getElementById('senderName');
    const emailInput   = document.getElementById('senderEmail');
    const messageInput = document.getElementById('senderMessage');
    const sendButton   = document.getElementById('sendButton');
    const successCard  = document.getElementById('successCard');

    if (!sendButton) return; // If the send button isn't present, then we immediately return to avoid any errors!

    sendButton.addEventListener('click', () => {
        let valid = true;

        nameInput.classList.remove('inputError', 'inputValid');
        emailInput.classList.remove('inputError', 'inputValid');
        messageInput.classList.remove('inputError', 'inputValid'); // These three lines clear any old validation styles left over from previous form submissions!

        if (nameInput.value.trim() === '') {
            nameInput.classList.add('inputError');
            valid = false; // Name field cannot be left empty!
        } else {
            nameInput.classList.add('inputValid');
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // This line check if there are some characters before the @, followed by some characters after the @, then a dot, followed by some more characters after it!
        if (!emailPattern.test(emailInput.value)) {
            emailInput.classList.add('inputError');
            valid = false; // If the email doesn't pass the pattern test, add the 'inputError' class to its class list!
        } else {
            emailInput.classList.add('inputValid');
        }

        if (messageInput.value.trim().length < 10) {
            messageInput.classList.add('inputError');
            valid = false; // Message must include atleast 10 characters!
        } else {
            messageInput.classList.add('inputValid');
        }

        if (valid) {
            successCard.classList.add('show');

            nameInput.value    = '';
            emailInput.value   = '';
            messageInput.value = ''; // If all fields are valid, show the success card, and reset all fields to be empty!

            nameInput.classList.remove('inputValid');
            emailInput.classList.remove('inputValid');
            messageInput.classList.remove('inputValid'); // Then remove the 'inputValid' class from everybody's class list!

            setTimeout(() => {
                successCard.classList.remove('show');
            }, 3000); // After 3 seconds, the card must no longer show up!
        }
    });
});
