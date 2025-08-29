#!/bin/bash

# Deployment script for Tokopaedi Full-Stack Application
# This script helps deploy both frontend and backend components

set -e  # Exit on any error

echo "🚀 Starting deployment process..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required tools are installed
check_dependencies() {
    print_status "Checking dependencies..."
    
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+ first."
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm first."
        exit 1
    fi
    
    if ! command -v vercel &> /dev/null; then
        print_warning "Vercel CLI is not installed. Installing..."
        npm install -g vercel
    fi
    
    print_status "All dependencies are available."
}

# Deploy backend to Vercel
deploy_backend() {
    print_status "Deploying backend to Vercel..."
    
    cd backend
    
    # Deploy to Vercel
    vercel --prod
    
    if [ $? -eq 0 ]; then
        print_status "Backend deployed successfully!"
        print_warning "Please note the deployment URL and update frontend/.env.production"
    else
        print_error "Backend deployment failed!"
        exit 1
    fi
    
    cd ..
}

# Build and prepare frontend
build_frontend() {
    print_status "Building frontend for GitHub Pages..."
    
    cd frontend
    
    # Install dependencies
    npm ci
    
    # Build the application
    npm run export
    
    # Add .nojekyll file
    touch dist/.nojekyll
    
    if [ $? -eq 0 ]; then
        print_status "Frontend built successfully!"
        print_status "Built files are in frontend/dist/"
    else
        print_error "Frontend build failed!"
        exit 1
    fi
    
    cd ..
}

# Main deployment function
main() {
    echo "======================================"
    echo "  Tokopaedi Deployment Script"
    echo "======================================"
    echo ""
    
    # Parse command line arguments
    DEPLOY_BACKEND=true
    DEPLOY_FRONTEND=true
    
    while [[ $# -gt 0 ]]; do
        case $1 in
            --backend-only)
                DEPLOY_FRONTEND=false
                shift
                ;;
            --frontend-only)
                DEPLOY_BACKEND=false
                shift
                ;;
            --help)
                echo "Usage: $0 [OPTIONS]"
                echo "Options:"
                echo "  --backend-only   Deploy only the backend to Vercel"
                echo "  --frontend-only  Build only the frontend for GitHub Pages"
                echo "  --help          Show this help message"
                exit 0
                ;;
            *)
                print_error "Unknown option: $1"
                echo "Use --help for usage information"
                exit 1
                ;;
        esac
    done
    
    check_dependencies
    
    if [ "$DEPLOY_BACKEND" = true ]; then
        deploy_backend
    fi
    
    if [ "$DEPLOY_FRONTEND" = true ]; then
        build_frontend
    fi
    
    echo ""
    echo "======================================"
    print_status "Deployment process completed!"
    echo "======================================"
    echo ""
    
    if [ "$DEPLOY_BACKEND" = true ]; then
        print_warning "Next steps for backend:"
        echo "  1. Note the Vercel deployment URL"
        echo "  2. Update frontend/.env.production with the backend URL"
        echo ""
    fi
    
    if [ "$DEPLOY_FRONTEND" = true ]; then
        print_warning "Next steps for frontend:"
        echo "  1. Commit and push changes to GitHub"
        echo "  2. Enable GitHub Pages in repository settings"
        echo "  3. Select 'GitHub Actions' as the source"
        echo "  4. Your app will be available at: https://your-username.github.io/tokopaedi-react/"
        echo ""
    fi
    
    print_status "For detailed instructions, see DEPLOYMENT.md"
}

# Run main function with all arguments
main "$@"