import { FcGoogle } from "react-icons/fc";
import { useSelector } from "react-redux";

import frameImg from "../../../assets/Images/frame.png";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

import "./Auth.css"; // Import the external CSS

function Template({ title, description1, description2, image, formType }) {
  const { loading } = useSelector((state) => state.auth);

  return (
    <div className="template-container">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="template-content">
          {/* Left Content */}
          <div className="template-left">
            <h1 className="template-title">{title}</h1>
            <p className="template-description">
              <span className="text-primary">{description1}</span>{" "}
              <span className="highlighted-text">{description2}</span>
            </p>
            {formType === "signup" ? <SignupForm /> : <LoginForm />}
          </div>

          {/* Right Content */}
          <div className="template-right">
            <img
              src={frameImg}
              alt="Pattern"
              className="frame-image"
              loading="lazy"
            />
            <img
              src={image}
              alt="Students"
              className="students-image"
              loading="lazy"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Template;
