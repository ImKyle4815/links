import "../style/urzaPage.scss";
import Footer from "../components/Footer";
import { useState } from "react";
import Button from "../components/Button";
import PageSection from "../components/PageSection";

const UrzaPage = () => {
    const [ability, setAbility] = useState("");

    const plus = [
        "foo",
        "bar",
        "baz"
    ]
    const minus = [
        "lame",
        "sad",
        "oof"
    ]
    const ultimate = [
        "wow",
        "amazing",
        "busted"
    ]

    const randomAbility = (abilities) => {
        return abilities[Math.floor(Math.random() * abilities.length)];
    }

    const activatePlus = () => {
        setAbility(randomAbility(plus));
    }

    const activateMinus = () => {
        setAbility(randomAbility(minus));
    }

    const activateUltimate = () => {
        setAbility(randomAbility(ultimate));
    }

    return (
        <>
            <PageSection>
                <h1 className="urza-page-title">Ask Urza 2.0</h1>
            </PageSection>
            <PageSection backgroundImage={require("../img/mtg/urza.png")} artCredit="Urza, Illustrated by Mark Tedin" backgroundImageStyle={{filter: "brightness(0.5)"}}>
                <div class="loyalty-abilities">
                    <Button onClick={activatePlus}>+1</Button>
                    <Button onClick={activateMinus}>-1</Button>
                    <Button onClick={activateUltimate}>-6</Button>
                </div>
                <p class="activated-ability">{ability}</p>
            </PageSection>
            <PageSection>
                <h2>What's Ask Urza 2.0?</h2>
                <p>Ask Urza 2.0 is a fan-made, reimagined version of the <a href="https://magic.wizards.com/en/unresources#funhouse" target="_blank" rel="noreferrer">"Ask Urza" webpage</a> made by Wizards of the Coast for a card named Urza, Academy Headmaster. Ask Urza traditionally has 20 randomized effects for each of its three loyalty abilities, but Ask Urza 2.0 takes things a step further. Here, you're randomly drawing from every planeswalker abilities that has ever been printed on a Magic card.</p>
                <p>We periodically compile a list of every planeswalker ability and sort them into the three categories. Currently, the thresholds are as follows:</p>
                <ul>
                    <li>+1: any ability costing +1 or more</li>
                    <li>-1: any ability costing between -3 and 0</li>
                    <li>-6: any ability costing -4 or less</li>
                </ul>
                <p>The list of planeswalker abilities was last compiled on February 24th, 2023.</p>
            </PageSection>
            <PageSection>
                <h2>Disclaimer</h2>
                <p>Wizards of the Coast, Magic: The Gathering, and their logos are trademarks of Wizards of the Coast LLC, a subsidiary of Hasbro Inc. © 1993-2023 Wizards. All Rights Reserved.</p>
                <p>This page is not affiliated with, endorsed by, sponsored by, or specifically approved by Wizards of the Coast LLC. This page may use the trademarks and other intellectual property of Wizards of the Coast LLC, which is permitted under Wizards' Fan Site Policy. MAGIC: THE GATHERING® is a trademark of Wizards of the Coast. For more information about Wizards of the Coast or any of Wizards' trademarks or other intellectual property, please visit their website at <a href="https://company.wizards.com/" target="_blank" rel="noreferrer">https://company.wizards.com/</a>.</p>
            </PageSection>
            <Footer />
        </>
    );
};

export default UrzaPage;