// Function to update the popup with received jsonData
function updatePopupWithData(jsonData) {
  const dataContainer = document.getElementById("data-container");
  for (const warning of jsonData.warnings) {
    const categoryElement = document.createElement("b");
    categoryElement.textContent = warning.category;

    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = warning.description;

    dataContainer.appendChild(categoryElement);
    dataContainer.appendChild(descriptionElement);
  }
}

// Message listener to handle the received data
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "show_data") {
    console.log("Sending data to popup:", request.data);
    updatePopupWithData(request.data);
    return true;
  }
});

// Function to send a message to the content script to highlight words
function sendMessageToContentScript() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { message: "highlight_words" });
  });
}

// Event listener for the button click in the popup
document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector(".button");
  button.addEventListener("click", () => {
    sendMessageToContentScript();
  });
});

/////// new ////////////////////////////////////////////////////////////////////////////////////////////////////

// // Function to update the popup with received jsonData
// function updatePopupWithData(jsonData) {
//   const dataContainer = document.getElementById("data-container");
//   for (const warning of jsonData.warnings) {
//     const categoryElement = document.createElement("b");
//     categoryElement.textContent = warning.category;

//     const descriptionElement = document.createElement("p");
//     descriptionElement.textContent = warning.description;

//     dataContainer.appendChild(categoryElement);
//     dataContainer.appendChild(descriptionElement);
//   }

//   // Hide the loading bar and show the data container
//   const loadingBar = document.getElementById("loading-bar");
//   loadingBar.style.display = "none";
//   dataContainer.style.display = "block";
// }

// // Function to send a message to the content script to highlight words
// function sendMessageToContentScript() {
//   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//     const activeTab = tabs[0];
//     chrome.tabs.sendMessage(activeTab.id, { message: "highlight_words" });
//   });
// }

// // Event listener for the button click in the popup
// document.addEventListener("DOMContentLoaded", () => {
//   const button = document.querySelector(".button");
//   button.addEventListener("click", () => {
//     // Hide the button and show the loading bar
//     button.style.display = "none";
//     const loadingBar = document.getElementById("loading-bar");
//     loadingBar.style.display = "block";

//     // Send a message to the content script to start processing
//     sendMessageToContentScript();
//   });
// });
