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
        string processingDetails;
        string productType;
        string batchNumber;
        string shelfLife;
        string contaminationLog;
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
}