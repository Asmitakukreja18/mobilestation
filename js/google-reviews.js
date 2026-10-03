/* =========================================================================
   MOBILE STATION — VERIFIED GOOGLE REVIEWS ENGINE (2026)
   - Tailored specifically for Mobile Station Flagship Smartphone Showroom
   - Amravati, Nagpur & Mumbai showroom customer experiences
   - Category filtering (Flagship, 0% EMI, Repair Lab, Trade-In, Showroom)
   - Interactive carousel slider, helpful reaction toggles, and Review submission
========================================================================= */

const GOOGLE_REVIEWS_DATA = [
  {
    id: "rev-1",
    author: "Rahul Deshmukh",
    avatarBg: "#1a73e8",
    avatarInitial: "R",
    badge: "Local Guide",
    reviewCount: "42 reviews",
    store: "Amravati Flagship (Garud Complex)",
    category: "flagship",
    product: "Bought iPhone 18 Pro Max • Burgundy Titanium",
    rating: 5,
    relativeTime: "2 days ago",
    date: "March 2026",
    verified: true,
    text: "Mobile Station Amravati is hands down the best luxury smartphone experience in Vidarbha! Got my iPhone 18 Pro Max on day 1. The team processed my Bajaj 0% EMI with zero down payment in literally 10 minutes flat. The VIP unboxing table experience with complimentary espresso was amazing. 100% sealed Indian unit with valid Apple warranty. Best smartphone store!",
    ownerResponse: "Thank you so much Rahul! Enjoy the Burgundy Titanium finish and the next-gen camera system on your iPhone 18 Pro Max. Always at your service!",
    helpfulCount: 18,
    isLiked: false
  },
  {
    id: "rev-2",
    author: "Priya Patel",
    avatarBg: "#ea4335",
    avatarInitial: "P",
    badge: "Verified Buyer",
    reviewCount: "14 reviews",
    store: "Nagpur Experience Center (Civil Lines)",
    category: "trade",
    product: "Trade-In Exchange • Galaxy S26 Ultra",
    rating: 5,
    relativeTime: "5 days ago",
    date: "March 2026",
    verified: true,
    text: "Traded my older S22 Ultra for the brand new Galaxy S26 Ultra. Online exchange platforms were quoting barely ₹34,000, but Mobile Station valued it fairly at ₹42,000 PLUS an extra ₹6,000 showroom upgrade bonus! Their tech transfer desk copied all 180GB of my photos & chats in 15 minutes. 10/10 service!",
    ownerResponse: "Pleasure serving you Priya! Enjoy the Galaxy AI capabilities and thank you for trusting our transparent trade-in valuation desk.",
    helpfulCount: 24,
    isLiked: false
  },
  {
    id: "rev-3",
    author: "Amit Verma",
    avatarBg: "#34a853",
    avatarInitial: "A",
    badge: "Local Guide",
    reviewCount: "29 reviews",
    store: "Amravati Flagship (Garud Complex)",
    category: "repair",
    product: "Repair Lab • Pixel OEM Display Replacement",
    rating: 5,
    relativeTime: "1 week ago",
    date: "March 2026",
    verified: true,
    text: "Shattered my Google Pixel screen while traveling. The authorized center told me it would take 7-10 working days. Mobile Station Repair Lab replaced it with a 100% genuine OEM display in just 35 minutes flat right in front of me! 6 months official repair warranty included. Life-saving express service.",
    ownerResponse: "We are glad our express technician could resolve it in 35 minutes! Safe travels Amit and thank you for your recommendation.",
    helpfulCount: 15,
    isLiked: false
  },
  {
    id: "rev-4",
    author: "Dr. Rohan Kulkarni",
    avatarBg: "#fbbc05",
    avatarColor: "#202124",
    avatarInitial: "R",
    badge: "Senior Consultant",
    reviewCount: "9 reviews",
    store: "Nagpur Experience Center (Civil Lines)",
    category: "showroom",
    product: "Showroom Experience • Multi-Brand Flagships",
    rating: 5,
    relativeTime: "2 weeks ago",
    date: "February 2026",
    verified: true,
    text: "Visited with family to compare OnePlus 15, vivo X200 Pro, and iPhone 18 Pro. What sets Mobile Station apart is that you can actually hold, test, and compare the cameras on live display units side-by-side. The advisors didn't push any brand; they listened to our needs. Clean GST billing and genuine warranty.",
    ownerResponse: "Honored by your visit Dr. Kulkarni. Thank you for appreciating our open demo philosophy and white-glove advisory.",
    helpfulCount: 31,
    isLiked: false
  },
  {
    id: "rev-5",
    author: "Sneha Agrawal",
    avatarBg: "#9c27b0",
    avatarInitial: "S",
    badge: "Verified Buyer",
    reviewCount: "16 reviews",
    store: "Amravati Flagship (Garud Complex)",
    category: "emi",
    product: "0% EMI Scheme • HDFC Paperless Approval",
    rating: 5,
    relativeTime: "3 weeks ago",
    date: "February 2026",
    verified: true,
    text: "Got the Xiaomi 15 Ultra with Leica optics. Opted for the HDFC no-cost EMI scheme. Absolutely zero hidden file charges or insurance forced onto the bill. They even gifted a premium tempered glass and case. Staff behavior is extremely polite and professional. Truly luxury retail.",
    ownerResponse: "Thank you Sneha! The Leica optics on your Xiaomi 15 Ultra are truly spectacular. Enjoy shooting and visit us again anytime!",
    helpfulCount: 11,
    isLiked: false
  },
  {
    id: "rev-6",
    author: "Vikrant Joshi",
    avatarBg: "#ff6d00",
    avatarInitial: "V",
    badge: "Local Guide",
    reviewCount: "58 reviews",
    store: "Mumbai BKC Studio",
    category: "flagship",
    product: "VIP Concierge • Sealed Day-1 Delivery",
    rating: 5,
    relativeTime: "1 month ago",
    date: "February 2026",
    verified: true,
    text: "Messaged their WhatsApp VIP Concierge regarding day-1 stock of the Burgundy Pro Max. Within 2 minutes, concierge confirmed allotment and shared live photos of the sealed box. Arrived at showroom, signed the invoice, and walked out in 10 minutes. Unmatched speed and prestige!",
    ownerResponse: "Fast, seamless, and transparent is our promise to all VIP clients. Thank you Vikrant!",
    helpfulCount: 19,
    isLiked: false
  },
  {
    id: "rev-7",
    author: "Ananya Sen",
    avatarBg: "#00897b",
    avatarInitial: "A",
    badge: "Verified Buyer",
    reviewCount: "8 reviews",
    store: "Amravati Flagship (Garud Complex)",
    category: "repair",
    product: "Repair Lab • Original Battery Replacement",
    rating: 5,
    relativeTime: "1 month ago",
    date: "February 2026",
    verified: true,
    text: "My iPhone battery health dropped to 74%. Their certified tech performed a full diagnostics check and replaced the battery within 25 minutes. Diagnostic screen now shows 100% health and verified genuine Apple component. Super affordable and trustworthy!",
    ownerResponse: "Happy to keep your iPhone performing at its maximum peak capacity Ananya!",
    helpfulCount: 8,
    isLiked: false
  },
  {
    id: "rev-8",
    author: "Kunal Deshpande",
    avatarBg: "#3949ab",
    avatarInitial: "K",
    badge: "Tech Enthusiast",
    reviewCount: "22 reviews",
    store: "Amravati Flagship (Garud Complex)",
    category: "showroom",
    product: "Showroom Experience • Architectural Studio",
    rating: 5,
    relativeTime: "1 month ago",
    date: "January 2026",
    verified: true,
    text: "The architectural showroom design with red lighting and glass displays feels like entering an Apple Studio in Tokyo or Dubai. Staff knows in-depth specs down to sensor size, focal length, and charging watts. Best place to buy high-end electronics in Maharashtra.",
    ownerResponse: "Thank you Kunal! Our team lives and breathes smartphone tech. Glad you love the studio architecture!",
    helpfulCount: 14,
    isLiked: false
  }
];

let activeReviewsCategory = "all";
let modalSelectedRating = 5;

// Initialize on DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  renderGoogleReviews("all");
  initReviewsCarousel();
});

// Render Reviews Grid
function renderGoogleReviews(category = "all") {
  const track = document.getElementById("reviewsTrack");
  const countBadge = document.getElementById("reviewsCountBadge");
  if (!track) return;

  activeReviewsCategory = category;

  const filtered = category === "all" 
    ? GOOGLE_REVIEWS_DATA 
    : GOOGLE_REVIEWS_DATA.filter(r => r.category === category);

  if (countBadge) {
    countBadge.innerHTML = `Showing <strong>${filtered.length} verified reviews</strong>`;
  }

  if (filtered.length === 0) {
    track.innerHTML = `
      <div class="empty-reviews-state">
        <p>No reviews found in this category yet. Be the first to share your experience!</p>
        <button class="btn btn-crimson" onclick="openWriteReviewModal()">Write a Review</button>
      </div>
    `;
    return;
  }

  track.innerHTML = filtered.map(review => `
    <article class="google-review-card glass-card" id="card-${review.id}">
      <!-- Card Top: User Info & Google Badge -->
      <div class="review-card-top">
        <div class="review-author-meta">
          <div class="review-avatar" style="background-color: ${review.avatarBg}; color: ${review.avatarColor || '#ffffff'};">
            ${review.avatarInitial}
          </div>
          <div class="review-author-info">
            <div class="author-name-row">
              <strong class="author-name">${review.author}</strong>
              <span class="google-g-icon" title="Verified Google Review">
                <svg viewBox="0 0 24 24" width="14" height="14">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
              </span>
            </div>
            <div class="author-sub-line">
              <span class="user-badge">${review.badge}</span>
              ${review.reviewCount ? `<span class="bullet">•</span><span class="user-reviews-count">${review.reviewCount}</span>` : ""}
            </div>
          </div>
        </div>

        <div class="review-date-badge">
          ${review.relativeTime}
        </div>
      </div>

      <!-- Card Stars & Service Tag -->
      <div class="review-rating-row">
        <div class="card-stars">
          ${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}
        </div>
        <span class="verified-pill">✓ Verified Showroom Buyer</span>
      </div>

      <!-- Product / Experience Tag -->
      <div class="review-product-tag">
        <span>📍 ${review.store}</span>
        ${review.product ? `<span class="item-tag">${review.product}</span>` : ""}
      </div>

      <!-- Review Body Text -->
      <p class="review-text-body">
        “${review.text}”
      </p>

      <!-- Store Owner Official Response -->
      ${review.ownerResponse ? `
        <div class="owner-response-box">
          <div class="owner-header">
            <strong>Response from Mobile Station Concierge</strong>
            <small>Official Showroom</small>
          </div>
          <p class="owner-text">${review.ownerResponse}</p>
        </div>
      ` : ""}

      <!-- Card Bottom Actions -->
      <div class="review-card-footer">
        <button class="helpful-btn ${review.isLiked ? 'liked' : ''}" onclick="toggleReviewHelpful('${review.id}')" title="Mark as helpful">
          <span>👍</span> Helpful (${review.helpfulCount})
        </button>
        <span class="google-source-label">Posted on Google</span>
      </div>
    </article>
  `).join("");
}

// Category Filter Click Handler
function filterReviewsCategory(category) {
  const chips = document.querySelectorAll(".review-chip");
  chips.forEach(chip => {
    chip.classList.toggle("active", chip.getAttribute("data-category") === category);
  });
  renderGoogleReviews(category);

  // Scroll back to track start smoothly
  const wrap = document.getElementById("reviewsTrackWrap");
  if (wrap) wrap.scrollTo({ left: 0, behavior: "smooth" });
}

// Carousel Navigation
function slideReviews(direction) {
  const wrap = document.getElementById("reviewsTrackWrap");
  if (!wrap) return;

  const cardWidth = 360 + 24; // card width + gap
  const scrollAmount = direction * cardWidth;
  wrap.scrollBy({ left: scrollAmount, behavior: "smooth" });
}

function initReviewsCarousel() {
  const wrap = document.getElementById("reviewsTrackWrap");
  if (!wrap) return;

  // Touch drag & Mouse drag support
  let isDown = false;
  let startX;
  let scrollLeft;

  wrap.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - wrap.offsetLeft;
    scrollLeft = wrap.scrollLeft;
  });

  wrap.addEventListener("mouseleave", () => {
    isDown = false;
  });

  wrap.addEventListener("mouseup", () => {
    isDown = false;
  });

  wrap.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - wrap.offsetLeft;
    const walk = (x - startX) * 1.5;
    wrap.scrollLeft = scrollLeft - walk;
  });
}

// Toggle Review Helpful Reaction
function toggleReviewHelpful(id) {
  const review = GOOGLE_REVIEWS_DATA.find(r => r.id === id);
  if (!review) return;

  if (review.isLiked) {
    review.helpfulCount -= 1;
    review.isLiked = false;
  } else {
    review.helpfulCount += 1;
    review.isLiked = true;
    if (typeof showToast === "function") {
      showToast("Thank you for your feedback!");
    }
  }

  // Update card UI locally without full re-render
  const card = document.getElementById(`card-${id}`);
  if (card) {
    const btn = card.querySelector(".helpful-btn");
    if (btn) {
      btn.innerHTML = `<span>👍</span> Helpful (${review.helpfulCount})`;
      btn.classList.toggle("liked", review.isLiked);
    }
  }
}

// =========================================================================
// WRITE REVIEW MODAL INTERACTION
// =========================================================================
function openWriteReviewModal() {
  const modal = document.getElementById("writeReviewModalBackdrop");
  if (modal) modal.classList.add("open");
  setModalRating(5);
}

function closeWriteReviewModal() {
  const modal = document.getElementById("writeReviewModalBackdrop");
  if (modal) modal.classList.remove("open");
}

function setModalRating(rating) {
  modalSelectedRating = rating;
  const stars = document.querySelectorAll("#modalStarRating .star-btn");
  stars.forEach((s, idx) => {
    s.classList.toggle("active", idx < rating);
  });

  const ratingText = document.getElementById("modalRatingText");
  const labels = ["Poor", "Fair", "Good", "Very Good", "Excellent"];
  if (ratingText) {
    ratingText.textContent = `${rating}.0 / 5.0 (${labels[rating - 1]})`;
  }
}

function handleReviewSubmit(e) {
  e.preventDefault();
  const author = document.getElementById("revAuthor").value.trim();
  const location = document.getElementById("revLocation").value;
  const category = document.getElementById("revCategory").value;
  const product = document.getElementById("revProduct").value.trim() || "Showroom Visit & Flagship Experience";
  const comment = document.getElementById("revComment").value.trim();

  if (!author || !comment) return;

  // Generate pleasant avatar color
  const colors = ["#1a73e8", "#ea4335", "#34a853", "#9c27b0", "#ff6d00", "#00897b"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  const newReview = {
    id: `user-rev-${Date.now()}`,
    author: author,
    avatarBg: randomColor,
    avatarInitial: author.charAt(0).toUpperCase(),
    badge: "Verified Buyer",
    reviewCount: "1 review",
    store: location,
    category: category,
    product: product,
    rating: modalSelectedRating,
    relativeTime: "Just now",
    date: "Today",
    verified: true,
    text: comment,
    ownerResponse: "Thank you for visiting Mobile Station! We appreciate your kind words and look forward to seeing you again.",
    helpfulCount: 0,
    isLiked: false
  };

  // Prepend to array
  GOOGLE_REVIEWS_DATA.unshift(newReview);

  // Re-render
  renderGoogleReviews(activeReviewsCategory);

  // Close modal and reset form
  closeWriteReviewModal();
  document.getElementById("writeReviewForm").reset();

  if (typeof showToast === "function") {
    showToast("✓ Thank you! Your Google review has been posted.");
  }

  // Scroll to reviews section
  const revSection = document.getElementById("reviews");
  if (revSection) revSection.scrollIntoView({ behavior: "smooth" });
}
