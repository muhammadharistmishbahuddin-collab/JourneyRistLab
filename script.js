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
});
