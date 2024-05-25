import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileInfo from "../Cards/ProfileInfo";
import SearchBar from "../SearchBar/SearchBar";

const Navbar = ({ Theme, color, handleTheme, icon, bgSearch , userInfo, onSearchNote , handleClearSearch}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate(); // Gọi useNavigate như một hàm

  const onLogout = () => {
    localStorage.clear();``
    navigate("/login");
  };

  const handleSearch = () => {
    if(searchQuery) {
      onSearchNote(searchQuery)
    
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch()
  };

  return (
    <div className={`${Theme ? 'bg-dark-mode' : 'bg-white'} flex items-center justify-between px-6 py-2 drop-shadow`}>
      <h2 className={`${color ? 'text-white' : 'text-black'} text-xl font-medium py-2`}>
        Notes
      </h2>
      <SearchBar
        
        searchQuery={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        color={color}
        bgSearch={bgSearch}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />
      <div className="flex">
        <button onClick={handleTheme} className={`${color ? 'text-white' : 'text-black'}`}>
          {icon ? '🌙' : '🌞'}
        </button>
        <ProfileInfo
          userInfo={userInfo}
          Theme={Theme}
          color={color}
          handleTheme={handleTheme}
          icon={icon}
          onLogout={onLogout}
        />
      </div>
    </div>
  );
};

export default Navbar;
