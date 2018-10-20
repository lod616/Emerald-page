//подключение файла libs.js
//= libs/_libs.js


//функция добавления класса при клике бургер
function ShowMenu() {
	document.querySelector('.header-sandwich').onclick = function () {
		document.querySelector('.submenu').classList.toggle('submenu-is-active');
		document.querySelector('.header-sandwich').classList.toggle('header-sandwich-is-active');
	};
};
ShowMenu();

const headerSandwich = document.querySelector('.header-sandwich');
const submenu = document.querySelector('.submenu');


headerSandwich.addEventListener('click', () => {
	if (submenu.offsetHeight > 0) {
		submenu.style.height = 0;
	} else {
		submenu.style.height = `${submenu.scrollHeight}px`;
	}
});

//слайдер slick
$('.js-reviews-slider').slick({
	dots: true,
	speed: 300,
	prevArrow: '.reviews-prev__arrow',
	nextArrow: '.reviews-next__arrow',
	slidesToShow: 2,
	slidesToScroll: 1,
	responsive: [
		{
			breakpoint: 1024,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
				dots: true
			}
		},
		{
			breakpoint: 600,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2
			}
		},
		{
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}
	]
});


//Плавный скролл по странице при клике на меню-ссылки
$(function () {
	$('.scroll-link').click(function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: target.offset().top
				}, 1000);
				return false;
			}
		}
	});
});



function validationForm() {
	const formSubmit = document.querySelector('.form--submit');
	const formNumber = document.querySelector('.form--number');
	const formName = document.querySelector('.form--name');

	formSubmit.addEventListener('click', () => {
		if (formName.value == '' || formName.value == isNaN || formNumber.value == '' || formNumber.value != typeof ('number')) {
			event.preventDefault();
			formName.style.border = "2px solid red";
			formNumber.style.border = "2px solid red";
		}
		else {
			return true;
		}
	});
};

validationForm();


//слайдер slick
$('.js-price-item__wrap').slick({
	speed: 300,
	prevArrow: '.price-prev__arrow',
	nextArrow: '.price-next__arrow',
	slidesToShow: 3,
	slidesToScroll: 1,
	responsive: [
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
				infinite: true,
			}
		},
		{
			breakpoint: 900,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				adaptiveHeight: true
			}
		},
	]
});