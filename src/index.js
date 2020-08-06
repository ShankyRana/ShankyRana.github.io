const colors = {
  "pink": {
    "r": 218,
    "g": 62,
    "b": 140,
    "a": 1
  },
  "blue": {
    "r": 69,
    "g": 177,
    "b": 228,
    "a": 1
  },
  "yellow": {
    "r": 250,
    "g": 209,
    "b": 73,
    "a": 1
  }
};


/****************************************************************
 ******************** Uploader functions ************************
 ***************************************************************/


/**
 * changes button text and adds logo DOM
 * @param src image source 
 * @param buttonText button text
 */
function handleButtonAndLogo(src, buttonText) {
  const uploadButtonText = document.getElementById("umbrella-modifier-button-text");
  const uploadButtonClose = document.getElementById("umbrella-modifier-button-close");
  const umbrellaLogo = document.getElementById("umbrella-logo");

  uploadButtonText.textContent = buttonText;
  uploadButtonClose.style.display = src ? "inline-block" : "none";

  umbrellaLogo.setAttribute("src", src);

  handleLoading(false);
}

/**
 * reads and updates logo in DOM
 */
function updateLogo() {

  if (this.files && this.files.length) {
    handleLoading(true);

    const file = this.files[0];
    const uploadError = document.getElementById("umbrella-modifier-error");

    if (file && file.size < 5000000) {
      uploadError.textContent = "";

      const reader = new FileReader();

      reader.addEventListener("load", function () {
        handleButtonAndLogo(this.result, file.name);
      });

      reader.readAsDataURL(file);

    } else {
      if (file.size > 3000000) {
        uploadError.textContent = "File size exceeds 5MB";
      }
      handleLoading(false);
    }
  }

  this.value = '';

}

/**
 * removes logo from DOM
 */
function clearLogo() {
  handleLoading(true);
  handleButtonAndLogo("", "Upload Logo");
}

/**
 * updates background, button, swatch and loader color
 */
function updateColor() {
  handleLoading(true);

  const clickedSwatch = window.event.target.id;

  if (clickedSwatch) {
    const umbrellaLoader = document.getElementById("umbrella-loader");
    const uploadButton = document.getElementById("umbrella-modifier-button");

    const selectedColor = colors[clickedSwatch];

    umbrellaLoader.setAttribute("class", clickedSwatch);

    document.body.style.background = `rgba(${selectedColor.r}, ${selectedColor.g}, ${selectedColor.b}, 0.15)`;
    uploadButton.style.background = `rgba(${selectedColor.r}, ${selectedColor.g}, ${selectedColor.b}, ${selectedColor.a})`;

    Object.keys(colors).forEach(color => {
      const colorSwatch = document.getElementById(color);

      if (clickedSwatch === color) {
        colorSwatch.classList.add("selected");
      } else {
        colorSwatch.classList.remove("selected");
      }
    });

    updateImage(clickedSwatch);
  }

  handleLoading(false);
}

/**
 * updates image according to color in DOM
 * @param color user selected color
 */
function updateImage(color) {
  const umbrella = document.getElementById("umbrella-image");

  switch (color) {
    case "pink":
      umbrella.setAttribute("src", "public/Pink umbrella.png");
      break;
    case "blue":
      umbrella.setAttribute("src", "public/Blue umbrella.png");
      break;
    case "yellow":
      umbrella.setAttribute("src", "public/Yello umbrella.png");
      break;
    default:
      umbrella.setAttribute("src", "public/Blue umbrella.png");
  }
}

/**
 * handles loading
 */
async function handleLoading(loading) {

  const umbrellaLoader = document.getElementById("umbrella-loader");
  const uploadButtonLoader = document.getElementById("umbrella-modifier-button-loader");
  const uploadButtonIcon = document.getElementById("umbrella-modifier-button-icon");
  const umbrella = document.getElementById("umbrella-image");
  const umbrellaLogo = document.getElementById("umbrella-logo");

  if (loading) {
    umbrella.classList.add("hide");
    umbrellaLoader.style.display = "block";
    umbrellaLogo.style.display = "none";
    uploadButtonIcon.style.display = "none";
    uploadButtonLoader.style.display = "block";
  } else {

    await (() => new Promise(res => setTimeout(res, 2000)))(); //intentional delay added for loaders visibility

    umbrella.classList.remove("hide");
    umbrellaLoader.style.display = "none";
    umbrellaLogo.style.display = umbrellaLogo.getAttribute("src") ? "block" : "none";
    uploadButtonIcon.style.display = "block";
    uploadButtonLoader.style.display = "none";
  }
}

/****************************************************************
 *********************** Startup funtion ************************
 ***************************************************************/


/**
 * adds a change event listner file upload button
 */
(function startup() {
  const uploadButtonInput = document.getElementById("umbrella-modifier-button-input");

  uploadButtonInput.addEventListener("change", updateLogo);
})();