# Tab Manager Extension

A Chrome extension designed to improve tab management by removing duplicate tabs and grouping tabs by domain. The extension features a sleek, Discord-themed interface for a modern and intuitive user experience.

## Features
- **Remove Duplicate Tabs:** Automatically closes duplicate browser tabs, helping to declutter your workspace.
- **Group Tabs by Domain:** Organizes tabs by their domain, grouping them together for easier navigation.
- **User-Friendly Interface:** A simple, minimal popup with Discord-inspired styling, offering clear and accessible controls for tab management.

## Installation
1. Clone or download this repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer Mode** in the top right corner.
4. Click **Load unpacked** and select the folder where the project is saved.
5. The extension will be added to Chrome.

## Usage
1. Click on the extension icon in the Chrome toolbar.
2. Use the popup to:
   - Remove duplicate tabs by clicking **Remove**.
   - Group tabs by domain by clicking **Group**.

## Project Structure
```
.
├── background.js       # Handles the logic for removing duplicates and grouping tabs by domain
├── manifest.json       # Extension manifest file with necessary permissions and metadata
├── popup.html          # HTML for the popup UI
├── popup.js            # JavaScript for handling user interactions in the popup
└── icons/              # Icons used for the popup buttons
```

## Author
**Astitva Pratap Singh Tomar**

Linkedin - https://www.linkedin.com/in/astitva-pratap-singh-tomar/
Instagram - https://www.instagram.com/tomar_astitva/

## Technologies Used
- **Manifest Version 3**
- **JavaScript**
- **HTML / CSS**
- **Chrome Tabs API**

## License
This project is licensed under the MIT License.
