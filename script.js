// Attende che il DOM sia completamente caricato
document.addEventListener('DOMContentLoaded', function() {
    
    // Elementi del DOM
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const skillBars = document.querySelectorAll('.skill-progress');
    const contactForm = document.getElementById('contactForm');
    
    // Toggle menu mobile
    burger.addEventListener('click', () => {
        // Toggle nav
        nav.classList.toggle('active');
        
        // Toggle burger animation
        burger.classList.toggle('active');
        
        // Animate links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });
    
    // Chiudi menu quando si clicca su un link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            burger.classList.remove('active');
            navLinks.forEach(link => {
                link.style.animation = '';
            });
        });
    });
    
    // Smooth scrolling per i link della navigazione
    const navigationLinks = document.querySelectorAll('a[href^="#"]');
    navigationLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // 70px per l'header fisso
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Intersection Observer per animazioni skill bars
    const skillsSection = document.querySelector('.skills');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (skillsSection) {
        skillObserver.observe(skillsSection);
    }
    
    // Funzione per animare le barre delle competenze
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const skillLevel = bar.getAttribute('data-skill');
            setTimeout(() => {
                bar.style.width = skillLevel + '%';
            }, 500);
        });
    }
    
    // Gestione form di contatto
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Ottieni i valori del form
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Validazione semplice
            if (!name || !email || !message) {
                showNotification('Per favore compila tutti i campi!', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Per favore inserisci un\'email valida!', 'error');
                return;
            }
            
            // Simula invio (in un'app reale useresti un backend)
            simulateFormSubmission(name, email, message);
        });
    }
    
    // Funzione per validare email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Simula l'invio del form
    function simulateFormSubmission(name, email, message) {
        const submitBtn = document.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        // Cambia il testo del bottone
        submitBtn.textContent = 'Invio in corso...';
        submitBtn.disabled = true;
        
        // Simula un delay di rete
        setTimeout(() => {
            // Reset form
            contactForm.reset();
            
            // Ripristina bottone
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Mostra messaggio di successo
            showNotification('Messaggio inviato con successo! Ti risponderò presto.', 'success');
            
            // Log per debug (da rimuovere in produzione)
            console.log('Form submitted:', { name, email, message });
        }, 2000);
    }
    
    // Funzione per mostrare notifiche
    function showNotification(message, type = 'info') {
        // Rimuovi notifiche esistenti
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Crea nuova notifica
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Stili inline per la notifica
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: '5px',
            color: 'white',
            fontWeight: 'bold',
            zIndex: '10000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            maxWidth: '300px'
        });
        
        // Colori in base al tipo
        const colors = {
            success: '#27ae60',
            error: '#e74c3c',
            info: '#3498db'
        };
        notification.style.backgroundColor = colors[type] || colors.info;
        
        // Aggiungi al DOM
        document.body.appendChild(notification);
        
        // Anima l'entrata
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Rimuovi dopo 5 secondi
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 5000);
    }
    
    // Effetto parallasse leggero per la hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Evidenzia il link attivo nella navigazione
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a[href^="#"]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset <= sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
    
    // Aggiunge classe per transizioni CSS
    document.body.classList.add('js-loaded');
});

// CSS aggiuntivo per le animazioni (aggiunto dinamicamente)
const additionalCSS = `
    @keyframes navLinkFade {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0px);
        }
    }
    
    .nav-links a.active {
        color: var(--secondary-color);
    }
    
    .js-loaded * {
        transition: all 0.3s ease;
    }
`;

// Aggiungi CSS al documento
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);
