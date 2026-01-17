require('dotenv').config();
const express = require('express');
const { ethers } = require('ethers'); 
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// 1. Kiểm tra biến môi trường trước khi khởi tạo
const RPC_URL = process.env.RPC_URL || "https://ethereum-sepolia-rpc.publicnode.com";
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

if (!CONTRACT_ADDRESS) {
    console.error("❌ LỖI: CONTRACT_ADDRESS chưa được cấu hình trong Environment Variables!");
}

// 2. Thiết lập kết nối Blockchain
const provider = new ethers.JsonRpcProvider(RPC_URL);
const contractABI = require("./abi.json");

// Khởi tạo contract (Thêm kiểm tra để tránh lỗi target=null trên Render)
let contract;
if (CONTRACT_ADDRESS) {
    contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, provider);
}

// 3. API truy xuất thông tin sản phẩm
app.get('/api/product/:id', async (req, res) => {
    const productId = req.params.id;

    if (!contract) {
        return res.status(500).json({ success: false, error: "Server chưa cấu hình Contract Address" });
    }

    try {
        // Gọi hàm từ Smart Contract
        const historyText = await contract.getFullHistory(productId);
        
        // Tách chuỗi theo dòng và loại bỏ dòng trống
        const lines = historyText.split('\n').filter(line => line.trim() !== "");
        
        if (lines.length === 0) {
            return res.status(404).json({ success: false, error: "Sản phẩm chưa có dữ liệu trên Blockchain" });
        }

        // Tách tên sản phẩm (Giả sử dòng đầu tiên là: "Sản phẩm: Tên")
        const productName = lines[0].replace("Sản phẩm: ", "").trim();
        
        // Xử lý Timeline từ dòng thứ 2 trở đi
        const timelineData = lines.slice(1).map(line => {
            // Cấu trúc mong đợi: "[Thời gian] Trạng thái: Chi tiết"
            const timePart = line.substring(line.indexOf("[") + 1, line.indexOf("]")); 
            const rest = line.substring(line.indexOf("] ") + 2); 
            const status = rest.split(':')[0].trim();
            const detail = rest.includes(':') ? rest.split(':').slice(1).join(':').trim() : rest;

            return {
                thoiGian: timePart,
                trangThai: status,
                chiTiet: detail
            };
        });

        res.json({ 
            success: true, 
            tenSanPham: productName, 
            lichSuTruyXuat: timelineData 
        });

    } catch (error) {
        console.error("Lỗi Consumer API:", error);
        res.status(500).json({ 
            success: false, 
            error: "Không tìm thấy ID sản phẩm hoặc lỗi kết nối mạng lưới!" 
        });
    }
});

// 4. Khởi chạy Server
const PORT = process.env.PORT || 3000; // Render sẽ cấp Port tự động qua biến môi trường
app.listen(PORT, () => {
    console.log(`-----------------------------------------`);
    console.log(`🚀 TraceChain API đang chạy tại Port: ${PORT}`);
    console.log(`📍 Contract: ${CONTRACT_ADDRESS || "CHƯA CẤU HÌNH"}`);
    console.log(`-----------------------------------------`);
});