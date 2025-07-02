Absolutely! Here’s the refined and **detailed** version of the prompt for `public.md`, ensuring clarity and precision:

---

# 📂 public.md

This guide defines the **structure**, **naming conventions**, and **usage** for the `public` folder in the project.

---

## 🧭 Overview

The `public` folder is the central location for all **public-facing assets** that are directly accessible by the browser. These include:

* Images (e.g., icons, logos, illustrations)
* Videos (e.g., demo videos, background videos)
* Other static files (e.g., PDFs, JSON files)

You **must** follow a strict structure and naming convention to maintain a clean, scalable asset system.

---

## 📂 Folder Structure: Organize by Asset Type

Organize assets into **dedicated folders** based on their type.

Here’s the **required structure**:

```
public/
├── icons/      (All SVG/PNG icons)
├── images/     (All non-icon images)
├── videos/     (All video files)
└── files/      (PDFs, JSON files, text files, etc.)
```

📌 **Key Rules**:
* if an asset already exists, and i mean they have the same content not name use that asset, no need to create a new one. 
* Always **place assets in the correct folder** based on their type:

  * Icons → `icons/`
  * Images → `images/`
  * Videos → `videos/`
  * Files → `files/`

---

## ✍️ File Naming Conventions

✅ **All files must be renamed** to a **descriptive, kebab-case format** before saving.

### Format:

```
<description>-<type>.<ext>
```

For example:

* `info-icon.svg`
* `user-icon.svg`
* `hero-banner-image.jpg`
* `background-video.mp4`
* `resume-pdf.pdf`

✅ If there are **duplicates**, append a numeric suffix:

```
info-icon_1.svg
info-icon_2.svg
```

✅ Always ensure filenames are:

* Descriptive
* Lowercase
* Separated by hyphens (`-`)
* No spaces, no special characters

---

## 🔗 Import & Export: Centralized in `@/constants/assets.ts`

### Step 1️⃣ — Import the File

After saving a file in `public/`, import it in `@/constants/assets.ts`.

For example:

```ts
import info_icon_01 from "@/public/icons/info-icon_01.svg";
import user_icon from "@/public/icons/user-icon.svg";
import hero_banner_image from "@/public/images/hero-banner-image.jpg";
import background_video from "@/public/videos/background-video.mp4";
```

✅ Follow the **same naming convention** for variables:

* Replace hyphens (`-`) with underscores (`_`)
* File extension (`.svg`, `.jpg`) is **omitted** in the variable name
* Suffix numbers are included if necessary (`info_icon_01`)

---

### Step 2️⃣ — Export the Assets

Export all imported assets **together** in a single `export` statement:

```ts
export { info_icon_01, user_icon, hero_banner_image, background_video };
```

✅ Keep the `export` block organized by asset type if needed.

---

## 🧩 Usage in Components

You can **import any asset** in your components via the `constants` index file.

For example:

```ts
import { assets } from "@/constants";

<Image src={assets.info_icon_01} alt="Info icon" />
```

✅ All assets are available via the `assets` object.
✅ No need to import directly from `public/` in your components—always use the centralized `constants` system.

---

## 📦 Contextual Summary: Constants Folder

`constants/index.ts` manages all constants used across the app:

```ts
import * as assets from "./assets";
import * as variables from "./vars";

export { assets, variables };
```

This ensures:

* **Centralized access** to all assets.
* Consistency in how assets are imported and used across the app.

---

## ✅ Final Checklist

Before pushing any asset:

1. [ ] Did you place the file in the **correct folder** (`icons`, `images`, `videos`, or `files`)?
2. [ ] Did you rename the file to **descriptive, kebab-case format**?
3. [ ] Did you import the file in `@/constants/assets.ts` following the variable naming convention?
4. [ ] Did you export it properly from `@/constants/assets.ts`?
5. [ ] Are you using the asset in components via `assets` from `constants`?

---

Let me know if you’d like me to draft the actual markdown file (`public.md`) for you! 🚀
