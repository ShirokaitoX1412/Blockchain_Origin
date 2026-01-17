
const CONTRACT_ADDRESS = "0xc4AB787EFa42c6C4A3c3203517Bb8883a235A68b";
const CONTRACT_ABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_farmer",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_breed",
				"type": "string"
			}
		],
		"name": "createProduct",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_nongDan",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_nhaMay",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_vanChuyen",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_nhaPhanPhoi",
				"type": "address"
			}
		],
		"name": "setupChain",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_status",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_orderNum",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_returnedQty",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_billing",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_conCheck",
				"type": "string"
			}
		],
		"name": "updateByDistributor",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_status",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_procDetails",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_pType",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_shelfLife",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_batchNum",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_conLog",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_aduLog",
				"type": "string"
			}
		],
		"name": "updateByFactory",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_status",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_shipNum",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_vehicle",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_route",
				"type": "string"
			}
		],
		"name": "updateByTransport",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "admin",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getFullHistory",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "nhaMay",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "nhaPhanPhoi",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "nongDan",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "productCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "vanChuyen",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
;

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CONTRACT_ADDRESS, CONTRACT_ABI };
}