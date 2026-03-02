import puppeteer from 'puppeteer';
import express from 'express';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.join(__dirname, 'dist');
const OUTPUT_DIR = path.join(__dirname, 'pdfs');

// Recursive function to get all HTML files
async function getHtmlFiles(dir) {
    let results = [];
    const list = await fs.readdir(dir, { withFileTypes: true });
    for (const file of list) {
        const fullPath = path.resolve(dir, file.name);
        if (file.isDirectory()) {
            results = results.concat(await getHtmlFiles(fullPath));
        } else {
            results.push(fullPath);
        }
    }
    return results.filter(f => f.endsWith('.html'));
}

async function capture() {
    console.log('Starting local server...');
    const app = express();
    app.use(express.static(DIST_DIR));

    const server = app.listen(0, async () => {
        const port = server.address().port;
        console.log(`Server running on port ${port}`);

        // Ensure output dir exists
        await fs.mkdir(OUTPUT_DIR, { recursive: true });

        console.log('Finding HTML files...');
        const htmlFiles = await getHtmlFiles(DIST_DIR);
        console.log(`Found ${htmlFiles.length} pages to capture.`);

        console.log('Launching browser...');
        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();

        // Set viewport for a good PDF layout (desktop size)
        await page.setViewport({ width: 1200, height: 800 });

        for (const file of htmlFiles) {
            // Get relative path to map to URL
            const relativePath = path.relative(DIST_DIR, file);
            // Replace backslashes with slashes for URL
            const urlPath = relativePath.split(path.sep).join('/');
            let url = `http://localhost:${port}/${urlPath}`;

            console.log(`Capturing: ${urlPath}`);
            await page.goto(url, { waitUntil: 'networkidle0' });

            // Determine output PDF path
            let pdfName = urlPath;
            if (pdfName === 'index.html') pdfName = 'home.pdf';
            else if (pdfName.endsWith('/index.html')) {
                pdfName = pdfName.replace('/index.html', '.pdf');
            } else {
                pdfName = pdfName.replace(/\.html$/, '.pdf');
            }

            const outputPath = path.join(OUTPUT_DIR, pdfName);

            // Ensure subdirectories exist for output
            await fs.mkdir(path.dirname(outputPath), { recursive: true });

            await page.pdf({
                path: outputPath,
                format: 'A4',
                printBackground: true,
                margin: { top: '20px', right: '20px', bottom: '20px', left: '20px' }
            });
            console.log(`Saved: ${outputPath}`);
        }

        console.log('Closing browser and server...');
        await browser.close();
        server.close();
        console.log(`All PDFs saved to: ${OUTPUT_DIR}`);
    });
}

capture().catch(err => {
    console.error(err);
    process.exit(1);
});
