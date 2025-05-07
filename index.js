import { catsData } from "./data.js";

const emotionRadios = document.getElementById("emotion-radios");
const getImageBtn = document.getElementById("get-image-btn");
const gifsOnlyOption = document.getElementById("gifs-only-option");
const memeModal = document.getElementById("meme-modal");
const memeModalInner = document.getElementById("meme-modal-inner");

getImageBtn.addEventListener("click", renderCat);

emotionRadios.addEventListener("change", function (e) {
  const radios = document.getElementsByClassName("radio");
  for (let radio of radios) {
    radio.classList.remove("highlight");
  }
  const selectedElement = document.getElementById(e.target.id);
  const selectedParentEl = selectedElement.parentElement;
  selectedParentEl.classList.add("highlight");
});
function renderCat() {
  const catObject = getSingleCatObject();
  memeModalInner.innerHTML = `
  <img
  class="cat-img"
  src="./images/${catObject.image}"
  >
  `;
  memeModal.style.display = "flex";
}

function getSingleCatObject() {
  const catsArray = getMatchingCatsArray();
  if (catsArray.length === 1) {
    return catsArray[0];
  } else {
    const randomNumber = Math.floor(Math.random() * catsArray.length);
    return catsArray[randomNumber];
  }
}

function getMatchingCatsArray() {
  const isGif = gifsOnlyOption.checked;
  const selectedEmotion = document.querySelector(
    `input[type="radio"]:checked`
  ).value;
  const matchingCatsArray = catsData.filter(function (cat) {
    if (isGif) {
      return cat.emotionTags.includes(selectedEmotion) && cat.isGif;
    } else {
      return cat.emotionTags.includes(selectedEmotion);
    }
  });
  return matchingCatsArray;
}

function getEmotionsArray(cats) {
  const emotionsArray = [];
  for (let item of cats) {
    for (let emotion of item.emotionTags) {
      if (!emotionsArray.includes(emotion)) {
        emotionsArray.push(emotion);
      }
    }
  }
  return emotionsArray;
}

function renderEmotionRadios(cats) {
  const emotions = getEmotionsArray(cats);
  let radioItems = "";
  for (let emotion of emotions) {
    radioItems += `
    <div class="radio">
        <label for="${emotion}">${emotion}</label>
        <input 
            type="radio"
            id="${emotion}"
            value="${emotion}"
            name="emotions"
        >
    </div>
    `;
  }
  emotionRadios.innerHTML = radioItems;
}

renderEmotionRadios(catsData);
