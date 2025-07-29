// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const closeNav = document.getElementById('closeNav');
const mobileNav = document.getElementById('mobileNav');

hamburger.addEventListener('click', () => {
    mobileNav.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeNav.addEventListener('click', () => {
    mobileNav.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Dark Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    const darkToggleBtn = document.getElementById('darkToggleBtn');
    const darkToggleBtnMobile = document.getElementById('darkToggleBtnMobile');
    
    if (darkToggleBtn) {
        darkToggleBtn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }
    
    if (darkToggleBtnMobile) {
        darkToggleBtnMobile.innerHTML = isDark ? '<i class="fas fa-sun"></i> Light Mode' : '<i class="fas fa-moon"></i> Dark Mode';
    }
    
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Initialize dark mode based on preference
window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        const darkToggleBtn = document.getElementById('darkToggleBtn');
        const darkToggleBtnMobile = document.getElementById('darkToggleBtnMobile');
        
        if (darkToggleBtn) {
            darkToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        if (darkToggleBtnMobile) {
            darkToggleBtnMobile.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
        }
    }
    
    // Add event listeners to dark mode buttons
    document.getElementById('darkToggleBtn')?.addEventListener('click', toggleDarkMode);
    document.getElementById('darkToggleBtnMobile')?.addEventListener('click', toggleDarkMode);
    
    // Set up page navigation
    setupPageNavigation();
    
    // Add event listeners to back home buttons
    document.getElementById('backHomeAbout')?.addEventListener('click', goToHomePage);
    document.getElementById('backHomeServices')?.addEventListener('click', goToHomePage);
    document.getElementById('backHomeCurriculum')?.addEventListener('click', goToHomePage);
    document.getElementById('backHomeHobbies')?.addEventListener('click', goToHomePage);
    document.getElementById('backHomeProjects')?.addEventListener('click', goToHomePage);
    
    // Initialize animations
    initAnimations();
    
    // Close mobile nav when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileNav.classList.contains('active') && 
            !mobileNav.contains(e.target) && 
            e.target !== hamburger) {
            mobileNav.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

// Page Navigation
function setupPageNavigation() {
    // Hide all pages except home
    document.querySelectorAll('.page').forEach(page => {
        if (page.id !== 'home') {
            page.style.display = 'none';
        }
    });
    
    // Set up navigation links
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('href').substring(1);
            showPage(targetPage);
        });
    });
    
    // Set up mobile navigation links
    document.querySelectorAll('.mobile-nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('href').substring(1);
            showPage(targetPage);
        });
    });
    
    // Set up preview page links
    document.querySelectorAll('.page-navigation .btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('href').substring(1);
            showPage(targetPage);
        });
    });
}

// Show specific page and hide others
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.style.display = 'none';
    });
    
    // Show target page
    document.getElementById(pageId).style.display = 'block';
    
    // Close mobile nav if open
    mobileNav.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Initialize animations for the new page
    setTimeout(initAnimations, 100);
}

// Go to home page
function goToHomePage(e) {
    e.preventDefault();
    showPage('home');
}

// Initialize animations
function initAnimations() {
    // Make all sections visible
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('visible');
    });
    
    // Add visible class to cards with delay
    document.querySelectorAll('.content-card, .project-card').forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('visible');
        }, index * 200);
    });
    
    // Initialize floating animations
    document.querySelectorAll('.shape').forEach(shape => {
        shape.style.animation = `float ${8 + Math.random() * 4}s infinite ease-in-out`;
    });
    
    // Add bounce animation to buttons
    document.querySelectorAll('.btn.animated').forEach(btn => {
        btn.classList.add('bounce');
        setTimeout(() => {
            btn.classList.remove('bounce');
        }, 1000);
    });
}
