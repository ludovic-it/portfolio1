/**
 * Script d'optimisation des images pour le portfolio
 * Convertit les images en WebP et crée des versions optimisées
 * 
 * Usage: node scripts/optimize-images.js
 * 
 * Prérequis: npm install sharp
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const IMAGES_DIR = path.join(__dirname, '../assets/images');
const QUALITY = 85; // Qualité WebP (0-100)
const MAX_WIDTH = 1920; // Largeur maximale

async function optimizeImage(inputPath, outputPath) {
    try {
        const stats = await sharp(inputPath).metadata();
        const width = Math.min(stats.width, MAX_WIDTH);
        
        await sharp(inputPath)
            .resize(width, null, {
                withoutEnlargement: true,
                fit: 'inside'
            })
            .webp({ quality: QUALITY })
            .toFile(outputPath);
        
        const originalSize = fs.statSync(inputPath).size;
        const newSize = fs.statSync(outputPath).size;
        const savings = ((1 - newSize / originalSize) * 100).toFixed(1);
        
        console.log(`✓ ${path.basename(inputPath)} → ${path.basename(outputPath)} (${savings}% économisé)`);
        return true;
    } catch (error) {
        console.error(`✗ Erreur avec ${inputPath}:`, error.message);
        return false;
    }
}

async function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            await processDirectory(filePath);
        } else if (/\.(jpg|jpeg|png)$/i.test(file)) {
            const webpPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
            await optimizeImage(filePath, webpPath);
        }
    }
}

async function main() {
    console.log('🖼️  Optimisation des images en cours...\n');
    
    if (!fs.existsSync(IMAGES_DIR)) {
        console.error(`❌ Le dossier ${IMAGES_DIR} n'existe pas`);
        process.exit(1);
    }
    
    await processDirectory(IMAGES_DIR);
    
    console.log('\n✅ Optimisation terminée !');
    console.log('\n📝 Note: Ajoutez les attributs loading="lazy" et utilisez <picture> pour le fallback');
}

main().catch(console.error);
