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

//	addClass navigation

const targetElement = 'navigation-list_items__arrow';
const newItem = 'drop-down';
const navigationItems = document.getElementsByClassName(targetElement);




window.addEventListener("click", function (e) {



	if (e.target.className == targetElement) {
		e.target.nextSibling.classList.add(newItem);
	}

	if (e.target.offsetParent === document.body) {
		for (let navigationItem of navigationItems) {
			if (navigationItem === e.target) {
				continue;
			}
			navigationItem.nextSibling.classList.remove(newItem);
		}
	}
});

//	newItem RWD
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

// Image sizes

const classImage = 'js-size-image';
const imageSize = document.querySelector(`.${classImage}`);

imageSize.addEventListener('click', e => {
	console.log(e)
})