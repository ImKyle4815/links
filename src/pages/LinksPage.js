import "../style/linksPage.scss";
import Link from "../components/Link";
import LinkDiv from "../components/LinkDiv";

const LinksPage = () => {
    return (
      <div className="linksPage page-constrained-width">
        <div className="linksPage-title">
          <div>
            <img src={require("../img/pfp.png")} alt="O" />
            <h1>Kyle Burton</h1>
            <div className="linksPage-title-links">
              <h3 className="linksPage-twitter-handle">
                <a href="https://twitter.com/imkyle4815" target="_blank" rel="noreferrer">
                  <i className="fa-brands fa-twitter" style={{marginRight:"0.5rem"}}/>@ImKyle4815
                </a>
              </h3>
              <h3 className="linksPage-email">
                <a href="mailto:ImKyle4815@gmail.com" target="_blank" rel="noreferrer">
                  <i className="fa fa-envelope" style={{marginRight:"0.5rem"}}/>ImKyle4815@gmail.com
                </a>
              </h3>
            </div>
          </div>
        </div>
        <div style={{maxWidth:"720px", marginLeft:"auto", marginRight:"auto"}}>
          <LinkDiv text="CARDS" />
          <Link text="Cards For Sale" url="https://shop.imkyle4815.com/" img={require("../img/linkIcons/store.png")} />
          <Link text="MTG Proxy Gallery (NFS)" url="https://drive.google.com/drive/folders/1YDzy8CTWhb_8dZQMS5CFfzY-0XHxF4GT?usp=sharing" img={require("../img/linkIcons/drive.svg").default} />
          <Link text="Card Conjurer" url="https://cardconjurer.com/" img={require("../img/linkIcons/cardConjurer.png")} />
          <Link text="Printing Guide" url="/print" img={require("../img/pfp.png")} sameTab={true} />
          <LinkDiv text="SUPPORT" />
          <Link text="Patreon" url="https://www.patreon.com/KyleBurton" img={require("../img/linkIcons/patreon.svg").default} />
          <Link text="PayPal" url="https://www.paypal.me/kyleburtondonate" img={require("../img/linkIcons/paypal.svg").default} />
          <Link text="Amazon Wishlist" url="https://www.amazon.com/hz/wishlist/ls/E3IFK47XF71H?ref_=wl_share" img={require("../img/linkIcons/amazon.svg").default} backdrop={true} />
          <LinkDiv text="MTG" />
          <Link text="Moxfield Decklists" url="https://www.moxfield.com/users/ImKyle4815" img={require("../img/linkIcons/moxfield.png")} backdrop={true} />
          <Link text="Commander Cube" url="https://cubecobra.com/cube/list/kyle" img={require("../img/linkIcons/cubeCobra.png")} />
          <Link text="Custom Planechase Cards" url="https://drive.google.com/drive/folders/1kw5MKylEBBmeelNDmIcpB1qfbAG2Oe59?usp=sharing" img={require("../img/linkIcons/drive.svg").default} />
          <LinkDiv text="SOCIAL MEDIA" />
          <Link text="Twitter" url="https://twitter.com/imkyle4815" img={require("../img/linkIcons/twitter.svg").default} />
        </div>
      </div>  
    );
};

export default LinksPage;