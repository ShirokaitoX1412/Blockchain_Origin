// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Roles {
    address public admin;
    address public nongDan;
    address public nhaMay;
    address public vanChuyen;
    address public nhaPhanPhoi;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() { require(msg.sender == admin, unicode"Chỉ Admin mới có quyền"); _; }
    modifier onlyFarmer() { require(msg.sender == nongDan, unicode"Chỉ Nông dân mới có quyền"); _; }
    modifier onlyFactory() { require(msg.sender == nhaMay, unicode"Chỉ Nhà máy mới có quyền"); _; }
    modifier onlyTransport() { require(msg.sender == vanChuyen, unicode"Chỉ Vận chuyển mới có quyền"); _; }
    modifier onlyDistributor() { require(msg.sender == nhaPhanPhoi, unicode"Chỉ Nhà phân phối mới có quyền"); _; }

   function setupChain(address _nongDan, address _nhaMay, address _vanChuyen, address _nhaPhanPhoi) public onlyAdmin {
    nongDan = _nongDan;
    nhaMay = _nhaMay;
    vanChuyen = _vanChuyen;
    nhaPhanPhoi = _nhaPhanPhoi; 
}
}