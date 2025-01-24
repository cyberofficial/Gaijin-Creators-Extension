if (!document.documentElement.innerHTML.includes("Cloudflare")) {
  // Retrieve partner name from URL query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const partnerName = urlParams.get('partner')?.replace(/%20/g, ' ');

  // Function to add partner name to all links
  function addPartnerNameToLinks(partnerName) {
      const links = document.querySelectorAll('a');
      links.forEach((link) => {
          const url = new URL(link.href);
          url.searchParams.set('partner', partnerName);
          link.href = url.toString();
      });
  }

  if (partnerName) {
      addPartnerNameToLinks(partnerName);
  }

  // Find the home link on the page
  const homeLink = document.querySelector('.nav__home');

  if (homeLink) {
      // Create a wrapper div for content creators section
      const creatorsWrapper = document.createElement('div');
      creatorsWrapper.classList.add('nav__item');

      // Create a button to open the modal
      const modalBtn = document.createElement('button');
      modalBtn.classList.add('modal-btn');
      modalBtn.textContent = 'Support a Content Creator';
      modalBtn.style.backgroundColor = '#4CAF50';
      modalBtn.style.color = '#fff';
      modalBtn.style.padding = '10px 20px';
      modalBtn.style.border = 'none';
      modalBtn.style.borderRadius = '5px';
      modalBtn.style.cursor = 'pointer';
      modalBtn.addEventListener('mouseover', () => {
        modalBtn.style.backgroundColor = '#45a049';
      });
      modalBtn.addEventListener('mouseout', () => {
        modalBtn.style.backgroundColor = '#4CAF50';
      });
      creatorsWrapper.appendChild(modalBtn);

      // If a partner name exists, display supporting text inside the button
      if (partnerName) {
          modalBtn.textContent = `Currently Supporting: ${partnerName}`;

          // Add mini decal image under the partner name
          const matchingCreator = creators.find((creator) =>
              creator.name.toLowerCase() === partnerName.toLowerCase()
          );
          if (matchingCreator) {
              const decalContainer = document.querySelector("#bodyRoot > div.content > section.section.shop.js-analytics > div.shop__aside > div > div.shop__buy.shop-buy > div.shop-buy__wrapper > table:nth-child(9) > tbody > tr > td > div");
              if (decalContainer) {
                  const decalDetails = document.createElement('div');
                  decalDetails.classList.add('shop-buy__details');
                  decalDetails.innerHTML = `
                      <ul>
                          <li></li>
                      </ul>
                  `;
                  decalContainer.appendChild(decalDetails);

                  // Add image element for creator decal
                  const decalImg = document.createElement('img');
                  decalImg.src = matchingCreator.img_source;
                  decalImg.alt = `${matchingCreator.name} decal`;
                  decalImg.style.width = '100px'; // Adjust size as needed
                  decalImg.style.marginTop = '10px';
                  decalContainer.appendChild(decalImg);
              }
          }
      } else {
          // Add glowing effect to the button if no partner name
          modalBtn.classList.add('glowing');
      }

      // Create modal container and content elements
      const modalContainer = document.createElement('div');
      modalContainer.classList.add('modal-container');
      const modalContent = document.createElement('div');
      modalContent.classList.add('modal-content');
      modalContainer.appendChild(modalContent);

      // Iterate over creators and create links for each
      creators.forEach((creator) => {
          const link = document.createElement('a');
          link.href = `https://store.gaijin.net/${creator.name.replace(/ /g, '%20')}`;
          link.classList.add('creator-link');

          // Add image element for creator
          const img = document.createElement('img');
          img.src = creator.img_source;
          img.classList.add('creator-icon');
          link.appendChild(img);

          // Add span element for creator name
          const nameSpan = document.createElement('span');
          const name = document.createTextNode(creator.name);
          nameSpan.appendChild(name);
          nameSpan.classList.add('creator-name');

          link.appendChild(nameSpan);

          modalContent.appendChild(link);
      });

      // Insert the content creators section after the home link
      homeLink.parentNode.insertBefore(creatorsWrapper, homeLink.nextSibling);

      // Open the modal when the button is clicked
      modalBtn.addEventListener('click', () => {
          modalContainer.style.display = 'block';
      });

      // Append the modal container to the body
      document.body.appendChild(modalContainer);

      // Close the modal when clicking outside of it
      window.onclick = function(event) {
          if (event.target == modalContainer) {
              modalContainer.style.display = 'none';
          }
      }

      // Function to trigger shoot-up animation and redirect
      function shootUpAnimationAndRedirect(url) {
          const modalContainerElement = document.querySelector('.modal-container');
          modalContainerElement.style.animation = 'shootUp 0.5s';

          setTimeout(() => {
              modalContainerElement.style.animation = '';
              window.location.href = url;
          }, 500);
      }

      // Attach click event listeners to creator images and names
      const creatorLinks = document.querySelectorAll('.creator-link');
      creatorLinks.forEach((creatorLink) => {
          const creatorImage = creatorLink.querySelector('.creator-icon');
          const creatorName = creatorLink.querySelector('.creator-name');
          const creatorUrl = creatorLink.href;

          creatorImage.addEventListener('click', (event) => {
              event.preventDefault();
              shootUpAnimationAndRedirect(creatorUrl);
          });

          creatorName.addEventListener('click', (event) => {
              event.preventDefault();
              shootUpAnimationAndRedirect(creatorUrl);
          });
      });

  } else {
      console.log('Could not find .nav__home element');
  }

  // Modify the text in <div> element
  const textElement = document.querySelector('body > div > div');
  if (textElement) {
      textElement.textContent = '';
  }

  // Modify the report issue button link
  const reportIssueButton = document.querySelector("#bodyRoot > div.modal-container > div > a:nth-child(1)");
  if (reportIssueButton) {
      reportIssueButton.href = "https://github.com/cyberofficial/Gaijin-Creators-Extension/issues";
  }

  // Modify other button links
  const emptyButton = document.querySelector("#bodyRoot > div.modal-container > div > a:nth-child(62)");
  if (emptyButton) {
      emptyButton.href = "";
  }

  const emptyButton2 = document.querySelector("#bodyRoot > div.modal-container > div > a:nth-child(2)");
  if (emptyButton2) {
      emptyButton2.href = "";
  }

  // Check if the current URL starts with 'https://store.gaijin.net/story.php' and no partnerName
  if (window.location.href.startsWith('https://store.gaijin.net/story.php') && !partnerName) {
    // Check if document.querySelector("#bodyRoot > div.content > section.section.shop.js-analytics > div.shop__aside > div > div.shop__buy.shop-buy > div > div:nth-child(5)") doesnt exist
    if (!document.querySelector("#bodyRoot > div.content > section.section.shop.js-analytics > div.shop__aside > div > div.shop__buy.shop-buy > div > div:nth-child(5)")) {
        // create an alert box saying "Remember to support a creator!"
        alert("Remember to support a creator!");    
        const CheckoutReminder = document.querySelector("#buy-popup > div.popup__content-overflow > div > div.popup__content.popup-buy > form > div.popup-buy__title");

        if (CheckoutReminder) {
            if (partnerName) {
                CheckoutReminder.textContent = `Supporting: ${partnerName}`;
                const matchingCreator = creators.find((creator) => 
                    creator.name.toLowerCase() === partnerName.toLowerCase()
                );
                if (matchingCreator) {
                    const partnerImg = document.createElement('img');
                    partnerImg.src = matchingCreator.img_source;
                    partnerImg.alt = `${matchingCreator.name} decal`;
                    partnerImg.style.width = '50px';
                    partnerImg.style.marginLeft = '10px';
                    CheckoutReminder.appendChild(partnerImg);
                }
            } else {
                CheckoutReminder.textContent = "Remember to support a creator!";
            }
        }
    }
  }

  // Modify the image in <a> element
  const imageElement = document.querySelector('body > div > a.error-page__logo');
  if (imageElement) {
      // Retrieve partner name from the URL
      const partnerNameFromURL = decodeURIComponent(window.location.href.split('/').pop().replace(/%20/g, ' '));
      // Find the matching creator based on partner name
      const matchingCreator = creators.find((creator) =>
          creator.name.toLowerCase() === partnerNameFromURL.toLowerCase()
      );

      if (matchingCreator) {
          // if the page title is 404 then use this code setTimeout(function () {window.stop();}, 2900);
          // Check if the page title contains "404"
          if (document.title.includes("404")) {
              // Set a timeout of 2900 milliseconds (2.9 seconds)
              setTimeout(function() {
                  // Stop the page from loading
                  window.stop();
              }, 2900);
          }


          // Replace the SVG content with the creator's image
          imageElement.innerHTML = '';
          const img = document.createElement('img');
          img.src = matchingCreator.img_source;
          img.alt = 'Decal Image';
          //img.width = 250;
          img.height = 250;
          imageElement.appendChild(img);

          // Remove unnecessary elements and modify text
          document.querySelector('body > div > div').remove();
          document.querySelector('body > div > h1').textContent = 'Thank you for supporting: ' + matchingCreator.name;
          document.querySelector("head > meta:nth-child(7)").remove();
          document.querySelector('body > div > p').textContent = 'Click the Support Creator button to continue';

          // Modify the support creator button
          const supportCreatorButton = document.querySelector('body > div > a.input-button.main__uppercase');
          supportCreatorButton.textContent = 'Support Creator';
          supportCreatorButton.href = matchingCreator.url;

          // Modify document title
          document.title = 'Supporting: ' + matchingCreator.name;

          // Remove href from the Gaijin logo
          document.querySelector('body > div > a.error-page__logo').href = '';

          // Clone the button to return to the store
          const returnToStoreButton = document.querySelector('body > div > a.input-button.main__uppercase').cloneNode(true);
          returnToStoreButton.textContent = 'Return';
          returnToStoreButton.href = 'https://store.gaijin.net/';
          document.querySelector('body > div').appendChild(returnToStoreButton);

          // Add fancy styles and animations
          document.querySelector('body > div').style.textAlign = 'center';
          document.querySelector('body > div').style.fontFamily = 'Arial, sans-serif';
          document.querySelector('body > div > h1').style.color = '#4CAF50';
          document.querySelector('body > div > h1').style.fontSize = '2em';
          document.querySelector('body > div > p').style.fontSize = '1.2em';
          document.querySelector('body > div > p').style.marginTop = '20px';
          document.querySelector('body > div > a.input-button.main__uppercase').style.margin = '10px';
          document.querySelector('body > div > a.input-button.main__uppercase').style.padding = '10px 20px';
          document.querySelector('body > div > a.input-button.main__uppercase').style.borderRadius = '5px';
          document.querySelector('body > div > a.input-button.main__uppercase').style.backgroundColor = '#4CAF50';
          document.querySelector('body > div > a.input-button.main__uppercase').style.color = '#fff';
          document.querySelector('body > div > a.input-button.main__uppercase').style.textDecoration = 'none';
          document.querySelector('body > div > a.input-button.main__uppercase').style.transition = 'background-color 0.3s';

          document.querySelector('body > div > a.input-button.main__uppercase').addEventListener('mouseover', function() {
              this.style.backgroundColor = '#45a049';
          });

          document.querySelector('body > div > a.input-button.main__uppercase').addEventListener('mouseout', function() {
              this.style.backgroundColor = '#4CAF50';
          });

          // Add fade-in animation
          document.querySelector('body > div').style.animation = 'fadeIn 1s';

          // Add keyframes for fade-in animation
          const styleSheet = document.styleSheets[0];
          styleSheet.insertRule(`
              @keyframes fadeIn {
                  from { opacity: 0; }
                  to { opacity: 1; }
              }
          `, styleSheet.cssRules.length);
      }
  }
} else {
  console.log("Cloudflare detected. The script for Gaijin Creators was not executed.");
}