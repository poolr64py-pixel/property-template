// scripts/deploy.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class PropertyDeployer {
  constructor() {
    this.baseDir = process.cwd();
    this.deployConfig = this.loadDeployConfig();
  }

  loadDeployConfig() {
    try {
      return JSON.parse(fs.readFileSync('deploy.config.json', 'utf8'));
    } catch (error) {
      console.log('⚠️  Arquivo deploy.config.json não encontrado, usando configurações padrão');
      return {
        platform: 'vercel', // vercel, netlify, github-pages
        domain: null,
        buildDir: '.next',
        optimizeImages: true,
        generateSitemap: true
      };
    }
  }

  async optimizeImages() {
    console.log('🖼️  Otimizando imagens...');
    
    const sharp = require('sharp');
    const publicDir = path.join(this.baseDir, 'public/images');
    
    if (!fs.existsSync(publicDir)) {
      console.log('📁 Criando diretório de imagens...');
      fs.mkdirSync(publicDir, { recursive: true });
      return;
    }

    const images = fs.readdirSync(publicDir)
      .filter(file => /\.(jpg|jpeg|png)$/i.test(file));

    for (const image of images) {
      const inputPath = path.join(publicDir, image);
      const outputPath = path.join(publicDir, 'optimized', image);
      
      try {
        // Criar diretório optimized se não existir
        const optimizedDir = path.dirname(outputPath);
        if (!fs.existsSync(optimizedDir)) {
          fs.mkdirSync(optimizedDir, { recursive: true });
        }

        // Otimizar imagem
        await sharp(inputPath)
          .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
          .jpeg({ quality: 85, progressive: true })
          .toFile(outputPath);
          
        console.log(`✅ ${image} otimizada`);
      } catch (error) {
        console.log(`❌ Erro ao otimizar ${image}:`, error.message);
      }
    }
  }

  generateSitemap() {
    console.log('🗺️  Gerando sitemap...');
    
    const { generateSitemap } = require('../lib/seo');
    const { propertyConfig } = require('../config/property.config');
    
    const sitemap = generateSitemap(propertyConfig);
    fs.writeFileSync(path.join(this.baseDir, 'public/sitemap.xml'), sitemap);
    console.log('✅ Sitemap gerado');
  }

  generateRobots() {
    console.log('🤖 Gerando robots.txt...');
    
    const { generateRobotsTxt } = require('../lib/seo');
    const robots = generateRobotsTxt();
    fs.writeFileSync(path.join(this.baseDir, 'public/robots.txt'), robots);
    console.log('✅ Robots.txt gerado');
  }

  generateManifest() {
    console.log('📱 Gerando manifest.json...');
    
    const { generateWebManifest } = require('../lib/seo');
    const { propertyConfig } = require('../config/property.config');