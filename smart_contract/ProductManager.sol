// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Roles.sol";
import "./DairyData.sol";
import "https://github.com/bokkypoobah/BokkyPooBahsDateTimeLibrary/blob/master/contracts/BokkyPooBahsDateTimeLibrary.sol";

contract ProductManager is Roles, DairyData {
    using BokkyPooBahsDateTimeLibrary for uint256;

    function createProduct(string memory _name, string memory _farmer, string memory _breed) public onlyFarmer {
        productCount++;
        Product storage p = products[productCount];
        p.id = productCount;
        p.name = _name;
        p.farmerName = _farmer;
        p.cattleBreed = _breed;
        p.status = unicode"Đã thu hoạch";
        p.isExists = true;
        p.currentState = State.Farm;

        _addLog(productCount, unicode"Khởi tạo lô sữa tươi", unicode"Nông dân");
    }

    function updateByFactory(
        uint256 _id, 
        string memory _status,
        string memory _procDetails,
        string memory _pType,
        string memory _shelfLife,
        string memory _batchNum,
        string memory _conLog, 
        string memory _aduLog
    ) public onlyFactory {
        require(products[_id].isExists, unicode"Sản phẩm không tồn tại");
        require(products[_id].currentState == State.Farm, unicode"Lỗi: Phải thực hiện sau bước Nông trại");

        Product storage p = products[_id];
        p.status = _status;
        p.processingDetails = _procDetails;
        p.productType = _pType;
        p.shelfLife = _shelfLife;
        p.batchNumber = _batchNum;
        p.contaminationLog = _conLog;
        p.adulterationLog = _aduLog;
        p.currentState = State.Factory;

        string memory logContent = string(abi.encodePacked(
            unicode"Nhà máy: ", _pType, 
            unicode" | HSD: ", _shelfLife, 
            unicode" | Lô: ", _batchNum
        ));
        _addLog(_id, logContent, unicode"Nhà máy");
    }

    function updateByTransport(
        uint256 _id, 
        string memory _status,
        string memory _shipNum,
        string memory _vehicle,
        string memory _route
    ) public onlyTransport {
        require(products[_id].currentState == State.Factory, unicode"Lỗi: Sản phẩm chưa qua kiểm định Nhà máy");

        Product storage p = products[_id];
        p.status = _status;
        p.shipmentNumber = _shipNum;
        p.currentState = State.Transport;

        string memory logMsg = string(abi.encodePacked(
            unicode"Vận chuyển: ", _status, 
            unicode" | Xe: ", _vehicle, 
            unicode" | Tuyến: ", _route
        ));
        _addLog(_id, logMsg, unicode"Vận chuyển");
    }

    function updateByDistributor(
        uint256 _id, 
        string memory _status,
        uint256 _orderNum,
        uint256 _returnedQty,
        string memory _billing,
        string memory _conCheck
    ) public onlyDistributor {
        require(products[_id].currentState == State.Transport, unicode"Lỗi: Sản phẩm chưa được vận chuyển");

        Product storage p = products[_id];
        p.status = _status;
        p.orderNumber = _orderNum;
        p.returnedQuantity = _returnedQty;
        p.billingInfo = _billing;
        p.currentState = State.Distributor;

        string memory logMsg = string(abi.encodePacked(
            unicode"Phân phối: ", _status, 
            unicode" | Đơn: ", _u(_orderNum),
            unicode" | Kiểm tra: ", _conCheck
        ));
        _addLog(_id, logMsg, unicode"Nhà phân phối");
    }

    function getFullHistory(uint256 _id) public view returns (string memory) {
        require(products[_id].isExists, "Not exists");
        Product storage p = products[_id];
        string memory out = string(abi.encodePacked(unicode"Sản phẩm: ", p.name, "\n"));
        for (uint i = 0; i < p.history.length; i++) {
            out = string(abi.encodePacked(out, "[", p.history[i].readableTime, "] ", p.history[i].action, "\n"));
        }
        return out;
    }

    function _addLog(uint256 _id, string memory _act, string memory _role) internal {
        uint256 timestampVN = block.timestamp + 7 hours;
        (uint year, uint month, uint day, uint hour, uint minute, ) = timestampVN.timestampToDateTime();
        string memory dateStr = string(abi.encodePacked(_u(day), "/", _u(month), "/", _u(year)));
        string memory timeStr = string(abi.encodePacked(_u(hour), ":", (minute < 10 ? string(abi.encodePacked("0", _u(minute))) : _u(minute))));
        string memory fullDateTime = string(abi.encodePacked(dateStr, " ", timeStr));
        products[_id].history.push(ChangeLog(msg.sender, _act, _role, fullDateTime));
    }

    function _u(uint256 _v) internal pure returns (string memory) {
        if (_v == 0) return "0";
        uint256 temp = _v; uint256 dig;
        while (temp != 0) { dig++; temp /= 10; }
        bytes memory b = new bytes(dig);
        while (_v != 0) { b[--dig] = bytes1(uint8(48 + uint256(_v % 10))); _v /= 10; }
        return string(b);
    }
}