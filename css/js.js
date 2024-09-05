document.addEventListener('DOMContentLoaded', () => {
    // Section scrolling functionality
    const sections = Array.from(document.querySelectorAll('section'));
    const aboutSection = document.getElementById('about');
    const scrollButton = document.querySelector('.scrollButton');
    const arrowDown = document.getElementById('down');
    const arrowUp = document.getElementById('up');
    let currentSectionIndex = 0;

    function scrollToSection(section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    function getNextSection() {
        currentSectionIndex = (currentSectionIndex + 1) % sections.length;
        return sections[currentSectionIndex];
    }

    scrollButton.addEventListener('click', () => {
        const nextSection = getNextSection();
        scrollToSection(nextSection);
    });

    // Intersection Observer to change scroll button arrow
    const observer2 = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.id === 'about') {
                    down.style.display = 'none';
                    up.style.display = 'block';
                    console.log('Added class "up"');
                }
            } else {
                if (entry.target.id === 'about') {
                    down.style.display = 'block';
                    up.style.display = 'none';
                    console.log('Removed class "up"');
                }
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the section is visible
    });
    observer2.observe(aboutSection);

    // Fade-in titles using Intersection Observer
    const titles = document.querySelectorAll('h2');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 1 // Change this value to adjust when the animation is triggered
    });

    titles.forEach(title => {
        // Add the class 'fade-in-titles' if the title has specific styles
        if (title.style.fontStyle === 'italic' && title.style.fontSize === '3.5em') {
            title.classList.add('fade-in-titles');
            observer.observe(title);
        } else if (title.classList.contains('section-title')) {
            title.classList.add('fade-in-titles');
            observer.observe(title);
        }
    });
});

// Modal show/hide functions
function showModal() {
    const modal = document.getElementById('successMessage');
    modal.style.display = 'block';
}

function hideModal() {
    const modal = document.getElementById('successMessage');
    modal.style.display = 'none';
}

// Close modal when user clicks on <span> (x)
const closeButton = document.querySelector('.modal .close');
if (closeButton) {
    closeButton.addEventListener('click', hideModal);
}

// Close modal when user clicks anywhere outside the modal
window.addEventListener('click', (event) => {
    const modal = document.getElementById('successMessage');
    if (event.target === modal) {
        hideModal();
    }
});

// Open CV
function openCV() {
    var pdfUrl = './docs/Pedro Velazquez.pdf';
    window.open(pdfUrl, '_blank');
}

// Send form to email
function sendEmail() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;

    emailjs.send("service_lxmi7ie", "template_0ainjzf", {
        from_name: name,
        from_email: email,
        message: message
    })
        .then(function (response) {
            console.log("Email sent successfully:", response);
            showModal(); // Show modal on success

            // Empies form after sending message
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('message').value = '';

        }, function (error) {
            console.log("Error sending email:", error);
            alert("There was an error sending the email. Please try again later.");

        });
}