// Function to remove duplicate tabs
function removeDuplicateTabs() {
  chrome.tabs.query({}, function (tabs) {
    const uniqueUrls = new Set();
    tabs.forEach(tab => {
      if (uniqueUrls.has(tab.url)) {
        chrome.tabs.remove(tab.id);
      } else {
        uniqueUrls.add(tab.url);
      }
    });
  });
}

// Function to group tabs by domain
function groupTabsByDomain() {
  chrome.tabs.query({}, function (tabs) {
    const domainGroups = {};

    tabs.forEach(tab => {
      const url = new URL(tab.url);
      const domain = url.hostname;

      if (!domainGroups[domain]) {
        domainGroups[domain] = [];
      }
      domainGroups[domain].push(tab);
    });

    Object.values(domainGroups).forEach(group => {
      const firstTab = group[0];
      const tabIds = group.map(tab => tab.id);

      // Group all tabs under the first tab
      chrome.tabs.group({ tabIds, createProperties: { windowId: firstTab.windowId } });
    });
  });
}

// Function to discard inactive tabs (Memory Optimization)
function optimizeMemoryUsage() {
  chrome.tabs.query({ discarded: false }, function (tabs) {
    tabs.forEach(tab => {
      // Discard tabs that have been inactive for over 5 minutes (300,000 ms)
      if (Date.now() - tab.lastAccessed > 300000) {
        chrome.tabs.discard(tab.id);
      }
    });
  });
}

// Function to rename a tab (Custom Tab Renaming)
function renameTab(tabId, newTitle) {
  chrome.scripting.executeScript({
    target: { tabId: tabId },
    func: (newTitle) => {
      document.title = newTitle;
    },
    args: [newTitle]
  });
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "removeDuplicates") {
    removeDuplicateTabs();
  } else if (message.action === "groupByDomain") {
    groupTabsByDomain();
  } else if (message.action === "optimizeMemory") {
    optimizeMemoryUsage();
  } else if (message.action === "renameTab") {
    renameTab(message.tabId, message.newTitle);
  }
});