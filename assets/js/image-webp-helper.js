/**
 * Helper pour charger les images WebP avec fallback automatique
 * Utilise <picture> pour le support WebP avec fallback vers JPG/PNG
 */

class WebPImageHelper {
    constructor() {
        this.supportsWebP = null;
        this.init();
    }

    async init() {
        // Détecter le support WebP
        this.supportsWebP = await this.checkWebPSupport();
        
        // Convertir les images avec data-webp en éléments <picture>
        this.convertWebPImages();
    }

    checkWebPSupport() {
        return new Promise((resolve) => {
            const webP = new Image();
            webP.onload = webP.onerror = () => {
                resolve(webP.height === 2);
            };
            webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        });
    }

    convertWebPImages() {
        const images = document.querySelectorAll('img[data-webp]');
        
        images.forEach(img => {
            const webpSrc = img.getAttribute('data-webp');
            const originalSrc = img.src;
            
            if (!webpSrc || !originalSrc) return;

            // Créer l'élément <picture>
            const picture = document.createElement('picture');
            
            // Source WebP
            const sourceWebP = document.createElement('source');
            sourceWebP.type = 'image/webp';
            sourceWebP.srcset = webpSrc;
            
            // Source originale (fallback)
            const sourceOriginal = document.createElement('source');
            sourceOriginal.srcset = originalSrc;
            sourceOriginal.type = this.getImageType(originalSrc);
            
            // Image avec tous les attributs originaux
            const newImg = img.cloneNode(true);
            newImg.removeAttribute('data-webp');
            
            // Assembler
            picture.appendChild(sourceWebP);
            picture.appendChild(sourceOriginal);
            picture.appendChild(newImg);
            
            // Remplacer l'image originale
            img.parentNode.replaceChild(picture, img);
        });
    }

    getImageType(src) {
        if (src.match(/\.jpg$/i) || src.match(/\.jpeg$/i)) {
            return 'image/jpeg';
        }
        if (src.match(/\.png$/i)) {
            return 'image/png';
        }
        return 'image/jpeg';
    }

    /**
     * Méthode utilitaire pour créer un élément picture avec WebP
     */
    static createPictureElement(webpSrc, fallbackSrc, alt, className = '', loading = 'lazy') {
        const picture = document.createElement('picture');
        
        const sourceWebP = document.createElement('source');
        sourceWebP.type = 'image/webp';
        sourceWebP.srcset = webpSrc;
        
        const sourceFallback = document.createElement('source');
        sourceFallback.srcset = fallbackSrc;
        sourceFallback.type = fallbackSrc.match(/\.png$/i) ? 'image/png' : 'image/jpeg';
        
        const img = document.createElement('img');
        img.src = fallbackSrc;
        img.alt = alt;
        img.loading = loading;
        if (className) img.className = className;
        
        picture.appendChild(sourceWebP);
        picture.appendChild(sourceFallback);
        picture.appendChild(img);
        
        return picture;
    }
}

// Initialiser au chargement
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.webpHelper = new WebPImageHelper();
    });
} else {
    window.webpHelper = new WebPImageHelper();
}
