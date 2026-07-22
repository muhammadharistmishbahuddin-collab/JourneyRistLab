document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    const navIndicator = document.querySelector('.nav-indicator');

    // Function to update sliding pill position
    function updateNavIndicator(activeLink) {
        if (!activeLink || !navIndicator) return;
        
        const linkRect = activeLink.getBoundingClientRect();
        const navRect = activeLink.closest('.nav-links').getBoundingClientRect();
        
        navIndicator.style.width = `${linkRect.width}px`;
        navIndicator.style.left = `${linkRect.left - navRect.left}px`;
        navIndicator.style.opacity = 1;
    }

    // Initialize pill position
    setTimeout(() => {
        const initialActive = document.querySelector('.nav-links a.active') || navLinks[0];
        updateNavIndicator(initialActive);
    }, 100);

    window.addEventListener('resize', () => {
        const activeLink = document.querySelector('.nav-links a.active');
        if (activeLink) updateNavIndicator(activeLink);
    });

    // Navbar scroll effect & active link detection
    window.addEventListener('scroll', () => {
        // Navbar background effect
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link detection
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
                updateNavIndicator(link);
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            // If it's a nav link, update indicator immediately for better UX
            if (this.closest('.nav-links')) {
                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
                updateNavIndicator(this);
            }

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu toggle (simple alert for demo, can be expanded to real menu)
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if(mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            alert('Menu navigasi mobile diklik. (Dapat dikembangkan lebih lanjut)');
        });
    }

    // Typewriter Animation for Quotes (exactly like E-Portofolio)
    const typeWriter = (element, text, speed = 50) => {
        let i = 0;
        let typing;
        
        const startTyping = () => {
            element.innerHTML = '';
            element.style.opacity = '1';
            
            typing = setInterval(() => {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typing);
                    // Wait 3 seconds then restart the flow
                    setTimeout(() => {
                        i = 0;
                        startTyping();
                    }, 3000);
                }
            }, speed);
        };
        
        startTyping();
    };

    const quoteElement = document.getElementById('typing-quote');
    if (quoteElement) {
        const text = quoteElement.innerText;
        quoteElement.innerHTML = ''; // Clear initially
        quoteElement.style.opacity = '0';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Delay slightly for better feel
                    setTimeout(() => {
                        typeWriter(quoteElement, text);
                    }, 500);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(quoteElement);
    }

    // Portfolio Filtering Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterBtns.length > 0 && portfolioItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.classList.remove('hide');
                    } else {
                        item.classList.add('hide');
                    }
                });
            });
        });
    }
});

// Image Modal Logic
let currentImages = [];
let currentIndex = 0;

function openModal(images) {
    currentImages = images;
    currentIndex = 0;
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");
    
    if (images.length > 0) {
        modalImg.src = images[currentIndex];
        modal.style.display = "block";
    }
    
    // Hide prev/next buttons if only 1 image
    document.querySelector('.prev-modal').style.display = images.length > 1 ? 'block' : 'none';
    document.querySelector('.next-modal').style.display = images.length > 1 ? 'block' : 'none';
}

function closeModal() {
    const modal = document.getElementById("imageModal");
    modal.style.display = "none";
}

function changeSlide(n) {
    currentIndex += n;
    
    if (currentIndex >= currentImages.length) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = currentImages.length - 1;
    }
    
    const modalImg = document.getElementById("modalImg");
    modalImg.src = currentImages[currentIndex];
}

// Close modal when clicking outside the image
window.onclick = function(event) {
    const modal = document.getElementById("imageModal");
    if (event.target == modal) {
        closeModal();
    }
}
