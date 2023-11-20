document.addEventListener("DOMContentLoaded", () => {
  swiper();
  sec3();
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

//section03 - img rolling banner

function sec3() {
  let roller = document.querySelector(".img-rolling-banner ul");
  roller.id = "roller1";
  let clone = roller.cloneNode(true);
  clone.id = "roller2";
  document.querySelector(".img-rolling-banner").appendChild(clone);
  document.querySelector("#roller1").style.left = "0";
  document.querySelector("#roller2").style.left = document.querySelector(
    ".img-rolling-banner ul"
  );

  roller.classList.add("default");
  clone.classList.add("clone");
}
