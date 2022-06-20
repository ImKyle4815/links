import "../style/printingPage.scss";
import { TwitterTweetEmbed } from 'react-twitter-embed';
import Link from "../components/Link";

const PrintingPage = () => {
    return (
        <div className="printingPage page-constrained-width">
            <div className="printingGuide">
                <h1>Kyle's Printing Guide</h1>
                <h2>Introduction</h2>
                <p>I've been playing Magic since M14 in 2013, and I began my high quality proxying adventure in 2020.</p>
                <p>Back in 2021 I made the following tweet sharing my printing process with the community:</p>
                <div className="embeddedTweet">
                    <TwitterTweetEmbed 
                        tweetId={'1434310363881742339'}
                        options={{theme:"dark"}}
                    />
                </div>
                <p>Since then, I've refined my printing process and would like to share it here. This is a living document, and I'll continue to update it as I learn more.</p>
                <h2>Contents</h2>
                <p>
                    In this guide, I'll be discussing:
                    <ul>
                        <li><a href="#legalities">Proxy Legalities</a></li>
                        <li><a href="#materials">Required Materials</a></li>
                        <li><a href="#digital">Making Digital Proxies</a></li>
                        <li><a href="#page-prep">Preparing Print Pages</a></li>
                        <li><a href="#printing">Printing</a></li>
                        <li><a href="#conclusion">Conclusion</a></li>
                    </ul>
                </p>
                <h2 id="legalities">Proxy Legalities</h2>
                <p>
                    As a precursor, I must mention that I'm no legal professional, and this does not constitute legal advice. I'm just a hobbyist sharing my opinions.
                </p>
                <p>
                    If you're interested in reading the sources yourself, I've primarily referenced WOTC's <a href="https://company.wizards.com/en/legal/fancontentpolicy" target="_blank" rel="noreferrer">Fan Content Policy</a> and an article called <a href="https://magic.wizards.com/en/articles/archive/news/proxies-policy-and-communication-2016-01-14" target="_blank" rel="noreferrer">On Proxies, Policy, and Communication</a>.
                </p>
                <p>
                    My understanding is that while making counterfeits, selling proxies, or using proxies in sanctioned tournaments is <em>strictly illegal</em>, fans may produce proxies for personal use under the following conditions:
                    <ul>
                        <li>They are obviously not real cards</li>
                        <li>"NFS" or "not for sale" is clearly written on the card</li>
                        <li>&trade; &amp; &copy; &lt;year&gt; Wizards of the Coast appears on the card</li>
                        <li>The artist is properly credited</li>
                    </ul>
                    To be clear, I cannot guarantee that these conditions are sufficient; they are just the bare minimum requirements that I and most of the proxy community have determined.
                </p>
                <p>
                    These are the rules I follow when making proxies. I do not sell any proxies containing intellectual property I don't have the rights to <em>(including but not limited to mana symbols, official fonts, rules text, trademarked keywords, art, and so much more)</em>.
                </p>
                <h2 id="materials">Required Materials</h2>
                <p>
                    You don't need to use the same exact materials I do, but they are proven to work.
                    <ul>
                        <li>
                            Printer
                            <ul>
                                <li>
                                    I use the <a href="https://www.amazon.com/Epson-Expression-EcoTank-Wireless-Supertank/dp/B074V4TTY2?crid=Z710GMVLN5Y0&keywords=epson+et+2750&qid=1655687230&sprefix=epson+et+2750%2Caps%2C204&sr=8-3&linkCode=ll1&tag=imkyle4815-20&linkId=e2662b1ffe145c3dbd02b3591e2bff4b&language=en_US&ref_=as_li_ss_tl" target="_blank" rel="noreferrer">Epson ET 2750</a>. I love the ecotank line, because <a href="https://www.amazon.com/Ultra-high-Capacity-T502520-S-Epson-Printers/dp/B074RG6PN1?crid=3GUZ1LHK4HSE7&keywords=epson+502+ink&qid=1655687354&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&sprefix=epson+502+ink%2Caps%2C154&sr=8-3&linkCode=ll1&tag=imkyle4815-20&linkId=a4fc7d23ff8086757b66ddfba8f6e4a3&language=en_US&ref_=as_li_ss_tl" target="_blank" rel="noreferrer">the ink</a> lasts forever and is extremely cheap. At a bare minimum you'll want a color printer. Then, for higher quality, any inkjet photo printer would be great. I've never tried using laserjet printers, but as long as they print onto your sticker paper they should work as well.
                                </li>
                            </ul>
                        </li>
                        <li>
                            Paper (front)
                            <ul>
                                <li>
                                    I use <a href="https://www.amazon.com/Sheets-Holographic-Sticker-Printer-Rainbow/dp/B098N8R6P3?dchild=1&keywords=holographic%2Bsticker%2Bpaper%2B50&qid=1629220602&sr=8-3&th=1&linkCode=ll1&tag=imkyle4815-20&linkId=bea3a57f66bcb9a4f34e39c4dd9c8560&language=en_US&ref_=as_li_ss_tl" target="_blank" rel="noreferrer">Holographic Sticker Paper by Qixin</a>. If you're feeling really adventurous, you can check out some <a href="https://www.amazon.com/Holographic-Self-Adhesive-Waterproof-Transparent-Patterns/dp/B098QGYN66?crid=14P2GP20LHQ32&keywords=holographic+sticker+paper&qid=1655685817&sprefix=holographic+sticker+paper+50%2Caps%2C150&sr=8-5&linkCode=ll1&tag=imkyle4815-20&linkId=a95987b533e1589fccd51f720b0b67b7&language=en_US&ref_=as_li_ss_tl" target="_blank" rel="noreferrer">fancier holographic patterns</a>, too. As long as you can print on it and stick it to another sheet of paper, it works!
                                </li>
                            </ul>
                        </li>
                        <li>
                            Paper (back)
                            <ul>
                                <li>
                                    The easiest backing in the short-term is bulk cards. Just cut out your printed stickers, stick them to bulk cards, and trim the edges with an x-acto knife.
                                </li>
                                <li>
                                    If you want to take things step further, I prefer to stick my printed sheets onto sheets of cardstock, <em>then</em> cut out the cards. I've found that <a href="https://www.amazon.com/Hamilco-White-Cardstock-Thick-Paper/dp/B08RSS4BSH?crid=2GAZM44LIN6TC&keywords=80lb+cardstock&qid=1655686726&s=office-products&sprefix=80lb+cardstock%2Coffice-products%2C148&sr=1-10&linkCode=ll1&tag=imkyle4815-20&linkId=f7e0db8d2485e46ce16f2f0cdb977380&language=en_US&ref_=as_li_ss_tl" target="_blank" rel="noreferrer">80 lb</a> cardstock is a bit flimsy, while <a href="https://www.amazon.com/Black-Cardstock-100Lb-Cover-Sheets/dp/B081B52M3Z?content-id=amzn1.sym.14b5a3ec-ddf3-42f1-bf1e-8515f8d25a34%3Aamzn1.sym.14b5a3ec-ddf3-42f1-bf1e-8515f8d25a34&crid=9I1CCS2ZRC3L&cv_ct_cx=Black%2BCardstock%2B-%2B8.5%2Bx%2B11%2Binch%2B-%2B100Lb%2BCover%2B-%2B50%2BSheets%2B-%2BClear%2BPath%2BPaper&keywords=Black%2BCardstock%2B-%2B8.5%2Bx%2B11%2Binch%2B-%2B100Lb%2BCover%2B-%2B50%2BSheets%2B-%2BClear%2BPath%2BPaper&pd_rd_i=B081B52M3Z&pd_rd_r=312d7464-0118-4f37-beec-09fb8ac8d27f&pd_rd_w=8D5Ju&pd_rd_wg=MRsWe&pf_rd_p=14b5a3ec-ddf3-42f1-bf1e-8515f8d25a34&pf_rd_r=EETXE6BZ5MPXTASJBJ1D&qid=1655686439&sprefix=black%2Bcardstock%2B-%2B8.5%2Bx%2B11%2Binch%2B-%2B100lb%2Bcover%2B-%2B50%2Bsheets%2B-%2Bclear%2Bpath%2Bpaper%2Caps%2C149&sr=1-1-f0029781-b79b-4b60-9cb0-eeda4dea34d6&th=1&linkCode=ll1&tag=imkyle4815-20&linkId=177515ee2fa1a9e141928ca00e79f731&language=en_US&ref_=as_li_ss_tl" target="_blank" rel="noreferrer">100 lb</a> cardstock is a tad thick. I've been custom ordering cardstock from <a href="https://www.superiorpod.com/" target="_blank" rel="noreferrer">Superior POD</a>, though it's more expensive and takes several months to complete.
                                </li>
                            </ul>
                        </li>
                        <li>
                            Cutter
                            <ul>
                                <li>
                                    X-acto knives work, but I highly recommend guillotine paper cutters. I've been enjoying <a href="https://www.amazon.com/gp/product/B0006HVQH8?ie=UTF8&th=1&linkCode=ll1&tag=imkyle4815-20&linkId=f2a1aaf2ac64488106d5a5e1b792d857&language=en_US&ref_=as_li_ss_tl" target="_blank" rel="noreferrer">this one</a>, which happens to be by x-acto. With a cutter like this, cutting is easier, faster, and produces much cleaner edges.
                                </li>
                            </ul>
                        </li>
                        <li>
                            Corner Puncher
                            <ul>
                                <li>
                                    The exact listing is no longer available, but you can find <a href="https://www.amazon.com/Baoblaze-Rounder-Perfect-Counter-Clipping/dp/B07MCBL993?crid=1TW8WG8MV153U&keywords=3mm+corner+puncher&qid=1655686479&sprefix=3mm+corner+punch%2Caps%2C158&sr=8-28&linkCode=ll1&tag=imkyle4815-20&linkId=623f1d8ec6c94bfdd1bd2945793850e7&language=en_US&ref_=as_li_ss_tl" target="_blank" rel="noreferrer">this 3mm corner puncher</a> almost anywhere - it looks exactly the same as the one I use, and many other listings, but it's such a great tool.
                                </li>
                            </ul>
                        </li>
                    </ul>
                </p>
                <h2 id="digital">Making Digital Proxies</h2>
                <p>
                    I make all of my proxies on my website <a href="https://cardconjurer.com" target="_blank" rel="noreferrer">cardconjurer.com</a>, and of course, I highly recommend it. There's a bit of a learning curve, but it's well worth it.
                </p>
                <p>
                    You can also just view my <a href="https://drive.google.com/drive/folders/1YDzy8CTWhb_8dZQMS5CFfzY-0XHxF4GT?usp=sharing" target="_blank" rel="noreferrer">proxy gallery</a> and download whatever you'd like to print.
                </p>
                <p>
                    If you prefer a more hands-on approach, go wild. I like to work at 600dpi, which is approximately 1500x2100px, though this is for 2.5x3.5" cards. A more accurate measurement is 63x88mm, which comes out to 1488x2079px.
                </p>
                <h2 id="page-prep">Preparing Print Pages</h2>
                <p>
                    I use <a href="https://cardconjurer.com/print" target="_blank" rel="noreferrer">cardconjurer.com/print</a> to make my print pages, and I download the pdf. I'll update this guide later, but in the meantime, here is <a href="https://twitter.com/ImKyle4815/status/1471564568388255744" target="_blank" rel="noreferrer">my thread on Twitter</a> that describes how to use it.
                </p>
                <p>
                    Whether you use my printing tool or create the printable pages yourself, I recommend printing the cards at 63x88mm. Whether you use bleed edges or add spacing between cards depends on how you're cutting out your cards, and what you prefer. I generally like to fit nine cards on each page, in a 3x3 arrangement.
                </p>
                <h2 id="printing">Printing</h2>
                <p>
                    Be ready to waste some paper when you first start. Every printer is different, so take time to experiment and find what works best for your setup. Don't give up, try different settings, and you'll get there.
                </p>
                <p>
                    With holographic sticker paper, or any glossy paper, you'll want to configure your print driver to use the thickest, glossiest setting available. For my Epson ET 2750, I use the "Ultra Premium Photo Paper Glossy" setting. Also make sure to adjust print quality to maximum, and be ready to sacrifice time. My sheets of nine cards take fifteen minutes to print!
                </p>
                <p>
                    Once you print out your sheet of cards, you have two options for cutting. The first is to cut out the cards, stick them to bulk commons, then trim with an xacto knife. The other option is to first stick the full printed sheet to a sheet of cardstock, then cut.
                </p>
                <p>
                    I recommend starting with bulk cards. The cards are a tad thick and alignment can be tough, but they're nice and firm, and are cheap to make.
                </p>
                <p>
                    Once you get more into proxying, I recommend looking into cardstock. Finding cardstock with just the right rigidity and thickness is difficult - I haven't yet found the perfect product. But if you're not too concerned about having the perfect thickness or rigidity, cardstock is the way to go. It's much easier and faster to cut using a guillotine paper cutter.
                </p>
                <p>
                    Whether you use bulk cards or a sheet of cardstock, be careful when you’re applying the sticker paper. I start by peeling back one corner or edge and stick it to the surface, being careful that it's aligned. Then, once I'm happy with the alignment, I slowly unpeel the backing and roll the sticker paper onto the surface. Go slowly so that no air bubbles get trapped. Also make sure to brush off any surfaces before applying sticker paper so that no dust or debris gets trapped.
                </p>
                <p>
                    Once again, this process has a learning curve, so don’t be discouraged by imperfect results. Keep calm and proxy on.
                </p>
                <h2 id="conclusion">Conclusion</h2>
                <p>
                    Making proxies is tons of fun, and I can't recommend learning this process enough. It's served me and many others very well. The upfront investment can seem daunting, but it's well worth it. And if you already have a printer, then what are you waiting for? Get proxying!
                </p>
                <p>
                    Thanks for sticking around to the end of this guide! I spend a lot of time and money developing these processes, and hosting and updating <a href="https://cardconjurer.com" target="_blank" rel="noreferrer">cardconjurer.com</a>. If I've helped you advance your proxying skills or make some beautifully shiny cards, please consider helping me out by using my affiliate links in <a href="#materials">Required Materials</a>, or supporting me via Patreon or PayPal. Thank you.
                </p>
                <div style={{maxWidth:"720px", marginLeft:"auto", marginRight:"auto"}}>
                    <Link text="Patreon" url="https://www.patreon.com/KyleBurton" img={require("../img/linkIcons/patreon.svg").default} />
                    <Link text="PayPal" url="https://www.paypal.me/kyleburtondonate" img={require("../img/linkIcons/paypal.svg").default} />
                </div>
            </div>
        </div>
    );
};

export default PrintingPage;