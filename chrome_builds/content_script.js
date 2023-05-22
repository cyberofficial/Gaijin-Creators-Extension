const urlParams = new URLSearchParams(window.location.search);
const partnerName = urlParams.get('partner');

const homeLink = document.querySelector('.nav__home');

if (homeLink) {
  const creatorsWrapper = document.createElement('div');
  creatorsWrapper.classList.add('nav__item');

  const modalBtn = document.createElement('button');
  modalBtn.classList.add('modal-btn');
  modalBtn.textContent = 'Support a Content Creator';
  creatorsWrapper.appendChild(modalBtn);

  if (partnerName) {
    const supportingText = document.createElement('span');
    supportingText.textContent = `Currently Supporting: ${partnerName}`;
    supportingText.style.marginLeft = '10px';
    creatorsWrapper.appendChild(supportingText);
  } else {
    modalBtn.classList.add('glowing');
  }

  const modalContainer = document.createElement('div');
  modalContainer.classList.add('modal-container');
  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');
  modalContainer.appendChild(modalContent);

  creators.forEach((creator) => {
    const link = document.createElement('a');
    // link.href = creator.url;
    // instead of creator.url we change to store.gaijin.net/creatorname
    link.href = `https://store.gaijin.net/${creator.name}`;
    link.classList.add('creator-link');

    // Add image element
    const img = document.createElement('img');
    img.src = creator.img_source;
    img.classList.add('creator-icon');
    link.appendChild(img);

    const nameSpan = document.createElement('span');
    const name = document.createTextNode(creator.name);
    nameSpan.appendChild(name);
    nameSpan.classList.add('creator-name');

    link.appendChild(nameSpan);

    modalContent.appendChild(link);
  });

  homeLink.parentNode.insertBefore(creatorsWrapper, homeLink.nextSibling);

  modalBtn.addEventListener("click", () => {
    modalContainer.style.display = modalContainer.style.display === "none" ? "block" : "none";
  });

  // Get the <body> element to append the modal
  document.body.appendChild(modalContainer);

  // Click anywhere outside of the modal to close it
  window.onclick = function(event) {
    if (event.target == modalContainer) {
      modalContainer.style.display = "none";
    }
  }
} else {
  console.log("Could not find .nav__home element");
}

// Modify the text in <div> element
const textElement = document.querySelector("body > div > div");
if (textElement) {
  textElement.textContent = "";
}

// Modify the image in <a> element
const imageElement = document.querySelector("body > div > a.error-page__logo");
if (imageElement) {
  const partnerNameFromURL = window.location.href.split('/').pop();
  const matchingCreator = creators.find((creator) =>
    creator.name.toLowerCase() === partnerNameFromURL.toLowerCase()
  );

  if (matchingCreator) {
    setTimeout(function() {
      window.stop();
    }, 2500);
    imageElement.innerHTML = ''; // Remove existing SVG content
    const img = document.createElement('img');
    img.src = matchingCreator.img_source;
    img.alt = "Decal Image";
    img.width = 250;
    img.height = 250;
    imageElement.appendChild(img);
    document.querySelector("body > div > div").remove();
    document.querySelector("body > div > h1").textContent = "Thank you for supporting: " + matchingCreator.name;
    // remove the refresh tag
    document.querySelector("head > meta:nth-child(7)").remove();
    // replace the text with click the Support Creator button to continue, or click "here" to go back to the store
    document.querySelector("body > div > p").textContent = "Click the Support Creator button to continue";
    // update the button document.querySelector("body > div > a.input-button.main__uppercase") to say Support Creator and change the href to the creator's url
    const supportCreatorButton = document.querySelector("body > div > a.input-button.main__uppercase");
    supportCreatorButton.textContent = "Support Creator";
    supportCreatorButton.href = matchingCreator.url;
    // change document title to say Supporting: Creator Name
    document.title = "Supporting: " + matchingCreator.name;
    // remove the href from document.querySelector("body > div > a.error-page__logo")
    document.querySelector("body > div > a.error-page__logo").href = "";
    // clone the button from /html/body/div/a[2] and append it to the end of the document and say return to the store make sure to have a new line after the button so they are not on the same line and dont look weird and squished together
    const returnToStoreButton = document.querySelector("body > div > a.input-button.main__uppercase").cloneNode(true);
    returnToStoreButton.textContent = "Return";
    returnToStoreButton.href = "https://store.gaijin.net/";
    document.querySelector("body > div").appendChild(returnToStoreButton);

  }
}
