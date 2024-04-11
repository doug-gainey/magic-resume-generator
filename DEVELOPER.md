# Developer Documentation

## Templates

All templates are located in the `src/templates` directory.

### Creating New Templates

1. Create a copy of `src/templates/template.vue`.

2. Rename the file and update the template name:
   ```javascript
   export default getOptions('template-name');
   ```
3. Import the newly added template in `src/pages/Resume.vue` and add it to the components object:

   ```javascript
   import TemplateName from '../templates/template-name.vue';

   const components = {
     'template-name': TemplateName
   };
   ```

   Your new resume will now be reachable at http://localhost:5173/resume/template-name.

4. Export resumes with `npm run export`.

5. Add the template name to the templates array in `src/pages/Home.vue`:

   ```javascript
   template: { 'base', ..., 'template-name' };
   ```

   Your new resume will now show on the homepage at http://localhost:5173/.

## Fonts

### Icons

This project contains the [Material Design](https://github.com/google/material-design-icons) and [Font Awesome](https://github.com/FortAwesome/Font-Awesome) icon sets.

### Included Fonts

These fonts are included:

- Open Sans, Open Sans Condensed

- Raleway

- Roboto

- Source Sans (Source Sans 3, Source Sans Pro)

### Adding a New Font

All fonts are installed via npm. To add a new font, search for the associated npm module. Add the module to the package.json and install it. Import the css file in `src/App.vue`.
