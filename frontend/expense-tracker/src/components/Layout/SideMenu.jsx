import React, { useEffect, useState } from "react";
import { SIDE_MENU_DATA } from "../../utils/data.js";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CharAvatar from "../Cards/CharAvatar.jsx";
import { resolveImageUrl } from "../../utils/helper";

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "/logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  const [imgError, setImgError] = useState(false);

  // Reset image error when profile image URL changes
  useEffect(() => {
    setImgError(false);
  }, [user?.profileImageUrl]);

  return (
    <div className="w-64 h-[calc(100vh-60px)] bg-white border-r border-gray-200/50 p-5 sticky top-[60px] z-20">
      <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
        {user?.profileImageUrl && !imgError ? (
          <img
            src={resolveImageUrl(user?.profileImageUrl) || ""}
            alt={user.fullName}
            className="w-20 h-20 bg-slate-400 rounded-full"
            onError={() => setImgError(true)}
          />
        ) : (
          <CharAvatar
           fullName={user?.fullName || ""}
           width="w-20"
          height="h-20"
          style="text-xl"
          />
        )}
        <h5 className="text-gray-900 font-medium leading-6">{user?.fullName || ""}</h5>
      </div>
      {SIDE_MENU_DATA.map((item,index) => (
        <button
          key={`menu_${index}`}
          className={`w-full flex items-center gap-4 text-[15px]
      ${
        activeMenu == item.label
          ? "text-white bg-primary"
          : "text-gray-600 hover:text-primary"
      }
          py-3
          px-6
          rounded-lg
          mb-3`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-xl" />
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default SideMenu;
