import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
    const [text, setText] = useState("");
    const [highlightedText, setHighlightedText] = useState([]);
    const [activeCategories, setActiveCategories] = useState({
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
    });

    const analyzeText = async () => {
        try {
            const response = await axios.post("http://127.0.0.1:5000/analyze", { text });
            setHighlightedText(response.data);
        } catch (error) {
            console.error("Error analyzing text:", error);
        }
    };

    const toggleCategory = (category) => {
        setActiveCategories(prev => ({
            ...prev,
            [category]: !prev[category]
        }));
    };

    const enableAll = () => {
        const allEnabled = {};
        Object.keys(activeCategories).forEach(key => {
            allEnabled[key] = true;
        });
        setActiveCategories(allEnabled);
    };

    const disableAll = () => {
        const allDisabled = {};
        Object.keys(activeCategories).forEach(key => {
            allDisabled[key] = false;
        });
        setActiveCategories(allDisabled);
    };

    return (
        <div className="container">
            <h1>Norwegian Text Highlighter</h1>

            {/* Legend Section with Toggles */}
            <div className="legend">
                <h3>Legend:</h3>
                <div className="legend-items">
                    <label>
                        <input type="checkbox" checked={activeCategories.VERB} onChange={() => toggleCategory('VERB')} />
                        <span style={{ fontWeight: "bold", color: "#0096FF" }}>Verb</span>
                    </label>
                    <label>
                        <input type="checkbox" checked={activeCategories.IRREGULAR_VERB} onChange={() => toggleCategory('IRREGULAR_VERB')} />
                        <span style={{ fontWeight: "bold", color: "#FF4500" }}>Irregular Verb</span>
                    </label>
                    <label>
                        <input type="checkbox" checked={activeCategories.ADJ} onChange={() => toggleCategory('ADJ')} />
                        <span style={{ fontWeight: "bold", color: "#32CD32" }}>Adjective</span>
                    </label>
                    <label>
                        <input type="checkbox" checked={activeCategories.PRON} onChange={() => toggleCategory('PRON')} />
                        <span style={{ fontWeight: "bold", color: "#C71585" }}>Pronoun</span>
                    </label>
                    <label>
                        <input type="checkbox" checked={activeCategories.NOUN} onChange={() => toggleCategory('NOUN')} />
                        <span style={{ fontWeight: "bold", color: "#FFA500" }}>Noun</span>
                    </label>
                    <label>
                        <input type="checkbox" checked={activeCategories.ADV} onChange={() => toggleCategory('ADV')} />
                        <span style={{ fontWeight: "bold", color: "#1E90FF" }}>Adverb</span>
                    </label>
                    <label>
                        <input type="checkbox" checked={activeCategories.PREP} onChange={() => toggleCategory('PREP')} />
                        <span style={{ fontWeight: "bold", color: "#FF69B4" }}>Preposition</span>
                    </label>
                    <label>
                        <input type="checkbox" checked={activeCategories.PROPN} onChange={() => toggleCategory('PROPN')} />
                        <span style={{ fontWeight: "bold", color: "#8A2BE2" }}>Proper Noun</span>
                    </label>
                    <label>
                        <input type="checkbox" checked={activeCategories.AUX} onChange={() => toggleCategory('AUX')} />
                        <span style={{ fontWeight: "bold", color: "#FFD700" }}>Auxiliary Verb</span>
                    </label>
                    <label>
                        <input type="checkbox" checked={activeCategories.DET} onChange={() => toggleCategory('DET')} />
                        <span style={{ fontWeight: "bold", color: "#ADFF2F" }}>Determiner</span>
                    </label>
                    <label>
                        <input type="checkbox" checked={activeCategories.SCONJ} onChange={() => toggleCategory('SCONJ')} />
                        <span style={{ fontWeight: "bold", color: "#DC143C" }}>Subordinating Conjunction</span>
                    </label>
                    <label>
                        <input type="checkbox" checked={activeCategories.CCONJ} onChange={() => toggleCategory('CCONJ')} />
                        <span style={{ fontWeight: "bold", color: "#FF6347" }}>Coordinating Conjunction</span>
                    </label>
                    <label>
                        <input type="checkbox" checked={activeCategories.NUM} onChange={() => toggleCategory('NUM')} />
                        <span style={{ fontWeight: "bold", color: "#00FA9A" }}>Number</span>
                    </label>
                    <label>
                        <input type="checkbox" checked={activeCategories.INTJ} onChange={() => toggleCategory('INTJ')} />
                        <span style={{ fontWeight: "bold", color: "#FF1493" }}>Interjection</span>
                    </label>
                </div>
                <div>
                    <button onClick={enableAll}>Enable All</button>
                    <button onClick={disableAll}>Disable All</button>
                </div>
            </div>

            {/* Text Input */}
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type Norwegian text here..."
            />

            <button onClick={analyzeText}>Analyze</button>
            <button onClick={analyzeText}>Enable All</button>
            <button onClick={analyzeText}>Disable All</button>

            {/* Highlighted Output */}
            <p>
                {highlightedText.map(({ text, pos }, index) => {
                    // Get the color based on active categories
                    let color = "white";
                    if (!activeCategories[pos]) {
                        color = "white";
                    } else {
                        if (pos === "VERB") color = "#0096FF"; // Brighter Blue
                        if (pos === "IRREGULAR_VERB") color = "#FF4500"; // Softer Red
                        if (pos === "ADJ") color = "#32CD32"; // Lime Green
                        if (pos === "PRON") color = "#C71585"; // Magenta
                        if (pos === "NOUN") color = "#FFA500"; // Orange
                        if (pos === "ADV") color = "#1E90FF"; // Light Blue
                        if (pos === "PREP") color = "#FF69B4"; // Hot Pink
                        if (pos === "PROPN") color = "#8A2BE2"; // Blue Violet
                        if (pos === "AUX") color = "#FFD700"; // Gold
                        if (pos === "DET") color = "#ADFF2F"; // Green Yellow
                        if (pos === "SCONJ") color = "#DC143C"; // Crimson
                        if (pos === "CCONJ") color = "#FF6347"; // Tomato
                        if (pos === "NUM") color = "#00FA9A"; // Medium Spring Green
                        if (pos === "INTJ") color = "#FF1493"; // Deep Pink
                    }

                    return (
                        <span key={index} style={{ color }}>{text} </span>
                    );
                })}
            </p>
        </div>
    );
}

export default App;