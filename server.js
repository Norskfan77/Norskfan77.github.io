const express = require("express");
const path = require("path");
const axios = require("axios");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Set Pug as the template engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Home Page Route
app.get("/", (req, res) => {
    res.render("index", { categories: initialCategories, colorMap });
});

// About Us Page Route
app.get("/about", (req, res) => {
    res.render("about"); // Make sure "about.pug" exists in the "views" folder
});

// Text Analysis API Route
app.post("/analyze", async (req, res) => {
    console.log(req.body);
    try {
        const response = await axios.post("https://renderbe-norsk.onrender.com/analyze", {
            text: req.body.text,
        });
        res.json(response.data); // Send the spaCy analysis result back to the client
    } catch (error) {
        console.error(error);
        res.status(500).send("Error analyzing text");
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Data
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
    INTJ: true,
};

const colorMap = {
    VERB: { color: "#0096FF", label: "Verb" },
    IRREGULAR_VERB: { color: "#FF4500", label: "Irregular Verb" },
    ADJ: { color: "#32CD32", label: "Adjective" },
    PRON: { color: "#C71585", label: "Pronoun" },
    NOUN: { color: "#FFA500", label: "Noun" },
    ADV: { color: "#D64A3A", label: "Adverb" },
    PREP: { color: "#D147A3", label: "Preposition" },
    PROPN: { color: "#5D3FD3", label: "Proper Noun" },
    AUX: { color: "#B8860B", label: "Auxiliary Verb" },
    DET: { color: "#6B8E23", label: "Determiner" },
    SCONJ: { color: "#DC143C", label: "Subordinating Conjunction" },
    CCONJ: { color: "#D64A3A", label: "Coordinating Conjunction" },
    NUM: { color: "#00FA9A", label: "Number" },
    INTJ: { color: "#C71585", label: "Interjection" },
};
