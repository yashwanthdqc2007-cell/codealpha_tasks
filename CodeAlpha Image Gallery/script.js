/* ----------------------------------------------------
   SHIFT // PREMIUM AUTOMOTIVE GALLERY JAVASCRIPT
   ---------------------------------------------------- */

// Car Showroom Data Array
const carsData = [
    {
        id: 1,
        brand: "Ferrari",
        model: "SF90 Stradale",
        category: "sports",
        year: 2023,
        specs: "4.0L Twin-Turbo V8 Hybrid // 986 HP // 340 KM/H",
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        brand: "Lamborghini",
        model: "Aventador SVJ",
        category: "sports",
        year: 2022,
        specs: "6.5L V12 // 759 HP // 350 KM/H",
        image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        brand: "Porsche",
        model: "911 GT3 RS",
        category: "sports",
        year: 2023,
        specs: "4.0L Flat-6 // 518 HP // 296 KM/H",
        image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 4,
        brand: "Tesla",
        model: "Model S Plaid",
        category: "electric",
        year: 2023,
        specs: "Tri-Motor AWD // 1020 HP // 322 KM/H",
        image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 5,
        brand: "Ford",
        model: "Mustang Shelby GT500",
        category: "muscle",
        year: 2022,
        specs: "5.2L Supercharged V8 // 760 HP // 290 KM/H",
        image: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 6,
        brand: "Mercedes-Benz",
        model: "AMG GT Black Series",
        category: "sports",
        year: 2021,
        specs: "4.0L Twin-Turbo V8 // 720 HP // 325 KM/H",
        image: "mercedes_amg_gt.png"
    },
    {
        id: 7,
        brand: "BMW",
        model: "M8 Competition",
        category: "luxury",
        year: 2023,
        specs: "4.4L Twin-Turbo V8 // 617 HP // 305 KM/H",
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 8,
        brand: "Audi",
        model: "R8 V10 Performance",
        category: "sports",
        year: 2022,
        specs: "5.2L V10 // 602 HP // 331 KM/H",
        image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 9,
        brand: "Toyota",
        model: "GR Supra",
        category: "sports",
        year: 2023,
        specs: "3.0L Turbo Inline-6 // 382 HP // 250 KM/H",
        image: "https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 10,
        brand: "Honda",
        model: "NSX Type S",
        category: "sports",
        year: 2022,
        specs: "3.5L Twin-Turbo V6 Hybrid // 600 HP // 307 KM/H",
        image: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 11,
        brand: "Ferrari",
        model: "LaFerrari",
        category: "luxury",
        year: 2017,
        specs: "6.3L V12 Hybrid // 950 HP // 350 KM/H",
        image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 12,
        brand: "Lamborghini",
        model: "Urus Performante",
        category: "suv",
        year: 2023,
        specs: "4.0L Twin-Turbo V8 // 657 HP // 306 KM/H",
        image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 14,
        brand: "Tesla",
        model: "Model X Plaid",
        category: "suv",
        year: 2023,
        specs: "Tri-Motor AWD // 1020 HP // 262 KM/H",
        image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 15,
        brand: "Mercedes-Benz",
        model: "EQS Sedan",
        category: "electric",
        year: 2023,
        specs: "Dual Electric Motors // 516 HP // 210 KM/H",
        image: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 16,
        brand: "BMW",
        model: "i7 M70",
        category: "electric",
        year: 2024,
        specs: "Dual Electric Motors // 650 HP // 250 KM/H",
        image: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 17,
        brand: "Audi",
        model: "e-tron GT",
        category: "electric",
        year: 2023,
        specs: "Dual Electric Motors // 637 HP // 250 KM/H",
        image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 19,
        brand: "Honda",
        model: "Accord Sport",
        category: "sedan",
        year: 2022,
        specs: "2.0L Turbo Inline-4 // 252 HP // 210 KM/H",
        image: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 20,
        brand: "Ford",
        model: "Mustang Mach-E GT",
        category: "electric",
        year: 2023,
        specs: "Dual Electric Motors // 480 HP // 200 KM/H",
        image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 21,
        brand: "Dodge",
        model: "Charger SRT Hellcat",
        category: "muscle",
        year: 2023,
        specs: "6.2L Supercharged V8 // 797 HP // 326 KM/H",
        image: "https://images.unsplash.com/photo-1610647752706-3bb12232b3ab?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 22,
        brand: "Mercedes-Benz",
        model: "SLS AMG",
        category: "luxury",
        year: 2014,
        specs: "6.2L Naturally Aspirated V8 // 563 HP // 317 KM/H",
        image: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=800&q=80"
    }
];

// App State Variables
let currentFilter = "all";
let visibleCars = [...carsData];
let favoriteCarsList = JSON.parse(localStorage.getItem("shift_gallery_favorites")) || [];
let currentLightboxIndex = 0;

// DOM Elements Lookups
const pageLoader = document.getElementById("page-loader");
const loaderSpeedText = document.querySelector(".speed-text");
const navbar = document.getElementById("navbar");
const themeToggleBtn = document.getElementById("theme-toggle");
const filterWrapper = document.getElementById("filter-wrapper");
const galleryGrid = document.getElementById("gallery-grid");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxClose = document.getElementById("lightbox-close");
const lightboxPrev = document.getElementById("lightbox-prev");
const lightboxNext = document.getElementById("lightbox-next");
const lightboxCat = document.getElementById("lightbox-cat");
const lightboxTitle = document.getElementById("lightbox-title");
const lightboxSpecs = document.getElementById("lightbox-specs");
const lightboxCounter = document.getElementById("lightbox-counter");
const scrollTopBtn = document.getElementById("scroll-top-btn");

/* ----------------------------------------------------
   1. LOADER & INITIALIZATION
   ---------------------------------------------------- */
window.addEventListener("DOMContentLoaded", () => {
    // Check local storage for theme preference, default to dark-theme if none
    const savedTheme = localStorage.getItem("shift_gallery_theme") || "dark-theme";
    if (savedTheme === "light-theme") {
        document.body.classList.add("light-theme");
        document.body.classList.remove("dark-theme");
    } else {
        document.body.classList.add("dark-theme");
        document.body.classList.remove("light-theme");
    }

    // Start Speedometer countdown / count-up loader
    let speed = 0;
    const interval = setInterval(() => {
        speed += Math.floor(Math.random() * 20) + 10;
        if (speed >= 300) {
            speed = 300;
            clearInterval(interval);
            
            // Render showroom cards and fade out loader
            renderGallery();

            setTimeout(() => {
                pageLoader.classList.add("fade-out");
            }, 500);
        }
        loaderSpeedText.textContent = speed;
    }, 45);
});

/* ----------------------------------------------------
   2. RENDERING ENGINE
   ---------------------------------------------------- */
function renderGallery() {
    galleryGrid.innerHTML = "";

    // Apply filtering: Active Category Pill
    visibleCars = carsData.filter(car => {
        return currentFilter === "all" || car.category === currentFilter;
    });

    galleryGrid.style.display = "grid";

    visibleCars.forEach((car, index) => {
        const isFavorited = favoriteCarsList.includes(car.id) ? "active" : "";
        const categoryLabel = getCategoryLabel(car.category);
        
        const card = document.createElement("div");
        card.className = "car-card fade-in";
        card.style.animationDelay = `${index * 0.04}s`;
        
        card.innerHTML = `
            <div class="card-media-wrapper" onclick="openLightbox(${index})">
                <img src="${car.image}" alt="${car.brand} ${car.model}" class="card-img" loading="lazy">
                <span class="card-badge badge-${car.category}">${categoryLabel}</span>
            </div>
            <button class="card-fav-btn ${isFavorited}" onclick="toggleFavorite(${car.id}, this)" aria-label="Add to favorites">
                <i class="fa-solid fa-heart"></i>
            </button>
            <div class="card-info">
                <span class="card-brand">${car.brand}</span>
                <h3 class="card-model">${car.model}</h3>
                <div class="card-divider"></div>
                <div class="card-specs">
                    <div class="spec-item">
                        <span class="spec-val">${car.year}</span>
                        <span class="spec-lbl">Year</span>
                    </div>
                    <button class="card-action-btn" onclick="openLightbox(${index})">
                        Details <i class="fa-solid fa-arrow-right-long"></i>
                    </button>
                </div>
            </div>
        `;
        galleryGrid.appendChild(card);
    });
}

// Helpers
function getCategoryLabel(catCode) {
    const labels = {
        sports: "Sports Car",
        suv: "SUV",
        sedan: "Sedan",
        electric: "Electric",
        luxury: "Luxury",
        muscle: "Muscle Car"
    };
    return labels[catCode] || catCode.toUpperCase();
}

/* ----------------------------------------------------
   3. ANIMATIONS & STATE CONTROLS
   ---------------------------------------------------- */

// Light & Dark Theme Handler
themeToggleBtn.addEventListener("click", () => {
    if (document.body.classList.contains("dark-theme")) {
        document.body.classList.remove("dark-theme");
        document.body.classList.add("light-theme");
        localStorage.setItem("shift_gallery_theme", "light-theme");
    } else {
        document.body.classList.remove("light-theme");
        document.body.classList.add("dark-theme");
        localStorage.setItem("shift_gallery_theme", "dark-theme");
    }
});

// Sync Favorites via LocalStorage
function toggleFavorite(id, heartBtn) {
    heartBtn.blur(); // Avoid hover state lingering on click
    if (favoriteCarsList.includes(id)) {
        favoriteCarsList = favoriteCarsList.filter(carId => carId !== id);
        heartBtn.classList.remove("active");
    } else {
        favoriteCarsList.push(id);
        heartBtn.classList.add("active");
    }
    localStorage.setItem("shift_gallery_favorites", JSON.stringify(favoriteCarsList));
}

/* ----------------------------------------------------
   4. SEARCH & FILTERING SYSTEM
   ---------------------------------------------------- */
// Category Pill Toggles
filterWrapper.addEventListener("click", (e) => {
    const clickedBtn = e.target.closest(".filter-btn");
    if (!clickedBtn) return;

    // Toggle active classes
    document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
    clickedBtn.classList.add("active");

    // Perform filter update
    currentFilter = clickedBtn.dataset.filter;
    renderGallery();
});



/* ----------------------------------------------------
   5. LIGHTBOX ENGINE (POPUP DIALOG)
   ---------------------------------------------------- */
function openLightbox(index) {
    currentLightboxIndex = index;
    updateLightboxContent();
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden"; // Freeze scroll
}

function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.style.overflow = ""; // Restore scroll
    lightboxImg.classList.remove("active");
}

function updateLightboxContent() {
    const car = visibleCars[currentLightboxIndex];
    if (!car) return;

    // Smooth image crossfade
    lightboxImg.classList.remove("active");
    
    setTimeout(() => {
        lightboxImg.src = car.image;
        lightboxImg.alt = `${car.brand} ${car.model}`;
        lightboxCat.textContent = getCategoryLabel(car.category);
        lightboxTitle.textContent = `${car.brand} ${car.model}`;
        lightboxSpecs.textContent = car.specs;
        lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${visibleCars.length}`;
        
        lightboxImg.onload = () => {
            lightboxImg.classList.add("active");
        };
    }, 150);
}

function nextLightboxImage() {
    if (visibleCars.length === 0) return;
    currentLightboxIndex = (currentLightboxIndex + 1) % visibleCars.length;
    updateLightboxContent();
}

function prevLightboxImage() {
    if (visibleCars.length === 0) return;
    currentLightboxIndex = (currentLightboxIndex - 1 + visibleCars.length) % visibleCars.length;
    updateLightboxContent();
}

// Lightbox Listeners
lightboxClose.addEventListener("click", closeLightbox);
lightboxNext.addEventListener("click", nextLightboxImage);
lightboxPrev.addEventListener("click", prevLightboxImage);

// Lightbox Keyboard Navigation (Accessibility)
document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("open")) return;
    
    if (e.key === "ArrowRight") {
        nextLightboxImage();
    } else if (e.key === "ArrowLeft") {
        prevLightboxImage();
    } else if (e.key === "Escape") {
        closeLightbox();
    }
});

// Click outside lightbox image to close
lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

/* ----------------------------------------------------
   6. UI CONTROLS & UTILITIES
   ---------------------------------------------------- */
// Scroll Events: Sticky Navbar & Scroll to Top button visibility
window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    // Sticky Nav shadow
    if (scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

    // Scroll-to-Top fade in/out
    if (scrollY > 600) {
        scrollTopBtn.classList.add("visible");
    } else {
        scrollTopBtn.classList.remove("visible");
    }
});

scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
