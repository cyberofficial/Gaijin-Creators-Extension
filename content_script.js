const urlParams = new URLSearchParams(window.location.search);
const partnerName = urlParams.get('partner');

const homeLink = document.querySelector('.nav__home');
const creatorsWrapper = document.createElement('div');
creatorsWrapper.classList.add('nav__item');

const dropdownBtn = document.createElement('button');
dropdownBtn.classList.add('dropdown-btn');
dropdownBtn.textContent = 'Support a Content Creator';
creatorsWrapper.appendChild(dropdownBtn);


if (partnerName) {
  const supportingText = document.createElement('span');
  supportingText.textContent = `Currently Supporting: ${partnerName}`;
  supportingText.style.marginLeft = '10px';
  creatorsWrapper.appendChild(supportingText);
} else {
    dropdownBtn.classList.add('glowing');
  }

const creatorsDropdownContainer = document.createElement('div');
creatorsDropdownContainer.classList.add('dropdown-container');
creatorsWrapper.appendChild(creatorsDropdownContainer);

creators.forEach((creator) => {
  const link = document.createElement('a');
  link.href = creator.url;

  // Add image element
  const img = document.createElement('img');
  img.src = creator.img_source;
  img.classList.add('creator-icon');
  link.appendChild(img);

  const name = document.createTextNode(creator.name);
  link.appendChild(name);

  creatorsDropdownContainer.appendChild(link);
});

  
  

homeLink.parentNode.insertBefore(creatorsWrapper, homeLink.nextSibling);

dropdownBtn.addEventListener("click", () => {
  creatorsDropdownContainer.style.display = creatorsDropdownContainer.style.display === "block" ? "none" : "block";
});