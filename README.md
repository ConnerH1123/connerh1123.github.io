# Resume Website (Vanilla JS)

This is a simple, modern single-page resume website built with HTML, CSS and vanilla JavaScript.

How to use
1. Replace the data in `data/resume.json` with your information (or edit text directly in `index.html` for quick changes).
2. Put a PDF of your resume at `resume/ConnerH_Resume.pdf` or update `basics.resumePdf` to point at your file.
3. Host: push this repo to GitHub and enable GitHub Pages from the repository Settings (or host on Netlify/Vercel).

Files
- index.html — main page
- css/styles.css — styling and print rules
- js/app.js — loads `data/resume.json` and adds interactivity
- data/resume.json — structured resume data to edit

Tips
- Add links to projects in the `projects` array in `data/resume.json`.
- Tweak colors in `css/styles.css` (CSS variables at the top).
- For more advanced functionality, replace JS rendering with a small static-site toolchain (11ty, Vite) if you want templating.

If you want, I can:
- Convert this to a React/Vue app or a template for a static site generator.
- Add a printable PDF generator on the site (export to PDF).
- Customize fonts, colors, or layout to match your branding.

Enjoy — tell me which parts you want customized and I’ll adjust the code.