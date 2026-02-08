
async function fetchGoldPrices() {
    try {
        const [goldRes, silverRes, rateRes] = await Promise.all([
            fetch('https://api.gold-api.com/price/XAU'),
            fetch('https://api.gold-api.com/price/XAG'),
            fetch('https://open.er-api.com/v6/latest/USD')
        ]);

        const goldData = await goldRes.json();
        const silverData = await silverRes.json();
        const rateData = await rateRes.json();

        const ounceToGram = 31.1035;
        const SAR_RATE = rateData.rates.SAR;

        const goldGram24 = (goldData.price / ounceToGram) * SAR_RATE;
        const goldGram21 = goldGram24 * 0.875;
        const goldGram18 = goldGram24 * 0.75;
        const silverGram = (silverData.price / ounceToGram) * SAR_RATE;

        // ===== trend =====
        let prev = localStorage.getItem("goldGramPrev");
        let percent = 0;
        let trendClass = "";

        if (prev) {
            percent = ((goldGram24 - prev) / prev) * 100;
            trendClass = percent >= 0 ? "up" : "down";
        }

        localStorage.setItem("goldGramPrev", goldGram24);

        document.getElementById('goldContent').innerHTML = `
            <div class="gold-widget">

                <div class="ticker ${trendClass}">
                    <span>سعر الجرام عيار 24</span>
                    <span>${goldGram24.toFixed(2)} ر.س</span>
                </div>

                <div class="price-row">
                    <span>سعر الجرام عيار 21</span>
                    <b>${goldGram21.toFixed(2)} ر.س</b>
                </div>

                <div class="price-row">
                    <span>سعر الجرام عيار 18</span>
                    <b>${goldGram18.toFixed(2)} ر.س</b>
                </div>

                <div class="price-row">
                    <span>سعر جرام الفضة</span>
                    <b>${silverGram.toFixed(2)} ر.س</b>
                </div>

            </div>
        `;

    } catch (err) {
        console.error(err);
    }
}

fetchGoldPrices();
setInterval(fetchGoldPrices, 60000);



// Fetch Weather Data
async function fetchWeatherData(city = 'Riyadh', country = 'SA') {
    try {
        // Using Open-Meteo API (free, no API key required)
        const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&country=${country}&count=1&language=en`);
        const geoData = await geoResponse.json();
        
        if (!geoData.results || geoData.results.length === 0) {
            throw new Error('لم يتم العثور على المدينة');
        }
        
        const { latitude, longitude, name } = geoData.results[0];
        
        // Fetch weather data
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,relative_humidity_2m_max&temperature_unit=celsius&timezone=auto`
        );
        const weatherData = await weatherResponse.json();
        const current = weatherData.current;
        const daily = weatherData.daily;
        
        const weatherContent = document.getElementById('weatherContent');
        const weatherIcon = getWeatherIcon(current.weather_code);
        const weatherDesc = getWeatherDescription(current.weather_code);
        
        // Build forecast cards HTML
        let forecastHTML = '';
        for (let i = 0; i < 5 && i < daily.time.length; i++) {
            const dayIcon = getWeatherIcon(daily.weather_code[i]);
            const tempMax = Math.round(daily.temperature_2m_max[i]);
            const tempMin = Math.round(daily.temperature_2m_min[i]);
            const humidity = daily.relative_humidity_2m_max[i];
            
            forecastHTML += `
                <div class="weather-forecast-day">
                    <div class="forecast-icon">${dayIcon}</div>
                    <div class="forecast-temps">
                        <span class="forecast-max">${tempMax}°</span>
                        <span class="forecast-min">${tempMin}°</span>
                    </div>
                    <div class="forecast-humidity">${humidity}%</div>
                </div>
            `;
        }
        
        weatherContent.innerHTML = `
            <div class="weather-main">
                <div class="weather-icon">${weatherIcon}</div>
                <div class="weather-temp">${Math.round(current.temperature_2m)}°</div>
                <div class="weather-desc">${weatherDesc}</div>
            </div>
            <div class="weather-forecast">
                ${forecastHTML}
            </div>
        `;
        
        // Update location
        document.getElementById('weatherLocation').textContent = name;
    } catch (error) {
        console.error('خطأ في جلب بيانات الطقس:', error);
        document.getElementById('weatherContent').innerHTML = `
            <div style="padding: 1rem; text-align: center; color: #ef4444;">
                <i class="fas fa-exclamation-circle"></i>
                <p>خطأ في تحميل الطقس</p>
            </div>
        `;
    }
}

// Get weather icon based on weather code (WMO)
function getWeatherIcon(weatherCode) {
    const iconMap = {
        0: '☀️',      // Clear
        1: '🌤️',      // Mostly clear
        2: '⛅',      // Partly cloudy
        3: '☁️',      // Overcast
        45: '🌫️',     // Foggy
        48: '🌫️',     // Foggy
        51: '🌧️',     // Light drizzle
        53: '🌧️',     // Moderate drizzle
        55: '⛈️',     // Heavy drizzle
        61: '🌧️',     // Slight rain
        63: '🌧️',     // Moderate rain
        65: '⛈️',     // Heavy rain
        71: '❄️',     // Slight snow
        73: '❄️',     // Moderate snow
        75: '❄️',     // Heavy snow
        77: '❄️',     // Snow grains
        80: '🌧️',     // Slight rain showers
        81: '🌧️',     // Moderate rain showers
        82: '⛈️',     // Violent rain showers
        85: '❄️',     // Light snow showers
        86: '❄️',     // Heavy snow showers
        95: '⛈️',     // Thunderstorm
        96: '⛈️',     // Thunderstorm with hail
        99: '⛈️'      // Thunderstorm with hail
    };
    
    return iconMap[weatherCode] || '🌡️';
}

// Get weather description
function getWeatherDescription(weatherCode) {
    const descMap = {
        0: 'صافي',
        1: 'غالباً صافي',
        2: 'غائم جزئياً',
        3: 'غائم',
        45: 'ضباب',
        48: 'ضباب بصقيع',
        51: 'رذاذ خفيف',
        53: 'رذاذ معتدل',
        55: 'رذاذ ثقيل',
        61: 'مطر خفيف',
        63: 'مطر معتدل',
        65: 'مطر ثقيل',
        71: 'ثلج خفيف',
        73: 'ثلج معتدل',
        75: 'ثلج ثقيل',
        77: 'حبات ثلج',
        80: 'زخات مطر خفيفة',
        81: 'زخات مطر معتدلة',
        82: 'زخات مطر عنيفة',
        85: 'زخات ثلج خفيفة',
        86: 'زخات ثلج ثقيلة',
        95: 'عاصفة رعدية',
        96: 'عاصفة رعدية مع برد',
        99: 'عاصفة رعدية مع برد'
    };
    
    return descMap[weatherCode] || 'غير محدد';
}

// Update timestamp
function updateTimestamp(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    element.textContent = `تم التحديث: ${hours}:${minutes}`;
}

// Currencies for carousel
const currencies = [
    { code: 'USD', name: 'الدولار الأمريكي', flag: '🇺🇸' },
    { code: 'EUR', name: 'اليورو', flag: '🇪🇺' },
    { code: 'GBP', name: 'الجنيه الإسترليني', flag: '🇬🇧' },
    { code: 'JPY', name: 'الين الياباني', flag: '🇯🇵' },
    { code: 'CNY', name: 'اليوان الصيني', flag: '🇨🇳' },
    { code: 'AED', name: 'درهم الإمارات', flag: '🇦🇪' },
    { code: 'KWD', name: 'دينار كويتي', flag: '🇰🇼' },
    { code: 'QAR', name: 'ريال قطري', flag: '🇶🇦' }
];

let currentCurrencyIndex = 0;

// Fetch Exchange Rates
async function fetchExchangeRates() {
    try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/SAR');
        const data = await response.json();
        
        if (data && data.rates) {
            window.exchangeRates = data.rates;
            updateCurrencyDisplay();
            setInterval(rotateCurrency, 5000);
        } else {
            throw new Error('لم نتمكن من جلب بيانات الصرف');
        }
    } catch (error) {
        console.error('خطأ في جلب أسعار الصرف:', error);
        window.exchangeRates = {
            'USD': 0.27,
            'EUR': 0.29,
            'GBP': 0.34,
            'JPY': 0.0024,
            'CNY': 0.038,
            'AED': 0.073,
            'KWD': 0.88,
            'QAR': 0.075
        };
        updateCurrencyDisplay();
        setInterval(rotateCurrency, 5000);
    }
}

// Update Currency Display
function updateCurrencyDisplay() {
    const currencyContent = document.getElementById('currencyContent');
    if (!currencyContent) return;
    
    const currency = currencies[currentCurrencyIndex];
    const rate = window.exchangeRates?.[currency.code] || 0;
    const sarEquivalent = (1 / rate).toFixed(2);
    
    currencyContent.innerHTML = `
        <div class="currency-main" style="animation: slideIn 0.5s ease;">
            <div class="currency-flag">${currency.flag}</div>
            <div class="currency-code">${currency.code}</div>
            <div class="currency-name">${currency.name}</div>
        </div>
        <div class="currency-rate" style="animation: slideIn 0.5s ease 0.1s backwards;">
            <span class="rate-label">قيمة الريال</span>
            <div class="rate-value">
                1 ${currency.code} = <strong>${sarEquivalent} ر.س</strong>
            </div>
        </div>
        <div style="text-align: center; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #e5e7eb;">
            <span style="font-size: 0.75rem; color: #9ca3af;">يتحدث تلقائياً كل 5 ثوان</span>
        </div>
    `;
}

// Rotate Currency
function rotateCurrency() {
    currentCurrencyIndex = (currentCurrencyIndex + 1) % currencies.length;
    updateCurrencyDisplay();
}

// ====== ARTICLES CAROUSEL ======
// Sample articles data
const articlesData = [
    {
        id: 1,
        title: 'أهمية الأمن السيبراني للمؤسسات',
        author: 'م. أحمد المالكي',
        date: '10 أكتوبر, 2023',
        image: 'assets/img/Blog-design.webp',
        description: 'مع زيادة الهجمات الإلكترونية، يصبح حماية البيانات أولوية قصوى. تعرف على أفضل الممارسات...',
        views: '2.3K',
        link: 'blog-defintion.html'
    },
    {
        id: 2,
        title: 'كيف تبني علامة تجارية في السعودية؟',
        author: 'منى العتيبي',
        date: '12 أكتوبر, 2023',
        image: 'assets/img/bolog3.webp',
        description: 'السر وراء نجاح الشركات الكبرى ليس المنتج فقط، بل القصة التي تحكيها للعميل. دعنا...',
        views: '1.8K',
        link: 'blog-defintion.html'
    },
    {
        id: 3,
        title: 'مستقبل الذكاء الاصطناعي في رؤية 2030',
        author: 'د. سارة الهاشم',
        date: '15 أكتوبر, 2023',
        image: 'assets/img/Blog-design.webp',
        description: 'الذكاء الاصطناعي يلعب دوراً محورياً في تحقيق أهداف الرؤية 2030. اكتشف الأثر الحقيقي...',
        views: '3.2K',
        link: 'blog-defintion.html'
    },
    {
        id: 4,
        title: 'أفضل الممارسات لإدارة الفريق العامل',
        author: 'أ. خالد الزهراني',
        date: '18 أكتوبر, 2023',
        image: 'assets/img/bolog3.webp',
        description: 'الإدارة الفعالة للفريق تؤثر مباشرة على الإنتاجية. تعرف على أحدث الاستراتيجيات...',
        views: '1.5K',
        link: 'blog-defintion.html'
    },
    {
        id: 5,
        title: 'التحول الرقمي: الطريق إلى المستقبل',
        author: 'أ. فاطمة العنزي',
        date: '20 أكتوبر, 2023',
        image: 'assets/img/Blog-design.webp',
        description: 'التحول الرقمي ليس خياراً بل ضرورة. تعرف على كيفية تطبيقه في شركتك...',
        views: '4.1K',
        link: 'blog-defintion.html'
    }
];

let currentArticleIndex = 0;

// Display Article
function displayArticle(index) {
    const articlesContent = document.getElementById('articlesCarouselContent');
    if (!articlesContent) return;
    
    const article = articlesData[index];
    
    articlesContent.innerHTML = `
        <div class="article-carousel-item" style="animation: fadeIn 0.5s ease;">
            <div class="article-carousel-image" style="background-image: url('${article.image}');">
                <div class="article-carousel-overlay"></div>
                <div class="article-carousel-content">
                    <div class="article-carousel-meta">
                        <span class="article-carousel-author">
                            <i class="fas fa-user"></i> ${article.author}
                        </span>
                        <span class="article-carousel-date">
                            <i class="fas fa-calendar-alt"></i> ${article.date}
                        </span>
                    </div>
                    <h3 class="article-carousel-title">${article.title}</h3>
                    <p class="article-carousel-description">${article.description}</p>
                    <div class="article-carousel-stats py-4">
                        <span class="article-carousel-views">
                            <i class="fas fa-eye"></i> ${article.views} مشاهدة
                        </span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Update active dot
    updateCarouselDots(index);
}

// Rotate Article
function rotateArticle() {
    currentArticleIndex = (currentArticleIndex + 1) % articlesData.length;
    displayArticle(currentArticleIndex);
}

// Create Carousel Dots
function createCarouselDots() {
    const dotsContainer = document.getElementById('carouselDots');
    if (!dotsContainer) return;
    
    dotsContainer.innerHTML = '';
    articlesData.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `انتقل للمقالة ${index + 1}`);
        dot.setAttribute('data-index', index);
        dot.addEventListener('click', () => {
            currentArticleIndex = index;
            clearInterval(carouselInterval);
            displayArticle(currentArticleIndex);
            carouselInterval = setInterval(rotateArticle, 5000);
        });
        dotsContainer.appendChild(dot);
    });
}

// Update Active Dot
function updateCarouselDots(index) {
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

// Navigation Buttons Event Listeners
function setupCarouselNavigation() {
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentArticleIndex = (currentArticleIndex - 1 + articlesData.length) % articlesData.length;
            clearInterval(carouselInterval);
            displayArticle(currentArticleIndex);
            carouselInterval = setInterval(rotateArticle, 5000);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentArticleIndex = (currentArticleIndex + 1) % articlesData.length;
            clearInterval(carouselInterval);
            displayArticle(currentArticleIndex);
            carouselInterval = setInterval(rotateArticle, 5000);
        });
    }
}

let carouselInterval;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Fetch data on page load
    fetchGoldPrices();
    fetchWeatherData('Riyadh', 'SA');
    fetchExchangeRates();
    
    // Initialize articles carousel
    createCarouselDots();
    displayArticle(0);
    setupCarouselNavigation();
    carouselInterval = setInterval(rotateArticle, 5000);
    
    // Refresh every 5 minutes
    setInterval(fetchGoldPrices, 5 * 60 * 1000);
    setInterval(() => fetchWeatherData('Riyadh', 'SA'), 10 * 60 * 1000);
});
