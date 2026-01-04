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

app.use(express.static(path.join(__dirname, '../public')));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.get('/api/top-headlines', async (req, res) => {
  try {
    if (!NEWS_API_KEY) {
      return res.status(500).json({ error: 'Missing NEWS_API_KEY in environment' });
    }

    const { country = 'us', category = '', q = '', page = '1', pageSize = '20', sortBy = 'publishedAt' } = req.query;

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
      
      const seen = new Set();
      const unique = merged.filter(article => {
        if (!article.url || seen.has(article.url)) return false;
        seen.add(article.url);
        return true;
      });

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

    return res.json(response.data);
  } catch (error) {
    // Some API keys/plans cannot access the `everything` endpoint and return 401/403/426
    const status = error.response?.status || 500;
    console.error('Everything endpoint failed:', status, error.message);

    if ([401, 403, 426].includes(status)) {
      // Graceful fallback: approximate `everything` by searching top-headlines across countries
      try {
        const { q = '', page = '1', pageSize = '20', country = 'all', category = '' } = req.query;

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
            console.log(`Fallback fetch failed from ${c}:`, err.message);
            return { data: { articles: [] } };
          }));

          const results = await Promise.all(requests);
          const merged = results.flatMap(r => r.data?.articles || []);

          const seen = new Set();
          const unique = merged.filter(article => {
            if (!article.url || seen.has(article.url)) return false;
            seen.add(article.url);
            return true;
          });

          unique.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

          const start = (Number(page) - 1) * Number(pageSize);
          const end = start + Number(pageSize);

          return res.json({
            status: 'ok',
            totalResults: unique.length,
            articles: unique.slice(start, end)
          });
        }

        // Single-country fallback using top-headlines
        const params = {
          apiKey: NEWS_API_KEY,
          country,
          page,
          pageSize,
          ...(category && { category }),
          ...(q && { q })
        };

        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
          params,
          timeout: 10000,
        });

        return res.json(response.data);
      } catch (fallbackErr) {
        const fbStatus = fallbackErr.response?.status || 500;
        console.error('Fallback to top-headlines failed:', fbStatus, fallbackErr.message);
        return res.status(fbStatus).json({ error: 'Failed to fetch articles' });
      }
    }

    return res.status(status).json({ error: 'Failed to fetch articles' });
  }
});

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


