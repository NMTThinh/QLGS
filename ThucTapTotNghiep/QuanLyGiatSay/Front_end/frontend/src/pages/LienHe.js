import React from "react";
import "./LienHe.css";
import contactImage from "../assets/lienhe.avif"; 

function LienHe() {
  return (
    <div className="contact-container">
      <h2>Liên Hệ Với Chúng Tôi</h2>

      <div className="contact-content">
        {/* Cột hình ảnh minh họa */}
        <div className="contact-image">
          <img src={contactImage} alt="Liên hệ" />
        </div>

        {/* Form và thông tin */}
        <div className="contact-info-form">
          <div className="contact-info">
            <h3>Thông tin liên hệ</h3>
            <p>📍 Địa chỉ: 123 Đường Nguyễn Văn Cừ, Ninh Kiều, Cần Thơ</p>
            <p>📞 Điện thoại: 0123 456 789</p>
            <p>📧 Email: giatsay24h@gmail.com</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default LienHe;
