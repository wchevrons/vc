 // Initialize players
 let aboutPlayer, transformPlayer;

 // Wait for the Vimeo API to be ready
 function initPlayers() {
   aboutPlayer = new Vimeo.Player('aboutVideo');
   transformPlayer = new Vimeo.Player('transformVideo');
   
   // Handle video end events
   aboutPlayer.on('ended', function() {
     document.querySelector('#about-coach .control-btn').innerHTML = '<i class="fas fa-play"></i>';
   });
   
   transformPlayer.on('ended', function() {
     document.querySelector('#client-transformations .control-btn').innerHTML = '<i class="fas fa-play"></i>';
   });
 }

 // Toggle play/pause function
 function togglePlay(videoId) {
   let player, btn;
   if (videoId === 'aboutVideo') {
     player = aboutPlayer;
     btn = document.querySelector('#about-coach .control-btn');
   } else if (videoId === 'transformVideo') {
     player = transformPlayer;
     btn = document.querySelector('#client-transformations .control-btn');
   }
   
   player.getPaused().then(function(paused) {
     if (paused) {
       player.play().then(function() {
         btn.innerHTML = '<i class="fas fa-pause"></i>';
       }).catch(function(error) {
         console.error('Play error:', error);
         // Fallback: Try unmuting first (browser autoplay policies)
         player.setVolume(1).then(function() {
           player.play();
         });
       });
     } else {
       player.pause();
       btn.innerHTML = '<i class="fas fa-play"></i>';
     }
   });
 }

 // Initialize when the page loads
 document.addEventListener('DOMContentLoaded', function() {
   initPlayers();
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
       
// Open the modal
function openExchangeModal() {
    const modal = document.getElementById('exchangeModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
}

// Close the modal
function closeExchangeModal() {
    const modal = document.getElementById('exchangeModal');
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling when modal is closed
}

// Share contact via WhatsApp
function shareViaWhatsApp() {
    const message = `Coach Nishant's Contact Information:\nPhone: +971 50 985 9515\nEmail: nishantdhalwal25@gmail.com`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
}

// Save contact information as a .vcf file
function saveToContacts() {
    const contactName = "Nishant Dhalwal";
    const contactPhone = "+971 50 985 9515";
    const contactEmail = "nishantdhalwal25@gmail.com";

    // vCard format
    const vCardData = `
BEGIN:VCARD
VERSION:3.0
FN:${contactName}
TEL:${contactPhone}
EMAIL:${contactEmail}
END:VCARD
    `;

    // Create a Blob object from the vCard data
    const blob = new Blob([vCardData], { type: 'text/vcard' });

    // Create a link element
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${contactName}.vcf`; // Set the filename

    // Trigger a click event on the link to start the download
    link.click();
}

// Share contact via Email
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