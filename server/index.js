import express from 'express';
import cors from 'cors';
import compression from 'compression';
import dotenv from 'dotenv';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const NEWS_API_KEY = process.env.NEWS_API_KEY || '';

app.use(cors());
app.use(compression());
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

// Proxy to NewsAPI: top headlines
app.get('/api/top-headlines', async (req, res) => {
  try {
    if (!NEWS_API_KEY) {
      return res.status(500).json({ error: 'Missing NEWS_API_KEY in environment' });
    }

    const { country = 'us', category = '', q = '', page = '1', pageSize = '20', sortBy = 'publishedAt' } = req.query;

    // If "all" countries: aggregate several country requests and merge
    if (country === 'all') {
      const countries = ['us','gb','in','au','ca','de','fr','it','jp','ru','sa','za'];
      const requests = countries.map(c => axios.get('https://newsapi.org/v2/top-headlines', {
        params: { 
          apiKey: NEWS_API_KEY, 
          country: c, 
          page: 1, 
          pageSize: Math.max(5, Math.floor(20 / countries.length)), 
          ...(category && { category }), 
          ...(q && { q }) 
        },
        timeout: 15000,
      }).catch(err => {
        console.log(`Failed to fetch from ${c}:`, err.message);
        return { data: { articles: [] } };
      }));

      const results = await Promise.all(requests);
      const merged = results.flatMap(r => r.data?.articles || []);
      
      // Remove duplicates by URL and sort
      const seen = new Set();
      const unique = merged.filter(article => {
        if (!article.url || seen.has(article.url)) return false;
        seen.add(article.url);
        return true;
      });
      
      // Sort by publishedAt
      unique.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
      
      const start = (Number(page) - 1) * Number(pageSize);
      const end = start + Number(pageSize);
      
      return res.json({ 
        status: 'ok', 
        totalResults: unique.length, 
        articles: unique.slice(start, end) 
      });
    }

    const params = {
      apiKey: NEWS_API_KEY,
      country,
      page,
      pageSize,
    };

    if (category) params.category = category;
    if (q) params.q = q;

    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params,
      timeout: 10000,
    });

    res.json(response.data);
  } catch (error) {
    console.error('Top headlines error:', error.message);
    const status = error.response?.status || 500;
    res.status(status).json({ error: 'Failed to fetch top headlines' });
  }
});

// Proxy to NewsAPI: everything search
app.get('/api/everything', async (req, res) => {
  try {
    if (!NEWS_API_KEY) {
      return res.status(500).json({ error: 'Missing NEWS_API_KEY in environment' });
    }

    const { q = '', sortBy = 'publishedAt', page = '1', pageSize = '20', language = 'en' } = req.query;

    const params = {
      apiKey: NEWS_API_KEY,
      q: q || 'news',
      sortBy,
      page,
      pageSize,
      language,
    };

    const response = await axios.get('https://newsapi.org/v2/everything', {
      params,
      timeout: 10000,
    });

    res.json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    res.status(status).json({ error: 'Failed to fetch articles' });
  }
});

// Fallback to index.html for client routing
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


