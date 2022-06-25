import { Link } from "react-router-dom";

const Footer = (props) => {
    return (
        <footer className="Footer">
            <div>
                <h3>Kyle Burton</h3>
                <nav>
                    <Link to="/">Links</Link> |{" "}
                    <Link to="/print">Printing Guide</Link>
                </nav>
            </div>
        </footer>
    );
}

export default Footer;