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
  // Try multiple selectors since the Gaijin store page was redesigned
  const homeLink = document.querySelector('.nav__home')          // legacy selector
    || document.querySelector('.nav__standalone-link')            // current store layout
    || document.querySelector('.nav__right')                     // fallback
    || document.querySelector('nav.nav');                        // final fallback

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
                  decalImg.src = chrome.runtime.getURL(matchingCreator.img_source);
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
          link.href = creator.url
            ? `https://store.gaijin.net/${encodeURIComponent(creator.name)}`
            : `https://store.gaijin.net/`;
          link.classList.add('creator-link');

          // Add image element for creator
          const img = document.createElement('img');
          img.src = chrome.runtime.getURL(creator.img_source);
          img.classList.add('creator-icon');
          link.appendChild(img);

          // Add span element for creator name
          const nameSpan = document.createElement('span');
          const name = document.createTextNode(creator.name);
          nameSpan.appendChild(name);
          nameSpan.classList.add('creator-name');

          link.appendChild(nameSpan);

          // add CODE badge for code items
          if (creator.code) {
            const badge = document.createElement('span');
            badge.textContent = 'CODE';
            badge.style.cssText = 'display:inline-block;font-size:9px;color:#000;background:#ffd700;padding:1px 5px;border-radius:3px;margin-left:4px;font-weight:bold;vertical-align:middle';
            nameSpan.appendChild(badge);
          }
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

      
      // ---- Code popup modal ----
      const codePopup = document.createElement('div');
      codePopup.id = 'code-popup';
      codePopup.style.cssText = 'display:none;position:fixed;z-index:10000;left:0;top:0;width:100%;height:100%;background:rgba(0,0,0,0.6)';
      const popupInner = document.createElement('div');
      popupInner.style.cssText = 'background:#1a1a2e;margin:15% auto;padding:25px;width:360px;border-radius:10px;text-align:center;border:2px solid #ffd700';
      popupInner.innerHTML = '<h3 style="color:#ffd700;margin:0 0 15px">Activation Code</h3><p id="code-popup-text" style="color:#fff;font-size:20px;font-family:monospace;background:#000;padding:10px;border-radius:5px;margin:0 0 15px;user-select:all"></p><button id="code-popup-copy" style="background:#4CAF50;color:#fff;padding:10px 20px;border:none;border-radius:5px;cursor:pointer;margin-right:8px">Copy Code</button><button id="code-popup-activate" style="background:#ffd700;color:#000;padding:10px 20px;border:none;border-radius:5px;cursor:pointer;margin-right:8px;font-weight:bold">Activate</button><button id="code-popup-close" style="background:#555;color:#fff;padding:10px 20px;border:none;border-radius:5px;cursor:pointer">Close</button>';
      codePopup.appendChild(popupInner);
      document.body.appendChild(codePopup);
      codePopup.addEventListener('click', function(e) { if (e.target === codePopup) codePopup.style.display = 'none'; });
      // Attach click event listeners to creator images and names
      const creatorLinks = document.querySelectorAll('.creator-link');
      creatorLinks.forEach((creatorLink, idx) => {
          const creatorImage = creatorLink.querySelector('.creator-icon');
          const creatorName = creatorLink.querySelector('.creator-name');
          const creatorUrl = creatorLink.href;
          const cData = creators[idx];

          creatorImage.addEventListener('click', (event) => {
              event.preventDefault();
              (cData && cData.code ? (function(){ document.getElementById('code-popup-text').textContent = cData.code; codePopup.style.display = 'block'; })() : shootUpAnimationAndRedirect(creatorUrl))
          });

          creatorName.addEventListener('click', (event) => {
              event.preventDefault();
              (cData && cData.code ? (function(){ document.getElementById('code-popup-text').textContent = cData.code; codePopup.style.display = 'block'; })() : shootUpAnimationAndRedirect(creatorUrl))
          });
      });

      // Code popup button handlers
      document.getElementById('code-popup-copy').addEventListener('click', function() {
          var c = document.getElementById('code-popup-text').textContent;
          navigator.clipboard.writeText(c).then(function() {
              document.getElementById('code-popup-copy').textContent = 'Copied!';
              setTimeout(function() { document.getElementById('code-popup-copy').textContent = 'Copy Code'; }, 2000);
          });
      });
      document.getElementById('code-popup-activate').addEventListener('click', function() {
          window.open('https://store.gaijin.net/activate.php', '_blank');
          codePopup.style.display = 'none';
      });
      document.getElementById('code-popup-close').addEventListener('click', function() {
          codePopup.style.display = 'none';
      });

  } else {
      console.log('Could not find nav anchor element — store page may have changed');
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
                    partnerImg.src = chrome.runtime.getURL(matchingCreator.img_source);
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
          img.src = chrome.runtime.getURL(matchingCreator.img_source);
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