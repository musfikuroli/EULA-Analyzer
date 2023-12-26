// let privacyParagraph =
//   "PLEASE READ THIS END USER LICENCE AGREEMENT CAREFULLY. 1.1 UBISOFT (or its licensors) grants You a non-exclusive, non-transferable, non-sublicensed, non-commercial and personal license to install and/or use the Product (in whole or in part) and any Product, for such time until either You or UBISOFT terminates this EULA. You must in no event use, nor allow others to use,the Product or this License for commercial purposes without obtaining a licence to do so from UBISOFT. Updates, upgrades, patches and modifications may be necessary in order to be able to continue to use the Product on certain hardware. THIS PRODUCT IS LICENSED TO YOU, NOT SOLD.";
// let jsonData = {};
let privacyParagraph = "";

let jsonData = {
  warnings: [
    {
      warning_code: 1,
      category: "Location",
      description: "This application tracks location.",
    },
    {
      warning_code: 2,
      category: "Personal Data Access",
      description: "Will have access to personal data - Image, SMS etc.",
    },
  ],
};

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
//---------------------------------------------------Ending---of---Function-----------------------------------------------------------
//
//
//
//
//
//
// //#####---Extracting The Sentences that Only Contains The Privacy Sensitive Words---#####---------------------------------------------
// import nlp from "compromise"; // Importing The "Compromise NLP Library"; Duplicate Sentences

// function extractSentencesWithPrivacyWords(allPageText, predefinedWords) {
//   // Split the text into sentences using the Compromise library.
//   const sentences = nlp(allPageText).sentences().out("array");

//   // Initialize an array to store sentences containing privacy-sensitive words.
//   const privacySentences = [];

//   // Iterate through each sentence.
//   for (const sentence of sentences) {
//     for (const currentWord of predefinedWords) {
//       // Check if the sentence contains any of the predefined words using the match function.
//       if (nlp(sentence).match(currentWord).found) {
//         // If it does, add it to the privacySentences array.
//         // console.log(sentence + "\n");
//         privacySentences.push(sentence);
//       }
//     }
//   }

//   // Join the privacySentences into a single paragraph.
//   const paragraph = privacySentences.join("\n\n");

//   return paragraph;
// }
//
//
//
//#####---Extracting The Sentences that Only Contains The Privacy Sensitive Words---#####---------------------------------------------
import nlp from "compromise"; // Unique Sentences

function extractSentencesWithPrivacyWords(allPageText, predefinedWords) {
  const sentences = nlp(allPageText).sentences().out("array");
  const uniquePrivacySentences = new Set();

  for (const sentence of sentences) {
    for (const currentWord of predefinedWords) {
      if (nlp(sentence).match(currentWord).found) {
        // Add the sentence to the Set to ensure uniqueness.
        uniquePrivacySentences.add(sentence);
        break; // Break out of the inner loop once a match is found in the sentence.
      }
    }
  }

  // Convert the Set to an array and join into a single paragraph.
  const paragraph = Array.from(uniquePrivacySentences).join("\n\n");

  // console.log(paragraph);

  return paragraph;
}

//---------------------------------------------------Ending---of---Function-----------------------------------------------------------
//
//
//
//#####---Function to Fetch and Parse The Privacy Sensitive Words List File [Hard-Coded]---#####--------------------------------------
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
//
//
//
// Calling The Cloud Function
function callCloudFunction() {
  console.log("Function Called...\n");
  const cloudFunctionUrl =
    "https://asia-southeast1-sincere-blade-404218.cloudfunctions.net/eula-analyzer-public";

  // Replace this with the actual user input
  // const userInput = "Tell me a joke about moon.";

  return fetch(cloudFunctionUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // mode: "no-cors", // Uncomment this line if your Cloud Function supports CORS
    body: JSON.stringify({
      userMessage: privacyParagraph,
      // Add other parameters if needed
    }),
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

// Function to send a message to the popup with jsonData
function sendMessageToPopup(data) {
  // console.log("Sending data to popup:", data);
  chrome.runtime.sendMessage({ message: "show_data", data: data });
}

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

  privacyParagraph = extractSentencesWithPrivacyWords(
    allPageText,
    predefinedWords
  );

  // Call the function to generate warnings
  // await callCloudFunction();
  sendMessageToPopup(jsonData);
}
//---------------------------------------------------Ending---of---Function-----------------------------------------------------------
//
//
//
// Message listener to trigger highlighting and send jsonData when a message is received
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "highlight_words") {
    highlightWords();
    // callCloudFunction();
    // sendMessageToPopup(jsonData);
    // sendMessageToPopup(jsonData);
    return true;
  }
});
