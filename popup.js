// Send message to background script to remove duplicate tabs
document.getElementById("removeDuplicatesBtn").addEventListener("click", function () {
    chrome.runtime.sendMessage({ action: "removeDuplicates" });
  });
  
  // Send message to background script to group tabs by domain
  document.getElementById("groupByDomainBtn").addEventListener("click", function () {
    chrome.runtime.sendMessage({ action: "groupByDomain" });
  });