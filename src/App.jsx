import { useState } from "react";
import axios from "axios";
import "./App.css";


function App() {
    const [text, setText] = useState("");
    const [highlightedText, setHighlightedText] = useState([]);
    const [allEnabled, setAllEnabled] = useState(true);

    const initialCategories = {
        VERB: true,
        IRREGULAR_VERB: true,
        ADJ: true,
        PRON: true,
        NOUN: true,
        ADV: true,
        PREP: true,
        PROPN: true,
        AUX: true,
        DET: true,
        SCONJ: true,
        CCONJ: true,
        NUM: true,
        INTJ: true
    };

    const [enabledCategories, setEnabledCategories] = useState(initialCategories);

    const colorMap = {
        VERB: { color: "#0096FF", label: "Verb" },
        IRREGULAR_VERB: { color: "#FF4500", label: "Irregular Verb" },
        ADJ: { color: "#32CD32", label: "Adjective" },
        PRON: { color: "#C71585", label: "Pronoun" },
        NOUN: { color: "#FFA500", label: "Noun" },
        ADV: { color: "#1E90FF", label: "Adverb" },
        PREP: { color: "#D147A3", label: "Preposition" },
        PROPN: { color: "#5D3FD3", label: "Proper Noun" },
        AUX: { color: "#B8860B", label: "Auxiliary Verb" },
        DET: { color: "#6B8E23", label: "Determiner" },
        SCONJ: { color: "#DC143C", label: "Subordinating Conjunction" },
        CCONJ: { color: "#D64A3A", label: "Coordinating Conjunction" },
        NUM: { color: "#00FA9A", label: "Number" },
        INTJ: { color: "#C71585", label: "Interjection" }
    };

    const analyzeText = async () => {
        try {
            const response = await axios.post("https://norsk-be-ny-production.up.railway.app/analyze", { text });
            setHighlightedText(response.data);
        } catch (error) {
            console.error("Error analyzing text:", error);
        }
    };

    const toggleCategory = (category) => {
        setEnabledCategories(prev => ({ ...prev, [category]: !prev[category] }));
    };

    const toggleAllCategories = () => {
        const newState = !allEnabled;
        const updatedCategories = Object.keys(enabledCategories).reduce((acc, key) => {
            acc[key] = newState;
            return acc;
        }, {});

        setEnabledCategories(updatedCategories);
        setAllEnabled(newState);
    };

    return (
        <div className="container">
            <h1>Norwegian Text Highlighter</h1>

            {/* Legend Section */}
            <div className="legend">
                <h3>Legend:</h3>
                <button
                    onClick={toggleAllCategories}
                    style={{
                        backgroundColor: allEnabled ? "#444" : "#ddd",
                        color: "white",
                        margin: "10px",
                        padding: "8px 15px",
                        border: "none",
                        cursor: "pointer",
                        borderRadius: "5px",
                        fontWeight: "bold"
                    }}
                >
                    {allEnabled ? "Disable All" : "Enable All"}
                </button>

                {Object.entries(colorMap).map(([category, { color, label }]) => (
                    <button
                        key={category}
                        onClick={() => toggleCategory(category)}
                        style={{
                            backgroundColor: enabledCategories[category] ? color : "#ddd",
                            color: enabledCategories[category] ? "white" : "black",
                            margin: "5px",
                            padding: "5px 10px",
                            border: "none",
                            cursor: "pointer",
                            borderRadius: "5px"
                        }}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {/* Text Input */}
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type Norwegian text here..."
            />
            <button onClick={analyzeText}>Analyze</button>

            {/* Highlighted Output */}
            <p>
                {highlightedText.map(({ text, pos }, index) => {
                    const color = enabledCategories[pos] ? colorMap[pos]?.color || "white" : "white";
                    return (
                        <span key={index} style={{ color }}>{text} </span>
                    );
                })}
            </p>
        </div>
    );
}


export default App;
