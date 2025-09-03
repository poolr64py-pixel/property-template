const { execSync } = require('child_process');
const fs = require('fs').promises;
const path = require('path');

class PropertyDeployer {
  constructor() {
    this.configPath = path.join(process.cwd(), 'config', 'property.config.ts');
    this.deployConfig = {
      platforms: ['vercel', 'netlify', 'github-pages'],
      environments: ['production', 'staging', 'development']
    };
  }

  async loadPropertyConfig() {
    try {
      const configContent = await fs.readFile(this.configPath, 'utf8');
      
      // Extrair informações básicas do config (parsing simples)
      const nameMatch = configContent.match(/name:\s*["'](.+?)["']/);
      const idMatch = configContent.match(/id:\s*["'](.+?)["']/);
      
      return {
        name: nameMatch ? nameMatch[1] : 'property',
        id: idMatch ? idMatch[1] : 'unknown',
        configExists: true
      };
    } catch (error) {
      console.error('Erro ao carregar configuração:', error.message);
      return { configExists: false };
    }
  }

  async validateProject() {
    console.log('🔍 Validando projeto...');
    
    const requiredFiles = [
      'package.json',
      'next.config.js',
      'config/property.config.ts',
      'app/layout.tsx',
      'app/page.tsx'
    ];

    const missingFiles = [];
    
    for (const file of requiredFiles) {
      try {
        await fs.access(path.join(process.cwd(), file));
      } catch {
        missingFiles.push(file);
      }
    }

    if (missingFiles.length > 0) {
      console.error('❌ Arquivos obrigatórios ausentes:');
      missingFiles.forEach(file => console.error(`  - ${file}`));
      return false;
    }

    console.log('✅ Todos os arquivos obrigatórios presentes');
    return true;
  }

  async optimizeForProduction() {
    console.log('⚡ Otimizando para produção...');
    
    try {
      // Otimizar imagens
      console.log('📸 Otimizando imagens...');
      execSync('node scripts/optimize-images.js', { stdio: 'inherit' });
      
      // Executar lint
      console.log('🧹 Executando lint...');
      try {
        execSync('npm run lint', { stdio: 'inherit' });
      } catch (error) {
        console.warn('⚠️  Avisos de lint encontrados, continuando...');
      }
      
      // Type check
      console.log('📝 Verificando tipos TypeScript...');
      try {
        execSync('npx tsc --noEmit', { stdio: 'inherit' });
        console.log('✅ Tipos TypeScript válidos');
      } catch (error) {
        console.error('❌ Erros de tipo encontrados');
        throw error;
      }
      
      // Build
      console.log('🔨 Construindo aplicação...');
      execSync('npm run build', { stdio: 'inherit' });
      
      console.log('✅ Otimização concluída');
      return true;
    } catch (error) {
      console.error('❌ Erro na otimização:', error.message);
      return false;
    }
  }

  async generateSitemap() {
    console.log('🗺️  Gerando sitemap...');
    
    const propertyConfig = await this.loadPropertyConfig();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://exemplo.com';
    
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="pt" href="${baseUrl}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en"/>
    <xhtml:link rel="alternate" hreflang="es" href="${baseUrl}/es"/>
    <xhtml:link rel="alternate" hreflang="de" href="${baseUrl}/de"/>
  </url>
  <url>
    <loc>${baseUrl}/gallery</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/contact</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/virtual-tour</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`;

    await fs.writeFile(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemap);
    console.log('✅ Sitemap gerado');
  }

  async generateRobotsTxt() {
    console.log('🤖 Gerando robots.txt...');
    
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://exemplo.com';
    
    const robotsTxt = `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml

# Disallow optimization artifacts
Disallow: /_next/
Disallow: /api/
Disallow: *.json

# Allow images
Allow: /images/
Allow: /icons/
Allow: /documents/`;

    await fs.writeFile(path.join(process.cwd(), 'public', 'robots.txt'), robotsTxt);
    console.log('✅ robots.txt gerado');
  }

  async deployToVercel() {
    console.log('🚀 Fazendo deploy para Vercel...');
    
    try {
      // Verificar se Vercel CLI está instalado
      execSync('vercel --version', { stdio: 'pipe' });
    } catch (error) {
      console.log('📦 Instalando Vercel CLI...');
      execSync('npm install -g vercel', { stdio: 'inherit' });
    }

    try {
      const propertyConfig = await this.loadPropertyConfig();
      const projectName = `${propertyConfig.id || 'property'}-site`;
      
      // Deploy
      execSync(`vercel --prod --name ${projectName}`, { stdio: 'inherit' });
      
      console.log('✅ Deploy para Vercel concluído');
      return true;
    } catch (error) {
      console.error('❌ Erro no deploy Vercel:', error.message);
      return false;
    }
  }

  async deployToNetlify() {
    console.log('🚀 Fazendo deploy para Netlify...');
    
    try {
      // Verificar se Netlify CLI está instalado
      execSync('netlify --version', { stdio: 'pipe' });
    } catch (error) {
      console.log('📦 Instalando Netlify CLI...');
      execSync('npm install -g netlify-cli', { stdio: 'inherit' });
    }

    try {
      // Deploy
      execSync('netlify deploy --prod --dir=out', { stdio: 'inherit' });
      
      console.log('✅ Deploy para Netlify concluído');
      return true;
    } catch (error) {
      console.error('❌ Erro no deploy Netlify:', error.message);
      return false;
    }
  }

  async generateDeploymentReport() {
    console.log('📊 Gerando relatório de deploy...');
    
    const propertyConfig = await this.loadPropertyConfig();
    const buildStats = await this.getBuildStats();
    
    const report = {
      property: propertyConfig,
      deployment: {
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'production',
        version: process.env.npm_package_version || '1.0.0'
      },
      build: buildStats,
      urls: {
        production: process.env.NEXT_PUBLIC_BASE_URL || 'https://exemplo.com',
        staging: process.env.STAGING_URL,
        repository: process.env.GITHUB_REPOSITORY_URL
      }
    };

    const reportPath = path.join(process.cwd(), 'deployment-report.json');
    await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
    
    console.log('✅ Relatório salvo em deployment-report.json');
    return report;
  }

  async getBuildStats() {
    try {
      const buildDir = path.join(process.cwd(), '.next');
      const stats = await fs.stat(buildDir);
      
      // Calcular tamanho aproximado do build
      const getDirectorySize = async (dir) => {
        const entries = await fs.readdir(dir, { withFileTypes: true });
        const sizes = await Promise.all(entries.map(async (entry) => {
          const fullPath = path.join(dir, entry.name);
          if (entry.isDirectory()) {
            return getDirectorySize(fullPath);
          } else {
            const stat = await fs.stat(fullPath);
            return stat.size;
          }
        }));
        return sizes.reduce((total, size) => total + size, 0);
      };

      const buildSize = await getDirectorySize(buildDir);
      
      return {
        buildTime: stats.mtime,
        buildSize: `${(buildSize / 1024 / 1024).toFixed(2)} MB`,
        nodeVersion: process.version
      };
    } catch (error) {
      return {
        error: 'Não foi possível obter estatísticas de build'
      };
    }
  }

  async run(platform = 'vercel', skipBuild = false) {
    console.log('🏠 Iniciando deploy de propriedade imobiliária...\n');
    
    const propertyConfig = await this.loadPropertyConfig();
    console.log(`📋 Propriedade: ${propertyConfig.name || 'Sem nome'}\n`);
    
    // Validar projeto
    const isValid = await this.validateProject();
    if (!isValid) {
      process.exit(1);
    }

    // Gerar arquivos SEO
    await this.generateSitemap();
    await this.generateRobotsTxt();
    
    // Otimizar para produção
    if (!skipBuild) {
      const optimized = await this.optimizeForProduction();
      if (!optimized) {
        console.error('❌ Falha na otimização');
        process.exit(1);
      }
    }

    // Deploy para plataforma
    let deploySuccess = false;
    
    switch (platform.toLowerCase()) {
      case 'vercel':
        deploySuccess = await this.deployToVercel();
        break;
      case 'netlify':
        deploySuccess = await this.deployToNetlify();
        break;
      default:
        console.error(`❌ Plataforma não suportada: ${platform}`);
        process.exit(1);
    }

    if (deploySuccess) {
      const report = await this.generateDeploymentReport();
      console.log('\n🎉 Deploy concluído com sucesso!');
      console.log(`🌐 URL: ${report.urls.production}`);
    } else {
      console.error('\n❌ Deploy falhou');
      process.exit(1);
    }
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  const platform = process.argv[2] || 'vercel';
  const skipBuild = process.argv.includes('--skip-build');
  
  const deployer = new PropertyDeployer();
  deployer.run(platform, skipBuild).catch(console.error);
}

module.exports = PropertyDeployer;