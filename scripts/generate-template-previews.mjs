import { execFileSync } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const templatesFile = path.join(repoRoot, 'frontend', 'lib', 'templates.ts');
const previewResumePath = path.join(repoRoot, 'schemas', 'preview_resume_en.json');
const templatesDir = path.join(repoRoot, 'templates');
const tmpDir = path.join(repoRoot, '.tmp', 'template-previews');
const outputDir = path.join(repoRoot, 'frontend', 'public', 'images', 'templates', 'generated');

const fontPathsByTemplate = {
  harbor_serif_v1: [path.join(repoRoot, 'inspo', 'template7', 'Fonts')],
};

const familyRegex = /sourceTemplateId:\s*'([^']+)'[\s\S]*?available:\s*(true|false),/g;

const toPosixPath = (value) => value.split(path.sep).join('/');

const getAvailableSourceTemplateIds = async () => {
  const content = await fs.readFile(templatesFile, 'utf8');
  const ids = new Set();

  for (const match of content.matchAll(familyRegex)) {
    const [, sourceTemplateId, availableFlag] = match;
    if (availableFlag === 'true') ids.add(sourceTemplateId);
  }

  return [...ids];
};

const compilePdf = (sourceTemplateId, jsonPath, pdfPath) => {
  const relativeJsonPath = toPosixPath(path.relative(templatesDir, jsonPath));
  const templatePath = path.join(templatesDir, `${sourceTemplateId}.typ`);
  const fontPaths = fontPathsByTemplate[sourceTemplateId] ?? [];
  const args = ['compile'];

  for (const fontPath of fontPaths) {
    args.push('--font-path', fontPath);
  }

  args.push('--root', repoRoot, '--input', `data_path=${relativeJsonPath}`, templatePath, pdfPath);

  execFileSync('typst', args, {
    cwd: repoRoot,
    stdio: 'inherit',
  });
};

const renderPreview = (pdfPath, pngBasePath, outputPath) => {
  execFileSync(
    'pdftoppm',
    ['-f', '1', '-singlefile', '-png', '-r', '144', pdfPath, pngBasePath],
    {
      cwd: repoRoot,
      stdio: 'inherit',
    }
  );

  execFileSync(
    'magick',
    [
      `${pngBasePath}.png`,
      '-resize',
      '900x',
      '-strip',
      '-define',
      'webp:method=6',
      '-quality',
      '88',
      outputPath,
    ],
    {
      cwd: repoRoot,
      stdio: 'inherit',
    }
  );
};

const main = async () => {
  const sourceTemplateIds = await getAvailableSourceTemplateIds();
  const previewResume = JSON.parse(await fs.readFile(previewResumePath, 'utf8'));

  await fs.mkdir(tmpDir, { recursive: true });
  await fs.mkdir(outputDir, { recursive: true });

  for (const sourceTemplateId of sourceTemplateIds) {
    const variantId = `${sourceTemplateId}_en`;
    const payload = {
      ...previewResume,
      metadata: {
        ...previewResume.metadata,
        language: 'en',
        template_id: variantId,
      },
    };
    const jsonPath = path.join(tmpDir, `${sourceTemplateId}.json`);
    const pdfPath = path.join(tmpDir, `${sourceTemplateId}.pdf`);
    const pngBasePath = path.join(tmpDir, sourceTemplateId);
    const outputPath = path.join(outputDir, `${sourceTemplateId}.webp`);

    await fs.writeFile(jsonPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');

    console.log(`Generating preview for ${sourceTemplateId}...`);
    compilePdf(sourceTemplateId, jsonPath, pdfPath);
    renderPreview(pdfPath, pngBasePath, outputPath);
  }

  console.log(`Generated ${sourceTemplateIds.length} template previews in ${outputDir}`);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
