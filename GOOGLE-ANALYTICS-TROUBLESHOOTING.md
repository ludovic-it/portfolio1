# Dépannage Google Analytics

## ✅ Vérifications effectuées

La balise Google Analytics a été ajoutée sur toutes les pages principales :
- ✅ `index.html` - Placée juste après les meta tags de base
- ✅ `projets.html`
- ✅ `contact.html`
- ✅ `competences.html`
- ✅ `parcours.html`
- ✅ `veille.html`

## 🔍 Comment vérifier que Google Analytics fonctionne

### 1. Vérification dans le navigateur

1. Ouvrez votre site dans Chrome/Firefox
2. Ouvrez les outils de développement (F12)
3. Allez dans l'onglet **Console**
4. Tapez : `gtag` ou `dataLayer`
5. Si vous voyez une fonction ou un tableau, Google Analytics est chargé ✅

### 2. Vérification avec l'extension Chrome

Installez l'extension **Google Tag Assistant** :
- [Chrome Web Store - Tag Assistant](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)

Cette extension vous dira si la balise est détectée et fonctionne correctement.

### 3. Vérification dans Google Analytics

1. Connectez-vous à [Google Analytics](https://analytics.google.com)
2. Allez dans **Admin** → **Streams de données**
3. Cliquez sur votre flux de données
4. Utilisez l'outil **Test de balise** en bas de la page
5. Entrez l'URL de votre site et testez

### 4. Vérification manuelle du code

Ouvrez le code source de votre page (Ctrl+U) et cherchez :
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-RWN3523KSG"></script>
```

Si vous ne voyez pas cette balise, le fichier n'a peut-être pas été déployé.

## ⚠️ Problèmes courants

### Problème 1 : "Balise non détectée" immédiatement après l'ajout

**Solution** : Google Analytics peut prendre **jusqu'à 24-48 heures** pour détecter la balise. C'est normal !

### Problème 2 : Le site n'est pas encore déployé

**Solution** : Assurez-vous que les modifications sont bien déployées sur GitHub Pages ou votre hébergeur.

### Problème 3 : Bloqueur de publicités

**Solution** : Les bloqueurs de publicités (uBlock Origin, AdBlock, etc.) bloquent souvent Google Analytics. Testez en mode navigation privée ou désactivez temporairement les bloqueurs.

### Problème 4 : Cache du navigateur

**Solution** : Videz le cache de votre navigateur (Ctrl+Shift+Delete) ou testez en mode navigation privée.

### Problème 5 : HTTPS requis

**Solution** : Google Analytics nécessite HTTPS. Assurez-vous que votre site est accessible via HTTPS.

## 🧪 Test rapide

Ajoutez ce code temporairement dans votre console navigateur pour tester :

```javascript
// Vérifier si gtag existe
console.log('gtag existe ?', typeof gtag !== 'undefined');
console.log('dataLayer existe ?', typeof dataLayer !== 'undefined');

// Tester un événement
if (typeof gtag !== 'undefined') {
    gtag('event', 'test_event', {
        'event_category': 'test',
        'event_label': 'Test manuel'
    });
    console.log('✅ Événement test envoyé !');
} else {
    console.log('❌ Google Analytics n\'est pas chargé');
}
```

## 📊 Vérifier les données dans Google Analytics

1. Allez dans **Rapports** → **Temps réel**
2. Visitez votre site dans un autre onglet
3. Vous devriez voir votre visite apparaître dans les 30 secondes

**Note** : Les données en temps réel peuvent prendre quelques secondes. Les données standard peuvent prendre jusqu'à 24-48 heures.

## 🔧 Si rien ne fonctionne

1. Vérifiez que l'ID de mesure est correct : `G-RWN3523KSG`
2. Vérifiez que le domaine est autorisé dans Google Analytics (Admin → Streams de données → Paramètres)
3. Vérifiez la console du navigateur pour les erreurs
4. Testez avec l'extension Tag Assistant
5. Contactez le support Google Analytics si le problème persiste

## 📝 Format de la balise utilisée

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-RWN3523KSG"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-RWN3523KSG');
</script>
```

Cette balise est placée **dès le début du `<head>`**, juste après les meta tags de base, comme recommandé par Google.
