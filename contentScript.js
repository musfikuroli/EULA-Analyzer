let jsonData = {};

// let jsonData = {
//   warnings: [
//     {
//       warning_number: 1,
//       category: "Online Services",
//       icon_tag: "third-party-services",
//       description:
//         "This Product requires an internet connection and may have online services and features that collect and store data about you. Make sure to review the privacy policy for more information on how your data is used and protected.",
//     },
//     {
//       warning_number: 2,
//       category: "Data Collection",
//       icon_tag: "data-collection",
//       description:
//         "Ubisoft may collect and store data about you in relation to your use of the Product, such as your connection information and compatible device data. Your privacy is important to Ubisoft, but be cautious and review their privacy policy to understand how your data is handled.",
//     },
//     {
//       warning_number: 3,
//       category: "Third-party Analytics",
//       icon_tag: "data-usage-analytics",
//       description:
//         "Ubisoft uses third-party analytics tools to collect information about your gaming habits and use of the Product. This may include personal data such as your device identifiers and settings, game scores, and feature usage. Make sure you review their privacy policy for more details.",
//     },
//     {
//       warning_number: 4,
//       category: "Targeted Advertising",
//       icon_tag: "behavioral-advertising",
//       description:
//         "The Product may display advertisements and collect information for targeted advertising purposes. This may include data such as your age, gender, and the ads you interact with. Read Ubisoft's privacy policy to understand how this information is used and how to opt-out.",
//     },
//     {
//       warning_number: 5,
//       category: "Unauthorized Program Detection",
//       icon_tag: "access-control",
//       description:
//         "The Product may monitor your hardware for unauthorized third-party programs. If detected, information about the program and your account may be sent to Ubisoft. Your access to the Product may be terminated based on the detection results.",
//     },
//   ],
// };

// let jsonData = {
//   eula_severity_rating: [
//     {
//       overall_severity_of_the_eula: "Low",
//       severity_safety_rating: "80%",
//     },
//   ],
//   warnings: [
//     {
//       warning_number: 1,
//       category: "Third-party Sharing",
//       icon_tag: "third-party-sharing",
//       severity_indicator: "red",
//       description:
//         "This application shares user data with third-party entities. Understand the purposes of such sharing, the entities involved, and review the privacy policy to ensure your data is handled responsibly and securely.",
//     },
//     {
//       warning_number: 2,
//       category: "Data Usage Analytics",
//       icon_tag: "data-usage-analytics",
//       severity_indicator: "yellow",
//       description:
//         "The application collects and analyzes user data for the purpose of improving its products and services. Review the privacy policy to understand the types of data collected and how it is used.",
//     },
//     {
//       warning_number: 3,
//       category: "Personal Data Access",
//       icon_tag: "personal-data-access",
//       severity_indicator: "red",
//       description:
//         "This application has the capability to access a wide range of personal data, including images, SMS messages, and other sensitive information stored on the device. Exercise caution and review the privacy settings before granting access.",
//     },
//     {
//       warning_number: 4,
//       category: "Terms of Service",
//       icon_tag: "terms-of-service",
//       severity_indicator: "green",
//       description:
//         "By installing or using the Product, you agree to abide by the terms of service set forth by the developer. Review the terms of service to understand your rights and responsibilities while using the application.",
//     },
//   ],
// };

//#####---Function to Extract All Text Content from The Page---#####--------------------------------------------------------------------

function extractAllText() {
  const allText = [];

  // Function to check if an element is visible to the user
  function isVisible(element) {
    const style = getComputedStyle(element);
    return style.display !== "none" && style.visibility !== "hidden";
  }

  // Traverse all text nodes in the DOM tree and collect their visible text content
  function traverse(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      // Check if the parent element is visible
      if (node.parentElement && isVisible(node.parentElement)) {
        allText.push(node.textContent);
      }
    } else if (node.nodeType === Node.ELEMENT_NODE && isVisible(node)) {
      // If it's not a text node, recursively traverse its child nodes
      for (const childNode of node.childNodes) {
        traverse(childNode);
      }
    }
  }

  // Start traversal from the <body> element
  traverse(document.body);

  // Combine all collected visible text into a single string
  return allText.join(" ");
}
//---------------------------------------------------Ending---of---Function---------------------------------------------------------------------------
//
//
//
//
//#####---Function to Fetch and Parse The Privacy Sensitive Words List File [Hard-Coded]---#####------------------------------------------------------
async function fetchWordList() {
  try {
    // Hardcoded wordlist
    const privacySensitiveWordslist = [
      "access",
      "aggregate",
      "connect",
      "consolidate",
      "disclose",
      "display",
      "maintain",
      "mare",
      "investigate",
      "post",
      "reserve",
      "review",
      "allow",
      "contact",
      "enforce",
      "maximize",
      "prevent",
      "share",
      "apply",
      "contract",
      "ensure",
      "minimize",
      "prohibit",
      "specify",
      "avoid",
      "customize",
      "exchange",
      "monitor",
      "protect",
      "store",
      "block",
      "deny",
      "help",
      "notify",
      "provide",
      "update",
      "change",
      "destroy",
      "honor",
      "obligate",
      "recommend",
      "urge",
      "choose",
      "disallow",
      "imply",
      "opt-in",
      "request",
      "use",
      "collect",
      "comply",
      "discipline",
      "disclaim",
      "inform",
      "limit",
      "opt-out",
      "require",
      "verify",
      "personal",
      "ip address",
      "third-party",
      "publish",
      "consent",
      "process",
      "create",
      "delete",
      "retention",
      "registration",
      "mobile",
      "phone",
      "speech recognition",
      "cloud",
      "service",
      "jurisdictions",
      "password",
      "protection",
      "information",
      "location",
      "real-time",
      "upload",
      "download",
      "shared",
      "first-party",
      "automatically",
      "usage",
      "trend",
      "log",
      "mapping",
      "advertising",
      "track",
      "payment",
      "chat",
      "history",
      "record",
      "anonymous",
      "biometric",
      "cookie",
      "gdpr",
      "correction",
      "child",
      "age",
      "legal",
      "erasure",
      "deletion",
      "withdraw",
      "retention period",
      "security",
      "sell",
      "monetization",
      "transfer",
      "under-age",
      "accountability",
      "agree",
      "disagree",
    ];

    return privacySensitiveWordslist
      .map((word) => word.trim())
      .filter((word) => word !== "");
  } catch (error) {
    console.error("Failed to fetch or parse the wordlist:", error);
    return [];
  }
}
//---------------------------------------------------Ending---of---Function----------------------------------------------------------------------------
//
//
//
//#####---Function to send a message to the popup with jsonData---#####--------------------------------------------------------------------------------
function sendMessageToPopup(data) {
  // console.log("Sending data to popup:", data);
  chrome.runtime.sendMessage({ message: "show_data", data: data });
}
//---------------------------------------------------Ending---of---Function----------------------------------------------------------------------------
//
//
//
//#####---Calling The Cloud Function---#####-----------------------------------------------------------------------------------------------------------
function callCloudFunction(allPageText) {
  console.log("Function Called...\n");
  const cloudFunctionUrl =
    "https://asia-southeast1-sincere-blade-404218.cloudfunctions.net/eula-analyzer-public";

  return fetch(cloudFunctionUrl, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain",
    },
    body: allPageText, // Send the plaintext directly
  })
    .then((response) => {
      // Check if the response status is OK (200)
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      // Read the response text
      return response.text();
    })
    .then((data) => {
      // Handle the response from the Cloud Function
      console.log("Cloud Function Response: ", data);

      // Assuming the returned data is in JSON format, parse it
      try {
        jsonData = JSON.parse(data);
      } catch (error) {
        console.error("Error parsing Cloud Function response:", error);
      }
    })
    .catch((error) => {
      console.error("Error fetching data from Cloud Function:", error);
      throw error; // rethrow the error for handling elsewhere if needed
    });
}
//---------------------------------------------------Ending---of---Function----------------------------------------------------------------------------
//
//
//
// Define a callback function to be called when highlighting is complete
function highlightingCallback() {
  // Send a message to the popup after highlighting is complete
  // setTimeout(function () {
  //   sendMessageToPopup(jsonData);
  // }, 5000);
  sendMessageToPopup(jsonData);
}
//
//
//
//
//#####---Function for Highlighting The Privacy Sensitive Words---#####---------------------------------------------------------------
async function highlightWords() {
  const predefinedWords = await fetchWordList();
  const allPageText = extractAllText();

  const elements = document.querySelectorAll("body *");
  elements.forEach((element) => {
    const node = element.firstChild;
    if (node !== null && node.nodeType === Node.TEXT_NODE) {
      const text = node.nodeValue;
      const replacedText = predefinedWords.reduce((acc, word) => {
        const regex = new RegExp(`\\b${word}\\b`, "gi");
        return acc.replace(
          regex,
          `<span style="background-color: yellow">${word}</span>`
        );
      }, text);
      if (replacedText !== text) {
        const newNode = document.createElement("span");
        newNode.innerHTML = replacedText;
        element.replaceChild(newNode, node);
      }
    }
  });

  // Call the Cloud Function and wait for the response
  try {
    await callCloudFunction(allPageText);
  } catch (error) {
    // Handle errors
    console.error("Error processing data:", error);
  }
}
//---------------------------------------------------Ending---of---Function-----------------------------------------------------------
//
//
//
// Message listener to trigger highlighting and send jsonData when a message is received
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "highlight_words") {
    highlightWords().then(highlightingCallback);

    return true;
  }
});
