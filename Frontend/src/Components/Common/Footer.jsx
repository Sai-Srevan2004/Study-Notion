import React from "react";
import { FooterLink2 } from "../../data/footer-links";
import { Link } from "react-router-dom";
import './Common.css'

// Images
import Logo from "../../assets/Logo/Logo-Full-Light.png";

// Icons
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className="footer-top">
          {/* Left Section */}
          <div className="footer-left">
            <img src={Logo} alt="Logo" className="footer-logo" />
            <h1 className="footer-title">Company</h1>
            <div className="footer-links">
              {["Subjects", "Language", "Career Building"].map((ele, i) => (
                <div key={i} className="footer-link">
                  <Link to={ele.toLowerCase()}>{ele}</Link>
                </div>
              ))}
            </div>
            <div className="social-icons">
              <FaFacebook />
              <FaGoogle />
              <FaTwitter />
              <FaYoutube />
            </div>
          </div>

          {/* Horizontal Line */}
          <div className="footer-divider"></div>

          {/* Middle Section */}
          <div className="footer-middle">
            <h1 className="footer-title">StudyNotion Resources</h1>
            <div className="footer-links">
              {Resources.map((ele, index) => (
                <div key={index} className="footer-link">
                  <Link to={ele.split(" ").join("-").toLowerCase()}>{ele}</Link>
                </div>
              ))}
            </div>

            <h1 className="footer-title mt-7">Support</h1>
            <div className="footer-link">
              <Link to={"/help-center"}>Help Center</Link>
            </div>
          </div>

          {/* Right Section */}
          <div className="footer-right">
            <h1 className="footer-title">Plans</h1>
            <div className="footer-links">
              {Plans.map((ele, index) => (
                <div key={index} className="footer-link">
                  <Link to={ele.split(" ").join("-").toLowerCase()}>{ele}</Link>
                </div>
              ))}
            </div>

            <h1 className="footer-title mt-7">Community</h1>
            <div className="footer-links">
              {Community.map((ele, index) => (
                <div key={index} className="footer-link">
                  <Link to={ele.split(" ").join("-").toLowerCase()}>{ele}</Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section with FooterLink2 */}
        <div className="footer-lower-section">
          <div className="footer-column">
            {FooterLink2.map((ele, i) => (
              <div key={i} className="footer-column-content">
                <h1 className="footer-title">{ele.title}</h1>
                <div className="footer-links">
                  {ele.links.map((link, index) => (
                    <div key={index} className="footer-link">
                      <Link to={link.link}>{link.title}</Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <div className="footer-bottom-links">
            {BottomFooter.map((ele, i) => (
              <div key={i} className="footer-bottom-link">
                <Link to={ele.split(" ").join("-").toLocaleLowerCase()}>
                  {ele}
                </Link>
              </div>
            ))}
          </div>
          <div className="footer-made-with-love">
            Made with ❤️ CodeHelp © 2023 Studynotion
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
