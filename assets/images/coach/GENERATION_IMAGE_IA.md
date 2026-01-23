# Génération d'image pour l'application Coach avec l'IA

## Image requise : coach-hero.png

### Spécifications
- **Dimensions** : 1200x600px (ratio 2:1)
- **Format** : PNG ou JPG
- **Usage** : Image principale du projet sur la page projets.html et hero image sur la page de détail

### Prompt pour génération IA

#### Option 1 - Style moderne et professionnel
```
Modern mobile fitness app interface displayed on smartphone screen, clean minimalist design, health and fitness theme, gradient purple-blue background, professional UI/UX design, body fat calculator app, modern flat design, high quality, 3D render style
```

#### Option 2 - Style réaliste avec téléphone
```
Professional smartphone mockup showing a fitness coaching mobile app interface, body fat percentage calculator, clean modern design, health and wellness theme, gradient background, professional photography style, studio lighting
```

#### Option 3 - Style illustration
```
Modern mobile app illustration, fitness coaching application interface, body composition calculator, clean design, health theme, vibrant colors, professional digital art, vector style, high quality
```

### Outils recommandés pour génération IA

1. **DALL-E 3** (via ChatGPT Plus ou Bing Image Creator)
   - Excellent pour les interfaces d'applications
   - Prompt : Utiliser l'option 1 ou 2

2. **Midjourney**
   - Excellent pour le style artistique
   - Prompt : Ajouter `--ar 2:1 --v 6` pour le ratio et la version

3. **Stable Diffusion**
   - Open source et personnalisable
   - Modèle recommandé : SDXL

4. **Bing Image Creator** (gratuit)
   - Utilise DALL-E 3
   - Accessible via bing.com/images/create

### Instructions de génération

1. Choisir un outil d'IA parmi ceux listés ci-dessus
2. Copier l'un des prompts suggérés
3. Générer plusieurs variantes (4-8 images)
4. Sélectionner la meilleure image
5. Redimensionner si nécessaire à 1200x600px
6. Sauvegarder dans `assets/images/coach/coach-hero.png`

### Éléments à inclure dans l'image

- ✅ Interface mobile moderne
- ✅ Thème fitness/santé
- ✅ Design épuré et professionnel
- ✅ Couleurs harmonieuses (dégradés bleu/violet recommandés)
- ✅ Éléments visuels liés au calcul IMG (graphiques, chiffres, indicateurs)

### Éléments à éviter

- ❌ Trop de texte
- ❌ Design surchargé
- ❌ Couleurs trop vives ou agressives
- ❌ Images de personnes réelles (privilégier les interfaces)

### Alternative temporaire

En attendant la génération de l'image, une image Unsplash est utilisée comme fallback dans le code HTML.
