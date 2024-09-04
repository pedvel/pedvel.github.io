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

    // Modal functionality for the contact form
    var sendButton = document.getElementById('sendButton');
    var modal = document.getElementById('successMessage');
    var closeButton = document.querySelector('.modal .close');

    // Show the modal when the send button is clicked
    sendButton.onclick = function () {
        modal.style.display = 'block';
    }

    // Hide the modal when the close button is clicked
    closeButton.onclick = function () {
        modal.style.display = 'none';
    }

    // Hide the modal if clicking outside the modal content
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }
});
