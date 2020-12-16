/*************
 **	SWIPER	**
 **************/
new Swiper('.swiper-container.js-partners', {
	spaceBetween: 30,
	centeredSlides: true,
	autoplay: {
		delay: 5500,
		disableOnInteraction: false,
	},
});

//	drop-down navigation

let clickElementNav = document.querySelector('.navigation-list_items');

clickElementNav.addEventListener("click", function() {

	let drop_downNavigation = document.querySelector(".under-menu");
	// console.log(drop_downNavigation);
	drop_downNavigation.classList.toggle("drop-down");
});


