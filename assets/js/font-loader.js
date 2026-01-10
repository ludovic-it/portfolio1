/**
 * Font Loader - Vérifie le chargement des fonts et applique des fallbacks
 */
(function() {
    'use strict';

    const FontLoader = {
        fontsLoaded: {
            google: false,
            fontAwesome: false,
            frick: false
        },

        init: function() {
            this.checkGoogleFonts();
            this.checkFontAwesome();
            this.checkFrickFont();
            this.applyFallbacks();
        },

        checkGoogleFonts: function() {
            try {
                // Vérifier si la police Inter est chargée
                if (document.fonts && document.fonts.check) {
                    // Attendre un peu que la police se charge
                    setTimeout(() => {
                        if (document.fonts.check('1em Inter')) {
                            this.fontsLoaded.google = true;
                        } else {
                            this.fontsLoaded.google = false;
                            console.warn('Google Fonts (Inter) non chargée');
                        }
                    }, 1000);
                } else {
                    // Fallback : vérifier si le style sheet est chargé
                    const links = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
                    if (links && links.length > 0) {
                        links.forEach(link => {
                            link.addEventListener('error', () => {
                                this.fontsLoaded.google = false;
                                console.warn('Erreur lors du chargement de Google Fonts');
                                this.applyGoogleFontFallback();
                            });
                            link.addEventListener('load', () => {
                                this.fontsLoaded.google = true;
                            });
                        });
                    }
                }
            } catch (e) {
                console.warn('Erreur lors de la vérification de Google Fonts:', e);
                this.fontsLoaded.google = false;
                this.applyGoogleFontFallback();
            }
        },

        checkFontAwesome: function() {
            try {
                // Vérifier si Font Awesome est chargé en testant un caractère
                const testIcon = document.createElement('i');
                testIcon.className = 'fas fa-check';
                testIcon.style.position = 'absolute';
                testIcon.style.visibility = 'hidden';
                testIcon.style.fontSize = '16px';
                document.body.appendChild(testIcon);

                setTimeout(() => {
                    const computedStyle = window.getComputedStyle(testIcon, ':before');
                    const content = computedStyle.getPropertyValue('content');
                    
                    // Si content est différent de 'none' ou contient un caractère, Font Awesome est chargé
                    if (content && content !== 'none' && content !== '""' && content !== "''") {
                        this.fontsLoaded.fontAwesome = true;
                    } else {
                        this.fontsLoaded.fontAwesome = false;
                        console.warn('Font Awesome non chargé');
                        this.applyFontAwesomeFallback();
                    }
                    
                    document.body.removeChild(testIcon);
                }, 1500);
            } catch (e) {
                console.warn('Erreur lors de la vérification de Font Awesome:', e);
                this.fontsLoaded.fontAwesome = false;
                this.applyFontAwesomeFallback();
            }
        },

        checkFrickFont: function() {
            try {
                // Vérifier si la police FRICK est chargée
                if (document.fonts && document.fonts.check) {
                    setTimeout(() => {
                        if (document.fonts.check('1em FRICK')) {
                            this.fontsLoaded.frick = true;
                        } else {
                            this.fontsLoaded.frick = false;
                            console.warn('Police FRICK non chargée');
                            this.applyFrickFontFallback();
                        }
                    }, 1000);
                } else {
                    // Fallback : vérifier si le fichier existe
                    const testImg = new Image();
                    testImg.onerror = () => {
                        this.fontsLoaded.frick = false;
                        this.applyFrickFontFallback();
                    };
                    testImg.onload = () => {
                        // Si l'image se charge, on considère que la font est disponible
                        // (ceci n'est pas parfait mais c'est un fallback)
                    };
                    // Ne peut pas vraiment tester la font directement sans Font Loading API
                    this.fontsLoaded.frick = true; // Optimiste
                }
            } catch (e) {
                console.warn('Erreur lors de la vérification de la police FRICK:', e);
                this.fontsLoaded.frick = false;
                this.applyFrickFontFallback();
            }
        },

        applyGoogleFontFallback: function() {
            try {
                // Ajouter un fallback CSS si Google Fonts n'est pas chargé
                const style = document.createElement('style');
                style.id = 'google-font-fallback';
                style.textContent = `
                    body, html {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif !important;
                    }
                `;
                document.head.appendChild(style);
            } catch (e) {
                console.warn('Erreur lors de l\'application du fallback Google Fonts:', e);
            }
        },

        applyFontAwesomeFallback: function() {
            try {
                // Ajouter des fallbacks Unicode pour les icônes les plus utilisées
                const style = document.createElement('style');
                style.id = 'font-awesome-fallback';
                style.textContent = `
                    .fas.fa-check-circle::before { content: '✓'; }
                    .fas.fa-times-circle::before { content: '✕'; }
                    .fas.fa-arrow-right::before { content: '→'; }
                    .fas.fa-arrow-left::before { content: '←'; }
                    .fas.fa-chevron-up::before { content: '▲'; }
                    .fas.fa-chevron-down::before { content: '▼'; }
                    .fas.fa-envelope::before { content: '✉'; }
                    .fas.fa-phone::before { content: '☎'; }
                    .fas.fa-home::before { content: '⌂'; }
                    .fas.fa-user::before { content: '👤'; }
                    .fas.fa-search::before { content: '🔍'; }
                    .fas.fa-bars::before { content: '☰'; }
                    .fas.fa-close::before, .fas.fa-times::before { content: '✕'; }
                    .fab.fa-github::before { content: '🔗'; }
                    .fab.fa-linkedin::before { content: '🔗'; }
                    .fab.fa-twitter::before { content: '🔗'; }
                `;
                document.head.appendChild(style);
                
                // Afficher un avertissement dans la console
                console.warn('Font Awesome non disponible, utilisation de fallbacks Unicode');
            } catch (e) {
                console.warn('Erreur lors de l\'application du fallback Font Awesome:', e);
            }
        },

        applyFrickFontFallback: function() {
            try {
                // Ajouter un fallback CSS si la police FRICK n'est pas chargée
                const style = document.createElement('style');
                style.id = 'frick-font-fallback';
                style.textContent = `
                    .frick-font, h1, h2, h3, .page-title {
                        font-family: 'Impact', 'Arial Black', sans-serif !important;
                    }
                `;
                document.head.appendChild(style);
            } catch (e) {
                console.warn('Erreur lors de l\'application du fallback FRICK:', e);
            }
        },

        applyFallbacks: function() {
            // Attendre un peu avant d'appliquer les fallbacks pour laisser le temps aux fonts de se charger
            setTimeout(() => {
                if (!this.fontsLoaded.google) {
                    this.applyGoogleFontFallback();
                }
                if (!this.fontsLoaded.fontAwesome) {
                    this.applyFontAwesomeFallback();
                }
                if (!this.fontsLoaded.frick) {
                    this.applyFrickFontFallback();
                }
            }, 2000);
        }
    };

    // Initialiser dès que possible
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            FontLoader.init();
        });
    } else {
        FontLoader.init();
    }

    // Exposer globalement pour utilisation dans d'autres scripts
    window.FontLoader = FontLoader;

})();
