"use strict";

/*************
 **	SWIPER	**
 **************/
new Swiper('.swiper-container.js-partners', {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 5500,
    disableOnInteraction: false
  }
}); //	drop-down navigation

var navigationItems = document.getElementsByClassName('navigation-list_items__arrow');
window.addEventListener("click", function (e) {
  if (e.target.className == 'navigation-list_items__arrow') {
    e.target.nextSibling.classList.add('drop-down');
  }

  if (e.target.offsetParent === document.body) {
    console.log('remove');
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = navigationItems[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var navigationItem = _step.value;

        if (navigationItem === e.target) {
          continue;
        }

        navigationItem.nextSibling.classList.remove('drop-down');
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
}); //	drop-down RWD

var drop_downBurger = document.querySelector(".navigation-burger");
drop_downBurger.addEventListener("click", function () {
  var drop_downBurger_add = document.querySelector(".navigation-wrap");
  drop_downBurger_add.classList.add("down-burger");
});
var drop_downBurger_exit = document.querySelector(".exit-burger");
drop_downBurger_exit.addEventListener("click", function () {
  var drop_downBurger_exid = document.querySelector(".navigation-wrap");
  drop_downBurger_exid.classList.remove("down-burger");
});