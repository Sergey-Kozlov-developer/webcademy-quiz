// ищем все карточки
const cards = document.querySelectorAll(".plate");
// добавляем к карточке класс hidden
cards.forEach(function (card) {
	card.classList.add("none");
});

// теккущий индекс активной карточки
let currentIndex = 0;
// текущий прогресс
let currentCard = 0;

// скрываем кнопку на первой карточке
cards[0].querySelector('[data-nav="prev"]').remove();

// Show 1-st card
cards[currentIndex].classList.remove("none");
cards[currentIndex].classList.add("visible");
// запускае прогресс бар на старте
updateProgressBar();

// ищем кнопки: назад и далее // ищем клик по всей странице
window.addEventListener("click", function (event) {
	// кнопка вперед
	if (event.target.closest('[data-nav="next"]')) {
		console.log("Next");
		const result = checkOnAnswer(cards[currentIndex]);
		const answersWrapper =
			cards[currentIndex].querySelector("[data-answers]");

		if (result) {
			// прогресс бар
			updateProgressBar("next");

			// скрываем тек карточку при перемещениее
			setTimeout(function () {
				// скрываем текущую с анимацией
				cards[currentIndex].classList.remove("visible");

				setTimeout(function () {
					// скрываем текущую полностью
					cards[currentIndex].classList.add("none");
					// показываем следующую, готовим к анимации
					currentIndex = currentIndex + 1;
					cards[currentIndex].classList.remove("none");
					setTimeout(function () {
						// отображаем следующую с анимацией
						cards[currentIndex].classList.add("visible");
					}, 100);
				}, 500);
				// answersWrapper.classList.remove("required");
			}, 500);
		} else {
			console.error("Введите ответ!");

			answersWrapper.classList.add("required");
		}
	}
	// кнопка назад
	if (event.target.closest('[data-nav="prev"]')) {
		console.log("Prev");
		// progress bar
		updateProgressBar("prev");

		setTimeout(function () {
			// не даем двигаться назад находясь на первой карточке
			if (currentIndex === 0) return;

			// скрываем текущую карточку
			cards[currentIndex].classList.remove("visible");

			setTimeout(function () {
				cards[currentIndex].classList.add("none");
				// определяем prev card и готовим ее к анимации
				currentIndex = currentIndex - 1;
				// показываем пред карточку
				cards[currentIndex].classList.remove("none");
				// отображаем предыдущую карточку с анимацией
				setTimeout(function () {
					cards[currentIndex].classList.add("visible");
				}, 100);
			}, 500);
		}, 500);
	}
});

// ф-ия проверки полей на заполненность
function checkOnAnswer(card) {
	console.log(card);
	// проверка на радиокнопки
	const radioButtons = card.querySelectorAll('input[type="radio"]');
	// проверка, выбрана ли радиокнопка
	if (radioButtons.length > 0) {
		for (let radio of radioButtons) {
			// checked из DOM element
			if (radio.checked) return true;
		}
	}

	// проверка на чекбоксы
	const checkBoxes = card.querySelectorAll('input[type="checkbox"]');
	if (checkBoxes.length > 0) {
		for (let checkBox of checkBoxes) {
			if (checkBox.checked) return true;
		}
	}
}

// ф-ия прогресс бара
function updateProgressBar(direction = "start") {
	if (direction === "next") {
		currentCard = currentCard + 1;
	} else if (direction === "prev") {
		currentCard = currentCard - 1;
	}

	const progressValue = document.querySelectorAll(".progress__label strong");
	const progressLineBar = document.querySelectorAll(".progress__line-bar");

	// кол-во карточек
	const countableCards = document.querySelectorAll("[data-progress]").length;
	// считаем прогресс
	const progress = Math.round((currentCard * 100) / countableCards);

	// отображаем прогресс на странице
	progressValue.forEach(function (item) {
		item.innerText = progress + "%";
	});
	progressLineBar.forEach(function (item) {
		item.style.width = progress + "%";
	});
}

// маска для номера телефона
mask("#tel");
//
const submitForm = document.querySelector("#submitForm");
const telInput = document.querySelector("#tel");

submitForm.onClick = function () {
	if (telInput.value === "+" || telInput.value.length < 6) {
		telInput.value = "";
	}
};
// фокус по чекбоксу и стилизуем
const checkBoxPolicy = document.querySelector("#policy");
checkBoxPolicy.addEventListener("focus", function () {
	this.closest("label").classList.add("hovered");
});
// когда фокус уходит
checkBoxPolicy.addEventListener("blur", function () {
	this.closest("label").classList.remove("hovered");
});
