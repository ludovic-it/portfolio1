# Guide d'Optimisation du Portfolio

Ce document explique comment utiliser les améliorations apportées au portfolio.

## 📸 1. Optimisation des Images (WebP)

### Installation des dépendances
```bash
cd scripts
npm install
```

### Conversion des images en WebP
```bash
npm run optimize-images
```

Le script va :
- Convertir toutes les images JPG/PNG en WebP
- Réduire la taille des images (max 1920px de largeur)
- Optimiser la qualité (85%)
- Créer les fichiers `.webp` à côté des originaux

### Utilisation dans le HTML
Les images utilisent maintenant l'élément `<picture>` avec fallback automatique :
```html
<picture>
    <source srcset="image.webp" type="image/webp">
    <img src="image.jpg" alt="Description" loading="lazy">
</picture>
```

## 📊 2. Google Analytics

### Configuration
1. Créez un compte Google Analytics 4
2. Obtenez votre ID de mesure (format: `G-XXXXXXXXXX`)
3. Remplacez `G-XXXXXXXXXX` dans les fichiers suivants :
   - `index.html` (ligne avec `gtag/js?id=`)
   - `assets/js/analytics.js` (ligne `this.gaId =`)

### Événements trackés automatiquement
- Clics sur les projets
- Téléchargements du CV
- Soumissions du formulaire de contact
- Scroll (25%, 50%, 75%, 100%)
- Temps sur la page (30s, 1min, 2min)
- Clics sur les liens externes

## 🔍 3. Amélioration du SEO

### Meta descriptions
Chaque page a maintenant une meta description unique et optimisée :
- **index.html** : Description du portfolio et compétences
- **projets.html** : Focus sur les réalisations
- **competences.html** : Technologies maîtrisées
- **contact.html** : Appel à l'action pour contacter
- **parcours.html** : Expériences professionnelles
- **veille.html** : Veille technologique

### Alt text descriptifs
Toutes les images ont maintenant des alt text descriptifs et contextuels :
- Description du contenu de l'image
- Contexte du projet
- Technologies visibles

## 🛡️ 4. reCAPTCHA v3

### Configuration
✅ **Déjà configuré** avec vos clés reCAPTCHA :
- **Clé du site** : `6LciXEosAAAAAEcqU9KkZIQVSih2jzyZiemRXZb_` (configurée dans `assets/js/recaptcha.js`)
- **Clé secrète** : `6LciXEosAAAAALpXTNFLAfDNr13bYJ3eYPGi8gwN` (à utiliser côté serveur pour vérifier les tokens)

### Fonctionnement
- reCAPTCHA s'exécute automatiquement lors de la soumission du formulaire
- Aucune interaction utilisateur requise (v3 est invisible)
- Le token est envoyé avec le formulaire pour vérification côté serveur

### Vérification côté serveur
La clé secrète doit être utilisée pour vérifier le token reCAPTCHA côté serveur. Exemple avec Node.js :

```javascript
const axios = require('axios');

async function verifyRecaptcha(token) {
    const secretKey = '6LciXEosAAAAALpXTNFLAfDNr13bYJ3eYPGi8gwN';
    const response = await axios.post('https://www.google.com/recaptcha/api/siteverify', {
        secret: secretKey,
        response: token
    });
    return response.data.success && response.data.score > 0.5;
}
```

**Note** : EmailJS peut être configuré pour vérifier automatiquement le token reCAPTCHA si vous utilisez un webhook ou une fonction serverless.

## 🚫 5. Page 404 Personnalisée

La page `404.html` est maintenant disponible avec :
- Design cohérent avec le thème sombre
- Navigation vers les pages principales
- Liens rapides vers les sections populaires
- Tracking de l'erreur dans Google Analytics

### Configuration sur GitHub Pages
Pour activer la page 404 sur GitHub Pages :
1. Renommez `404.html` en `404.html` (déjà fait)
2. GitHub Pages l'utilisera automatiquement

### Configuration sur d'autres serveurs
- **Apache** : Ajoutez dans `.htaccess` :
  ```apache
  ErrorDocument 404 /404.html
  ```
- **Nginx** : Ajoutez dans la config :
  ```nginx
  error_page 404 /404.html;
  ```

## ✅ Checklist de Déploiement

- [ ] Convertir toutes les images en WebP
- [ ] Configurer Google Analytics avec votre ID
- [ ] Configurer reCAPTCHA avec votre clé de site
- [ ] Vérifier que toutes les meta descriptions sont présentes
- [ ] Tester la page 404
- [ ] Vérifier les alt text de toutes les images
- [ ] Tester le formulaire de contact avec reCAPTCHA
- [ ] Vérifier le tracking Google Analytics

## 📈 Résultats Attendus

- **Performance** : Réduction de 30-50% de la taille des images
- **SEO** : Meilleur référencement grâce aux meta descriptions optimisées
- **Sécurité** : Protection anti-spam avec reCAPTCHA
- **UX** : Page 404 professionnelle et utile
- **Analytics** : Données précises sur le comportement des visiteurs

## 🔧 Dépannage

### Les images WebP ne s'affichent pas
- Vérifiez que les fichiers `.webp` existent
- Vérifiez que le navigateur supporte WebP (tous les navigateurs modernes)
- Le fallback vers JPG/PNG devrait fonctionner automatiquement

### Google Analytics ne fonctionne pas
- Vérifiez la console du navigateur pour les erreurs
- Assurez-vous que l'ID est correct (format `G-XXXXXXXXXX`)
- Vérifiez que le script est chargé avant la fermeture de `</head>`

### reCAPTCHA ne fonctionne pas
- Vérifiez que la clé de site est correcte
- Vérifiez la console pour les erreurs
- Assurez-vous que le domaine est autorisé dans la config reCAPTCHA
