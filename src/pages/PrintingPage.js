import "../style/printingPage.scss";
import { TwitterTweetEmbed } from 'react-twitter-embed';
import Link from "../components/Link";
import Footer from "../components/Footer";
import ImageZoomable from "../components/ImageZoomable";

const PrintingPage = () => {
    return (
        <div>
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
                    </p>
                    <ul>
                        <li><a href="#legalities">Proxy Legalities</a></li>
                        <li><a href="#materials">Required Materials</a></li>
                        <li><a href="#digital">Making Digital Proxies</a></li>
                        <li><a href="#page-prep">Preparing Print Pages</a></li>
                        <li><a href="#printing">Printing &amp; Cutting</a></li>
                        <li><a href="#conclusion">Conclusion</a></li>
                    </ul>
                    <h2 id="legalities">Proxy Legalities</h2>
                    <p>
                        As a precursor, I must mention that I'm no legal professional, and this does not constitute legal advice. I'm just a hobbyist sharing my opinions.
                    </p>
                    <p>
                        If you're interested in reading the sources yourself, I've primarily referenced WOTC's <a href="https://company.wizards.com/en/legal/fancontentpolicy" target="_blank" rel="noreferrer">Fan Content Policy</a> and an article called <a href="https://magic.wizards.com/en/articles/archive/news/proxies-policy-and-communication-2016-01-14" target="_blank" rel="noreferrer">On Proxies, Policy, and Communication</a>.
                    </p>
                    <p>
                        My understanding is that while making counterfeits, selling proxies, or using proxies in sanctioned tournaments is <em>strictly illegal</em>, fans may produce proxies for personal use under the following conditions:
                    </p>
                    <ul>
                        <li>They are obviously not real cards</li>
                        <li>"NFS" or "not for sale" is clearly written on the card</li>
                        <li>&trade; &amp; &copy; &lt;year&gt; Wizards of the Coast appears on the card</li>
                        <li>The artist is properly credited</li>
                    </ul>
                    <p>
                        To be clear, I cannot guarantee that these conditions are sufficient; they are just the bare minimum requirements that I and most of the proxy community have determined. In fact, they weren't sufficient for my website Card Conjurer, which <a href="https://twitter.com/ImKyle4815/status/1593658806201856001?s=20&t=cKMdRDlaXZMqa3xl4nHPEA" target="_blank" rel="noreferrer">received a C&D in November 2022</a>...
                    </p>
                    <p>
                        These are the rules I follow when making proxies. I do not sell any proxies containing intellectual property I don't have the rights to <em>(including but not limited to mana symbols, official fonts, rules text, trademarked keywords, art, and so much more)</em>.
                    </p>
                    <h2 id="materials">Required Materials</h2>
                    <p>
                        You don't need to use the same exact materials I do, but since they're proven to work I highly recommend them. They're also affiliate links, which help me out!
                    </p>
                    <ul>
                        <li>
                            Printer
                            <ul>
                                <li>
                                    I use the <a href="https://www.amazon.com/Epson-Expression-EcoTank-Wireless-Supertank/dp/B074V4TTY2?&linkCode=ll1&tag=imkyle481506-20&linkId=586d8427724a36ad68f139e884e7ee18&language=en_US&ref_=as_li_ss_tl" target="_blank" rel="noreferrer">Epson ET 2750</a>. I love the ecotank line, because <a href="https://www.amazon.com/Ultra-high-Capacity-T502520-S-Epson-Printers/dp/B074RG6PN1?&linkCode=ll1&tag=imkyle481506-20&linkId=9a0bec44269d67f7de52ff01fd8c2439&language=en_US&ref_=as_li_ss_tl" target="_blank" rel="noreferrer">the ink</a> lasts forever and is extremely cheap. At a bare minimum you'll want a color printer. Then, for higher quality, any inkjet photo printer would be great. I've never tried using laserjet printers, but as long as they print onto your sticker paper they should work as well.
                                </li>
                            </ul>
                        </li>
                        <li>
                            Paper (front)
                            <ul>
                                <li>
                                    I use <a href="https://www.amazon.com/Sheets-Holographic-Sticker-Printer-Rainbow/dp/B093F2D7DW?th=1&linkCode=ll1&tag=imkyle481506-20&linkId=87508f1dc801e45961fd1c9403e849aa&language=en_US&ref_=as_li_ss_tl" target="_blank" rel="noreferrer">Holographic Sticker Paper by Qixin</a>. If you're feeling really adventurous, you can check out some <a href="https://www.amazon.com/Holographic-Printable-Sticker-Rainbow-printers/dp/B093C2878W?&linkCode=ll1&tag=imkyle481506-20&linkId=4eea99df89cb879b1864ff88747fae5a&language=en_US&ref_=as_li_ss_tl" target="_blank" rel="noreferrer">fancier holographic patterns</a>, too (<a href="https://www.amazon.com/dp/B09GJJ5L22?&linkCode=ll1&tag=imkyle481506-20&linkId=0b052a1bff78c7f63150a11d3a23acf9&language=en_US&ref_=as_li_ss_tl" target="_blank" rel="noreferrer">this is one of my favorites</a>). As long as you can print on it and stick it to another sheet of paper, it works! For nonfoil sticker paper, I'm currently using <a href="https://www.amazon.com/gp/product/B082ZDZ894?&linkCode=ll1&tag=imkyle481506-20&linkId=d2dc3e62876a4e7b0b52e1c0c8304bde&language=en_US&ref_=as_li_ss_tl" target="_blank" rel="noreferrer">this one by JOYEZA</a>.
                                </li>
                            </ul>
                        </li>
                        <li>
                            Paper (back)
                            <ul>
                                <li>
                                    The easiest backing in the short-term is bulk cards. Just cut out your printed stickers, stick them to bulk cards, and trim the edges with an x-acto knife. Some people recommend using tokens or "ad cards" for the best final thickness.
                                </li>
                                <li>
                                    If you want to take things step further, I prefer to stick my printed sheets onto sheets of cardstock, <em>then</em> cut out the cards. I've found that <a href="https://www.amazon.com/Hamilco-White-Cardstock-Thick-Paper/dp/B08RSS4BSH?&linkCode=ll1&tag=imkyle481506-20&linkId=d6b73a68cde21dce5e07c856be87e04c&language=en_US&ref_=as_li_ss_tl" target="_blank" rel="noreferrer">80 lb</a> cardstock is a bit flimsy, while <a href="https://www.amazon.com/Black-Cardstock-100Lb-Cover-Sheets/dp/B081B52M3Z?&linkCode=ll1&tag=imkyle481506-20&linkId=3398e5b5ab6b710c20e3d7fe73c88093&language=en_US&ref_=as_li_ss_tl" target="_blank" rel="noreferrer">100 lb</a> cardstock is a tad thick. I've been custom ordering cardstock from <a href="https://www.superiorpod.com/" target="_blank" rel="noreferrer">Superior POD</a>, though it's more expensive and takes several months to complete. If you want something fast, <a href="https://www.amazon.com/dp/B09LCP5CXF?psc=1&linkCode=ll1&tag=imkyle481506-20&linkId=1473bca01bbc4299d7d2e4789811a4c6&language=en_US&ref_=as_li_ss_tl" target="_blank" rel="noreferrer">blank tarot cards</a> may be the answer. They're quick and easy to buy, rigid, high quality, and allow you to apply the sticker paper without worry of alignment then cut to size.
                                </li>
                            </ul>
                        </li>
                        <li>
                            Cutter
                            <ul>
                                <li>
                                    X-acto knives work, but I highly recommend guillotine paper cutters. I've been enjoying <a href="https://www.amazon.com/gp/product/B0006HVQH8?&linkCode=ll1&tag=imkyle481506-20&linkId=31b3aaa6a5f662107f1f8f18a49840b7&language=en_US&ref_=as_li_ss_tl" target="_blank" rel="noreferrer">this one</a>, which happens to be by x-acto. With a cutter like this, cutting is easier, faster, and produces much cleaner edges.
                                </li>
                            </ul>
                        </li>
                        <li>
                            Corner Puncher
                            <ul>
                                <li>
                                    The exact listing is no longer available, but you can find <a href="https://www.amazon.com/dailymall-Radius-Corner-Rounder-Cutter/dp/B07XWXCKQ1?crid=1J5VPP9OJ02VT&keywords=3mm+corner+puncher+heavy+duty&qid=1691457177&sprefix=3mm+corner+puncher+heavy+duty%2Caps%2C160&sr=8-3&linkCode=li2&tag=imkyle481506-20&linkId=efb53345ac087e126e7fec7daf751724&language=en_US&ref_=as_li_ss_il" target="_blank" rel="noreferrer">this 3mm corner puncher</a> almost anywhere - it looks exactly the same as the one I use, and many other listings, but it's such a great tool.
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <h2 id="digital">Making Digital Proxies</h2>
                    <p>
                        I used to make all of my proxies on my website <a href="https://cardconjurer.com" target="_blank" rel="noreferrer">cardconjurer.com</a>, but that's not an option anymore... stay tuned and I hope to bring it back in a new form!
                    </p>
                    {/* <p>
                        You can also just view my <a href="https://drive.google.com/drive/folders/1YDzy8CTWhb_8dZQMS5CFfzY-0XHxF4GT?usp=sharing" target="_blank" rel="noreferrer">proxy gallery</a> and download whatever you'd like to print.
                    </p> */}
                    <p>
                        If you prefer a more hands-on approach, go wild. I like to work at 600dpi, which is approximately 1500x2100px, though this is for 2.5x3.5" cards. A more accurate measurement is 63x88mm, which comes out to 1488x2079px.
                    </p>
                    <h2 id="page-prep">Preparing Print Pages</h2>
                    <p>
                        I have a <a href="/printTool">printing tool</a> to make my print pages, and I download the pdf. I'll update this guide later, but in the meantime, here is <a href="https://twitter.com/ImKyle4815/status/1471564568388255744" target="_blank" rel="noreferrer">my thread on Twitter</a> that describes how to use the old version, which used to be on Card Conjurer.
                    </p>
                    <p>
                        Whether you use my printing tool or create the printable pages yourself, I recommend printing the cards at 63x88mm. Whether you use bleed edges or add spacing between cards depends on how you're cutting out your cards, and what you prefer. I generally like to fit nine cards on each page, in a 3x3 arrangement.
                    </p>
                    <h2 id="printing">Printing &amp; Cutting</h2>
                    <p>
                        Be ready to waste some paper when you first start. Every printer is different, so take time to experiment and find what works best for your setup. Don't give up, try different settings, and you'll get there.
                    </p>
                    <p>
                        With holographic sticker paper, or any glossy paper, you'll want to configure your print driver to use the thickest, glossiest setting available. For my Epson ET 2750, I use the "Ultra Premium Photo Paper Glossy" setting. Also make sure to adjust print quality to maximum, and be ready to sacrifice time. For reference, my sheets of nine cards take fifteen minutes to print!
                    </p>
                    <p>
                        I use the free version of adobe acrobat to print my pdfs, and while your software may vary, consider the following reference:
                    </p>
                    <ImageZoomable className="print-page-img" alt="Picture of my suggested print settings" src={require("../img/printingGuide/printSettings.jpg")} />
                    <p>
                        The boxes in red point out my most used settings. Make sure to print "actual size" for accurate dimensions. Clicking "properties" will bring up the window on the right, where you can set your paper size, type, and quality. The "maintenance" tab has some more complex settings, like print density, which you may consider experimenting with in the future. Lastly, the "add/remove presets" button is quite useful for saving your settings for one-click readiness.
                    </p>
                    <p>
                        Once you print out your sheet of cards, you have two options for cutting. The first is to cut out the cards, stick them to bulk commons, then trim with an xacto knife. The other option is to first stick the full printed sheet to a sheet of cardstock, then cut.
                    </p>
                    <p>
                        I recommend starting with bulk cards. The cards are a tad thick and alignment can be tough, but they're nice and firm, and are cheap to make.
                    </p>
                    <p>
                        Once you get more into proxying, start looking into cardstock. Finding cardstock with just the right rigidity and thickness is difficult - I haven't yet found the perfect product. But if you're not too concerned about having the perfect thickness or rigidity, cardstock is the way to go. It's much easier and faster to cut using a guillotine paper cutter.
                    </p>
                    <p>
                        Whether you use bulk cards or a sheet of cardstock, be careful when you're applying the sticker paper. I start by peeling back one corner or edge and stick it to the surface, being careful that it's aligned. Then, once I'm happy with the alignment, I slowly unpeel the backing and roll the sticker paper onto the surface. Go slowly so that no air bubbles get trapped. Also make sure to brush off any surfaces before applying sticker paper so that no dust or debris gets trapped.
                    </p>
                    <p>
                        Because guillotine paper cutters are the tool of my choice, I'll go over my cutting process and share some tips.
                    </p>
                    <p>
                        First, I trim the edges if they're wide enough. This isn't necessary, but it makes nice little strips of holographic sticker paper that I like to write on and use as labels.
                    </p>
                    <p>
                        Then, after I stick the sticker paper onto the backing, I use scissors to trim the corners by hand. Since I corner punch the corners anyway, it's okay if I'm not very precise here. I trim the corners because it makes it so much easier to align cuts. With the edges of the cards going right up to the edge of the paper, I can easily see whether the blade is in line with the edges of the cards.
                    </p>
                    <ImageZoomable className="print-page-img" alt="Picture of cutting corners for better alignment" src={require("../img/printingGuide/cornerAlignment.jpg")} />
                    <p>
                        Another thing I like to do when cutting cards is wear a headlamp. It may seem silly, but illuminating your cards is really important when cutting to make sure you can align everything properly.
                    </p>
                    <p>
                        Once the corners are trimmed, I cut off the excess edges, then make horizontal cuts.
                    </p>
                    <ImageZoomable className="print-page-img" alt="Picture of making horizontal cuts first" src={require("../img/printingGuide/cutOrder.jpg")} />
                    <p>
                        Finally, I cut out the individual cards from their rows of three, and punch the corners. I like to corner punch three at a time, with the sticker paper facing inwards so it doesn't get scratched by the heavy duty corner puncher.
                    </p>
                    <p>
                        Once again, this process has a learning curve, so don't be discouraged by imperfect results. Keep calm and proxy on.
                    </p>
                    <h2 id="conclusion">Conclusion</h2>
                    <p>
                        Making proxies is tons of fun, and I can't recommend learning this process enough. It's served me and many others very well. The upfront investment can seem daunting, but it's well worth it. And if you already have a printer, then what are you waiting for? Get proxying!
                    </p>
                    <p>
                        Thanks for sticking around to the end of this guide! I spend a lot of time and money developing these processes, and hosting and updating <a href="https://cardconjurer.com" target="_blank" rel="noreferrer">cardconjurer.com</a>. If I've helped you advance your proxying skills or make some beautifully shiny cards, please consider helping me out by using my affiliate links in <a href="#materials">Required Materials</a>, or supporting me via Patreon or PayPal. Thank you.
                    </p>
                    <div style={{maxWidth:"720px", marginLeft:"auto", marginRight:"auto", marginBottom:"4rem"}}>
                        <Link text="Patreon" url="https://www.patreon.com/KyleBurton" img={require("../img/linkIcons/patreon.svg").default} />
                        <Link text="PayPal" url="https://www.paypal.me/kyleburtondonate" img={require("../img/linkIcons/paypal.svg").default} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PrintingPage;