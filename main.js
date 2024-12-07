// 文章数据
const articles = [
    // 生活随笔
    {
        title: '咖啡与gaming的周末时光',
        excerpt: '咖啡+游戏，享受周末时光...',
        tags: ['咖啡', '日常'],
        image: 'https://picsum.photos/800/400',
        category: '生活随笔'
    },
    {
        title: '说走就走的旅行',
        excerpt: '攒钱中...',
        tags: ['旅行', '随笔'],
        image: 'https://picsum.photos/800/401',
        category: '生活随笔'
    },
    {
        title: '不想上课啊',
        excerpt: '做不完的实验，写不完的代码...',
        tags: ['生活', '随笔'],
        image: 'https://picsum.photos/800/402',
        category: '生活随笔'
    },
    // 摄影分享
    {
        title: '上海 Shanghai',
        excerpt: '灯火阑珊处，人间烟火气。记录下上海的璀璨夜色...',
        tags: ['摄影', '夜景'],
      image: 'assets/上海/01.jpg',
        id: '403',
        category: '摄影分享'
    },
    {
        title: '厦门 Xiamen',
        excerpt: '五月，厦门的春天如此浪漫...',
        tags: ['摄影', '花卉'],
      image: 'assets/厦门/01.jpg',
        id: '404',
        category: '摄影分享'
    },
    {
        title: '景德镇 Jingdezhen',
        excerpt: '记录下景德镇的市井生活，感受这座城市的温度...',
        tags: ['摄影', '街拍'],
      image: 'assets/景德镇/01.jpg',
        id: '405',
        category: '摄影分享'
    }
];

// 添加滚动效果
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(45, 45, 45, 0.9)';
    } else {
        header.style.backgroundColor = 'var(--secondary-color)';
    }
});

// 动态加载文章数据
function loadArticles() {
    const articlesContainer = document.querySelector('.articles-grid');
    articlesContainer.innerHTML = '';

    articles.forEach(article => {
        const articleCard = createArticleCard(article);
        articlesContainer.appendChild(articleCard);
    });
}

// 修改文章卡片生成函数
function createArticleCard(article) {
    const articleCard = document.createElement('div');
    articleCard.className = 'article-card';
    
    articleCard.innerHTML = `
        <div class="article-image" style="background-image: url('${article.image}')"></div>
        <div class="article-content">
            <h2>${article.title}</h2>
            <p class="article-excerpt">${article.excerpt}</p>
        </div>
    `;

    articleCard.addEventListener('click', () => {
        if (article.category === '摄影分享') {
            // 直接使用文章的 ID
            const id = article.id;
            window.location.href = `photos.html?id=${id}`;
        } else {
            showArticleDetail(article);
        }
    });

    return articleCard;
}

// 修改模态框样式
function showArticleDetail(article) {
    const modal = document.createElement('div');
    modal.className = 'modal';

    modal.innerHTML = `
        <div class="modal-content glass-card">
            <span class="close-button">&times;</span>
            <h2>${article.title}</h2>
            <div class="article-full-image">
                <img src="${article.image}" alt="${article.title}">
            </div>
            <p>${article.excerpt}</p>
        </div>`;

    document.body.appendChild(modal);

    const closeButton = modal.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// 分类过滤功能
function setupCategoryFilters() {
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.textContent.trim();
            filterArticles(category);
            
            // 更新选中状态
            categoryCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
        });
    });
}

// 文章过滤
function filterArticles(category) {
    const filteredArticles = articles.filter(article => article.category === category);
    
    const articlesContainer = document.querySelector('.articles');
    articlesContainer.innerHTML = '';
    
    if (filteredArticles.length === 0) {
        articlesContainer.innerHTML = '<p class="no-results">没有找到相关文章</p>';
        return;
    }
    
    filteredArticles.forEach(article => {
        const articleCard = createArticleCard(article);
        articlesContainer.appendChild(articleCard);
    });
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    loadArticles();
    setupCategoryFilters();
});