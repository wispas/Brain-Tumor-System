Tailwind integration
====================

This project uses Tailwind CSS. The Tailwind input file is `src/styles/tailwind.css` and the compiled output is written to `static/css/tailwind.css`.

Setup (Windows PowerShell)

1. Install Node.js (>=16) if you don't have it.
2. From the project root run:

```powershell
npm install
npm run build:css    # build once
# or during development:
npm run watch:css
```

Notes
- The templates include the compiled CSS via `{{ url_for('static', filename='css/tailwind.css') }}`.
- Existing CSS files are preserved; Tailwind utilities can be used immediately after building.
# cd d:\Brain-Tumor-System
# npm install
# npm run build:css        # build once
# or for development:
# npm run watch:css
