# Gaijin Content Creators Dropdown

Gaijin Content Creators Dropdown is a browser extension for Google Chrome and Firefox that adds a Content Creators dropdown to the Gaijin Store page. It allows users to support their favorite content creators directly from the store page.

## Features

- Adds a "Support a Content Creator" button to the Gaijin Store page.
- Displays the name of the content creator currently being supported.
- Provides a dropdown menu to select and support different content creators.

## Installation

### Google Chrome

1. Download the extension files from the repository.
2. Open the Chrome browser, and navigate to `chrome://extensions`.
3. Enable "Developer mode" by toggling the switch in the top right corner.
4. Click "Load unpacked" and select the folder containing the extension files.

### Firefox

1. Download the extension files from the repository.
2. Open the Firefox browser, and navigate to `about:debugging`.
3. Click "This Firefox" and then "Load Temporary Add-on".
4. Select the `manifest.json` file within the folder containing the extension files.

## Files

- `content_script.js`: Main script for adding the dropdown and handling user interactions.
- `manifest.json`: Extension manifest file for both Google Chrome and Firefox.
- `creators.js`: A separate script file containing the list of content creators.
- `style.css`: CSS file for styling the dropdown menu and other elements.

## License

This project is licensed under the Custom Open Source License (COSL) v1.0. For more information, see the [LICENSE](LICENSE) file.
