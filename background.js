// Function to remove duplicate tabs
function removeDuplicateTabs() {
  chrome.tabs.query({}, function (tabs) {
    const uniqueUrls = new Set();
    tabs.forEach((tab) => {
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

    tabs.forEach((tab) => {
      const url = new URL(tab.url);
      const domain = url.hostname;

      if (!domainGroups[domain]) {
        domainGroups[domain] = [];
      }
      domainGroups[domain].push(tab);
    });

    Object.values(domainGroups).forEach((group) => {
      const firstTab = group[0];
      const tabIds = group.map((tab) => tab.id);

      // Group all tabs under the first tab
      chrome.tabs.group({
        tabIds,
        createProperties: { windowId: firstTab.windowId },
      });
    });
  });
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "removeDuplicates") {
    removeDuplicateTabs();
  } else if (message.action === "groupByDomain") {
    groupTabsByDomain();
  }
});
