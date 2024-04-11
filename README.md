<div style="text-align:center">
  <h1>Magic Resume Generator</h1>
  <p>Enter data once, and quickly generate multiple beautiful resumes!</p>
  <p>Made with Vue 3 + Vite and Less</p>
</div>

<h2>Available Templates</h2>
<h3>Base</h3>
<p>
<img src="public/assets/previews/resume-base.png" style="width: 150px; margin-right:5px; border: 1px solid #ccc;" alt="" />
<img src="public/assets/previews/resume-base-blue.png" style="width: 150px; margin-right:5px; border: 1px solid #ccc;" alt="" />
<img src="public/assets/previews/resume-base-green.png" style="width: 150px; margin-right:5px; border: 1px solid #ccc;" alt="" />
<img src="public/assets/previews/resume-base-purple.png" style="width: 150px; margin-right:5px; border: 1px solid #ccc;" alt="" />
<img src="public/assets/previews/resume-base-white.png" style="width: 150px; margin-right:5px; border: 1px solid #ccc;" alt="" />
</p>
<h3>Cool</h3>
<p>
<img src="public/assets/previews/resume-cool.png" style="width: 150px; margin-right:5px; border: 1px solid #ccc;" alt="" />
<img src="public/assets/previews/resume-cool-rtl.png" style="width: 150px; margin-right:5px; border: 1px solid #ccc;" alt="" />
<img src="public/assets/previews/resume-cool-reverse.png" style="width: 150px; margin-right:5px; border: 1px solid #ccc;" alt="" />
</p>
<h3>Creative</h3>
<p>
<img src="public/assets/previews/resume-creative.png" style="width: 150px; margin-right:5px; border: 1px solid #ccc;" alt="" />
<img src="public/assets/previews/resume-creative-crimson.png" style="width: 150px; margin-right:5px; border: 1px solid #ccc;" alt="" />
<img src="public/assets/previews/resume-creative-purple.png" style="width: 150px; margin-right:5px; border: 1px solid #ccc;" alt="" />
<img src="public/assets/previews/resume-creative-teal.png" style="width: 150px; margin-right:5px; border: 1px solid #ccc;" alt="" />
</p>
<h3>Left Right</h3>
<p>
<img src="public/assets/previews/resume-left-right.png" style="width: 150px; margin-right:5px; border: 1px solid #ccc;" alt="" />
</p>
<h3>Material Dark</h3>
<p>
<img src="public/assets/previews/resume-material-dark.png" style="width: 150px; margin-right:5px; border: 1px solid #ccc;" alt="" />
<img src="public/assets/previews/resume-material-dark-reverse.png" style="width: 150px; margin-right:5px; border: 1px solid #ccc;" alt="" />
</p>
<h3>Oblique</h3>
<p>
<img src="public/assets/previews/resume-oblique.png" style="width: 150px; margin-right:5px; border: 1px solid #ccc;" alt="" />
<img src="public/assets/previews/resume-oblique-orange.png" style="width: 150px; margin-right:5px; border: 1px solid #ccc;" alt="" />
<img src="public/assets/previews/resume-oblique-red.png" style="width: 150px; margin-right:5px; border: 1px solid #ccc;" alt="" />
<img src="public/assets/previews/resume-oblique-teal.png" style="width: 150px; margin-right:5px; border: 1px solid #ccc;" alt="" />
</p>
<h3>Professional</h3>
<p>
<img src="public/assets/previews/resume-professional.png" style="width: 150px; margin-right:5px; border: 1px solid #ccc;" alt="" />
</p>
<h3>Side Bar</h3>
<p>
<img src="public/assets/previews/resume-side-bar.png" style="width: 150px; margin-right:5px; border: 1px solid #ccc;" alt="" />
</p>

## Prerequisite

1. [Node](https://nodejs.org/en/) (latest)
2. [NPM](https://www.npmjs.com/) (latest)

## How to use

1. Clone the repository.

   ```
   git clone https://github.com/gainedm/magic-resume-generator.git
   ```

2. Go to the project directory.

   ```
   cd magic-resume-generator
   ```

3. Install the project.

   ```
   npm i
   ```

4. Customize your data in the `data/` directory:

   1. Update `data.yml` with your information.
   2. Add your profile picture to the `resume/` directory and update the `picture` value in `data.yml` to match the file name.

5. Preview resumes with `npm run dev`. Navigate to http://localhost:5173 in your browser to see thumbnails. Click a thumbnail to see a full-page preview.

6. Export resumes with `npm run export`. You can also export a single resume using `npm run export --template=template-name`. All resumes will be exported to the `public/assets/pdf/` folder.

## Creating and Updating Templates

Please read the [developer documentation](DEVELOPER.md) for instructions on creating and updating templates.

## Contribute

Feel free to open a pull request to add new templates, language supports, fix bugs, or improve the documentation.

## Credits

> Originally based on the [best-resume-ever](https://github.com/salomonelli/best-resume-ever) project by [@salomonelli](https://github.com/salomonelli). I also ported some templates from [best-resume-ever](https://github.com/noDojo/best-resume-ever) by [@noDojo](https://github.com/nodojo).

This project uses several open source packages:

- <a href="https://github.com/vuejs/core" target="_blank">Vue 3</a>
- <a href="https://github.com/vitejs/" target="_blank">Vite</a>
- <a href="https://github.com/GoogleChrome/puppeteer" target="_blank">Puppeteer</a>
- <a href="https://github.com/less/less.js" target="_blank">Less</a>

---

> GitHub [@gainedm](https://github.com/gainedm)

## License

[MIT](https://github.com/gainedm/magic-resume-generator?tab=License-1-ov-file)
