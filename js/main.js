// Function to set a cookie with a specified expiration time (in hours)
function setCookie(name, value, hours) {
    const d = new Date();
    d.setTime(d.getTime() + (hours * 60 * 60 * 1000)); // Set expiration time to specified hours
    let expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + (value || "") + ";" + expires + ";path=/";
}

// Function to get a cookie
function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Function to erase a cookie
function eraseCookie(name) {   
    document.cookie = name + '=; Max-Age=-99999999;';  
}

// Check if the cookie exists and if it is still valid
function checkCookie() {
    let visitedCookie = getCookie('visited');
    if (visitedCookie) {
        let currentTime = new Date().getTime();
        let cookieTime = new Date(visitedCookie).getTime();
        // Check if the cookie is still valid (within 1 hour cooldown)
        if (currentTime - cookieTime < 3600000) {
            // Cookie is still valid, do not show loader
            document.body.classList.add('loaded');
            return true;
        }
    }
    return false;
}

// Start loader and text animation if cookie is not valid
if (!checkCookie()) {
    const textArray = [
        "Come here because missed us...?",
        "Well you know, the War is Over",
        "We already graduated...",
        "Present by @alghif_xd & oja_tp",
        "For the last time..."
    ];

    let textIndex = 0;
    let charIndex = 0;
    let currentText = '';
    let typingDelay = 50;
    let erasingDelay = 50;
    let newTextDelay = 500; // Delay between current and next text

    function typeText() {
        if (charIndex < currentText.length) {
            document.getElementById('textArray').innerHTML += currentText.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, typingDelay);
        } else {
            setTimeout(eraseText, newTextDelay);
        }
    }

    function eraseText() {
        if (charIndex > 0) {
            document.getElementById('textArray').innerHTML = currentText.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(eraseText, erasingDelay);
        } else {
            textIndex++;
            if (textIndex >= textArray.length) {
                // Trigger the loader to disappear and reveal content
                document.body.classList.add('loaded');
                setCookie('visited', new Date().toUTCString(), 1); // Set cookie to expire in 1 hour
            } else {
                currentText = textArray[textIndex];
                setTimeout(typeText, typingDelay + 100);
            }
        }
    }

    // Start typing on page load
    document.addEventListener("DOMContentLoaded", function () {
        currentText = textArray[textIndex];
        setTimeout(typeText, newTextDelay + 250);
    });
} else {
    // Cookie exists and is valid, hide loader and directly reveal content
    document.body.classList.add('loaded');
}
