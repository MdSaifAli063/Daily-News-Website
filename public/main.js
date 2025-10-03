// Enhanced News App with Professional Features
const state = {
  page: 1,
  pageSize: 20,
  country: 'us',
  category: '',
  q: '',
  mode: 'top',
  sortBy: 'publishedAt',
  viewMode: 'grid',
  theme: 'light'
};

const elements = {
  // Navigation
  navTop: document.getElementById('navTop'),
  navTrending: document.getElementById('navTrending'),
  navWorld: document.getElementById('navWorld'),
  navTech: document.getElementById('navTech'),
  navBusiness: document.getElementById('navBusiness'),
  
  // Search and filters
  search: document.getElementById('search'),
  country: document.getElementById('country'),
  category: document.getElementById('category'),
  sortBy: document.getElementById('sortBy'),
  searchBtn: document.getElementById('searchBtn'),
  
  // Content
  articles: document.getElementById('articles'),
  status: document.getElementById('status'),
  sectionTitle: document.getElementById('sectionTitle'),
  
  // Pagination
  prev: document.getElementById('prev'),
  next: document.getElementById('next'),
  page: document.getElementById('page'),
  totalPages: document.getElementById('totalPages'),
  
  // Controls
  themeToggle: document.getElementById('themeToggle'),
  refreshBtn: document.getElementById('refreshBtn'),
  gridView: document.getElementById('gridView'),
  listView: document.getElementById('listView'),
  
  // Topic tags
  topicTags: document.querySelectorAll('.topic-tag')
};

// Theme management
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme);
}

function setTheme(theme) {
  state.theme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  
  const themeIcon = elements.themeToggle?.querySelector('.theme-icon');
  if (themeIcon) {
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

function toggleTheme() {
  setTheme(state.theme === 'light' ? 'dark' : 'light');
}

// Status management
function setStatus(message, isError = false) {
  if (!elements.status) return;
  
  elements.status.textContent = message || '';
  elements.status.style.color = isError ? 'var(--accent-error)' : 'var(--text-secondary)';
  
  if (message) {
    elements.status.classList.add('loading');
  } else {
    elements.status.classList.remove('loading');
  }
}

// Date formatting
function formatDate(iso) {
  try {
    const date = new Date(iso);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    
    return date.toLocaleDateString();
  } catch {
    return 'Unknown';
  }
}

// Article rendering
function renderArticles(data) {
  if (!elements.articles) return;
  
  const { articles = [], totalResults = 0 } = data || {};
  elements.articles.innerHTML = '';

  if (!articles.length) {
    elements.articles.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="empty-state-icon">📰</div>
        <h3>No articles found</h3>
        <p>Try adjusting your search terms or filters to find more news</p>
      </div>
    `;
    return;
  }

  // Add fade-in animation
  elements.articles.style.opacity = '0';
  elements.articles.style.transform = 'translateY(20px)';
  
  setTimeout(() => {
    elements.articles.style.transition = 'all 0.3s ease';
    elements.articles.style.opacity = '1';
    elements.articles.style.transform = 'translateY(0)';
  }, 50);

  articles.forEach((article, index) => {
    const card = createArticleCard(article, index);
    elements.articles.appendChild(card);
  });

  updatePagination(totalResults);
}

function createArticleCard(article, index) {
  const card = document.createElement('article');
  card.className = 'article-card';
  
  const hasImage = Boolean(article.urlToImage);
  const imageHtml = hasImage ? `
    <div style="position: relative; overflow: hidden;">
      <img src="${article.urlToImage}" alt="${article.title || ''}" class="article-image" loading="lazy" onerror="this.style.display='none'" />
      <div class="source-badge" style="position: absolute; top: 12px; left: 12px;">
        ${(article.source?.name || 'Source').slice(0, 15)}
      </div>
    </div>
  ` : '';
  
  card.innerHTML = `
    ${imageHtml}
    <div class="article-content">
      <div class="article-meta">
        <span class="article-time">${formatDate(article.publishedAt)}</span>
      </div>
      <h3 class="article-title">${article.title || 'No title available'}</h3>
      <p class="article-description">${article.description || 'No description available'}</p>
      <div class="article-actions">
        <a href="${article.url}" target="_blank" rel="noopener" class="read-more">
          Read more →
        </a>
        <span class="article-time">${formatDate(article.publishedAt)}</span>
      </div>
    </div>
  `;
  
  // Stagger animation
  card.style.animationDelay = `${index * 0.1}s`;
  
  return card;
}

function updatePagination(totalResults) {
  const totalPages = Math.ceil(totalResults / state.pageSize) || 1;
  
  if (elements.page) elements.page.textContent = state.page;
  if (elements.totalPages) elements.totalPages.textContent = totalPages;
  if (elements.prev) elements.prev.disabled = state.page <= 1;
  if (elements.next) elements.next.disabled = state.page >= totalPages;
}

// API calls
async function fetchNews() {
  setStatus('Loading news...');
  
  try {
    const params = new URLSearchParams({
      country: state.country,
      category: state.category,
      q: state.q,
      page: String(state.page),
      pageSize: String(state.pageSize),
      sortBy: state.sortBy
    });
    
    let endpoint = '/api/top-headlines';
    
    // Handle different modes
    if (state.mode === 'trending') {
      endpoint = '/api/everything';
      params.set('q', state.q || 'trending news');
    } else if (state.mode === 'world') {
      endpoint = '/api/everything';
      params.set('q', state.q || 'world news');
    } else if (state.mode === 'tech') {
      endpoint = '/api/everything';
      params.set('q', state.q || 'technology');
    } else if (state.mode === 'business') {
      endpoint = '/api/everything';
      params.set('q', state.q || 'business news');
    }
    
    const response = await fetch(`${endpoint}?${params.toString()}`);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (data.status === 'error') {
      throw new Error(data.message || 'API returned an error');
    }
    
    renderArticles(data);
    setStatus('');
    
  } catch (error) {
    console.error('Fetch error:', error);
    setStatus(`Failed to load news: ${error.message}`, true);
    
    // Show empty state on error
    if (elements.articles) {
      elements.articles.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-state-icon">⚠️</div>
          <h3>Failed to load news</h3>
          <p>Please check your internet connection and try again</p>
        </div>
      `;
    }
  }
}

// Navigation handlers
function setActiveNav(activeElement) {
  const navLinks = [elements.navTop, elements.navTrending, elements.navWorld, elements.navTech, elements.navBusiness];
  navLinks.forEach(link => {
    if (link) {
      link.classList.toggle('active', link === activeElement);
    }
  });
}

function updateSectionTitle() {
  const titles = {
    top: 'Top Headlines',
    trending: 'Trending News',
    world: 'World News',
    tech: 'Technology News',
    business: 'Business News'
  };
  
  if (elements.sectionTitle) {
    elements.sectionTitle.textContent = titles[state.mode] || 'News';
  }
}

// Event listeners
function setupEventListeners() {
  // Navigation
  elements.navTop?.addEventListener('click', (e) => {
    e.preventDefault();
    state.mode = 'top';
    state.page = 1;
    setActiveNav(elements.navTop);
    updateSectionTitle();
    fetchNews();
  });
  
  elements.navTrending?.addEventListener('click', (e) => {
    e.preventDefault();
    state.mode = 'trending';
    state.page = 1;
    setActiveNav(elements.navTrending);
    updateSectionTitle();
    fetchNews();
  });
  
  elements.navWorld?.addEventListener('click', (e) => {
    e.preventDefault();
    state.mode = 'world';
    state.page = 1;
    setActiveNav(elements.navWorld);
    updateSectionTitle();
    fetchNews();
  });
  
  elements.navTech?.addEventListener('click', (e) => {
    e.preventDefault();
    state.mode = 'tech';
    state.page = 1;
    setActiveNav(elements.navTech);
    updateSectionTitle();
    fetchNews();
  });
  
  elements.navBusiness?.addEventListener('click', (e) => {
    e.preventDefault();
    state.mode = 'business';
    state.page = 1;
    setActiveNav(elements.navBusiness);
    updateSectionTitle();
    fetchNews();
  });
  
  // Search and filters
  elements.searchBtn?.addEventListener('click', () => {
    state.q = elements.search?.value.trim() || '';
    state.page = 1;
    fetchNews();
  });
  
  elements.search?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      state.q = elements.search.value.trim();
      state.page = 1;
      fetchNews();
    }
  });
  
  elements.country?.addEventListener('change', () => {
    state.country = elements.country.value;
    state.page = 1;
    fetchNews();
  });
  
  elements.category?.addEventListener('change', () => {
    state.category = elements.category.value;
    state.page = 1;
    fetchNews();
  });
  
  elements.sortBy?.addEventListener('change', () => {
    state.sortBy = elements.sortBy.value;
    state.page = 1;
    fetchNews();
  });
  
  // Pagination
  elements.prev?.addEventListener('click', () => {
    if (state.page > 1) {
      state.page -= 1;
      fetchNews();
    }
  });
  
  elements.next?.addEventListener('click', () => {
    state.page += 1;
    fetchNews();
  });
  
  // Controls
  elements.themeToggle?.addEventListener('click', toggleTheme);
  
  elements.refreshBtn?.addEventListener('click', () => {
    fetchNews();
  });
  
  // View modes
  elements.gridView?.addEventListener('click', () => {
    state.viewMode = 'grid';
    elements.articles?.classList.remove('list-view');
    elements.gridView?.classList.add('active');
    elements.listView?.classList.remove('active');
  });
  
  elements.listView?.addEventListener('click', () => {
    state.viewMode = 'list';
    elements.articles?.classList.add('list-view');
    elements.listView?.classList.add('active');
    elements.gridView?.classList.remove('active');
  });
  
  // Topic tags
  elements.topicTags?.forEach(tag => {
    tag.addEventListener('click', () => {
      const topic = tag.dataset.topic;
      if (elements.search) {
        elements.search.value = topic;
        state.q = topic;
        state.page = 1;
        fetchNews();
      }
    });
  });
}

// Initialize app
function initApp() {
  initTheme();
  setupEventListeners();
  updateSectionTitle();
  
  // Set current year
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
  
  // Initial load
  fetchNews();
}

// Start the app
document.addEventListener('DOMContentLoaded', initApp);