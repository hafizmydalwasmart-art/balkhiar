// Tailwind Configuration
window.tailwindConfig = {
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
            },
            colors: {
                brand: {
                    50: '#f0fdf4',
                    100: '#dcfce7',
                    500: '#dfb23c', // Gold accent
                    600: '#c59d35',
                    700: '#ab882e',
                }
            }
        }
    }
};

// Component Loader
async function loadComponent(id, url) {
    const placeholder = document.getElementById(id);
    if (!placeholder) return;
    try {
        const response = await fetch(url);
        if (response.ok) {
            const html = await response.text();
            placeholder.innerHTML = html;
            // Re-bind events if necessary
            if (id === 'navbar-placeholder') {
                bindNavbarEvents();
                highlightActiveLink();
            }
        }
    } catch (error) {
        console.error(`Error loading component from ${url}:`, error);
    }
}

// Navbar Events
function bindNavbarEvents() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (btn && menu) {
        btn.onclick = () => menu.classList.toggle('hidden');
    }
}

// Highlight Active Link
function highlightActiveLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('[data-nav]');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath) {
            link.className = "text-[#dfb23c] border border-gray-500 rounded-full px-4 py-2 relative group flex flex-col items-center hover:bg-white/5 transition-colors";
            // Add underline indicator
            if (!link.querySelector('.absolute')) {
                const div = document.createElement('div');
                div.className = "absolute bottom-1 w-4 border-b-[3px] border-[#dfb23c]";
                link.appendChild(div);
            }
        } else {
            link.className = "text-white hover:text-gray-300 px-3 py-2 transition-colors";
            const indicator = link.querySelector('.absolute');
            if (indicator) indicator.remove();
        }
    });
}

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
    loadComponent('navbar-placeholder', 'navbar.html');
    loadComponent('sidebar-placeholder', 'sidebar.html');
    loadComponent('footer-placeholder', 'footer.html');

    // Page Loader
    const loader = document.getElementById('page-loader');
    if (loader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => loader.remove(), 500);
            }, 300);
        });
    }
});
