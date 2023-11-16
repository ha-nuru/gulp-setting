document.addEventListener("DOMContentLoaded", () => {
  swiper();
});

// swiper
function swiper() {
  const swiper = new Swiper(".swiper", {
    loop: true,

    pagination: {
      el: ".swiper-pagination",
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    scrollbar: {
      el: ".swiper-scrollbar",
    },
  });
}
