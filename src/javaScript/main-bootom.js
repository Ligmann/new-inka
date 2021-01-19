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

const navigationItems = document.getElementsByClassName('navigation-list_items__arrow');

window.addEventListener("click", function (e) {
	if (e.target.className == 'navigation-list_items__arrow') {
		e.target.nextSibling.classList.add('drop-down');
	}

	if (e.target.offsetParent === document.body) {
		console.log('remove');
		for (let navigationItem of navigationItems) {
			if (navigationItem === e.target) {
				continue;
			}
			navigationItem.nextSibling.classList.remove('drop-down');
		}
	}
});

//	drop-down RWD
const drop_downBurger = document.querySelector(".navigation-burger");

drop_downBurger.addEventListener("click", function () {

	const drop_downBurger_add = document.querySelector(".navigation-wrap");
	drop_downBurger_add.classList.add("down-burger");

});
const drop_downBurger_exit = document.querySelector(".exit-burger");

drop_downBurger_exit.addEventListener("click", function () {

	const drop_downBurger_exid = document.querySelector(".navigation-wrap");
	drop_downBurger_exid.classList.remove("down-burger");

});
