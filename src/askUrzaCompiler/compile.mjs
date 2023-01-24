import fs from "node:fs";

const plus = [];
const minus = [];
const ultimate = [];

fs.readFile("./oracle-cards.json", "utf8", (err, file) => {
    if (err) {
        console.log("An error occured:", err);
    } else {
        // fs.readFile
        for (let card of JSON.parse(file)) {
            if (!card["type_line"].includes("Planeswalker")) continue;
            for (let ability of card["oracle_text"].split(/\n/g)) {
                console.log(ability)
            }
            return;
        }
    }
})