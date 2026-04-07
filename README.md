# Portfolio Wibisana

Portfolio personal modern berbasis **Next.js App Router**, **TypeScript**, **Tailwind CSS v4**, animasi **Framer Motion / Motion**, efek visual **Three.js (R3F)**, dan konten dinamis dari **Sanity CMS**.

---

## Daftar Isi

- [1. Ringkasan Proyek](#1-ringkasan-proyek)
- [2. Fitur Utama](#2-fitur-utama)
- [3. Teknologi yang Digunakan](#3-teknologi-yang-digunakan)
- [4. Arsitektur Aplikasi](#4-arsitektur-aplikasi)
- [5. Struktur Folder](#5-struktur-folder)
- [6. Setup Lokal (Quick Start)](#6-setup-lokal-quick-start)
- [7. Konfigurasi Environment Variable](#7-konfigurasi-environment-variable)
- [8. Integrasi Sanity CMS](#8-integrasi-sanity-cms)
- [9. Data Flow Halaman Utama](#9-data-flow-halaman-utama)
- [10. Penjelasan Komponen Utama](#10-penjelasan-komponen-utama)
- [11. Styling & Design System](#11-styling--design-system)
- [12. Script NPM](#12-script-npm)
- [13. Build & Deployment](#13-build--deployment)
- [14. Quality Check & Validasi](#14-quality-check--validasi)
- [15. Troubleshooting](#15-troubleshooting)
- [16. Roadmap Pengembangan](#16-roadmap-pengembangan)
- [17. FAQ](#17-faq)

---

## 1. Ringkasan Proyek

`Portfolio-Wibisana` adalah website portofolio dengan dua area utama:

1. **Website publik** di route utama (`/`) untuk menampilkan profil, pengalaman, proyek, dan kontak.
2. **CMS Studio** di route `/studio` untuk mengelola konten menggunakan Sanity.

Aplikasi dirancang agar tetap bisa tampil meskipun konfigurasi Sanity belum valid, dengan fallback data statis pada beberapa section.

---

## 2. Fitur Utama

- App Router dengan struktur route group: `(main)` dan `(studio)`.
- Konten dinamis dari Sanity: profile, experience, project, skills.
- Fallback data saat Sanity belum terkoneksi.
- Smooth scrolling berbasis Lenis.
- Motion-heavy UI (hero reveal, timeline, cards, CTA transitions).
- Efek WebGL menggunakan `@react-three/fiber` + custom shader (`Beams`, `MagicRings`).
- Utility class merge (`clsx` + `tailwind-merge`) untuk className yang konsisten.
- Sanity Studio terintegrasi langsung di aplikasi Next.js (`next-sanity/studio`).

---

## 3. Teknologi yang Digunakan

### Core

- Next.js `16.2.2`
- React `19.2.4`
- TypeScript `^5`

### UI & Styling

- Tailwind CSS `^4`
- `tailwindcss-animate`
- Framer Motion `^12`
- Motion `^12`
- Lucide React

### 3D / Visual Effects

- Three.js
- `@react-three/fiber`
- `@react-three/drei`
- `maath`

### CMS

- Sanity `^5`
- `next-sanity`
- `@sanity/image-url`

### Utilities

- `clsx`
- `tailwind-merge`
- `@studio-freight/lenis`

---

## 4. Arsitektur Aplikasi

### Route Group

- `app/(main)`
  - Berisi layout dan halaman publik portfolio.
- `app/(studio)`
  - Berisi layout terpisah untuk Sanity Studio.

### Pemisahan Server vs Client

- `app/(main)/page.tsx` adalah **Server Component** yang melakukan fetch data Sanity.
- Komponen section seperti `Hero`, `About`, `Experience`, `Projects`, `Contact` adalah **Client Component** karena memakai animasi/interaksi browser.

### Layout Terpisah

- `(main)/layout.tsx`: menyertakan font, global style, custom cursor, smooth scroller.
- `(studio)/layout.tsx`: minimal wrapper agar studio tetap clean dan terisolasi.

---

## 5. Struktur Folder

```txt
.
├── app
│   ├── (main)
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── (studio)
│   │   ├── layout.tsx
│   │   └── studio/[[...index]]/page.tsx
│   └── globals.css
├── components
│   ├── layout
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── SmoothScroller.tsx
│   ├── sections
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Experience.tsx
│   │   ├── Projects.tsx
│   │   └── Contact.tsx
│   ├── ui/CustomCursor.tsx
│   ├── Beams.tsx
│   ├── MagicRings.tsx
│   ├── BlurText.tsx
│   ├── GlassSurface.tsx
│   └── FluidGlass.tsx
├── hooks
│   └── useSectionInView.ts
├── lib
│   ├── cms
│   │   ├── client.ts
│   │   ├── queries.ts
│   │   └── image.ts
│   └── utils/cn.ts
├── sanity
│   ├── env.ts
│   └── schemaTypes
│       ├── index.ts
│       ├── profile.ts
│       ├── experience.ts
│       ├── project.ts
│       └── skills.ts
├── sanity.config.ts
└── package.json
```

---

## 6. Setup Lokal (Quick Start)

### Prasyarat

- Node.js 20+ direkomendasikan
- npm (default pada proyek ini)

### Langkah Instalasi

1. Clone repository.
2. Install dependency:

```bash
npm install
```

3. Buat file `.env.local` (lihat contoh pada bagian env).
4. Jalankan development server:

```bash
npm run dev
```

5. Buka aplikasi:

- Website: `http://localhost:3000`
- CMS Studio: `http://localhost:3000/studio`

---

## 7. Konfigurasi Environment Variable

Buat file `.env.local`:

```env
# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2024-04-07"
```

### Penjelasan

- `NEXT_PUBLIC_SANITY_PROJECT_ID`: ID project Sanity.
- `NEXT_PUBLIC_SANITY_DATASET`: dataset aktif (umumnya `production`).
- `NEXT_PUBLIC_SANITY_API_VERSION`: versi tanggal API Sanity.

### Validasi Internal

Di `sanity/env.ts`, aplikasi menganggap konfigurasi valid jika:

- `projectId` bukan placeholder `your-project-id`
- `projectId` dan `dataset` tersedia

Jika tidak valid, fetch CMS dilewati dan page memakai fallback data.

---

## 8. Integrasi Sanity CMS

### Client Sanity

`lib/cms/client.ts`:

- Menggunakan `createClient` dari `next-sanity`.
- `perspective: "published"` untuk konsumsi data publish.
- `useCdn: false` untuk konsistensi data saat development.

### Query GROQ

`lib/cms/queries.ts` menyediakan query:

- `getProfileQuery`
- `getExperienceQuery`
- `getProjectsQuery`
- `getSkillsQuery`

### Schema Sanity

`sanity/schemaTypes/`:

- `profile`: nama, title, subtitle, about
- `experience`: role/title, company, period, responsibilities
- `project`: title, slug, description, tech stack, image, link
- `skills`: category, items

### Studio Embed

Route `app/(studio)/studio/[[...index]]/page.tsx` me-render:

- `NextStudio` dari `next-sanity/studio`
- konfigurasi dari `sanity.config.ts` (basePath `/studio`)

---

## 9. Data Flow Halaman Utama

Di `app/(main)/page.tsx`:

1. Cek `hasValidSanityConfig`.
2. Jika valid, fetch paralel via `Promise.all`:
   - profile
   - experiences
   - projects
   - skills
3. Jika fetch gagal, log error dan return fallback object kosong.
4. Data dipassing ke section:
   - `Hero` menerima profile
   - `About` menerima `about`
   - `Experience` menerima list experiences
   - `Projects` menerima list projects

Catatan: saat ini data `skills` sudah di-fetch, namun belum dirender di section khusus.

---

## 10. Penjelasan Komponen Utama

### Layout

- `Navbar`
  - Header fixed dengan efek glass.
  - Mengubah opacity/shadow saat scroll.
- `SmoothScroller`
  - Inisialisasi Lenis + loop `requestAnimationFrame`.
- `Footer`
  - Footer sederhana dengan copyright.

### Sections

- `Hero`
  - Teks animasi bertahap (`BlurText`).
  - Efek background `MagicRings` aktif saat section terlihat (Intersection Observer).
  - Fallback name/title/subtitle jika data profile kosong.
- `About`
  - Menampilkan deskripsi dari CMS atau fallback text.
  - Ada statistik ringkas statis.
- `Experience`
  - Timeline pengalaman.
  - Mendukung dua bentuk field (`title/description` dari CMS atau `role/tasks` dari fallback lokal).
  - Efek background `Beams` aktif saat section in-view.
- `Projects`
  - Grid card project responsif.
  - Membaca `techStack` (CMS) atau `tech` (fallback lokal).
- `Contact`
  - CTA email dan tautan sosial.

### Utility

- `useSectionInView`
  - Hook reusable berbasis Intersection Observer.
- `cn`
  - Merge className untuk menghindari conflict utility Tailwind.

---

## 11. Styling & Design System

Sumber utama styling ada di `app/globals.css`:

- Import Tailwind v4: `@import "tailwindcss"`
- Plugin animasi: `@plugin "tailwindcss-animate"`
- Theme token via `@theme`:
  - warna dasar (primary, secondary, accent, light)
  - font vars (Geist Sans & Geist Mono)
- Utility custom:
  - `.glass`
  - `.glass-hover`
  - `.text-gradient`

Aplikasi memakai tone dark premium dengan accent monochrome.

---

## 12. Script NPM

Di `package.json`:

```bash
npm run dev    # Jalankan development server
npm run build  # Build production
npm run start  # Jalankan hasil build
npm run lint   # Jalankan ESLint
```

---

## 13. Build & Deployment

### Build Lokal

```bash
npm run build
npm run start
```

### Deploy ke Vercel

1. Import repository ke Vercel.
2. Set environment variable yang sama seperti `.env.local`.
3. Deploy branch utama.

### Deploy ke Server Sendiri

1. Build artifact dengan `npm run build`.
2. Jalankan `npm run start` pada environment Node.js production.
3. Pastikan semua env Sanity tersedia.

---

## 14. Quality Check & Validasi

Sebelum merge/deploy:

1. Jalankan lint:

```bash
npm run lint
```

2. Jalankan build:

```bash
npm run build
```

3. Cek manual:

- Halaman `/` tampil normal di desktop & mobile.
- Route `/studio` bisa diakses.
- Konten CMS muncul sesuai schema.
- Animasi berat (3D shader) tetap perform di device target.

---

## 15. Troubleshooting

### Studio kosong / gagal load

- Pastikan `NEXT_PUBLIC_SANITY_PROJECT_ID` benar.
- Pastikan `NEXT_PUBLIC_SANITY_DATASET` benar.
- Pastikan project Sanity bisa diakses oleh token/public mode yang dipakai.

### Data portfolio tidak muncul

- Cek apakah dokumen `profile`, `experience`, `project` sudah ada di Sanity.
- Pastikan query GROQ sesuai nama field schema.
- Lihat log terminal untuk pesan `Failed to fetch Sanity portfolio content`.

### Build error terkait browser API

- Komponen yang menggunakan `window`, `IntersectionObserver`, `requestAnimationFrame`, atau WebGL harus tetap bertanda `"use client"`.

### Performa animasi berat

- Turunkan jumlah elemen beam/ring pada komponen shader.
- Kurangi blur, noise, atau kompleksitas animasi.
- Uji pada perangkat low-end untuk baseline performa.

---

## 16. Roadmap Pengembangan

- Tambah section `Skills` yang benar-benar menggunakan data CMS.
- Tambah dukungan image project dari Sanity (`urlForImage`) di card.
- Tambah endpoint contact form nyata (server action/API route/email service).
- Ganti link placeholder (email, LinkedIn, GitHub, privacy, terms).
- Tambah automated tests (unit/integration/e2e) sesuai prioritas.
- Tambah CI pipeline (lint + build) sebelum deployment.

---

## 17. FAQ

### Apakah aplikasi tetap berjalan tanpa Sanity?

Ya. Halaman tetap render dengan fallback data pada beberapa section.

### Kenapa `skills` di-fetch tetapi tidak tampil?

Karena section `Skills` belum diimplementasikan di halaman utama saat ini.

### Kenapa route studio dipisahkan dari route utama?

Agar layout publik dan studio terisolasi, menghindari konflik style/UX.

### Apakah project ini siap production?

Secara struktur sudah siap, tetapi beberapa konten dan tautan masih placeholder, serta belum ada automated test.

---

Jika ingin, README ini bisa saya lanjutkan dengan tambahan:

1. Diagram arsitektur (Mermaid).
2. Dokumentasi field-by-field Sanity dalam bentuk tabel validasi.
3. Panduan deployment step-by-step untuk Vercel + domain custom.
