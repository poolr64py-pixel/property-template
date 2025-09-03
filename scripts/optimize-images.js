const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

// Configurações de otimização
const OPTIMIZATION_CONFIG = {
  formats: ['webp', 'jpg'],
  qualities: [85, 75], // Qualidade para webp e jpg
  sizes: {
    thumbnail: 150,
    small: 400,
    medium: 800,
    large: 1200,
    xl: 1920
  },
  hero: {
    desktop: { width: 1920, height: 1080 },
    mobile: { width: 768, height: 432 }
  }
};

class ImageOptimizer {
  constructor() {
    this.inputDir = path.join(process.cwd(), 'public', 'images');
    this.outputDir = path.join(process.cwd(), 'public', 'images', 'optimized');
  }

  async init() {
    try {
      await fs.mkdir(this.outputDir, { recursive: true });
      await fs.mkdir(path.join(this.outputDir, 'thumbnails'), { recursive: true });
      await fs.mkdir(path.join(this.outputDir, 'gallery'), { recursive: true });
      await fs.mkdir(path.join(this.outputDir, 'hero'), { recursive: true });
      console.log('📁 Pastas de otimização criadas');
    } catch (error) {
      console.error('Erro ao criar pastas:', error);
    }
  }

  async processImage(inputPath, outputPath, options = {}) {
    try {
      const { width, height, quality = 85, format = 'webp' } = options;
      
      let processor = sharp(inputPath);
      
      // Redimensionar se necessário
      if (width || height) {
        processor = processor.resize(width, height, {
          fit: 'cover',
          position: 'center'
        });
      }

      // Aplicar formato e qualidade
      if (format === 'webp') {
        processor = processor.webp({ quality });
      } else if (format === 'jpg' || format === 'jpeg') {
        processor = processor.jpeg({ quality, mozjpeg: true });
      } else if (format === 'avif') {
        processor = processor.avif({ quality });
      }

      await processor.toFile(outputPath);
      
      const stats = await fs.stat(outputPath);
      return {
        success: true,
        size: stats.size,
        path: outputPath
      };
    } catch (error) {
      console.error(`Erro ao processar ${inputPath}:`, error.message);
      return { success: false, error: error.message };
    }
  }

  async optimizeGalleryImages() {
    console.log('🖼️  Otimizando imagens da galeria...');
    
    const galleryDir = path.join(this.inputDir, 'gallery');
    
    try {
      const files = await fs.readdir(galleryDir);
      const imageFiles = files.filter(file => 
        /\.(jpg|jpeg|png|tiff)$/i.test(file)
      );

      const results = [];

      for (const file of imageFiles) {
        const inputPath = path.join(galleryDir, file);
        const baseName = path.parse(file).name;

        console.log(`📸 Processando: ${file}`);

        // Gerar múltiplos tamanhos
        for (const [sizeName, width] of Object.entries(OPTIMIZATION_CONFIG.sizes)) {
          for (let i = 0; i < OPTIMIZATION_CONFIG.formats.length; i++) {
            const format = OPTIMIZATION_CONFIG.formats[i];
            const quality = OPTIMIZATION_CONFIG.qualities[i];
            
            const outputFileName = `${baseName}-${sizeName}.${format}`;
            const outputPath = path.join(this.outputDir, 'gallery', outputFileName);

            const result = await this.processImage(inputPath, outputPath, {
              width,
              quality,
              format
            });

            if (result.success) {
              results.push({
                original: file,
                optimized: outputFileName,
                size: result.size,
                width,
                format
              });
            }
          }
        }

        // Gerar thumbnail
        const thumbPath = path.join(this.outputDir, 'thumbnails', `${baseName}-thumb.webp`);
        await this.processImage(inputPath, thumbPath, {
          width: OPTIMIZATION_CONFIG.sizes.thumbnail,
          height: OPTIMIZATION_CONFIG.sizes.thumbnail,
          quality: 80,
          format: 'webp'
        });
      }

      console.log(`✅ ${results.length} variações geradas para ${imageFiles.length} imagens`);
      return results;
    } catch (error) {
      console.error('Erro ao otimizar galeria:', error);
      return [];
    }
  }

  async optimizeHeroImages() {
    console.log('🏠 Otimizando imagens hero...');
    
    try {
      const heroFiles = ['hero.jpg', 'hero.png', 'hero-desktop.jpg', 'hero-mobile.jpg'];
      
      for (const file of heroFiles) {
        const inputPath = path.join(this.inputDir, file);
        
        try {
          await fs.access(inputPath);
        } catch {
          continue; // Arquivo não existe
        }

        const baseName = path.parse(file).name;
        
        // Hero Desktop
        const desktopPath = path.join(this.outputDir, 'hero', `${baseName}-desktop.webp`);
        await this.processImage(inputPath, desktopPath, {
          width: OPTIMIZATION_CONFIG.hero.desktop.width,
          height: OPTIMIZATION_CONFIG.hero.desktop.height,
          quality: 85,
          format: 'webp'
        });

        // Hero Mobile
        const mobilePath = path.join(this.outputDir, 'hero', `${baseName}-mobile.webp`);
        await this.processImage(inputPath, mobilePath, {
          width: OPTIMIZATION_CONFIG.hero.mobile.width,
          height: OPTIMIZATION_CONFIG.hero.mobile.height,
          quality: 85,
          format: 'webp'
        });

        console.log(`✅ Hero otimizado: ${file}`);
      }
    } catch (error) {
      console.error('Erro ao otimizar hero:', error);
    }
  }

  async generateManifest() {
    console.log('📋 Gerando manifesto de imagens...');
    
    try {
      const galleryDir = path.join(this.outputDir, 'gallery');
      const heroDir = path.join(this.outputDir, 'hero');
      const thumbDir = path.join(this.outputDir, 'thumbnails');

      const manifest = {
        generated: new Date().toISOString(),
        config: OPTIMIZATION_CONFIG,
        images: {
          gallery: [],
          hero: [],
          thumbnails: []
        }
      };

      // Gallery images
      try {
        const galleryFiles = await fs.readdir(galleryDir);
        manifest.images.gallery = galleryFiles.map(file => ({
          filename: file,
          path: `/images/optimized/gallery/${file}`,
          ...this.parseFileName(file)
        }));
      } catch (error) {
        console.warn('Pasta gallery não encontrada');
      }

      // Hero images
      try {
        const heroFiles = await fs.readdir(heroDir);
        manifest.images.hero = heroFiles.map(file => ({
          filename: file,
          path: `/images/optimized/hero/${file}`,
          ...this.parseFileName(file)
        }));
      } catch (error) {
        console.warn('Pasta hero não encontrada');
      }

      // Thumbnails
      try {
        const thumbFiles = await fs.readdir(thumbDir);
        manifest.images.thumbnails = thumbFiles.map(file => ({
          filename: file,
          path: `/images/optimized/thumbnails/${file}`,
          ...this.parseFileName(file)
        }));
      } catch (error) {
        console.warn('Pasta thumbnails não encontrada');
      }

      const manifestPath = path.join(this.outputDir, 'manifest.json');
      await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
      
      console.log('✅ Manifesto gerado:', manifestPath);
      return manifest;
    } catch (error) {
      console.error('Erro ao gerar manifesto:', error);
      return null;
    }
  }

  parseFileName(filename) {
    const parsed = path.parse(filename);
    const parts = parsed.name.split('-');
    
    return {
      baseName: parts[0],
      size: parts[1],
      format: parsed.ext.slice(1)
    };
  }

  async generateNextConfigImages() {
    console.log('⚙️  Gerando configuração para next.config.js...');
    
    const config = {
      images: {
        formats: ['image/webp', 'image/avif'],
        deviceSizes: Object.values(OPTIMIZATION_CONFIG.sizes),
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        domains: [],
        path: '/_next/image',
        loader: 'default',
        dangerouslyAllowSVG: false,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
      }
    };

    const configPath = path.join(process.cwd(), 'image-config.json');
    await fs.writeFile(configPath, JSON.stringify(config, null, 2));
    
    console.log('✅ Configuração salva em image-config.json');
    console.log('💡 Adicione ao seu next.config.js:');
    console.log('const imageConfig = require("./image-config.json");');
    console.log('module.exports = { ...imageConfig };');
  }

  async run() {
    console.log('🚀 Iniciando otimização de imagens...\n');
    
    await this.init();
    await this.optimizeGalleryImages();
    await this.optimizeHeroImages();
    const manifest = await this.generateManifest();
    await this.generateNextConfigImages();
    
    console.log('\n✨ Otimização concluída!');
    
    if (manifest) {
      const totalImages = 
        manifest.images.gallery.length + 
        manifest.images.hero.length + 
        manifest.images.thumbnails.length;
      
      console.log(`📊 Resumo: ${totalImages} imagens otimizadas`);
    }
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  const optimizer = new ImageOptimizer();
  optimizer.run().catch(console.error);
}

module.exports = ImageOptimizer;