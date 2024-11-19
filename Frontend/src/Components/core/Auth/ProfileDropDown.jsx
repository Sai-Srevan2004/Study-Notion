import { useRef, useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { logout } from "../../../services/operations/authAPI";

import "./Auth.css"; // Import the external CSS

export default function ProfileDropdown() {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useOnClickOutside(ref, () => setOpen(false));

  if (!user) return null;

  return (
    <button className="profile-dropdown" onClick={() => setOpen(true)}>
      {/* Profile Image and Dropdown Icon */}
      <div className="dropdown-header">
        <img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className="profile-image"
        />
        <AiOutlineCaretDown className="dropdown-icon" />
      </div>

      {/* Dropdown Menu */}
      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="dropdown-menu"
          ref={ref}
        >
          {/* Dashboard Link */}
          <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
            <div className="dropdown-item">
              <VscDashboard className="dropdown-icon-large" />
              Dashboard
            </div>
          </Link>

          {/* Logout Option */}
          <div
            onClick={() => {
              dispatch(logout(navigate));
              setOpen(false);
            }}
            className="dropdown-item"
          >
            <VscSignOut className="dropdown-icon-large" />
            Logout
          </div>
        </div>
      )}
    </button>
  );
}
