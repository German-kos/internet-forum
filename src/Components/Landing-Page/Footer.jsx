import { Divider, IconButton } from "@mui/material";
import "./CSS-Files/Footer.css";

function Footer() {
  return (
    <div className="footerStyle">
      <div style={{ color: "rgb(68, 68, 68)" }}>FIND US ON</div>
      <div className="FooterLinks">
        <a className="footerLink" href="https://facebook.com/" target="_blank">
          <img src="./files/images/facebook.png" />
        </a>
        <Divider orientation="vertical" flexItem={true} variant="middle" />
        <a className="footerLink" href="https://twitter.com/" target="_blank">
          <img src="./files/images/twitter.png" />
        </a>
        <Divider orientation="vertical" flexItem={true} variant="middle" />
        <a
          className="footerLink"
          href="https://github.com/german-kos"
          target="_blank"
        >
          <img src="./files/images/github.png" />
        </a>
        <Divider orientation="vertical" flexItem={true} variant="middle" />
        <a
          className="footerLink"
          href="https://www.linkedin.com/in/german-kostiakov-02a405224/"
          target="_blank"
        >
          <img src="./files/images/linkedin.png" />
        </a>
      </div>
      <div style={{ color: "rgb(68, 68, 68)" }}>
        © 2022, German Kostiakov, All rights reserved.
      </div>
    </div>
  );
}
export default Footer;
