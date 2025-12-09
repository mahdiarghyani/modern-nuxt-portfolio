/**
 * Nuxt SSG Diagnostic Tool
 * Analyzes build output for common SSG/SSR/hydration issues
 */

const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = '.output/public';
const DIST_DIR = 'dist';
const CONFIG_FILE = 'nuxt.config.ts';

const diagnostics = {
  status: 'ok',
  problems: [],
  recommendations: [],
  details: {}
};

// Helper to check if directory exists
function dirExists(dir) {
  try {
    return fs.statSync(dir).isDirectory();
  } catch {
    return false;
  }
}

// Helper to check if file exists
function fileExists(file) {
  try {
    return fs.statSync(file).isFile();
  } catch {
    return false;
  }
}

// 1. Check prerendered routes
function checkPrerenderRoutes() {
  console.log('\n🔍 Checking prerendered routes...');
  
  const outputDir = dirExists(OUTPUT_DIR) ? OUTPUT_DIR : (dirExists(DIST_DIR) ? DIST_DIR : null);
  
  if (!outputDir) {
    diagnostics.problems.push('No build output directory found (.output/public or dist)');
    diagnostics.recommendations.push('Run `nuxi generate` or `npm run generate` to build the project');
    diagnostics.status = 'failed';
    return;
  }
  
  diagnostics.details.outputDir = outputDir;
  
  // Check expected routes
  const expectedRoutes = [
    'index.html',
    'blog/index.html',
    'fa/index.html',
    'fa/blog/index.html'
  ];
  
  const missingRoutes = [];
  const foundRoutes = [];
  
  expectedRoutes.forEach(route => {
    const fullPath = path.join(outputDir, route);
    if (fileExists(fullPath)) {
      foundRoutes.push(route);
    } else {
      missingRoutes.push(route);
    }
  });
  
  diagnostics.details.foundRoutes = foundRoutes;
  diagnostics.details.missingRoutes = missingRoutes;
  
  if (missingRoutes.length > 0) {
    diagnostics.problems.push(`Prerendered routes missing: ${missingRoutes.join(', ')}`);
    diagnostics.status = 'failed';
  }
  
  console.log(`✅ Found ${foundRoutes.length} routes`);
  if (missingRoutes.length > 0) {
    console.log(`❌ Missing ${missingRoutes.length} routes: ${missingRoutes.join(', ')}`);
  }
}

// 2. Check build assets
function checkBuildAssets() {
  console.log('\n🔍 Checking build assets...');
  
  const outputDir = diagnostics.details.outputDir;
  if (!outputDir) return;
  
  const nuxtDir = path.join(outputDir, '_nuxt');
  
  if (!dirExists(nuxtDir)) {
    diagnostics.problems.push('Build assets missing: /_nuxt/ directory not found');
    diagnostics.status = 'failed';
    console.log('❌ /_nuxt/ directory not found');
    return;
  }
  
  // Count JS files
  const files = fs.readdirSync(nuxtDir);
  const jsFiles = files.filter(f => f.endsWith('.js'));
  const cssFiles = files.filter(f => f.endsWith('.css'));
  
  diagnostics.details.buildAssets = {
    totalFiles: files.length,
    jsFiles: jsFiles.length,
    cssFiles: cssFiles.length
  };
  
  console.log(`✅ Found ${jsFiles.length} JS files and ${cssFiles.length} CSS files in /_nuxt/`);
  
  // Check for builds/meta directory
  const buildsMetaDir = path.join(nuxtDir, 'builds', 'meta');
  if (dirExists(buildsMetaDir)) {
    const metaFiles = fs.readdirSync(buildsMetaDir);
    diagnostics.details.buildAssets.metaFiles = metaFiles.length;
    console.log(`✅ Found ${metaFiles.length} meta files`);
  }
}

// 3. Check script tags in HTML
function checkScriptTags() {
  console.log('\n🔍 Checking script tags in HTML files...');
  
  const outputDir = diagnostics.details.outputDir;
  if (!outputDir) return;
  
  const htmlFiles = [
    'index.html',
    'blog/index.html',
    'blog/getting-started-with-nuxt-content/index.html'
  ];
  
  const relativePathIssues = [];
  
  htmlFiles.forEach(htmlFile => {
    const fullPath = path.join(outputDir, htmlFile);
    if (!fileExists(fullPath)) return;
    
    const content = fs.readFileSync(fullPath, 'utf-8');
    
    // Check for relative script paths (not starting with /)
    const scriptRegex = /<script[^>]+src=["']([^"']+)["']/g;
    const linkRegex = /<link[^>]+href=["']([^"']+)["']/g;
    
    let match;
    while ((match = scriptRegex.exec(content)) !== null) {
      const src = match[1];
      if (src.includes('_nuxt') && !src.startsWith('/')) {
        relativePathIssues.push({ file: htmlFile, path: src, type: 'script' });
      }
    }
    
    while ((match = linkRegex.exec(content)) !== null) {
      const href = match[1];
      if (href.includes('_nuxt') && !href.startsWith('/')) {
        relativePathIssues.push({ file: htmlFile, path: href, type: 'link' });
      }
    }
  });
  
  diagnostics.details.relativePathIssues = relativePathIssues;
  
  if (relativePathIssues.length > 0) {
    diagnostics.problems.push(`Relative JS/CSS paths detected in ${relativePathIssues.length} locations`);
    diagnostics.recommendations.push('Ensure app.baseURL is set to \'/\' in nuxt.config.ts');
    diagnostics.status = 'failed';
    console.log(`❌ Found ${relativePathIssues.length} relative path issues`);
    relativePathIssues.slice(0, 5).forEach(issue => {
      console.log(`   - ${issue.file}: ${issue.path}`);
    });
  } else {
    console.log('✅ All script/link paths are absolute');
  }
}

// 4. Check nuxt.config.ts
function checkNuxtConfig() {
  console.log('\n🔍 Checking nuxt.config.ts...');
  
  if (!fileExists(CONFIG_FILE)) {
    diagnostics.problems.push('nuxt.config.ts not found');
    return;
  }
  
  const config = fs.readFileSync(CONFIG_FILE, 'utf-8');
  
  const issues = [];
  
  // Check baseURL
  if (!config.includes('baseURL:') || !config.match(/baseURL:\s*['"]\/['"]/)) {
    issues.push('app.baseURL should be set to \'/\'');
  }
  
  // Check buildAssetsDir
  if (!config.includes('buildAssetsDir:') || !config.match(/buildAssetsDir:\s*['"]\/\_nuxt\/['"]/)) {
    issues.push('app.buildAssetsDir should be set to \'/_nuxt/\'');
  }
  
  // Check cdnURL
  if (config.includes('cdnURL:') && !config.match(/cdnURL:\s*['"]\/['"]/)) {
    issues.push('app.cdnURL should be set to \'/\' for SSG');
  }
  
  // Check prerender routes
  if (!config.includes('prerender:')) {
    issues.push('Consider adding nitro.prerender.routes configuration');
  }
  
  diagnostics.details.configIssues = issues;
  
  if (issues.length > 0) {
    issues.forEach(issue => {
      diagnostics.problems.push(`Config issue: ${issue}`);
    });
    console.log(`⚠️  Found ${issues.length} configuration issues`);
    issues.forEach(issue => console.log(`   - ${issue}`));
  } else {
    console.log('✅ Configuration looks good');
  }
}

// 5. Check for common deployment issues
function checkDeploymentIssues() {
  console.log('\n🔍 Checking deployment configuration...');
  
  const outputDir = diagnostics.details.outputDir;
  if (!outputDir) return;
  
  // Check if 200.html exists (for SPA fallback)
  const fallbackFile = path.join(outputDir, '200.html');
  if (fileExists(fallbackFile)) {
    console.log('✅ Found 200.html (SPA fallback)');
    diagnostics.details.hasSpaFallback = true;
  }
  
  // Check if 404.html exists
  const notFoundFile = path.join(outputDir, '404.html');
  if (fileExists(notFoundFile)) {
    console.log('✅ Found 404.html');
    diagnostics.details.has404Page = true;
  }
  
  // Check vercel.json
  if (fileExists('vercel.json')) {
    console.log('✅ Found vercel.json');
    diagnostics.details.hasVercelConfig = true;
  }
}

// Main diagnostic function
function runDiagnostics() {
  console.log('🚀 Starting Nuxt SSG Diagnostics...\n');
  console.log('=' .repeat(60));
  
  checkPrerenderRoutes();
  checkBuildAssets();
  checkScriptTags();
  checkNuxtConfig();
  checkDeploymentIssues();
  
  console.log('\n' + '='.repeat(60));
  console.log('\n📊 DIAGNOSTIC SUMMARY\n');
  console.log('Status:', diagnostics.status === 'ok' ? '✅ OK' : '❌ FAILED');
  console.log('\nProblems found:', diagnostics.problems.length);
  
  if (diagnostics.problems.length > 0) {
    console.log('\n🔴 PROBLEMS:');
    diagnostics.problems.forEach((problem, i) => {
      console.log(`${i + 1}. ${problem}`);
    });
  }
  
  if (diagnostics.recommendations.length > 0) {
    console.log('\n💡 RECOMMENDATIONS:');
    diagnostics.recommendations.forEach((rec, i) => {
      console.log(`${i + 1}. ${rec}`);
    });
  }
  
  // Write JSON report
  fs.writeFileSync('nuxt-diagnostic-report.json', JSON.stringify(diagnostics, null, 2));
  console.log('\n📄 Full report saved to: nuxt-diagnostic-report.json');
  
  console.log('\n' + '='.repeat(60));
  
  // Specific diagnosis for the user's issue
  console.log('\n🎯 SPECIFIC DIAGNOSIS FOR YOUR ISSUE:\n');
  console.log('You mentioned that JS files return 404 when refreshing /blog pages.');
  console.log('This is typically caused by:\n');
  console.log('1. ❌ Relative asset paths in HTML (e.g., "_nuxt/file.js" instead of "/_nuxt/file.js")');
  console.log('2. ❌ Missing or incorrect baseURL configuration');
  console.log('3. ❌ Server not configured to serve static assets from subdirectories\n');
  
  if (diagnostics.details.relativePathIssues && diagnostics.details.relativePathIssues.length > 0) {
    console.log('🔴 FOUND THE PROBLEM: Relative paths detected in your HTML!');
    console.log('   This means when you\'re on /blog, the browser looks for:');
    console.log('   /blog/_nuxt/file.js instead of /_nuxt/file.js\n');
  } else {
    console.log('✅ Your HTML files use absolute paths correctly.');
    console.log('   The issue might be with your deployment server configuration.\n');
  }
  
  return diagnostics.status === 'ok' ? 0 : 1;
}

// Run diagnostics
const exitCode = runDiagnostics();
process.exit(exitCode);
