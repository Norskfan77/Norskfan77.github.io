/* Vanilla JavaScript version of the Norwegian Text Highlighter */

// Define initial categories
const initialCategories = {
    VERB: true,
 //   IRREGULAR_VERB: true,
    ADJ: true,
    PRON: true,
    NOUN: true,
    ADV: true,
    ADP: true,
    PROPN: true,
    AUX: true,
    DET: true,
    SCONJ: true,
    CCONJ: true,
    NUM: true,
    INTJ: true
};

let enabledCategories = { ...initialCategories };
let allEnabled = true;

const colorMap = {
    VERB: { color: "#0096FF", label: "Verb" },
  //  IRREGULAR_VERB: { color: "#FF4500", label: "Irregular Verb" },
    ADJ: { color: "#32CD32", label: "Adjective" },
    PRON: { color: "#C71585", label: "Pronoun" },
    NOUN: { color: "#FFA500", label: "Noun" },
    ADV: { color: "#D64A3A", label: "Adverb" },
    ADP: { color: "#D147A3", label: "Preposition" },
    PROPN: { color: "#5D3FD3", label: "Proper Noun" },
    AUX: { color: "#B8860B", label: "Auxiliary Verb" },
    DET: { color: "#6B8E23", label: "Determiner" },
    SCONJ: { color: "#DC143C", label: "Subordinating Conjunction" },
    CCONJ: { color: "#D64A3A", label: "Coordinating Conjunction" },
    NUM: { color: "#00FA9A", label: "Number" },
    INTJ: { color: "#C71585", label: "Interjection" }
};

const textArea = document.getElementById("textInput");
const outputArea = document.getElementById("outputText");
const analyzeButton = document.getElementById("analyzeButton");
const legendContainer = document.getElementById("legendContainer");
const toggleAllButton = document.getElementById("toggleAllButton");

// Generate legend buttons dynamically
Object.entries(colorMap).forEach(([category, { color, label }]) => {
    const button = document.createElement("button");
    button.textContent = label;
    button.style.backgroundColor = color;
    button.style.color = "white";
    button.style.margin = "5px";
    button.style.padding = "5px 10px";
    button.style.border = "none";
    button.style.cursor = "pointer";
    button.style.borderRadius = "5px";
    button.addEventListener("click", () => toggleCategory(category, button));
    legendContainer.appendChild(button);
});

// Analyze text function
async function analyzeText() {
    try {
        const response = await fetch("/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: textArea.value })
        });
        const data = await response.json();
        displayHighlightedText(data);
    } catch (error) {
        console.error("Error analyzing text:", error);
    }
}

// Display highlighted text
function displayHighlightedText(highlightedText) {
    outputArea.innerHTML = "";
    highlightedText.forEach(({ text, pos }) => {
        const span = document.createElement("span");
        span.textContent = text + " ";
        span.style.color = enabledCategories[pos] ? colorMap[pos]?.color || "#d3d3d3" : "#d3d3d3";
        outputArea.appendChild(span);
    });
}

// Toggle category visibility
function toggleCategory(category, button) {
    enabledCategories[category] = !enabledCategories[category];
    button.style.backgroundColor = enabledCategories[category] ? colorMap[category].color : "#ddd";
    button.style.color = enabledCategories[category] ? "white" : "black";
    analyzeText();
}

// Toggle all categories
toggleAllButton.addEventListener("click", () => {
    allEnabled = !allEnabled;
    Object.keys(enabledCategories).forEach(category => enabledCategories[category] = allEnabled);
    toggleAllButton.textContent = allEnabled ? "Disable All" : "Enable All";
    legendContainer.childNodes.forEach((btn, index) => {
        const category = Object.keys(colorMap)[index];
        btn.style.backgroundColor = allEnabled ? colorMap[category].color : "#ddd";
        btn.style.color = allEnabled ? "white" : "black";
    });
    analyzeText();
});

// Attach analyze event
analyzeButton.addEventListener("click", analyzeText);
