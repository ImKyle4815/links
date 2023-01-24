import { Link } from "react-router-dom";

const Footer = (props) => {
    return (
        <footer className="Footer">
            <div>
                <h3>Kyle Burton</h3>
                <nav>
                    <Link to="/">Links</Link> |{" "}
                    <Link to="/print">Printing Guide</Link> |{" "}
                    <Link to="/printTool">Print Page Tool</Link> |{" "}
                    <Link to="/urza">Ask Urza 2.0</Link>
                </nav>
            </div>
        </footer>
    );
}

export default Footer;