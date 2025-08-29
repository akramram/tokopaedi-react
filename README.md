# Tokopaedi - Tokopedia Scraper Full-Stack Application

A modern full-stack web application for scraping and searching Tokopedia products, built with Next.js frontend and FastAPI backend.

## 🚀 Features

- **Product Search**: Search Tokopedia products with advanced filters
- **Real-time Results**: Fast and responsive product data retrieval
- **Modern UI**: Clean, responsive interface built with Next.js and Tailwind CSS
- **Advanced Filtering**: Price range, ratings, conditions, and more
- **Cross-platform**: Works on desktop and mobile devices

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests

### Backend
- **FastAPI** - Modern Python web framework
- **curl-cffi** - HTTP client for web scraping
- **Uvicorn** - ASGI server

## 📦 Project Structure

```
tokopaedi-react/
├── frontend/          # Next.js frontend application
│   ├── src/app/       # App router pages and components
│   ├── public/        # Static assets
│   └── package.json   # Frontend dependencies
├── backend/           # FastAPI backend application
│   ├── src/           # Backend source code
│   ├── main.py        # FastAPI application entry point
│   └── requirements.txt # Python dependencies
├── .github/workflows/ # GitHub Actions for deployment
└── DEPLOYMENT.md      # Detailed deployment guide
```

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18+ 
- Python 3.10+
- npm or yarn

### Development Setup

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd tokopaedi-react
   ```

2. **Start the backend**:
   ```bash
   cd backend
   pip install -r requirements.txt
   python -m uvicorn main:app --reload
   ```
   Backend will be available at `http://localhost:8000`

3. **Start the frontend** (in a new terminal):
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Frontend will be available at `http://localhost:3000`

## 🌐 Deployment

This application is configured for deployment with:
- **Frontend**: GitHub Pages (Static Site)
- **Backend**: Vercel (Serverless Functions)

### Quick Deploy

**Linux/Mac**:
```bash
./deploy.sh
```

**Windows**:
```cmd
deploy.bat
```

### Manual Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## 🔧 Configuration

### Environment Variables

**Frontend** (`frontend/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

**Production** (`frontend/.env.production`):
```env
NEXT_PUBLIC_API_URL=https://your-backend-app.vercel.app
```

## 📖 API Documentation

Once the backend is running, visit `http://localhost:8000/docs` for interactive API documentation.

### Available Endpoints

- `GET /` - Health check
- `GET /search/{keyword}` - Search products with filters
- `GET /product/{product_id}` - Get product details
- `GET /reviews/{product_id}` - Get product reviews

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This tool is for educational purposes only. Please respect Tokopedia's terms of service and implement appropriate rate limiting and ethical scraping practices.

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure backend CORS settings include your frontend URL
2. **Build Failures**: Check Node.js and Python versions
3. **API Not Responding**: Verify backend is running and accessible

For more troubleshooting tips, see [DEPLOYMENT.md](./DEPLOYMENT.md).

---

**Made with ❤️ using Next.js and FastAPI**