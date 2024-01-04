// Function to update the popup with received jsonData
async function updatePopupWithData(jsonData) {
  const dataContainer = document.getElementById("data-container");
  for (const warning of jsonData.warnings) {
    // Create a bold element for the Warning Category
    const categoryElement = document.createElement("b");
    categoryElement.textContent = warning.category;

    // Use chrome.runtime.getURL to get the fully qualified URL for the icon
    const iconPath = `icons/${warning.icon_tag}.png`;
    const iconUrl = chrome.runtime.getURL(iconPath);

    try {
      // Check if the image file exists
      await fetch(iconUrl);

      // The image file exists, create an img element for the icon
      const iconElement = document.createElement("img");
      iconElement.src = iconUrl;
      iconElement.alt = `${warning.icon_tag} icon`;
      iconElement.className = "icon";

      // Create a paragraph element for the Warning Description
      const descriptionElement = document.createElement("p");
      descriptionElement.textContent = warning.description;

      // Append the icon and text to the data container
      dataContainer.appendChild(iconElement);
      dataContainer.appendChild(categoryElement);
      dataContainer.appendChild(descriptionElement);
    } catch (error) {
      // Check if the error is due to the file not being found
      if (
        error instanceof TypeError &&
        error.message.includes("Failed to fetch")
      ) {
        // If the file is not found, use a default icon
        const defaultIconUrl = chrome.runtime.getURL("icons/default.png");
        // Create an img element for the default icon
        const defaultIconElement = document.createElement("img");
        defaultIconElement.src = defaultIconUrl;
        defaultIconElement.alt = "Default icon";
        defaultIconElement.className = "icon";

        // Create a paragraph element for the Warning Description
        const descriptionElement = document.createElement("p");
        descriptionElement.textContent = warning.description;

        // Append the default icon and text to the data container
        dataContainer.appendChild(defaultIconElement);
        dataContainer.appendChild(categoryElement);
        dataContainer.appendChild(descriptionElement);
      } else {
        // Handle other fetch errors
        console.error(`Error checking for ${iconPath}:`, error);
      }
    }
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
