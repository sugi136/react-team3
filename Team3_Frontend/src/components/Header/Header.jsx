import React, { useEffect, useState } from "react";
import { FiSearch, FiUser } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import "./Header.css";
import WeatherWidget from "./WeatherWidget.jsx";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null); // 초기 상태를 null로 설정

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // 메인 페이지로 이동할 때 activeMenu 초기화
    if (isHome) {
      setActiveMenu(null);
    }
  }, [isHome]);

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    // 필요한 경우 각 메뉴에 맞는 페이지로 이동
    if (menu === "영화") navigate("/movies");
    if (menu === "예능") navigate("/entertainment");
    if (menu === "드라마") navigate("/dramas");
    if (menu === "키즈/애니") navigate("/kids");
  };

  return (
    <header
      className={`header ${isHome ? "header-home" : ""} ${
        isScrolled ? "header-scrolled" : ""
      }`}
    >
      <div className="logo" onClick={() => navigate("/")}>
        <img src="/images/LG_logo.png" alt="LG Logo" className="logo-image" />
        <span className="logo-text">
          <span className="Hello">Hello</span>TV
        </span>
      </div>
      <nav className="Nav">
        <ul>
          {["영화", "예능", "드라마", "키즈/애니"].map((menu) => (
            <li
              key={menu}
              className={activeMenu === menu ? "active" : ""}
              onClick={() => handleMenuClick(menu)}
            >
              {menu}
            </li>
          ))}
        </ul>
      </nav>
      <div className="icons">
        {location.pathname !== "/search" && (
          <FiSearch className="icon" onClick={() => navigate("/search")} />
        )}
        <FiUser
          className={`icon ${location.pathname === "/mypage" ? "active" : ""}`}
          onClick={() => navigate("/mypage")}
        />
        <WeatherWidget />
      </div>
      {isHome && !isScrolled && <div className="gradient-banner"></div>} {/* 그라데이션 영역 */}
    </header>
  );
};

export default Header;
