# 📰 Daily News - Professional News Aggregator

<div align="center">

A modern, professional news website that aggregates headlines from around the world with advanced filtering, search capabilities, and a beautiful responsive UI.

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-View_Now-green?style=for-the-badge&logo=vercel)](https://daily-news-demo.vercel.app) [![Preview](https://img.shields.io/badge/📱_Preview-Screenshots-blue?style=for-the-badge&logo=github)](https://github.com/your-username/daily-news#-preview)

![Daily News](https://img.shields.io/badge/Node.js-18+-green) ![NewsAPI](https://img.shields.io/badge/Powered%20by-NewsAPI-blue) ![License](https://img.shields.io/badge/License-MIT-yellow)

   
</div>

## 📱 Preview

### Desktop View
![image](https://github.com/MdSaifAli063/Daily-News-Website/blob/780c60859b56367b46ad2fee30e0339cde38c6b0/Screenshot%202025-10-04%20005848_edited.png)

![image](https://github.com/MdSaifAli063/Daily-News-Website/blob/af5ca64fa732d62436443d0f7038b19cad80123e/Screenshot%202025-10-04%20010117_edited.png)

### Mobile View

<div align="center">
   <img src="https://github.com/MdSaifAli063/Daily-News-Website/blob/7c20edbb138b2404a00458ef89ff889aa11f0eb0/Screenshot%202025-10-04%20010457_edited.png" 
        alt="image" 
        style="height:300px; max-width:500px object-fit:contain;" />
</div>



## 🚀 Quick Demo

### Live Demo Links
- **🌐 Production Demo**: [https://daily-news-demo.vercel.app](https://daily-news-demo.vercel.app)
- **🔧 Development Demo**: [https://daily-news-dev.netlify.app](https://daily-news-dev.netlify.app)
  
### Demo Features to Try
1. **🌍 All Countries**: Switch to "All Countries" to see global news aggregation
2. **🔍 Search**: Try searching for "AI", "Climate", or "Technology"
3. **🎨 Theme Toggle**: Switch between light and dark themes
4. **📱 Responsive**: Resize your browser to see mobile responsiveness
5. **🏷️ Trending Topics**: Click on trending topic tags
6. **📊 Different Views**: Toggle between grid and list views

## ✨ Features

### 🌍 **Global News Coverage**
- **All Countries**: Aggregate news from 12 major countries (US, UK, India, Australia, Canada, Germany, France, Italy, Japan, Russia, Saudi Arabia, South Africa)
- **Individual Countries**: Filter by specific countries with flag emojis
- **Smart Deduplication**: Removes duplicate articles across sources
- **Real-time Updates**: Fresh news updated every hour

### 🎨 **Modern Professional UI**
- **Light/Dark Theme**: Toggle between themes with smooth transitions
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Professional Typography**: Inter font with proper hierarchy
- **Smooth Animations**: Hover effects, loading states, and transitions
- **Glassmorphism Effects**: Modern backdrop blur and gradients

### 🔍 **Advanced Search & Filtering**
- **Smart Search**: Search across headlines, descriptions, and content
- **Category Filters**: Business, Entertainment, Health, Science, Sports, Technology
- **Sort Options**: Latest, Most Relevant, Most Popular
- **Trending Topics**: Quick access to popular topics (AI, Climate, Economy, Politics, Sports)
- **View Modes**: Grid and List view options

### 📱 **User Experience**
- **Loading States**: Beautiful loading animations
- **Error Handling**: User-friendly error messages
- **Empty States**: Helpful guidance when no results found
- **Pagination**: Smooth navigation through articles
- **Keyboard Support**: Enter to search, keyboard navigation

### 🏗️ **Technical Features**
- **Server Proxy**: Secure API key handling
- **CORS Support**: Cross-origin request handling
- **Compression**: Gzip compression for faster loading
- **Error Recovery**: Graceful handling of API failures
- **Performance**: Optimized for speed and efficiency

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+** ([Download](https://nodejs.org/))
- **NewsAPI Key** ([Get Free Key](https://newsapi.org/register))

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd daily-news
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example file
   cp .env.example .env
   
   # Edit .env and add your NewsAPI key
   NEWS_API_KEY=your_newsapi_key_here
   PORT=3000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📖 Usage

### Navigation
- **Top**: Latest headlines from selected country
- **Trending**: Most popular and trending news
- **World**: Global news and international stories
- **Tech**: Technology and innovation news
- **Business**: Business and financial news

### Search & Filters
1. **Search**: Type keywords in the search bar
2. **Country**: Select from dropdown or choose "All Countries"
3. **Category**: Filter by news category
4. **Sort**: Choose how to sort results
5. **Trending**: Click trending topic tags for quick searches

### View Options
- **Grid View**: Card-based layout (default)
- **List View**: Compact list layout
- **Theme Toggle**: Switch between light and dark themes

## 🛠️ Development

### Project Structure
```
daily-news/
├── server/
│   └── index.js          # Express server with NewsAPI proxy
├── public/
│   ├── index.html        # Main HTML file
│   ├── styles.css        # Professional CSS with themes
│   └── main.js           # Frontend JavaScript
├── .env.example          # Environment variables template
├── .gitignore            # Git ignore patterns
├── package.json          # Dependencies and scripts
└── README.md             # This file
```

### Available Scripts
```bash
npm run dev      # Start development server with nodemon
npm start        # Start production server
npm install      # Install dependencies
```

### Environment Variables
```bash
PORT=3000                           # Server port
NEWS_API_KEY=your_newsapi_key_here  # NewsAPI key (required)
```

## 🌐 API Endpoints

### Server Endpoints
- `GET /api/top-headlines` - Top headlines with country/category filters
- `GET /api/everything` - Search all articles with advanced filters
- `GET /api/health` - Health check endpoint

### NewsAPI Integration
- **Top Headlines**: Latest news from specific countries
- **Everything**: Search across all articles and sources
- **All Countries**: Aggregates news from multiple countries
- **Error Handling**: Graceful fallbacks for API failures

## 🎨 Customization

### Themes
The app supports light and dark themes with CSS custom properties:
```css
:root {
  --bg-primary: #ffffff;
  --text-primary: #1e293b;
  /* ... more variables */
}

[data-theme="dark"] {
  --bg-primary: #0f172a;
  --text-primary: #f1f5f9;
  /* ... dark theme variables */
}
```

### Styling
- **CSS Variables**: Easy theme customization
- **Responsive Breakpoints**: Mobile-first design
- **Component Classes**: Modular CSS architecture
- **Animations**: Smooth transitions and hover effects

## 📱 Browser Support

- **Chrome 90+**
- **Firefox 88+**
- **Safari 14+**
- **Edge 90+**

## 🔧 Configuration

### NewsAPI Setup
1. Visit [NewsAPI](https://newsapi.org/register)
2. Sign up for a free account
3. Get your API key
4. Add it to your `.env` file

### Server Configuration
```javascript
// server/index.js
const PORT = process.env.PORT || 3000;
const NEWS_API_KEY = process.env.NEWS_API_KEY;
```

## 🚀 Deployment

### 🌐 Deploy to Vercel (Recommended)

1. **Fork this repository**
2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables:
     ```
     NEWS_API_KEY=your_newsapi_key_here
     ```
3. **Deploy**: Vercel will automatically deploy your app
4. **Live Demo**: Your app will be available at `https://your-app.vercel.app`

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/daily-news)

### 🔧 Deploy to Netlify

1. **Build Command**: `npm run build` (if you add a build step)
2. **Publish Directory**: `public`
3. **Environment Variables**:
   ```
   NEWS_API_KEY=your_newsapi_key_here
   ```

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/your-username/daily-news)

### 🚀 Deploy to Heroku

1. **Create Heroku app**:
   ```bash
   heroku create your-app-name
   ```

2. **Set environment variables**:
   ```bash
   heroku config:set NEWS_API_KEY=your_newsapi_key_here
   heroku config:set NODE_ENV=production
   ```

3. **Deploy**:
   ```bash
   git push heroku main
   ```

### 🐳 Deploy with Docker

Create a `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t daily-news .
docker run -p 3000:3000 -e NEWS_API_KEY=your_key_here daily-news
```

### 📱 Deploy to Railway

1. **Connect GitHub repository**
2. **Add environment variables**:
   ```
   NEWS_API_KEY=your_newsapi_key_here
   PORT=3000
   ```
3. **Deploy**: Railway will automatically deploy

### 🔧 Local Production Deployment
```bash
# Install dependencies
npm install --production

# Set environment variables
export NEWS_API_KEY=your_key_here
export PORT=3000

# Start the server
npm start
```

### Environment Variables for Production
```bash
NODE_ENV=production
PORT=3000
NEWS_API_KEY=your_newsapi_key_here
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **NewsAPI** for providing the news data
- **Inter Font** for beautiful typography
- **Express.js** for the server framework
- **Modern CSS** for responsive design

## 📞 Support

If you have any questions or need help:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Contact the maintainers

---

**Made with ❤️ for staying informed with global news**
