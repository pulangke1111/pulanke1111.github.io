// 从 URL 参数获取文章 ID
const urlParams = new URLSearchParams(window.location.search);
const articleId = urlParams.get('id');

// 获取文章数据（这里可以从后端获取，现在先硬编码）
const articles = {
    'night': {
        title: '重庆洪崖洞夜景',
        description: '灯火阑珊处，人间烟火气。记录下重庆的璀璨夜色...',
        photos: [
            'assets/景德镇/881ad8ba4869edd892ba961138be7d23.jpg',
            'assets/photos/night/2.jpg',
            'assets/photos/night/3.jpg',
            'assets/photos/night/4.jpg'
        ]
    },
    'sakura': {
        title: '武大樱花',
        description: '三月樱花烂漫，武大的春天如此浪漫...',
        photos: [
            'assets/photos/sakura/1.jpg',
            'assets/photos/sakura/2.jpg',
            'assets/photos/sakura/3.jpg',
            'assets/photos/sakura/4.jpg'
        ]
    },
    'street': {
        title: '成都街头',
        description: '记录下成都的市井生活，感受这座城市的温度...',
        photos: [
            'assets/photos/street/1.jpg',
            'assets/photos/street/2.jpg',
            'assets/photos/street/3.jpg',
            'assets/photos/street/4.jpg'
        ]
    }
};

// 加载照片集
function loadPhotoAlbum() {
    const article = articles[articleId];
    if (!article) {
        window.location.href = '/';
        return;
    }

    // 更新标题和描述
    document.getElementById('album-title').textContent = article.title;
    document.getElementById('album-description').textContent = article.description;

    // 加载照片
    const photosGrid = document.getElementById('photos-grid');
    article.photos.forEach(photo => {
        const photoItem = document.createElement('div');
        photoItem.className = 'photo-item';
        photoItem.innerHTML = `<img src="${photo}" alt="${article.title}">`;
        
        // 点击查看大图
        photoItem.addEventListener('click', () => {
            const viewer = document.createElement('div');
            viewer.className = 'photo-viewer';
            viewer.innerHTML = `<img src="${photo}" alt="${article.title}">`;
            
            viewer.addEventListener('click', () => {
                document.body.removeChild(viewer);
            });
            
            document.body.appendChild(viewer);
        });

        photosGrid.appendChild(photoItem);
    });
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', loadPhotoAlbum); 