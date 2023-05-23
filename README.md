# Gaijin Content Creators Dropdown

![Extension Banner](IMAGE_URL)


### Known Issues
* The store page had extra protections enabled, if you encounter problems like cloudflare freezing or not working, disable extension, refresh page, then reneable then refresh again.

Gaijin Content Creators Dropdown is a browser extension for Google Chrome, Firefox, Microsoft Edge, and Opera that adds a Content Creators dropdown to the Gaijin Store page. It allows users to support their favorite content creators directly from the store page.

## Code Quality:
[![CodeQL](https://github.com/cyberofficial/Gaijin-Creators-Extension/actions/workflows/codeql.yml/badge.svg)](https://github.com/cyberofficial/Gaijin-Creators-Extension/actions/workflows/codeql.yml)

## Store Links
[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/gpogdmpopibagcdlgbomfbbnjjfmmmnf.svg?label=Chrome%20Web%20Store&style=for-the-badge)](https://chrome.google.com/webstore/detail/gaijin-content-creators-d/gpogdmpopibagcdlgbomfbbnjjfmmmnf?hl=en&authuser=0) [![Firefox Add-ons](https://img.shields.io/amo/v/gaijin-cc-store-button.svg?label=Firefox%20Add-ons&style=for-the-badge)](https://addons.mozilla.org/en-US/firefox/addon/gaijin-cc-store-button/)

## Features

- Adds a "Support a Content Creator" button to the Gaijin Store page.
- Displays the name of the content creator currently being supported.
- Provides a dropdown menu to select and support different content creators.

**Reminder:** The Gaijin Store automatically locks the selected content creator for 1 hour, after which users can support another creator.

## Installation

### Google Chrome

1. [Install from the Chrome Web Store](https://chrome.google.com/webstore/detail/gaijin-content-creators-d/gpogdmpopibagcdlgbomfbbnjjfmmmnf?hl=en&authuser=0) or load the extension locally:
    1. Download the extension files from the repository.
    2. Open the Chrome browser, and navigate to `chrome://extensions`.
    3. Enable "Developer mode" by toggling the switch in the top right corner.
    4. Click "Load unpacked" and select the folder containing the extension files.

### Firefox

1. [Install from Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/gaijin-cc-store-button/) or load the extension locally:
    1. Download the extension files from the repository.
    2. Open the Firefox browser, and navigate to `about:debugging`.
    3. Click "This Firefox" and then "Load Temporary Add-on".
    4. Select the `manifest.json` file within the folder containing the extension files inside the `firefox_builds` folder.

### Microsoft Edge

1. Download the extension files from the repository.
2. Open the Microsoft Edge browser, and navigate to `edge://extensions`.
3. Enable "Developer mode" by toggling the switch in the bottom left corner.
4. Click "Load unpacked" and select the folder containing the extension files.

### Opera

1. Download the extension files from the repository.
2. Open the Opera browser, and navigate to `opera://extensions`.
3. Enable "Developer mode" by toggling the switch in the top right corner.
4. Click "Load unpacked" and select the folder containing the extension files.

## Files

- `content_script.js`: Main script for adding the dropdown and handling user interactions.
- `manifest.json`: Extension manifest file for Google Chrome, Firefox, Microsoft Edge, and Opera.
- `creators.js`: A separate script file containing the list of content creators.
- `style.css`: CSS file for styling the dropdown menu and other elements.

## License

This project is licensed under the Custom Open Source License (COSL) v1.0. For more information, see the [LICENSE](LICENSE.md) file.
