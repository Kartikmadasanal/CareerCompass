/**
 * Main JavaScript functionality for CareerPath Pro website
 * Handles animations, counters, FAQ interactions, and general page enhancements
 */

class MainApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupAnimations();
        this.setupCounters();
        this.setupFAQ();
        this.setupScrollEffects();
        this.setupUtilities();
    }

    /**
     * Setup scroll-triggered animations
     */
    setupAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe elements for fade-in animation
        const animatedElements = document.querySelectorAll(
            '.feature-card, .service-card, .testimonial-card, .value-card, .team-member, .process-step, .stat-card'
        );

        animatedElements.forEach((el, index) => {
            el.classList.add('fade-in');
            el.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(el);
        });
    }

    /**
     * Setup animated counters for statistics
     */
    setupCounters() {
        const counters = document.querySelectorAll('.counter');
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    /**
     * Animate counter to target value
     */
    animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        const isDecimal = target.toString().includes('.');
        
        const timer = setInterval(() => {
            current += increment;
            
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (isDecimal) {
                counter.textContent = current.toFixed(1);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 20);
    }

    /**
     * Setup FAQ accordion functionality
     */
    setupFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            
            if (question && answer) {
                question.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');
                    
                    // Close all FAQ items
                    faqItems.forEach(faqItem => {
                        faqItem.classList.remove('active');
                    });
                    
                    // Open clicked item if it wasn't active
                    if (!isActive) {
                        item.classList.add('active');
                    }
                });

                // Make question focusable for accessibility
                question.setAttribute('tabindex', '0');
                
                // Handle keyboard interaction
                question.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        question.click();
                    }
                });
            }
        });
    }

    /**
     * Setup scroll effects and parallax
     */
    setupScrollEffects() {
        let ticking = false;

        const updateScrollEffects = () => {
            const scrollTop = window.pageYOffset;
            
            // Parallax effect for hero background
            const heroElement = document.querySelector('.hero');
            if (heroElement) {
                const parallaxSpeed = 0.5;
                heroElement.style.backgroundPositionY = -(scrollTop * parallaxSpeed) + 'px';
            }

            // Update progress indicators if they exist
            this.updateScrollProgress();
            
            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick, { passive: true });
    }

    /**
     * Update scroll progress indicator
     */
    updateScrollProgress() {
        const progressBar = document.querySelector('.scroll-progress');
        if (progressBar) {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        }
    }

    /**
     * Setup utility functions and enhancements
     */
    setupUtilities() {
        this.setupSmoothHover();
        this.setupImageLazyLoading();
        this.setupFormEnhancements();
        this.setupBackToTop();
        this.setupTooltips();
    }

    /**
     * Setup smooth hover effects
     */
    setupSmoothHover() {
        const hoverElements = document.querySelectorAll(
            '.btn, .feature-card, .service-card, .testimonial-card, .team-member'
        );

        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transform = 'translateY(-5px)';
            });

            element.addEventListener('mouseleave', () => {
                element.style.transform = '';
            });
        });
    }

    /**
     * Setup lazy loading for images
     */
    setupImageLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    /**
     * Setup form enhancements
     */
    setupFormEnhancements() {
        // Add floating labels effect
        const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
        
        formInputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });

            // Check if input has value on load
            if (input.value) {
                input.parentElement.classList.add('focused');
            }
        });

        // Character count for textarea
        const textareas = document.querySelectorAll('textarea[maxlength]');
        textareas.forEach(textarea => {
            const maxLength = textarea.getAttribute('maxlength');
            const counter = document.createElement('div');
            counter.className = 'char-counter';
            counter.style.textAlign = 'right';
            counter.style.fontSize = '0.875rem';
            counter.style.color = 'var(--text-light)';
            counter.style.marginTop = '0.25rem';
            
            textarea.parentNode.appendChild(counter);
            
            const updateCounter = () => {
                const remaining = maxLength - textarea.value.length;
                counter.textContent = `${textarea.value.length}/${maxLength}`;
                
                if (remaining < 50) {
                    counter.style.color = '#dc2626';
                } else {
                    counter.style.color = 'var(--text-light)';
                }
            };
            
            textarea.addEventListener('input', updateCounter);
            updateCounter();
        });
    }

    /**
     * Setup back to top button
     */
    setupBackToTop() {
        // Create back to top button
        const backToTop = document.createElement('button');
        backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
        backToTop.className = 'back-to-top';
        backToTop.setAttribute('aria-label', 'Back to top');
        
        // Add styles
        Object.assign(backToTop.style, {
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            width: '50px',
            height: '50px',
            backgroundColor: 'var(--primary-color)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: '1.2rem',
            display: 'none',
            zIndex: '1000',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        });

        document.body.appendChild(backToTop);

        // Show/hide based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.style.display = 'block';
            } else {
                backToTop.style.display = 'none';
            }
        });

        // Scroll to top on click
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Hover effects
        backToTop.addEventListener('mouseenter', () => {
            backToTop.style.transform = 'translateY(-2px)';
            backToTop.style.backgroundColor = 'var(--primary-dark)';
        });

        backToTop.addEventListener('mouseleave', () => {
            backToTop.style.transform = '';
            backToTop.style.backgroundColor = 'var(--primary-color)';
        });
    }

    /**
     * Setup tooltips for enhanced UX
     */
    setupTooltips() {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.textContent = element.getAttribute('data-tooltip');
                
                Object.assign(tooltip.style, {
                    position: 'absolute',
                    backgroundColor: 'var(--text-dark)',
                    color: 'white',
                    padding: '0.5rem',
                    borderRadius: '0.25rem',
                    fontSize: '0.875rem',
                    whiteSpace: 'nowrap',
                    zIndex: '1001',
                    pointerEvents: 'none'
                });
                
                document.body.appendChild(tooltip);
                
                const rect = element.getBoundingClientRect();
                tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
                tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + 'px';
                
                element._tooltip = tooltip;
            });

            element.addEventListener('mouseleave', () => {
                if (element._tooltip) {
                    element._tooltip.remove();
                    element._tooltip = null;
                }
            });
        });
    }
}

// Utility functions
const utils = {
    /**
     * Debounce function to limit function calls
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Throttle function to limit function calls
     */
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    /**
     * Check if element is in viewport
     */
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    /**
     * Smooth scroll to element
     */
    scrollToElement(element, offset = 0) {
        const elementPosition = element.offsetTop - offset;
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
};

// Initialize main app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MainApp();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden, pause animations or heavy operations
        console.log('Page hidden');
    } else {
        // Page is visible, resume operations
        console.log('Page visible');
    }
});

// Handle online/offline status
window.addEventListener('online', () => {
    console.log('Connection restored');
    // Show notification or update UI
});

window.addEventListener('offline', () => {
    console.log('Connection lost');
    // Show offline notification
});

// Export utilities for use in other files
window.CareerPathUtils = utils;
