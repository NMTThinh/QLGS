import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./DichVu.css";

function DichVu() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filteredServices, setFilteredServices] = useState([]);

  const location = useLocation();

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

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const keyword = queryParams.get("keyword");
    if (keyword) {
      // Lọc dịch vụ theo tên nếu có keyword
      const filtered = services.filter((service) =>
        service.name.toLowerCase().includes(keyword.toLowerCase())
      );
      setFilteredServices(filtered);
    } else {
      setFilteredServices(services); // Nếu không có tìm kiếm, hiển thị tất cả dịch vụ
    }
  }, [location.search, services]);

  return (
    <div className="service-page">
      <h2 className="service-title">Danh Sách Dịch Vụ</h2>

      {loading && <p>Đang tải dữ liệu...</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="service-list">
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <div className="service-card" key={service._id}>
              <img
                src={service.image || "/default-service.jpg"}
                alt={service.name}
                className="service-img"
              />
              <h3>{service.name}</h3>
              <p>{service.description}</p>
            </div>
          ))
        ) : (
          <p>Không có dịch vụ nào phù hợp với tìm kiếm của bạn.</p>
        )}
      </div>
    </div>
  );
}

export default DichVu;
