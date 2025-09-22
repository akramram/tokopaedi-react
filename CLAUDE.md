# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a full-stack Tokopedia scraper application with:
- **Frontend**: Next.js 15 with TypeScript, Tailwind CSS 4, and React 19
- **Backend**: FastAPI with Python 3.10+ using curl-cffi for web scraping
- **Deployment**: Frontend on GitHub Pages, Backend on Vercel

## Development Commands

### Frontend (Next.js)
```bash
cd frontend
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run export       # Build and export static files
npm run deploy       # Export and add .nojekyll for GitHub Pages
npm run lint         # Run ESLint
```

### Backend (FastAPI)
```bash
cd backend
pip install -r requirements.txt           # Install dependencies
python -m uvicorn main:app --reload       # Development server (from backend root)
python -m uvicorn api.main:app --reload   # Alternative if main.py issues
```

### Deployment
```bash
./deploy.sh     # Linux/Mac deployment script
deploy.bat      # Windows deployment script
```

## Architecture

### Backend Structure
- **`backend/api/main.py`**: Vercel-compatible FastAPI app entry point
- **`backend/src/tokopaedi/`**: Core scraping library
  - `search.py`: Product search functionality
  - `get_product.py`: Individual product details
  - `get_reviews.py`: Product reviews scraping
  - `tokopaedi_types.py`: Type definitions
  - `__init__.py`: SearchFilters dataclass and main exports
- **`backend/vercel.json`**: Vercel deployment configuration
- **`backend/requirements.txt`**: Python dependencies

### Frontend Structure
- **`frontend/src/app/`**: Next.js App Router
  - `page.tsx`: Main search interface with advanced filters
  - `layout.tsx`: Root layout component
  - `globals.css`: Tailwind CSS styles
- **`frontend/next.config.ts`**: Static export config for GitHub Pages

### API Endpoints
- `GET /`: Health check
- `GET /search/{keyword}`: Search with advanced filters
- `GET /product/{product_id}`: Product details
- `GET /reviews/{product_id}`: Product reviews

### Environment Configuration
- **Development**: Frontend on `localhost:3000`, Backend on `localhost:8000`
- **Production**: Frontend uses basePath `/tokopaedi-react` for GitHub Pages
- **CORS**: Backend allows `akramram.github.io` and localhost origins

## Key Features

### SearchFilters (backend/src/tokopaedi/__init__.py)
Comprehensive filtering with price ranges, ratings, shop tiers, product conditions, and special services (free shipping, COD, discounts).

### Responsive UI (frontend/src/app/page.tsx)
Modern Tokopedia-style interface with:
- Advanced filter panel
- Responsive card grid layout
- Mobile-optimized interactions
- Loading states and error handling

## Testing and Quality

Run backend tests:
```bash
cd backend
python -m pytest tests/
```

No specific test framework configured for frontend - use standard Next.js testing practices.

## Important Notes

- Frontend uses static export for GitHub Pages compatibility
- Backend imports from `src.tokopaedi` module structure
- CORS configured for GitHub Pages deployment domain
- Deployment scripts handle both frontend and backend deployment
- Backend has 30-second timeout limit on Vercel