require('dotenv').config();
const express = require('express');
const { ethers } = require('ethers'); // Import trực tiếp từ ethers v6
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// SỬA LỖI TẠI ĐÂY: Trong v6 không dùng .providers
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const contractABI = require("./abi.json");
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, contractABI, provider);

app.get('/api/product/:id', async (req, res) => {
    try {
        // Hàm getFullHistory là hàm view (read-only) nên dùng được bình thường
        const historyText = await contract.getFullHistory(req.params.id);
        const lines = historyText.split('\n').filter(line => line.trim() !== "");
        
        if (lines.length === 0) throw new Error("Sản phẩm chưa có dữ liệu");

        // Tách tên sản phẩm (Dòng 0)
        const productName = lines[0].replace("Sản phẩm: ", "").trim();
        
        // Xử lý Timeline (Dòng 1 trở đi)
        const timelineData = lines.slice(1).map(line => {
            const timePart = line.substring(line.indexOf("[") + 1, line.indexOf("]")); 
            const actionPart = line.substring(line.indexOf("] ") + 2); 

            return {
                thoiGian: timePart,
                chiTiet: actionPart, 
                trangThai: actionPart.split(':')[0].trim() 
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
            error: "ID sản phẩm không tồn tại hoặc lỗi kết nối Blockchain!" 
        });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`-----------------------------------------`);
    console.log(`Consumer API v6 chạy tại: http://localhost:${PORT}`);
    console.log(`-----------------------------------------`);
});