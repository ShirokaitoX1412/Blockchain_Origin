// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DairyData {
    struct ChangeLog {
        address actionBy;
        string action;
        string role;
        string readableTime; 
    }

    enum State { Farm, Factory, Transport, Distributor }

    struct Product {
        uint256 id;
        string name;
        string status;
        bool isExists;
        
        // Dữ liệu Nông trại
        string farmerName;
        string cattleBreed;
        
        // Dữ liệu Nhà máy
        string processingDetails; // <--- Có thể lưu IPFS CID cho quy trình chế biến
        string productType;
        string batchNumber;
        string shelfLife;
        string contaminationLog;  // <--- Ưu tiên lưu IPFS CID (Mã băm Qm...) tại đây
        string adulterationLog;
        
        // Dữ liệu Vận chuyển
        string shipmentNumber;
        
        // Dữ liệu Nhà phân phối
        uint256 orderNumber;
        uint256 returnedQuantity;
        string billingInfo;

        State currentState;
        ChangeLog[] history;
    }

    mapping(uint256 => Product) internal products;
    uint256 public productCount;

    // Thêm hàm bổ trợ để Frontend (Consumer Page) dễ dàng lấy dữ liệu Product
    function getProduct(uint256 _id) public view returns (
        string memory name, 
        string memory status, 
        string memory cLog, // contaminationLog (IPFS)
        State state
    ) {
        Product storage p = products[_id];
        return (p.name, p.status, p.contaminationLog, p.currentState);
    }
}