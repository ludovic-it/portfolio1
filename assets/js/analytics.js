/**
 * Google Analytics 4 Integration
 * Tracking des événements et interactions utilisateur
 */

class Analytics {
    constructor() {
        this.gaId = 'G-RWN3523KSG';
        this.isInitialized = false;
        this.init();
    }

    init() {
        // Vérifier si Google Analytics est déjà chargé
        if (window.gtag) {
            this.isInitialized = true;
            return;
        }

        // Charger Google Analytics
        const script1 = document.createElement('script');
        script1.async = true;
        script1.src = `https://www.googletagmanager.com/gtag/js?id=${this.gaId}`;
        document.head.appendChild(script1);

        const script2 = document.createElement('script');
        script2.innerHTML = `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${this.gaId}', {
                'anonymize_ip': true,
                'cookie_flags': 'SameSite=None;Secure'
            });
        `;
        document.head.appendChild(script2);

        this.isInitialized = true;
        this.trackPageView();
        this.setupEventTracking();
    }

    trackPageView() {
        if (!this.isInitialized || !window.gtag) return;
        
        const pagePath = window.location.pathname + window.location.search;
        gtag('event', 'page_view', {
            page_path: pagePath,
            page_title: document.title
        });
    }

    trackEvent(category, action, label = '', value = null) {
        if (!this.isInitialized || !window.gtag) return;
        
        gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value
        });
    }

    setupEventTracking() {
        // Tracking des clics sur les projets
        document.addEventListener('click', (e) => {
            const projectCard = e.target.closest('.project-card, .veille-card');
            if (projectCard) {
                const projectTitle = projectCard.querySelector('h3')?.textContent || 'Projet inconnu';
                this.trackEvent('Projets', 'Clic sur projet', projectTitle);
            }

            // Tracking des téléchargements CV
            if (e.target.closest('a[download*="CV"]')) {
                this.trackEvent('CV', 'Téléchargement', 'CV_Ludovic.pdf');
            }

            // Tracking des liens externes
            const externalLink = e.target.closest('a[href^="http"]');
            if (externalLink && !externalLink.href.includes(window.location.hostname)) {
                this.trackEvent('Liens externes', 'Clic', externalLink.href);
            }

            // Tracking des boutons de contact
            if (e.target.closest('.btn-primary, .btn-contact')) {
                this.trackEvent('Contact', 'Clic bouton contact', window.location.pathname);
            }
        });

        // Tracking des soumissions de formulaire
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', () => {
                this.trackEvent('Formulaire', 'Soumission', 'Formulaire de contact');
            });
        }

        // Tracking du scroll (après 25%, 50%, 75%, 100%)
        let scrollTracked = { '25': false, '50': false, '75': false, '100': false };
        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round(
                (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
            );

            ['25', '50', '75', '100'].forEach(percent => {
                if (scrollPercent >= parseInt(percent) && !scrollTracked[percent]) {
                    scrollTracked[percent] = true;
                    this.trackEvent('Engagement', `Scroll ${percent}%`, window.location.pathname);
                }
            });
        }, { passive: true });

        // Tracking du temps sur la page
        let timeOnPage = 0;
        setInterval(() => {
            timeOnPage += 30;
            if (timeOnPage === 30) {
                this.trackEvent('Engagement', 'Temps sur page', '30 secondes', 30);
            } else if (timeOnPage === 60) {
                this.trackEvent('Engagement', 'Temps sur page', '1 minute', 60);
            } else if (timeOnPage === 120) {
                this.trackEvent('Engagement', 'Temps sur page', '2 minutes', 120);
            }
        }, 30000);
    }
}

// Initialiser Analytics au chargement
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.analytics = new Analytics();
    });
} else {
    window.analytics = new Analytics();
}
