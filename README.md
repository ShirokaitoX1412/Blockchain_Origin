# TraceChain - Dairy Supply Chain 


## Hệ thống truy xuất nguồn gốc sữa dựa trên công nghệ **Blockchain (Ethereum/EVM)**. Giải pháp này giúp minh bạch hóa toàn bộ hành trình sản phẩm từ trang trại đến tay người tiêu dùng.
This project has a minimal setup of Hardhat 3 Beta, without any plugins.


## 📋 Mục lục
1. [Giới thiệu](#-giới-thiệu)
2. [Các chức năng chính](#-các-chức-năng-chính)
3. [Cài đặt hệ thống](#-cài-đặt-hệ-thống)
4. [Quy trình vận hành](#-quy-trình-vận-hành)
5. [Cấu trúc thư mục](#-cấu-trúc-thư-mục)

---

## 🌟 Giới thiệu
Dự án sử dụng **Smart Contract** để lưu trữ dữ liệu không thể thay đổi, kết hợp với giao diện Web3 và hệ thống tra cứu qua mã **QR Code** vật lý.


## 🚀 Các chức năng chính

### 🔐 Phân quyền vai trò (RBAC)
Hệ thống tự động nhận diện vai trò dựa trên địa chỉ ví MetaMask:
<div align="center">
 <img width="344" height="357" alt="{8872D8F5-594C-4975-829C-30964CFE1EC4}" src="https://github.com/user-attachments/assets/9879a307-9a58-4f86-a29b-c4d74060d7c7" />
</div>

* **Tổng quản trị (Admin):** Gán quyền cho các thành viên trong chuỗi cung ứng.
 <div align="center">
  <img width="842" height="743" alt="{CB245594-300E-4E63-915B-13F3CBDC8114}" src="https://github.com/user-attachments/assets/a7769fff-524c-4feb-81ed-7035c618f4f3" />
</div>

* **Nông dân (Farmer):** Khởi tạo sản phẩm, nhập giống bò, chủ trang trại.
<div align="center">
  <img width="560" height="435" alt="{CFD08C1A-5284-4D6A-AB49-1FF306468EB5}" src="https://github.com/user-attachments/assets/cd909b60-1b4e-4e11-b623-f8aa786837e5" />
 
</div>

* **Nhà máy (Factory):** Cập nhật quy trình chế biến, kiểm định chất lượng, hạn sử dụng.
<div align="center">
 <img width="1106" height="261" alt="{6E54D503-49D5-454A-BF01-EA903CE6A6BD}" src="https://github.com/user-attachments/assets/e9af878c-92d9-4880-adca-c1a9cdf7ea5b" />

</div>

* **Vận tải (Transport):** Cập nhật số vận đơn, lộ trình vận chuyển.
<div align="center">
 <img width="536" height="348" alt="{A08C108A-164E-4B00-B641-6B5AE9645DEB}" src="https://github.com/user-attachments/assets/04272177-b782-4009-9bee-4591cdc92951" />

</div>

* **Nhà phân phối (Distributor):** Xác nhận nhập kho, kiểm định tại chỗ, hóa đơn.
<div align="center">
 <img width="1089" height="190" alt="{D2F0242E-AA6C-4189-8EED-65F0D92FCB47}" src="https://github.com/user-attachments/assets/b0ab4b11-bcd2-425d-9c16-f5d2c5362e1d" />

</div>


### 🔍 Truy xuất & QR Code
* **Tạo mã QR tự động:** Sinh mã QR chứa URL tra cứu ngay sau khi nông dân tạo sản phẩm thành công.
  <img width="236" height="212" alt="{B3106BE4-3C4D-4975-8947-35C1EBC5F494}" src="https://github.com/user-attachments/assets/b121269e-5a8c-45dd-b056-4425f1c9908d" />

  
* **Tra cứu không cần ví:** Người tiêu dùng có thể xem lịch sử Blockchain mà không cần cài đặt MetaMask.
<div align="center">
 <img width="942" height="756" alt="{9B7DFB3E-3249-46E7-ABB8-130433EBFE72}" src="https://github.com/user-attachments/assets/d0b91ee0-c6ed-4ae1-a922-7a1b8e162be2" />

</div>

---

## 🛠. Cài đặt hệ thống

### A. Yêu cầu môi trường
* **MetaMask Extension:** Đã cài đặt trên trình duyệt và kết nối mạng thử nghiệm (Sepolia hoặc Localhost).
* **Node.js:** Phiên bản 18.x trở lên để chạy Backend.
* **Web Server:** Sử dụng extension **Live Server** trong VS Code để chạy Frontend.

### B. Triển khai Backend (Consumer API)
Thư mục `backend_consumer` đóng vai trò là cầu nối giữa Blockchain và người dùng cuối, giúp tra cứu dữ liệu không cần ví MetaMask.
1. Di chuyển vào thư mục: `cd backend_consumer`
2. Cài đặt thư viện: `npm install`
3. Khởi chạy server: `node consumer.js`
*Mặc định server sẽ lắng nghe tại cổng: `http://localhost:3000`*

### C. Cấu hình kết nối Web3
Mở file `js/abi.js` và cập nhật thông tin từ Remix IDE:
* **CONTRACT_ADDRESS:** Địa chỉ Contract sau khi Deploy thành công.
* **CONTRACT_ABI:** Mảng JSON ABI 

---

## 📝 Quy trình vận hành (Demo Workflow)

Hệ thống hoạt động theo mô hình máy trạng thái (State Machine), đảm bảo tính tuần tự và minh bạch.



1.  **Giai đoạn Setup (Admin):** Tổng quản trị sử dụng ví Admin để gán quyền cho các địa chỉ ví thành viên qua chức năng "Gán quyền trên Blockchain".
2.  **Giai đoạn Sản xuất (Farmer):** Nông dân khởi tạo lô sữa. Blockchain tự động cấp số **ID duy nhất** và giao diện sinh mã **QR Code** tương ứng.
3.  **Giai đoạn Chế biến & Vận chuyển:** Các đơn vị Nhà máy, Vận tải sử dụng ID được cấp để cập nhật các thông số kỹ thuật (Số lô, HSD, Vận đơn) lên sổ cái.
4.  **Giai đoạn Kiểm chứng (Consumer):** Người dùng quét mã QR vật lý hoặc nhập ID vào trang tra cứu để xem toàn bộ Timeline hành trình đã được xác thực.

---

## 📂Cấu trúc thư mục dự án

```text
Blockchain_Origin/
├── contracts/             # Mã nguồn Smart Contract (.sol)
├── Frontend/              # Giao diện người dùng & Quản trị
│   ├── admin.html         # Portal dành cho các bên cung ứng (Web3)
│   ├── index.html         # Trang tra cứu dành cho khách hàng
│   └── js/
│       └── abi.js         # Tệp cấu hình ABI và Address Contract
├── backend_consumer/      # Server Node.js xử lý dữ liệu tra cứu
│   ├── consumer.js        # Logic API kết nối Blockchain
│   └── package.json       # Danh sách thư viện phụ thuộc
└── README.md              # Tài liệu hướng dẫn dự án
The project includes native support for TypeScript, Hardhat scripts, tasks, and support for Solidity compilation and tests.
