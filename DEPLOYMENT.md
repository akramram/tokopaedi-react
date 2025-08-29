# Deployment Guide for Tokopaedi Full-Stack Application

This guide explains how to deploy the full-stack Tokopaedi application with the frontend on GitHub Pages and the backend on Vercel.

## Architecture Overview

- **Frontend**: Next.js application deployed to GitHub Pages (Static Site)
- **Backend**: FastAPI application deployed to Vercel (Serverless Functions)
- **Database**: Not applicable (scraper application)

## Prerequisites

1. GitHub account
2. Vercel account (free tier available)
3. Node.js 18+ installed locally
4. Python 3.10+ installed locally

## Deployment Steps

### 1. Backend Deployment (Vercel)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

3. **Deploy to Vercel**:
   ```bash
   vercel --prod
   ```

4. **Note the deployment URL** (e.g., `https://your-backend-app.vercel.app`)

### 2. Frontend Configuration

1. **Update production environment**:
   - Edit `frontend/.env.production`
   - Replace `https://your-backend-app.vercel.app` with your actual Vercel backend URL

2. **Update GitHub Pages configuration**:
   - In `frontend/next.config.ts`, ensure `basePath` matches your repository name
   - Current setting: `/tokopaedi-react` (change if your repo has a different name)

### 3. Frontend Deployment (GitHub Pages)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Configure for deployment"
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Select "GitHub Actions" as the source
   - The workflow will automatically deploy on push to main branch

3. **Access your deployed app**:
   - URL: `https://your-username.github.io/tokopaedi-react/`

## Configuration Files Explained

### Frontend Configuration

- **`next.config.ts`**: Configures Next.js for static export and GitHub Pages
- **`.env.local`**: Development environment variables
- **`.env.production`**: Production environment variables
- **`.github/workflows/deploy.yml`**: GitHub Actions workflow for automated deployment

### Backend Configuration

- **`vercel.json`**: Vercel deployment configuration
- **`requirements.txt`**: Python dependencies for Vercel
- **`main.py`**: Updated CORS settings for production

## Environment Variables

### Frontend
- `NEXT_PUBLIC_API_URL`: Backend API URL (automatically set based on environment)

### Backend
- No additional environment variables required for basic setup
- Add API keys or secrets through Vercel dashboard if needed

## Troubleshooting

### Common Issues

1. **404 errors on GitHub Pages**:
   - Ensure `.nojekyll` file is present in the deployed directory
   - Check that `basePath` in `next.config.ts` matches your repository name

2. **CORS errors**:
   - Verify that your GitHub Pages URL is added to the CORS origins in `backend/main.py`
   - Update the origins list with your actual domain

3. **API not responding**:
   - Check that the Vercel backend is deployed successfully
   - Verify the API URL in `.env.production` is correct
   - Test the backend endpoint directly in a browser

### Development vs Production

- **Development**: Frontend runs on `localhost:3000`, Backend on `localhost:8000`
- **Production**: Frontend on GitHub Pages, Backend on Vercel

## Security Considerations

1. **CORS Configuration**: The current setup allows all origins (`"*"`) for demo purposes. In production, restrict to specific domains:
   ```python
   origins = [
       "https://your-username.github.io",
       "https://your-custom-domain.com"
   ]
   ```

2. **Environment Variables**: Never commit sensitive data. Use Vercel's environment variables feature for secrets.

3. **Rate Limiting**: Consider implementing rate limiting for the scraper API to prevent abuse.

## Alternative Deployment Options

### Frontend Alternatives
- **Vercel**: Deploy both frontend and backend to Vercel
- **Netlify**: Alternative to GitHub Pages with better build tools
- **AWS S3 + CloudFront**: For enterprise deployments

### Backend Alternatives
- **Railway**: Python-friendly hosting platform
- **Heroku**: Traditional PaaS (paid plans only)
- **AWS Lambda**: Serverless functions with more control
- **DigitalOcean App Platform**: Simple container deployment

## Monitoring and Maintenance

1. **Vercel Dashboard**: Monitor backend performance and logs
2. **GitHub Actions**: Check deployment status and logs
3. **Error Tracking**: Consider adding Sentry or similar for error monitoring

## Cost Considerations

- **GitHub Pages**: Free for public repositories
- **Vercel**: Free tier includes 100GB bandwidth and 1000 serverless function invocations
- **Domain**: Optional custom domain (~$10-15/year)

## Next Steps

1. Set up custom domain (optional)
2. Implement error tracking and monitoring
3. Add CI/CD testing before deployment
4. Optimize for performance and SEO
5. Add authentication if needed

---

**Note**: Replace placeholder URLs and usernames with your actual values before deployment.