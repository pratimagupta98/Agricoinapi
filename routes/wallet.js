const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const { tokenverify } = require("../functions/tokenverify");


const { deposite_wallet, getwallet ,balanceApi,addwallet,del_wallet} = require("../controller/wallet");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      let path = `./img`;
      if (!fs.existsSync("img")) {
        fs.mkdirSync("img");
      }
      cb(null, path);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  
  const fileFilter = (req, file, cb) => {
    if (
      file.mimetype.includes("jpeg") ||
      file.mimetype.includes("png") ||
      file.mimetype.includes("jpg")
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  let uploads = multer({ storage: storage });

  
// Paths

router.post("/admin/deposite_wallet",uploads.single("depsite_file"), deposite_wallet);
 
router.get("/admin/getwallet", getwallet);
router.post("/admin/balanceApi", balanceApi);
router.post("/admin/addwallet", addwallet);
router.post("/admin/del_wallet/:id", del_wallet);

module.exports = router;
 