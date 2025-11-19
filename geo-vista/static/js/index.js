window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/interpolation/stacked";
var NUM_INTERP_FRAMES = 240;

var interp_images = [];
function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  var wrapper = document.getElementById('interpolation-image-wrapper');
  if (wrapper) {
    wrapper.innerHTML = '';
    wrapper.appendChild(image);
  }
}


document.addEventListener('DOMContentLoaded', function() {
  // Navbar burger toggle
  var burger = document.querySelector('.navbar-burger');
  var menu = document.querySelector('.navbar-menu');
  if (burger && menu) {
    burger.addEventListener('click', function() {
      burger.classList.toggle('is-active');
      menu.classList.toggle('is-active');
    });
  }

  // Carousel attach (if any)
  try {
    var options = {
      slidesToScroll: 1,
      slidesToShow: 3,
      loop: true,
      infinite: true,
      autoplay: false,
      autoplaySpeed: 3000,
    };
    bulmaCarousel.attach('.carousel', options);
  } catch (e) {
    // no-op if bulmaCarousel not present
  }

  // Interpolation slider (optional; only if element exists)
  var slider = document.getElementById('interpolation-slider');
  var wrapper = document.getElementById('interpolation-image-wrapper');
  if (slider && wrapper) {
    preloadInterpolationImages();
    setInterpolationImage(0);
    slider.setAttribute('max', String(NUM_INTERP_FRAMES - 1));
    slider.addEventListener('input', function() {
      setInterpolationImage(this.value);
    });
  }

  // Bulma slider enhancements (if present)
  try { bulmaSlider.attach(); } catch (e) {}

  // Teaser horizontal slider control
  var teaserWrapper = document.getElementById('teaser-wrapper');
  var teaserSlider = document.getElementById('teaser-slider');
  if (teaserWrapper && teaserSlider) {
    function updateTeaserScroll() {
      var maxScroll = teaserWrapper.scrollWidth - teaserWrapper.clientWidth;
      if (maxScroll < 0) maxScroll = 0;
      var pct = Number(teaserSlider.value) / 100;
      teaserWrapper.scrollLeft = Math.round(maxScroll * pct);
    }
    // Default to 50% from left
    teaserSlider.value = 50;
    // Update when slider moves
    teaserSlider.addEventListener('input', updateTeaserScroll);
    // Update once image has loaded (to ensure scrollWidth is known)
    var teaserImg = document.getElementById('teaser-img');
    if (teaserImg) {
      if (!teaserImg.complete) {
        teaserImg.addEventListener('load', updateTeaserScroll);
      }
    }
    // Initial update (ensure 50% position)
    setTimeout(function(){ teaserSlider.value = 50; updateTeaserScroll(); }, 0);
  }
});
