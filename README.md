# Portfolio-Website

This repository contains a simple personal portfolio website that you can share with recruiters.

## Files

- `index.html` – main page structure
- `style.css` – styling for the page
- `script.js` – small JavaScript behavior (dynamic copyright year)
- `assets/images/certificates/` – put your certificate images in this folder

## Run locally

Because this is a static website, you can open `index.html` directly in your browser.

Or run a local server:

```bash
python3 -m http.server 8000
```

Then open: `http://localhost:8000`

## Customize

Update the placeholder details in `index.html`:

- Your name
- About section
- Projects
- Contact details

For certificate images:

1. Put your files in `assets/images/certificates/`
2. Update certificate file names in `script.js` (`certificateFiles` list)

## Share with recruiters

1. Push this repository to GitHub.
2. Enable GitHub Pages from repository settings.
3. Share the published site URL.
