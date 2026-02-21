import 'dotenv/config';
import fs from 'fs';
import http from 'http';
import path from 'path';
import {convert} from 'pdf-img-convert';
import puppeteer from 'puppeteer';
import {interval} from 'rxjs';
import {filter, first, mergeMap} from 'rxjs/operators';

const __url = 'http://localhost:5173';
const templateDirectory = path.join(import.meta.dirname, '../src/templates');
const pdfDirectory = path.join(import.meta.dirname, '../public/assets/pdf/');
const previewDirectory = path.join(import.meta.dirname, '../public/assets/previews/');

const showProgress = function () {
  return process.env.npm_config_loglevel === 'verbose' || process.env.npm_config_show_progress;
};

const clearDirectory = async directory => {
  if (fs.existsSync(directory)) {
    for (const file of fs.readdirSync(directory)) {
      await fs.unlinkSync(path.join(directory, file));
    }
  }
};

const fetchResponse = () => {
  return new Promise((res, rej) => {
    try {
      const req = http.request(__url, response => res(response.statusCode));
      req.on('error', error => rej(error));
      req.end();
    } catch (error) {
      console.log(error);
      rej(error);
    }
  });
};

const waitForServerReachable = () => {
  return interval(1000).pipe(
    mergeMap(async () => {
      try {
        const statusCode = await fetchResponse();
        if (statusCode === 200) {
          return true;
        }
      } catch (error) {
        console.log(error);
      }

      return false;
    }),
    filter(ok => !!ok)
  );
};

const getTemplateNames = () => {
  return fs
    .readdirSync(templateDirectory)
    .filter(file => file.endsWith('.vue') && file !== 'template.vue')
    .map(fileName => fileName.replace('.vue', ''));
};

const generatePDF = async templateName => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(`${__url}/resume/${templateName}`, {waitUntil: 'networkidle2'});

  if (!fs.existsSync(pdfDirectory)) {
    fs.mkdirSync(pdfDirectory);
  }

  const fileName = `resume-${templateName}.pdf`;
  await page.pdf({path: `${pdfDirectory}${fileName}`, format: 'A4'});

  // If it's the default template, we also save it as resume.pdf
  if (process.env.VITE_DEFAULT_TEMPLATE === templateName) {
    await page.pdf({path: `${pdfDirectory}resume.pdf`, format: 'A4'});
    if (showProgress()) {
      console.log(` - resume.pdf`);
    }
  }

  await browser.close();

  if (showProgress()) {
    console.log(` - ${fileName}`);
  }
};

const generatePDFs = async () => {
  try {
    await waitForServerReachable().pipe(first()).toPromise();

    const templateNames = getTemplateNames();

    console.log('Clearing pdf directory...');
    await clearDirectory(pdfDirectory);

    console.log('Generating pdf exports...');
    for (let i = 0; i < templateNames.length; i++) {
      await generatePDF(templateNames[i]);
    }
  } catch (error) {
    console.log(error);
  }
};

const generatePreview = async (fileName) => {
  const templateName = fileName.replace(/^resume-/, '').replace(/\.pdf$/i, '');

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(`${__url}/resume/${templateName}`, { waitUntil: 'networkidle2' });
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 0.5 }); // ~360x504

  const pngName = fileName.replace(/\.pdf$/i, '.png');
  await fs.promises.mkdir(previewDirectory, { recursive: true });
  await page.screenshot({ path: path.join(previewDirectory, pngName), type: 'png' });

  await browser.close();
  if (showProgress()) console.log(` - ${pngName}`);
};

const generatePreviews = async () => {
  console.log('Clearing preview directory...');
  await clearDirectory(previewDirectory);

  const pdfs = fs.readdirSync(pdfDirectory);
  console.log('Generating previews...');
  for (let i = 0; i < pdfs.length; i++) {
    await generatePreview(pdfs[i]);
  }
};

if (process.env.npm_config_template) {
  // Export a single template using: npm run export --template=template-name
  console.log('Generating pdf export...');
  await generatePDF(process.env.npm_config_template);
  console.log('Generating preview...');
  await generatePreview(`resume-${process.env.npm_config_template}.pdf`);
} else {
  // Export all templates
  await generatePDFs();
  await generatePreviews();
}

console.log('Done.');
