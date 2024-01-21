const express = require('express');
const QRCode = require('qrcode');
const app = express();
const port = 3000;

// Your JSON data
const jsonData = {
    id: "7f38a193-0918-4a48-9fac-36adfdb8b542",
    typ: "application/iden3comm-plain-json",
    type: "https://iden3-communication.io/proofs/1.0/contract-invoke-request",
    thid: "7f38a193-0918-4a48-9fac-36adfdb8b542",
    body: {
        reason: "airdrop participation",
        transaction_data: {
            contract_address: "0x4A16e2a8e8fd6ebd6d396C36C6dbF4366D4724c5",
            method_id: "b68967e2",
            chain_id: 80001,
            network: "polygon-mumbai"
        },
        scope: [
            {
                id: 1,
                circuitId: "credentialAtomicQuerySigV2OnChain",
                query: {
                    allowedIssuers: ["*"],
                    context: "https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json-ld/kyc-v3.json-ld",
                    credentialSubject: {
                        birthday: {"$lt": 20020101}
                    },
                    type: "KYCAgeCredential"
                }
            }
        ]
    }
};

// Convert JSON object to string
const jsonString = JSON.stringify(jsonData);

app.get('/', (req, res) => {
    QRCode.toDataURL(jsonString, { errorCorrectionLevel: 'H' }, function (err, url) {
        if (err) {
            res.send("Error generating QR Code");
            return;
        }
        res.send(`<img src="${url}" alt="QR Code">`);
    });
});

app.listen(port, () => {
    console.log(`QR Code app listening at http://localhost:${port}`);
});
