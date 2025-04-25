import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./DichVu.css"; // Đảm bảo bạn đã tạo file CSS cho trang này

function DichVu() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Lấy dữ liệu dịch vụ từ API
    axios
      .get("http://localhost:3000/services/list") // Đảm bảo URL này chính xác với backend của bạn
      .then((response) => {
        console.log("Dữ liệu từ API:", response.data); // Kiểm tra dữ liệu nhận được
        const servicesData = response.data.data.entities || []; // Đảm bảo rằng bạn lấy đúng dữ liệu
        setServices(servicesData); // Cập nhật state với dữ liệu nhận được
        setLoading(false); // Đổi trạng thái loading
      })
      .catch((error) => {
        setError("Không thể tải dữ liệu dịch vụ.");
        setLoading(false);
        console.error("Error fetching services:", error); // In lỗi nếu có
      });
  }, []); // Chỉ gọi API một lần khi component mount

  const handleDetailClick = (id) => {
    // Điều hướng đến trang chi tiết dịch vụ
    navigate(`/dich-vu/${id}`);
  };

  return (
    <div className="service-page">
      <h2 className="service-title">Danh Sách Dịch Vụ</h2>

      {loading && <p>Đang tải dữ liệu...</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="service-list">
        {services.length > 0 ? (
          services.map((service) => (
            <div className="service-card" key={service._id}>
              <img
                src={service.image || "/default-service.jpg"}
                alt={service.name}
                className="service-img"
              />
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <button
                className="service-btn"
                onClick={() => handleDetailClick(service._id)}
              >
                Tìm Hiểu Thêm
              </button>
            </div>
          ))
        ) : (
          <p>Không có dịch vụ nào.</p>
        )}
      </div>
    </div>
  );
}

export default DichVu;
