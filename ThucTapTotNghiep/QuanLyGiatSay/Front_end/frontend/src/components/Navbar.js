import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.png";
import searchIcon from "../assets/search.png";

function Navbar() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      // Điều hướng tới trang dịch vụ và gửi tham số tìm kiếm theo tên dịch vụ
      navigate(`/dich-vu?keyword=${encodeURIComponent(keyword.trim())}`);
      setKeyword(""); // Reset ô tìm kiếm
    }
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo-img" />
        <h2 className="logo-text">Giặt Sấy 24h</h2>
      </div>

      <ul className="nav-links">
        <li><Link to="/">Trang Chủ</Link></li>
        <li><Link to="/dich-vu">Dịch Vụ</Link></li>
        <li><Link to="/bang-gia">Bảng Giá</Link></li>
        <li><Link to="/lien-he">Liên Hệ</Link></li>
      </ul>

      <form className="navbar-search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Tìm kiếm dịch vụ..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button type="submit">
          <img src={searchIcon} alt="Tìm kiếm" className="search-icon-img" />
        </button>
      </form>
    </nav>
  );
}

export default Navbar;
