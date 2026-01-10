// Multilingual System (FR/EN)
class Multilingual {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'fr';
        this.translations = {};
        this.init();
    }

    init() {
        this.loadTranslations();
        this.createLanguageSwitcher();
        this.applyLanguage(this.currentLang);
    }

    loadTranslations() {
        this.translations = {
            fr: {
                'nav.profil': 'Profil',
                'nav.projets': 'Projets',
                'nav.stages': 'Stages',
                'nav.veille': 'Veille',
                'nav.contact': 'Contact',
                'hero.title': 'Bonjour, Bienvenue sur mon',
                'hero.portfolio': 'Portfolio',
                'hero.subtitle': 'Je suis Ludovic CHAMPROBERT, étudiant en informatique.',
                'hero.contact': 'Me contacter',
                'hero.cv': 'Mon CV',
                'about.title': 'À propos de moi',
                'projects.title': 'Mes Projets',
                'projects.subtitle': 'Découvrez mes réalisations récentes et mes projets en cours.',
                'stats.title': 'En Chiffres',
                'skills.title': 'Mes Compétences',
                'certifications.title': 'Mes Certifications',
                'footer.copyright': '© 2025 Ludovic CHAMPROBERT - Portfolio BTS SIO SLAM'
            },
            en: {
                'nav.profil': 'Profile',
                'nav.projets': 'Projects',
                'nav.stages': 'Internships',
                'nav.veille': 'Watch',
                'nav.contact': 'Contact',
                'hero.title': 'Hello, Welcome to my',
                'hero.portfolio': 'Portfolio',
                'hero.subtitle': 'I am Ludovic CHAMPROBERT, computer science student.',
                'hero.contact': 'Contact me',
                'hero.cv': 'My CV',
                'about.title': 'About me',
                'projects.title': 'My Projects',
                'projects.subtitle': 'Discover my recent achievements and ongoing projects.',
                'stats.title': 'In Numbers',
                'skills.title': 'My Skills',
                'certifications.title': 'My Certifications',
                'footer.copyright': '© 2025 Ludovic CHAMPROBERT - BTS SIO SLAM Portfolio'
            }
        };
    }

    createLanguageSwitcher() {
        const switcher = document.createElement('div');
        switcher.className = 'language-switcher';
        switcher.innerHTML = `
            <button class="lang-btn ${this.currentLang === 'fr' ? 'active' : ''}" data-lang="fr">
                <span>FR</span>
            </button>
            <button class="lang-btn ${this.currentLang === 'en' ? 'active' : ''}" data-lang="en">
                <span>EN</span>
            </button>
        `;

        switcher.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.dataset.lang;
                this.switchLanguage(lang);
            });
        });

        // Ajouter dans la navbar ou ailleurs
        const navbar = document.querySelector('.nav-inner');
        if (navbar) {
            navbar.appendChild(switcher);
        } else {
            document.body.insertBefore(switcher, document.body.firstChild);
        }
    }

    switchLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('language', lang);
        this.applyLanguage(lang);
        
        // Mettre à jour les boutons actifs
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
    }

    applyLanguage(lang) {
        // Appliquer les traductions aux éléments avec data-i18n
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (this.translations[lang] && this.translations[lang][key]) {
                element.textContent = this.translations[lang][key];
            }
        });

        // Mettre à jour l'attribut lang du HTML
        document.documentElement.lang = lang;

        // Déclencher un événement personnalisé
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
    }

    t(key) {
        return this.translations[this.currentLang]?.[key] || key;
    }
}

// Instance globale
const i18n = new Multilingual();

document.addEventListener('DOMContentLoaded', () => {
    // Les traductions seront appliquées automatiquement
});

