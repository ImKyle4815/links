import fs from "node:fs";

const plus = [];
const minus = [];
const ultimate = [];

fs.readFile("oracle-cards.json", "utf8", (err, file) => {
    if (err) {
        console.log("An error occured:", err);
    } else {
        // fs.readFile
        let maxAbilityLength = 0;
        let maxAbility = "";
        for (let card of JSON.parse(file)) {
            if (!card["type_line"].includes("Planeswalker") || !card["oracle_text"]) continue; // || card.legalities?.commander !== "legal"
            for (let ability of card["oracle_text"].split(/\n/g)) {
                const splitAbility = ability.split(":", 2);
                if (splitAbility[0].length > 3 || splitAbility[0] === "-X") {
                    continue;
                } else {
                    const abilityCost = parseInt(splitAbility[0].replace("−", "-").replace("+", ""));
                    const abilityText = splitAbility[1].slice(1).replace(card.name, "Urza, Academy Headmaster");
                    if (abilityText.length > maxAbilityLength) {
                        maxAbilityLength = abilityText.length;
                        maxAbility = abilityText;
                    }
                    if (abilityCost >= 1) {
                        plus.push(abilityText);
                    } else if (abilityCost <= -3) {
                        ultimate.push(abilityText);
                    } else {
                        minus.push(abilityText);
                    }
                }
            }
        }
        const output = `const plus = ${JSON.stringify(plus)}; const minus = ${JSON.stringify(minus)}; const ultimate = ${JSON.stringify(ultimate)};`;
        fs.writeFile("./output.txt", output, "utf8", (err) => {
            if (err) {
                console.log("Failed to write output.txt:", err);
            } else {
                console.log("Output saved to output.txt with max length ability:", maxAbility);
            }
        });
    }
});