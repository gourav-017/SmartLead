# Migration to Vite + Tailwind CSS

## Changes Made

### Frontend Stack Update
- ✅ Migrated from **Create React App** to **Vite**
- ✅ Replaced custom CSS with **Tailwind CSS**
- ✅ Updated all components to use Tailwind utility classes

### Key Changes

1. **Package.json**
   - Removed `react-scripts`
   - Added Vite and related dependencies
   - Added Tailwind CSS, PostCSS, and Autoprefixer
   - Updated scripts: `npm run dev` (instead of `npm start`)

2. **Configuration Files**
   - `vite.config.js` - Vite configuration with React plugin and API proxy
   - `tailwind.config.js` - Tailwind CSS configuration
   - `postcss.config.js` - PostCSS configuration for Tailwind

3. **File Structure**
   - `index.html` moved to frontend root (Vite requirement)
   - `src/main.jsx` - New entry point (replaces `src/index.js`)
   - `src/App.jsx` - Updated component with Tailwind classes
   - Removed `src/App.css` (replaced with Tailwind)

4. **Environment Variables**
   - Changed from `REACT_APP_API_URL` to `VITE_API_URL`
   - Use `import.meta.env.VITE_API_URL` in code

5. **Styling**
   - All CSS classes converted to Tailwind utility classes
   - Responsive design maintained with Tailwind breakpoints
   - Gradient backgrounds and hover effects preserved

## Benefits

- ⚡ **Faster Development**: Vite's HMR is significantly faster
- 🎨 **Better DX**: Tailwind's utility-first approach
- 📦 **Smaller Bundle**: Vite's optimized build output
- 🔧 **Modern Tooling**: Latest build tools and optimizations

## Running the Project

```bash
# Install dependencies
cd frontend
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Environment Variables

Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

For production, use `.env.production`:

```env
VITE_API_URL=https://your-backend-url.com/api
```

