// Initialize all players
let aboutPlayer, transformPlayer1, transformPlayer2, transformPlayer3, transformPlayer4;
let currentVideoIndex = 0;
const videoWrappers = document.querySelectorAll('#client-transformations .video-wrapper');

// Wait for the Vimeo API to be ready
function initAllPlayers() {
  try {
    // Initialize aboutVideo player
    aboutPlayer = new Vimeo.Player('aboutVideo');
    aboutPlayer.on('ended', function() {
      document.querySelector('#about-coach .control-btn').innerHTML = '<i class="fas fa-play"></i>';
    });

    // Initialize transformation video players
    transformPlayer1 = new Vimeo.Player('transformVideo1');
    transformPlayer2 = new Vimeo.Player('transformVideo2');
    transformPlayer3 = new Vimeo.Player('transformVideo3');
    transformPlayer4 = new Vimeo.Player('transformVideo4');
    
    // Handle video end events for transformation videos
    transformPlayer1.on('ended', function() {
      document.querySelector('#transformVideo1 + .controls .control-btn').innerHTML = '<i class="fas fa-play"></i>';
    });
    
    transformPlayer2.on('ended', function() {
      document.querySelector('#transformVideo2 + .controls .control-btn').innerHTML = '<i class="fas fa-play"></i>';
    });
    
    transformPlayer3.on('ended', function() {
      document.querySelector('#transformVideo3 + .controls .control-btn').innerHTML = '<i class="fas fa-play"></i>';
    });
    
    transformPlayer4.on('ended', function() {
      document.querySelector('#transformVideo4 + .controls .control-btn').innerHTML = '<i class="fas fa-play"></i>';
    });

    // Set initial volume to muted for transformation videos (helps with autoplay restrictions)
    transformPlayer1.setVolume(0);
    transformPlayer2.setVolume(0);
    transformPlayer3.setVolume(0);
    transformPlayer4.setVolume(0);
    
    console.log('All Vimeo players initialized successfully');
    
    // Show first transformation video
    if (videoWrappers.length > 0) {
      showVideo(0);
    }
  } catch (error) {
    console.error('Error initializing Vimeo players:', error);
  }
}

// Toggle play/pause for aboutVideo
function toggleAboutPlay() {
  const btn = document.querySelector('#about-coach .control-btn');
  
  if (!aboutPlayer) {
    console.error('About player not initialized');
    return;
  }

  aboutPlayer.getPaused().then(function(paused) {
    if (paused) {
      aboutPlayer.play().then(function() {
        btn.innerHTML = '<i class="fas fa-pause"></i>';
      }).catch(function(error) {
        console.error('Play error:', error);
        // Fallback: Try with sound if muted autoplay was blocked
        aboutPlayer.setVolume(1).then(function() {
          aboutPlayer.play().then(function() {
            btn.innerHTML = '<i class="fas fa-pause"></i>';
          });
        });
      });
    } else {
      aboutPlayer.pause();
      btn.innerHTML = '<i class="fas fa-play"></i>';
    }
  }).catch(function(error) {
    console.error('Error checking pause state:', error);
  });
}

// Toggle play/pause for transformation videos
function toggleTransformPlay(videoId) {
  let player, btn;
  
  if (videoId === 'transformVideo1') {
    player = transformPlayer1;
    btn = document.querySelector('#transformVideo1 + .controls .control-btn');
  } else if (videoId === 'transformVideo2') {
    player = transformPlayer2;
    btn = document.querySelector('#transformVideo2 + .controls .control-btn');
  } else if (videoId === 'transformVideo3') {
    player = transformPlayer3;
    btn = document.querySelector('#transformVideo3 + .controls .control-btn');
  } else if (videoId === 'transformVideo4') {
    player = transformPlayer4;
    btn = document.querySelector('#transformVideo4 + .controls .control-btn');
  }

  if (!player) {
    console.error('Player not initialized for:', videoId);
    return;
  }

  player.getPaused().then(function(paused) {
    if (paused) {
      // Start with muted audio to bypass autoplay restrictions
      player.setVolume(0).then(() => {
        return player.play();
      }).then(() => {
        btn.innerHTML = '<i class="fas fa-pause"></i>';
        // Gradually increase volume after playback starts
        player.setVolume(1);
      }).catch(error => {
        console.error('Playback failed:', error);
        btn.innerHTML = '<i class="fas fa-play"></i>';
      });
    } else {
      player.pause();
      btn.innerHTML = '<i class="fas fa-play"></i>';
    }
  }).catch(error => {
    console.error('Error checking pause state:', error);
  });
}

// Navigation functions for transformation videos
function showVideo(index) {
  // Pause current video before switching
  if (currentVideoIndex === 0 && transformPlayer1) {
    transformPlayer1.pause();
    document.querySelector('#transformVideo1 + .controls .control-btn').innerHTML = '<i class="fas fa-play"></i>';
  } else if (currentVideoIndex === 1 && transformPlayer2) {
    transformPlayer2.pause();
    document.querySelector('#transformVideo2 + .controls .control-btn').innerHTML = '<i class="fas fa-play"></i>';
  } else if (currentVideoIndex === 2 && transformPlayer3) {
    transformPlayer3.pause();
    document.querySelector('#transformVideo3 + .controls .control-btn').innerHTML = '<i class="fas fa-play"></i>';
  } else if (currentVideoIndex === 3 && transformPlayer4) {
    transformPlayer4.pause();
    document.querySelector('#transformVideo4 + .controls .control-btn').innerHTML = '<i class="fas fa-play"></i>';
  }
  
  videoWrappers.forEach(wrapper => wrapper.classList.remove('active'));
  videoWrappers[index].classList.add('active');
  currentVideoIndex = index;
}

function nextVideo() {
  const nextIndex = (currentVideoIndex + 1) % videoWrappers.length;
  showVideo(nextIndex);
}

function prevVideo() {
  const prevIndex = (currentVideoIndex - 1 + videoWrappers.length) % videoWrappers.length;
  showVideo(prevIndex);
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', function() {
  // Add slight delay to ensure Vimeo API is loaded
  setTimeout(initAllPlayers, 300);
});



       // Create water bubble background
       function createBubbles() {
           const container = document.getElementById('bubbles');
           const bubbleCount = 12;
           
           for (let i = 0; i < bubbleCount; i++) {
               const bubble = document.createElement('div');
               bubble.classList.add('bubble');
               
               const size = Math.random() * 60 + 30;
               const posX = Math.random() * 100;
               const delay = Math.random() * 10;
               const duration = Math.random() * 15 + 10;
               
               bubble.style.width = `${size}px`;
               bubble.style.height = `${size}px`;
               bubble.style.left = `${posX}%`;
               bubble.style.animationDelay = `${delay}s`;
               bubble.style.animationDuration = `${duration}s`;
               
               container.appendChild(bubble);
           }
       }
       
       // Initialize Swiper
       const testimonialSwiper = new Swiper('.testimonial-slider .swiper', {
           loop: true,
           pagination: {
               el: '.testimonial-slider .swiper-pagination',
               clickable: true,
           },
           autoplay: {
               delay: 5000,
               disableOnInteraction: false,
           }
       });
       
       // Dropdown functionality
       function toggleDropdown(header) {
           const section = header.parentElement;
           const wasActive = section.classList.contains('active');
           
           // Close all dropdowns first
           document.querySelectorAll('.dropdown-section').forEach(sec => {
               sec.classList.remove('active');
           });
           
           // Open current one if it wasn't active
           if (!wasActive) {
               section.classList.add('active');
           }
           
           // Scroll into view on mobile
           if (window.innerWidth <= 480 && !wasActive) {
               setTimeout(() => {
                   section.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
               }, 100);
           }
       }
       
       // Exchange Contact Modal
       function openExchangeModal() {
           const modal = document.getElementById('exchangeModal');
           modal.classList.add('active');
           document.body.style.overflow = 'hidden';
       }
       
       function closeExchangeModal() {
           const modal = document.getElementById('exchangeModal');
           modal.classList.remove('active');
           document.body.style.overflow = '';
       }
       
       // Contact Exchange Functions
       function shareViaWhatsApp() {
           const message = `Coach Nishant's Contact Information:\nPhone: +971 50 985 9515\nEmail: nishantdhalwal25@gmail.com`;
           window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
       }
       
       function saveToContacts() {
           alert("Add this contact to your phone's address book:\n\nName: Nishant Dhalwal\nPhone: +971 50 985 9515\nEmail: nishantdhalwal25@gmail.com");
       }
       
       function shareViaEmail() {
           const subject = "Coach Nishant's Contact Information";
           const body = `Here's Coach Nishant's contact information:\n\nPhone: +971 50 985 9515\nEmail: nishantdhalwal25@gmail.com\n\nI thought you might find this useful!`;
           window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
       }
       
       // Initialize on load
       window.addEventListener('load', function() {
           createBubbles();
           
           // Disable zooming
           document.addEventListener('touchmove', function(e) {
               if (e.scale !== 1) e.preventDefault();
           }, { passive: false });
       });
       // === JavaScript with Auto-Slide ===
       document.addEventListener('DOMContentLoaded', () => {
           // --- Existing Elements ---
           const sliderContainer = document.getElementById('sliderContainer');
           const sliderTrack = document.getElementById('sliderTrack');
           const sliderImages = document.querySelectorAll('.slider-image');
           const fullscreenOverlay = document.getElementById('fullscreen-overlay');
           const fullscreenImage = document.getElementById('fullscreen-image');
           const closeButton = document.getElementById('close-fullscreen');

           // --- Auto-Slide Variables ---
           const slideIntervalTime = 3500; // Time in ms between slides (e.g., 3.5 seconds)
           let autoSlideInterval = null; // To store the interval ID

           // --- Helper: Calculate Scroll Amount ---
           function getScrollAmount() {
                if (sliderImages.length === 0) return 0;
                const firstImage = sliderImages[0];
                const style = window.getComputedStyle(sliderTrack);
                const gap = parseFloat(style.gap) || 15; // Get gap or default
                return firstImage.offsetWidth + gap; // Scroll by one image width + gap
           }

           // --- Auto-Slide Functions ---
           function slideNext() {
               if (!sliderContainer) return; // Safety check

               const scrollAmount = getScrollAmount();
               if (scrollAmount === 0) return; // No images or width yet

               const currentScroll = sliderContainer.scrollLeft;
               const maxScroll = sliderContainer.scrollWidth - sliderContainer.clientWidth;

               // Check if we are near the end (within a small tolerance)
               if (currentScroll + scrollAmount >= maxScroll - 5) {
                   // Go back to the beginning smoothly
                   sliderContainer.scrollTo({ left: 0 /*, behavior: 'smooth' - CSS handles this now */ });
               } else {
                   // Scroll right by the calculated amount
                   sliderContainer.scrollBy({ left: scrollAmount /*, behavior: 'smooth' - CSS handles this now */ });
               }
           }

           function startAutoSlide() {
               // Don't start if already running or if fullscreen is open
               if (autoSlideInterval || fullscreenOverlay.classList.contains('visible')) {
                   return;
               }
                // Clear any lingering interval just in case
               clearInterval(autoSlideInterval);
               autoSlideInterval = setInterval(slideNext, slideIntervalTime);
               // console.log("Auto-slide started");
           }

           function stopAutoSlide() {
               clearInterval(autoSlideInterval);
               autoSlideInterval = null; // Reset interval ID
               // console.log("Auto-slide stopped");
           }

           // --- Fullscreen Functions (Modified for Auto-Slide) ---
           function openFullscreen(event) {
               stopAutoSlide(); // Stop sliding when opening fullscreen
               const imgSrc = event.target.src;
               fullscreenImage.src = imgSrc;
               fullscreenOverlay.classList.add('visible');
               document.body.classList.add('overlay-open');
           }

           function closeFullscreen() {
               fullscreenOverlay.classList.remove('visible');
               document.body.classList.remove('overlay-open');
               // Check if mouse is *not* over the slider before restarting
               // A small delay helps ensure hover state is correct after closing
                setTimeout(() => {
                    if (!sliderContainer.matches(':hover')) {
                        startAutoSlide();
                    }
                }, 100); // Short delay
               // Clear image src after transition (optional)
                setTimeout(() => {
                    if (!fullscreenOverlay.classList.contains('visible')) {
                        fullscreenImage.src = '';
                    }
                }, 300); // Match CSS transition duration
           }

           // --- Event Listeners ---

           // Image click listener (Unchanged)
           sliderImages.forEach(img => {
               img.addEventListener('click', openFullscreen);
           });

           // Fullscreen Close Listeners (Unchanged)
           closeButton.addEventListener('click', closeFullscreen);
           fullscreenOverlay.addEventListener('click', (event) => {
               if (event.target === fullscreenOverlay) {
                   closeFullscreen();
               }
           });
           document.addEventListener('keydown', (event) => {
               if (event.key === 'Escape' && fullscreenOverlay.classList.contains('visible')) {
                   closeFullscreen();
               }
           });

           // --- Auto-Slide Pause/Resume Listeners ---
           sliderContainer.addEventListener('mouseenter', stopAutoSlide);
           sliderContainer.addEventListener('mouseleave', startAutoSlide);

           // --- Initial Auto-Slide Start ---
            // Add a small delay to allow images to potentially load dimensions
           setTimeout(startAutoSlide, 500);

       });
