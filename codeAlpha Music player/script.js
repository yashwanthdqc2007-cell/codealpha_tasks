/**
 * Isai - Premium Tamil Music Player Logic
 * Vanilla JavaScript implementation for custom audio playback, playlist interactions,
 * search filters, visualizer simulation, and keyboard shortcuts.
 */

// ----------------------------------------------------
// SONG DATA ARRAY
// ----------------------------------------------------
const songList = [
    {
        id: 0,
        title: "Aasa Kooda",
        artist: "Sai Abhyankkar",
        album: "Think Indie",
        path: "songs/aasa-kooda.mp3",
        cover: "images/aasa-kooda.jpg",
        duration: "0:30",
        glowColor: "rgba(168, 85, 247, 0.4)" // Neon Purple Glow
    },
    {
        id: 1,
        title: "Hukum",
        artist: "Anirudh Ravichander",
        album: "Jailer (2023)",
        path: "songs/hukum.mp3",
        cover: "images/hukum.jpg",
        duration: "0:30",
        glowColor: "rgba(245, 158, 11, 0.35)" // Fiery Orange Glow
    },
    {
        id: 2,
        title: "Thenpaandi Cheemayile",
        artist: "Ilaiyaraaja",
        album: "Nayakan (1987)",
        path: "songs/thenpaandi.mp3",
        cover: "images/thenpaandi.jpg",
        duration: "0:30",
        glowColor: "rgba(217, 119, 6, 0.3)" // Warm Amber Glow
    },
    {
        id: 3,
        title: "Maa Tujhe Salaam",
        artist: "A.R. Rahman",
        album: "Vande Mataram (1997)",
        path: "songs/maa-tujhe-salaam.mp3",
        cover: "images/maa-tujhe-salaam.jpg",
        duration: "0:30",
        glowColor: "rgba(59, 130, 246, 0.35)" // Majestic Blue Glow
    },
    {
        id: 4,
        title: "Loosu Penne",
        artist: "Yuvan Shankar Raja",
        album: "Vallavan (2006)",
        path: "songs/loosu-penne.mp3",
        cover: "images/loosu-penne.jpg",
        duration: "0:30",
        glowColor: "rgba(236, 72, 153, 0.35)" // Youthful Pink Glow
    }
];

// ----------------------------------------------------
// STATE VARIABLES
// ----------------------------------------------------
let currentTrackIndex = 0;
let isPlaying = false;
let isShuffle = false;
let repeatMode = 0; // 0 = Loop off/advance, 1 = Loop playlist, 2 = Loop single track
let favoritesList = [];
let shuffledOrder = [];

// ----------------------------------------------------
// DOM ELEMENTS
// ----------------------------------------------------
const audioPlayer = document.getElementById("audio-player");
const loadingScreen = document.getElementById("loading-screen");

// Player Info Panel
const playerCover = document.getElementById("player-cover");
const coverWrapper = document.getElementById("cover-wrapper");
const playerTitle = document.getElementById("player-title");
const playerArtist = document.getElementById("player-artist");
const playerAlbum = document.getElementById("player-album");
const favoriteBtn = document.getElementById("favorite-btn");
const panelGlow = document.getElementById("panel-glow");
const visualizerContainer = document.getElementById("visualizer-container");
const playingStatusText = document.getElementById("playing-status-text");
const pulseIndicator = document.querySelector(".pulse-indicator");

// Hero Banner Panel
const heroTitle = document.getElementById("hero-title");
const heroSubtitle = document.getElementById("hero-subtitle");
const heroPlayBtn = document.getElementById("hero-play-btn");
const heroBgBlur = document.getElementById("hero-bg-blur");

// Timeline Progress Bar
const progressSlider = document.getElementById("progress-slider");
const progressFill = document.getElementById("progress-fill");
const currentTimeLabel = document.getElementById("current-time");
const totalDurationLabel = document.getElementById("total-duration");

// Playback Controls
const shuffleBtn = document.getElementById("shuffle-btn");
const prevBtn = document.getElementById("prev-btn");
const playBtn = document.getElementById("play-btn");
const nextBtn = document.getElementById("next-btn");
const repeatBtn = document.getElementById("repeat-btn");
const repeatBadge = document.getElementById("repeat-badge");

// Volume Controls
const volumeBtn = document.getElementById("volume-btn");
const volumeSlider = document.getElementById("volume-slider");
const volumeFill = document.getElementById("volume-fill");
const volumePercentage = document.getElementById("volume-percentage");

// Playlist and Search Panel
const playlistTracksContainer = document.getElementById("playlist-tracks");
const searchInput = document.getElementById("search-input");
const clearSearchBtn = document.getElementById("clear-search-btn");
const noSongsFound = document.getElementById("no-songs-found");
const shortcutTipBtn = document.getElementById("shortcut-tip-btn");

// ----------------------------------------------------
// INITIALIZATION
// ----------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    // 1. Load favorites from localStorage
    loadFavoritesFromStorage();
    
    // 2. Render playlist tracklist in sidebar panel
    renderPlaylist();
    
    // 3. Load the initial song (index 0) without autoplay
    loadTrack(currentTrackIndex, false);
    
    // 4. Initialize visualizer bars animation hooks
    initVisualizerSimulation();

    // 5. Hide splash screen loader after small delay
    setTimeout(() => {
        loadingScreen.classList.add("fade-out");
    }, 1500);

    // 6. Hook up all Event Listeners
    initEventListeners();
});

// ----------------------------------------------------
// CORE AUDIO FUNCTIONS
// ----------------------------------------------------

/**
 * Loads track into audio element and updates UI details
 * @param {number} index - Index of track to load
 * @param {boolean} autoplay - Whether to start playback immediately
 */
function loadTrack(index, autoplay = true) {
    if (index < 0 || index >= songList.length) return;
    
    currentTrackIndex = index;
    const track = songList[currentTrackIndex];
    
    // Set Audio source
    audioPlayer.src = track.path;
    audioPlayer.load(); // Force browser reload of metadata
    
    // Update main playing details
    playerTitle.textContent = track.title;
    playerArtist.textContent = track.artist;
    playerAlbum.textContent = track.album;
    playerCover.src = track.cover;
    
    // Update marquee condition
    checkMarqueeText();

    // Update Favorite Heart Icon State
    updateFavoriteUI(currentTrackIndex);
    
    // Update ambient background leak glows
    panelGlow.style.background = `radial-gradient(circle, ${track.glowColor} 0%, transparent 70%)`;
    heroBgBlur.style.backgroundImage = `url(${track.cover})`;
    
    // Update Hero Banner details
    heroTitle.textContent = track.title;
    heroSubtitle.textContent = `${track.artist} • ${track.album}`;
    
    // Highlight track in playlist
    updatePlaylistHighlight();
    
    // Reset elapsed indicators
    currentTimeLabel.textContent = "0:00";
    totalDurationLabel.textContent = track.duration;
    progressSlider.value = 0;
    progressFill.style.width = "0%";
    
    if (autoplay) {
        playTrack();
    } else {
        pauseTrack();
        playingStatusText.textContent = "Ready to Play";
        pulseIndicator.classList.remove("active");
    }
}

/** Plays the loaded track */
function playTrack() {
    isPlaying = true;
    audioPlayer.play().then(() => {
        // Play success
        playBtn.innerHTML = '<i class="fa-solid fa-pause pause-icon"></i>';
        playBtn.setAttribute("title", "Pause");
        coverWrapper.classList.add("playing");
        visualizerContainer.classList.add("playing");
        playingStatusText.textContent = "Now Playing";
        pulseIndicator.classList.add("active");
        
        // Dynamic banner update
        heroPlayBtn.innerHTML = '<i class="fa-solid fa-pause"></i> Pause';
        
        // Sync active playlist card
        const activeCard = document.querySelector(`.track-card[data-index="${currentTrackIndex}"]`);
        if (activeCard) {
            activeCard.classList.add("playing");
        }
    }).catch(err => {
        console.error("Playback failed (waiting for user interaction):", err);
        pauseTrack();
    });
}

/** Pauses the loaded track */
function pauseTrack() {
    isPlaying = false;
    audioPlayer.pause();
    playBtn.innerHTML = '<i class="fa-solid fa-play play-icon"></i>';
    playBtn.setAttribute("title", "Play");
    coverWrapper.classList.remove("playing");
    visualizerContainer.classList.remove("playing");
    playingStatusText.textContent = "Paused";
    pulseIndicator.classList.remove("active");
    
    // Dynamic banner update
    heroPlayBtn.innerHTML = '<i class="fa-solid fa-play"></i> Play Now';
    
    // Sync active playlist card
    const activeCard = document.querySelector(`.track-card[data-index="${currentTrackIndex}"]`);
    if (activeCard) {
        activeCard.classList.remove("playing");
    }
}

/** Toggles play/pause states */
function togglePlayPause() {
    if (isPlaying) {
        pauseTrack();
    } else {
        playTrack();
    }
}

/** Skip to Next Track */
function nextTrack() {
    let nextIndex;
    
    if (isShuffle) {
        // Shuffle playlist selection
        let currentShuffledIdx = shuffledOrder.indexOf(currentTrackIndex);
        let nextShuffledIdx = currentShuffledIdx + 1;
        if (nextShuffledIdx >= shuffledOrder.length) {
            nextShuffledIdx = 0; // Wrap around
        }
        nextIndex = shuffledOrder[nextShuffledIdx];
    } else {
        // Sequential selection
        nextIndex = currentTrackIndex + 1;
        if (nextIndex >= songList.length) {
            nextIndex = 0; // Wrap around
        }
    }
    
    loadTrack(nextIndex, true);
}

/** Skip to Previous Track */
function prevTrack() {
    let prevIndex;
    
    if (isShuffle) {
        // Shuffle previous selection
        let currentShuffledIdx = shuffledOrder.indexOf(currentTrackIndex);
        let prevShuffledIdx = currentShuffledIdx - 1;
        if (prevShuffledIdx < 0) {
            prevShuffledIdx = shuffledOrder.length - 1;
        }
        prevIndex = shuffledOrder[prevShuffledIdx];
    } else {
        // Sequential selection
        prevIndex = currentTrackIndex - 1;
        if (prevIndex < 0) {
            prevIndex = songList.length - 1;
        }
    }
    
    loadTrack(prevIndex, true);
}

// ----------------------------------------------------
// HELPER LOGIC: REPEAT & SHUFFLE
// ----------------------------------------------------

/** Toggles Repeat mode (Off -> Repeat All -> Repeat One -> Off) */
function toggleRepeat() {
    repeatMode = (repeatMode + 1) % 3;
    
    if (repeatMode === 0) {
        // Loop off
        repeatBtn.classList.remove("active");
        repeatBtn.classList.remove("active-single");
        repeatBtn.setAttribute("title", "Repeat (Off)");
    } else if (repeatMode === 1) {
        // Loop Playlist
        repeatBtn.classList.add("active");
        repeatBtn.classList.remove("active-single");
        repeatBtn.setAttribute("title", "Repeat Playlist");
    } else if (repeatMode === 2) {
        // Loop Single track
        repeatBtn.classList.add("active-single");
        repeatBtn.setAttribute("title", "Repeat Current Song");
    }
}

/** Toggles Shuffle mode */
function toggleShuffle() {
    isShuffle = !isShuffle;
    
    if (isShuffle) {
        shuffleBtn.classList.add("active");
        shuffleBtn.setAttribute("title", "Shuffle (On)");
        generateShuffleOrder();
    } else {
        shuffleBtn.classList.remove("active");
        shuffleBtn.setAttribute("title", "Shuffle (Off)");
        shuffledOrder = [];
    }
}

/** Generates randomized order index list */
function generateShuffleOrder() {
    shuffledOrder = songList.map(song => song.id);
    for (let i = shuffledOrder.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledOrder[i], shuffledOrder[j]] = [shuffledOrder[j], shuffledOrder[i]];
    }
}

// ----------------------------------------------------
// PLAYLIST COMPONENT RENDERER
// ----------------------------------------------------

/** Renders the playlist track cards dynamically */
function renderPlaylist() {
    playlistTracksContainer.innerHTML = "";
    
    songList.forEach((song, idx) => {
        const card = document.createElement("div");
        card.classList.add("track-card");
        card.setAttribute("data-index", idx);
        card.setAttribute("role", "listitem");
        
        if (favoritesList.includes(idx)) {
            card.classList.add("is-favorite");
        }
        
        card.innerHTML = `
            <div class="track-index-container">
                <span class="track-index">${idx + 1}</span>
                <i class="fa-solid fa-play track-play-icon"></i>
                <div class="track-eq-icon">
                    <div class="track-eq-bar"></div>
                    <div class="track-eq-bar"></div>
                    <div class="track-eq-bar"></div>
                </div>
            </div>
            <img src="${song.cover}" alt="${song.title} artwork" class="track-thumb">
            <div class="track-info">
                <h4>${song.title}</h4>
                <p>${song.artist}</p>
            </div>
            <div class="track-right-meta">
                <i class="fa-solid fa-heart track-favorite-indicator"></i>
                <span class="track-duration">${song.duration}</span>
            </div>
        `;
        
        // Single click or Play Icon load
        card.addEventListener("click", () => {
            if (currentTrackIndex === idx) {
                // Toggle Play/Pause on currently selected song
                togglePlayPause();
            } else {
                loadTrack(idx, true);
            }
        });
        
        playlistTracksContainer.appendChild(card);
    });
}

/** Updates the glassy highlight overlay and equalizer icon on active track */
function updatePlaylistHighlight() {
    const cards = document.querySelectorAll(".track-card");
    cards.forEach(card => {
        const idx = parseInt(card.getAttribute("data-index"));
        card.classList.remove("active");
        card.classList.remove("playing");
        
        if (idx === currentTrackIndex) {
            card.classList.add("active");
            if (isPlaying) {
                card.classList.add("playing");
            }
        }
    });
}

// ----------------------------------------------------
// SEARCH FILTER LOGIC
// ----------------------------------------------------

/** Filters the song list by checking title, artist, or album values */
function filterPlaylist() {
    const query = searchInput.value.toLowerCase().trim();
    const cards = document.querySelectorAll(".track-card");
    let matchCount = 0;
    
    // Toggle cross button visibility
    if (query.length > 0) {
        clearSearchBtn.style.display = "block";
    } else {
        clearSearchBtn.style.display = "none";
    }
    
    cards.forEach(card => {
        const idx = parseInt(card.getAttribute("data-index"));
        const song = songList[idx];
        const isMatch = 
            song.title.toLowerCase().includes(query) ||
            song.artist.toLowerCase().includes(query) ||
            song.album.toLowerCase().includes(query);
            
        if (isMatch) {
            card.style.display = "flex";
            matchCount++;
        } else {
            card.style.display = "none";
        }
    });
    
    // Toggle blank state visibility
    if (matchCount === 0) {
        noSongsFound.style.display = "flex";
    } else {
        noSongsFound.style.display = "none";
    }
}

/** Clears search field and restores full playlist */
function clearSearch() {
    searchInput.value = "";
    clearSearchBtn.style.display = "none";
    filterPlaylist();
    searchInput.focus();
}

// ----------------------------------------------------
// FAVORITES STATE CONTROLLER
// ----------------------------------------------------

/** Toggles favorite flag on current song and writes to localStorage */
function toggleFavoriteCurrent() {
    const songIndex = currentTrackIndex;
    const arrayIndex = favoritesList.indexOf(songIndex);
    const card = document.querySelector(`.track-card[data-index="${songIndex}"]`);
    
    if (arrayIndex > -1) {
        // Remove from favorites
        favoritesList.splice(arrayIndex, 1);
        favoriteBtn.classList.remove("favorited");
        favoriteBtn.innerHTML = '<i class="fa-regular fa-heart"></i>';
        if (card) card.classList.remove("is-favorite");
    } else {
        // Add to favorites
        favoritesList.push(songIndex);
        favoriteBtn.classList.add("favorited");
        favoriteBtn.innerHTML = '<i class="fa-solid fa-heart"></i>';
        if (card) card.classList.add("is-favorite");
    }
    
    saveFavoritesToStorage();
}

/** Syncs play state heart representation on loading a track */
function updateFavoriteUI(index) {
    if (favoritesList.includes(index)) {
        favoriteBtn.classList.add("favorited");
        favoriteBtn.innerHTML = '<i class="fa-solid fa-heart"></i>';
    } else {
        favoriteBtn.classList.remove("favorited");
        favoriteBtn.innerHTML = '<i class="fa-regular fa-heart"></i>';
    }
}

function saveFavoritesToStorage() {
    localStorage.setItem("isai_favorites", JSON.stringify(favoritesList));
}

function loadFavoritesFromStorage() {
    const stored = localStorage.getItem("isai_favorites");
    if (stored) {
        try {
            favoritesList = JSON.parse(stored);
        } catch (e) {
            favoritesList = [];
        }
    }
}

// ----------------------------------------------------
// TIMELINE AND VOLUME CONTROLS
// ----------------------------------------------------

/** Updates slider positions, elapsed timeline labels during playback */
function updateTimelineProgress() {
    if (audioPlayer.duration) {
        const currentTime = audioPlayer.currentTime;
        const duration = audioPlayer.duration;
        
        // Percentage calculations
        const progressPercent = (currentTime / duration) * 100;
        
        progressSlider.value = progressPercent;
        progressFill.style.width = `${progressPercent}%`;
        
        currentTimeLabel.textContent = formatTime(currentTime);
        totalDurationLabel.textContent = formatTime(duration);
    }
}

/** Handles slider seeking */
function seekTo() {
    if (audioPlayer.duration) {
        const seekPercentage = parseFloat(progressSlider.value);
        const seekTime = (seekPercentage / 100) * audioPlayer.duration;
        audioPlayer.currentTime = seekTime;
        progressFill.style.width = `${seekPercentage}%`;
    }
}

/** Adjusts volume and tracks fill */
function adjustVolume() {
    const vol = parseFloat(volumeSlider.value);
    audioPlayer.volume = vol / 100;
    volumeFill.style.width = `${vol}%`;
    volumePercentage.textContent = `${Math.round(vol)}%`;
    
    // Toggle mute icon state depending on volume levels
    updateVolumeIcon(vol);
}

/** Updates volume representation graphic state */
function updateVolumeIcon(vol) {
    if (vol === 0 || audioPlayer.muted) {
        volumeBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
        volumeBtn.setAttribute("title", "Unmute");
    } else if (vol < 40) {
        volumeBtn.innerHTML = '<i class="fa-solid fa-volume-low"></i>';
        volumeBtn.setAttribute("title", "Mute");
    } else {
        volumeBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
        volumeBtn.setAttribute("title", "Mute");
    }
}

/** Toggles volume mute status, keeping slider values intact */
function toggleMute() {
    audioPlayer.muted = !audioPlayer.muted;
    
    if (audioPlayer.muted) {
        volumeFill.style.width = "0%";
        volumePercentage.textContent = "0%";
        updateVolumeIcon(0);
    } else {
        const vol = parseFloat(volumeSlider.value);
        volumeFill.style.width = `${vol}%`;
        volumePercentage.textContent = `${Math.round(vol)}%`;
        updateVolumeIcon(vol);
    }
}

/** Helper function to convert seconds into mm:ss format */
function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

// ----------------------------------------------------
// OTHER UX FEATURES
// ----------------------------------------------------

/** Checks if song title is too long and triggers scrolling text animation */
function checkMarqueeText() {
    // If text exceeds parent container width, enable scroll
    const titleWidth = playerTitle.scrollWidth;
    const containerWidth = playerTitle.parentElement.clientWidth;
    
    if (titleWidth > containerWidth) {
        playerTitle.classList.add("scroll-active");
        // Duplicate title inside element to allow endless loop scroll
        if (!playerTitle.innerHTML.includes("</span>")) {
            const originalText = playerTitle.textContent;
            playerTitle.innerHTML = `<span>${originalText}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span>${originalText}</span>`;
        }
    } else {
        playerTitle.classList.remove("scroll-active");
        playerTitle.innerHTML = songList[currentTrackIndex].title;
    }
}

/** Simulates visualizer bars movement when Web Audio API canvas is restricted */
function initVisualizerSimulation() {
    const bars = document.querySelectorAll(".visualizer-bar");
    
    setInterval(() => {
        if (isPlaying) {
            bars.forEach(bar => {
                // Dynamically modify animation duration to create organic movement
                const randomScale = 1 + Math.random() * 8;
                bar.style.transform = `scaleY(${randomScale})`;
            });
        } else {
            bars.forEach(bar => {
                bar.style.transform = `scaleY(1)`;
            });
        }
    }, 150);
}

// ----------------------------------------------------
// KEYBOARD SHORTCUTS
// ----------------------------------------------------

/** Binds shortcut keys: Space for Play/Pause, Left Arrow for Prev, Right for Next */
function setupKeyboardShortcuts(e) {
    // Prevent actions if user is searching
    if (document.activeElement === searchInput) {
        return;
    }
    
    const key = e.code;
    
    if (key === "Space") {
        e.preventDefault();
        togglePlayPause();
    } else if (key === "ArrowLeft") {
        e.preventDefault();
        prevTrack();
    } else if (key === "ArrowRight") {
        e.preventDefault();
        nextTrack();
    }
}

// ----------------------------------------------------
// EVENT LISTENERS HOOK
// ----------------------------------------------------
function initEventListeners() {
    // Player controls
    playBtn.addEventListener("click", togglePlayPause);
    heroPlayBtn.addEventListener("click", () => {
        if (currentTrackIndex === 0 && !isPlaying && audioPlayer.src === "") {
            loadTrack(0, true);
        } else {
            togglePlayPause();
        }
    });
    nextBtn.addEventListener("click", nextTrack);
    prevBtn.addEventListener("click", prevTrack);
    shuffleBtn.addEventListener("click", toggleShuffle);
    repeatBtn.addEventListener("click", toggleRepeat);
    favoriteBtn.addEventListener("click", toggleFavoriteCurrent);
    
    // Timeline tracking
    audioPlayer.addEventListener("timeupdate", updateTimelineProgress);
    audioPlayer.addEventListener("loadedmetadata", updateTimelineProgress);
    
    // Automatic playback flow when track finishes
    audioPlayer.addEventListener("ended", () => {
        if (repeatMode === 2) {
            // Repeat single track
            audioPlayer.currentTime = 0;
            playTrack();
        } else if (repeatMode === 1) {
            // Repeat all (which is standard next flow with wrap around)
            nextTrack();
        } else {
            // Loop off
            let isLastTrack = false;
            
            if (isShuffle) {
                const currentShuffledIdx = shuffledOrder.indexOf(currentTrackIndex);
                isLastTrack = (currentShuffledIdx === shuffledOrder.length - 1);
            } else {
                isLastTrack = (currentTrackIndex === songList.length - 1);
            }
            
            if (isLastTrack) {
                // End of playlist and repeat is off, stop audio
                pauseTrack();
                audioPlayer.currentTime = 0;
                updateTimelineProgress();
            } else {
                // Advance
                nextTrack();
            }
        }
    });
    
    // Drag/Seek Timeline listeners
    progressSlider.addEventListener("input", seekTo);
    progressSlider.addEventListener("change", seekTo);
    
    // Volume adjustments listeners
    volumeSlider.addEventListener("input", adjustVolume);
    volumeSlider.addEventListener("change", adjustVolume);
    volumeBtn.addEventListener("click", toggleMute);
    
    // Live Search filtration
    searchInput.addEventListener("input", filterPlaylist);
    clearSearchBtn.addEventListener("click", clearSearch);
    
    // Shortcut help alert
    shortcutTipBtn.addEventListener("click", () => {
        alert("🎹 Isai Keyboard Shortcuts:\n\n• [Spacebar] : Play / Pause\n• [Left Arrow] : Previous Song\n• [Right Arrow] : Next Song\n\nEnjoy the music!");
    });
    
    // Keyboard shortcuts binder
    window.addEventListener("keydown", setupKeyboardShortcuts);
    
    // Window resize observer to recalibrate marquees
    window.addEventListener("resize", () => {
        setTimeout(checkMarqueeText, 250);
    });
}
