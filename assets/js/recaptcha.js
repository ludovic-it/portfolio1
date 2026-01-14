/**
 * Google reCAPTCHA v3 Integration
 * Protection anti-spam pour le formulaire de contact
 */

class Recaptcha {
    constructor() {
        this.siteKey = '6LciXEosAAAAAEcqU9KkZIQVSih2jzyZiemRXZb_';
        this.isLoaded = false;
        this.init();
    }

    init() {
        // Charger le script reCAPTCHA
        const script = document.createElement('script');
        script.src = `https://www.google.com/recaptcha/api.js?render=${this.siteKey}`;
        script.async = true;
        script.defer = true;
        script.onload = () => {
            this.isLoaded = true;
            console.log('reCAPTCHA chargé');
        };
        document.head.appendChild(script);
    }

    async execute(action = 'submit') {
        if (!this.isLoaded || !window.grecaptcha) {
            console.warn('reCAPTCHA non chargé');
            return null;
        }

        try {
            const token = await window.grecaptcha.execute(this.siteKey, { action });
            return token;
        } catch (error) {
            console.error('Erreur reCAPTCHA:', error);
            return null;
        }
    }

    async verifyToken(token) {
        // Cette vérification devrait être faite côté serveur
        // Pour l'instant, on retourne true si le token existe
        return token !== null && token.length > 0;
    }
}

// Initialiser reCAPTCHA
window.recaptcha = new Recaptcha();
