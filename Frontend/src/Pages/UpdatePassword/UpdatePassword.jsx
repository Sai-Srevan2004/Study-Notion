import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../../services/operations/authAPI";
import "./UpdatePassword.css";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({ password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { password, confirmPassword } = formData;

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const token = location.pathname.split("/").at(-1);
    dispatch(resetPassword(password, confirmPassword, token, navigate));
  };

  return (
    <div className="update-password-container">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="update-password-form">
          <h1 className="update-password-title">Choose new password</h1>
          <p className="update-password-description">
            Almost done. Enter your new password and you're all set.
          </p>
          <form onSubmit={handleOnSubmit}>
            <PasswordInput
              label="New Password"
              name="password"
              value={password}
              onChange={handleOnChange}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
            <PasswordInput
              label="Confirm New Password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              showPassword={showConfirmPassword}
              setShowPassword={setShowConfirmPassword}
            />
            <button type="submit" className="update-password-button">
              Reset Password
            </button>
          </form>
          <div className="back-to-login">
            <Link to="/login" className="back-link">
              <BiArrowBack /> Back To Login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

const PasswordInput = ({ label, name, value, onChange, showPassword, setShowPassword }) => (
  <label className="password-input-label">
    <p className="password-input-label-text">
      {label} <sup className="required">*</sup>
    </p>
    <input
      required
      type={showPassword ? "text" : "password"}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={label}
      className="password-input-field"
    />
    <span
      onClick={() => setShowPassword((prev) => !prev)}
      className="password-eye-icon"
    >
      {showPassword ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" /> : <AiOutlineEye fontSize={24} fill="#AFB2BF" />}
    </span>
  </label>
);

export default UpdatePassword;
