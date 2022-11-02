const ELEMENT_CLASSES = {
  SEARCH_INPUT: '.search-input',
  SEARCH_ICON: '.search-icon',
  IMAGE: 'image',
  MAIN: 'main',
};

const OTHER_VARIABLES = {
  IMAGE_COUNT: 20, //максимум 30
  ENTER_KEY_EVENT: 13,
};

const searchInput = document.querySelector(ELEMENT_CLASSES.SEARCH_INPUT);
const searchIcon = document.querySelector(ELEMENT_CLASSES.SEARCH_ICON);
const mainImagesBlock = document.querySelector(ELEMENT_CLASSES.MAIN);

const getImages = async () => {
  const url = `https://api.unsplash.com/search/photos?query=${searchInput.value}&per_page=${OTHER_VARIABLES.IMAGE_COUNT}&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo`;

  try {
    const response = await fetch(url);
    const result = await response.json();

    for (let i = 0; i < OTHER_VARIABLES.IMAGE_COUNT; i++) {
      const elem = document.createElement('img');

      elem.src = result.results[i].urls.regular;

      elem.className = ELEMENT_CLASSES.IMAGE;

      mainImagesBlock.append(elem);
    }
  } catch (error) {
    alert(error);
  }
};

searchIcon.addEventListener('click', () => {
  if (!searchInput.value) {
    alert('type something for search');

    return;
  }

  mainImagesBlock.replaceChildren();

  getImages();
});

searchInput.addEventListener('keypress', function (event) {
  if (event.keyCode === OTHER_VARIABLES.ENTER_KEY_EVENT) {
    searchIcon.click();
  }
});
