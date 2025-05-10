// Navigation with zoom-out animation and history management
document.addEventListener('DOMContentLoaded', function() {
    // Function to handle the zoom-out animation
    function navigateWithZoom(targetId, addToHistory = true) {
        const currentSection = document.querySelector('.section.active') || document.querySelector('.hero');
        const targetSection = document.querySelector(targetId);
        
        if (!targetSection) return;
        
        // Add zoom-out class to current section
        currentSection.classList.add('zoom-out');
        
        // After animation completes, handle transition
        setTimeout(() => {
            currentSection.classList.remove('active', 'zoom-out');
            
            // Scroll to target
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
            
            // Add active class to target section after scroll completes
            setTimeout(() => {
                targetSection.classList.add('active');
                
                // Update browser history if needed
                if (addToHistory && targetId !== '#') {
                    window.history.pushState({ section: targetId }, '', targetId);
                }
            }, 500);
        }, 500);
    }
    
    // Handle popstate (back/forward navigation)
    window.addEventListener('popstate', function(event) {
        const targetId = event.state?.section || '#';
        const targetSection = document.querySelector(targetId) || document.querySelector('.hero');
        
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show target section
        targetSection.classList.add('active');
        window.scrollTo({
            top: targetSection.offsetTop,
            behavior: 'smooth'
        });
    });
    
    // Add click event listeners to nav links
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (!targetId.startsWith('#')) return;
            
            e.preventDefault();
            navigateWithZoom(targetId);
        });
    });
    
    // Initialize first active section (hero)
    document.querySelector('.hero').classList.add('active');
    
    // Set initial history state
    window.history.replaceState({ section: '#' }, '', '#');
});

// [Keep all your existing functions below exactly as they were]
document.querySelector('.contact-btn').addEventListener('click', (e) => {
    if (e.target.getAttribute('href') === '#contact') return;
    alert('You can reach me at +254 701073584 or lennaoduor@gmail.com');
});

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    document.getElementById('darkToggleBtn').innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

window.onload = () => {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        document.getElementById('darkToggleBtn').innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    revealOnScroll();
};

function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const revealTop = reveals[i].getBoundingClientRect().top;
        const revealPoint = 150;
        if (revealTop < windowHeight - revealPoint) {
            reveals[i].classList.add('active');
        }
    }
}
window.addEventListener('scroll', revealOnScroll);
