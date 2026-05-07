# Personal Portfolio

A minimal three-page personal site built as plain HTML / CSS / JS — no build step, deploys straight to GitHub Pages.

## File structure

```
/
├── index.html            ← Projects page (header + about + grid)
├── about.html            ← About page (edit the copy inside)
├── contact.html          ← Contact page (edit the copy inside)
├── css/
│   └── styles.css        ← All styling, design tokens, responsive rules
├── js/
│   └── app.js            ← Custom cursor, grid rendering, detail panel
├── data/
│   └── projects.js       ← ⭐ The only file you edit to add/update projects
└── assets/
    ├── paper.jpg         ← Paper background (replace with your own)
    ├── logo.png          ← Handwritten header logo (replace with your own)
    └── placeholders/     ← Default placeholder images (can delete)
```

## Adding / editing projects

Open **`data/projects.js`**. Each project is an object in the `PROJECTS` array. To add a new one, copy an existing block and edit the fields:

```js
{
  id: "my-project",                        // URL-safe unique slug
  title: "My Project",                     // Shown on the tile + panel
  tags: ["Landscape", "Film"],             // Grey pills on the tile
  overview: "One or two short sentences.",
  context: "A longer paragraph of context.",
  details: [                               // Bullet list in the panel
    "Camera: Nikon F3",
    "Lens: 35mm f/2.8"
  ],
  meta: {                                  // Key/value pairs at bottom of panel
    Date: "July 14, 2024",
    Location: "British Columbia, Canada",
    Category: "Landscape"
  },
  images: [                                // Paths relative to site root
    "assets/my-project/img-1.jpg",
    "assets/my-project/img-2.jpg",
    "assets/my-project/img-3.jpg"
  ],
  displayCount: 2                          // See below
}
```

### The `displayCount` field

Controls how many images flash through **on the grid tile**:

- `1` → tile shows only the first image, static (default)
- `2` → tile cycles through the first 2 images on hover
- `3` → tile cycles through the first 3 images, and so on

The **detail panel always shows every image** in the `images` array regardless of this value.

### Image tips

- Put your project images in `assets/<project-id>/` to keep things tidy.
- Both horizontal and vertical images work — they're auto-padded into a consistent box on the grid, so they never get cropped awkwardly.
- Recommended: compress images (TinyPNG, Squoosh) before uploading. Aim for under 500KB each.

## Replacing the design assets

### Paper background

Replace `assets/paper.jpg` with your paper image. It should be large (e.g. 2000px+ wide) so it looks crisp on big screens. The CSS uses `background-size: cover` and `background-attachment: fixed` so it scales to any screen.

### Handwritten logo

Replace `assets/logo.png` with your handwritten signature/logo. Use a **transparent PNG** so the paper texture shows through. It will auto-scale to fit the header (height between ~52px and ~96px depending on screen size).

If you ever remove or rename `logo.png`, the site automatically falls back to a plain text "Portez®" so nothing breaks.

## Editing the About / Contact pages

Open `about.html` or `contact.html` and edit the text inside `<section class="simple-page">`. That's it.

## Editing the header info

Top right of every page shows location and local time. To change the location, find this block in each HTML file:

```html
<div class="nav-col">
  <span>UK, London</span>
  <span data-localtime>—:—</span>
</div>
```

Just swap "UK, London" for wherever you are. The time updates automatically based on the visitor's clock.

The X / Instagram links are in the adjacent `<div class="nav-col">` block — update the `href` attributes to point to your real accounts.

## Design notes

- **Fonts**: Manrope (display) + Inter (body), loaded from Google Fonts
- **Custom cursor**: the `✦` symbol follows the mouse; turns white on hover and when clicking. Falls back to a normal cursor on touch devices.
- **Grid hover effect**: hovering a tile shrinks the others and shows corner dots on the active tile.
- **Detail panel**: slides in from the right, carousel rotates through all project images every ~2s, clickable dots to jump around. Esc key closes it.

## Deploying to GitHub Pages

1. Create a new GitHub repo and push these files to the `main` branch.
2. In the repo go to **Settings → Pages**.
3. Under *Source*, select the `main` branch and the `/ (root)` folder.
4. Save. Your site will be live at `https://<your-username>.github.io/<repo-name>/` in about a minute.

That's it — no build step, no framework, no dependencies. Just edit `data/projects.js` and drop in your images.
