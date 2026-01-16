# Chakra Bio - Next.js Frontend

This is the migrated Next.js version of the Chakra Bio saffron e-commerce website.

## Migration Complete ✅

All pages and components from the React (Vite) app have been successfully migrated to Next.js 16 with App Router.

### Pages Available:
- **Home** (`/`) - Landing page with hero, features, products, testimonials
- **Products** (`/products`) - Product listing with filters
- **Product Details** (`/products/[id]`) - Individual product pages
- **About** (`/about`) - Company information and values
- **Contact** (`/contact`) - Contact form and information
- **Blog** (`/blog`) - Blog listing
- **Blog Post** (`/blog/[slug]`) - Individual blog posts
- **Gallery** (`/gallery`) - Image gallery with filters
- **Pharmacy** (`/pharmacy`) - Health benefits information
- **Training** (`/training`) - Training programs

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19
- **Styling:** Tailwind CSS 3
- **Components:** shadcn/ui (Radix UI)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod
- **State:** TanStack Query

## Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Home page
│   │   ├── products/          # Products pages
│   │   ├── blog/              # Blog pages
│   │   ├── about/             # About page
│   │   ├── contact/           # Contact page
│   │   ├── gallery/           # Gallery page
│   │   ├── pharmacy/          # Pharmacy page
│   │   ├── training/          # Training page
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── layout/           # Layout components
│   │   ├── home/             # Home page sections
│   │   └── providers.tsx     # Client providers
│   ├── lib/                   # Utilities
│   └── hooks/                 # Custom hooks
├── public/                    # Static assets
├── tailwind.config.ts        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies

```

## Key Features

- ✅ Fully responsive design
- ✅ Dark mode support (via next-themes)
- ✅ Smooth animations (Framer Motion)
- ✅ SEO optimized
- ✅ Type-safe with TypeScript
- ✅ Accessible UI components
- ✅ WhatsApp integration for orders
- ✅ Image optimization (Next.js Image)
- ✅ Fast page loads with App Router

## Build for Production

```bash
npm run build
npm start
```

## Notes

- Uses `--legacy-peer-deps` due to React 19 compatibility with some packages
- All original functionality from the React app has been preserved
- Routing changed from React Router to Next.js App Router
- All components marked with `"use client"` where needed for interactivity
