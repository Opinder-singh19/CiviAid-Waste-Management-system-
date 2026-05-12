const express =
require("express");

const router =
express.Router();

const multer =
require("multer");

const path =
require("path");

const {
  verifyDisposal
}
=
require(
"../Controllers/activityController"
);

const storage =
multer.diskStorage({

  destination:
  (req,file,cb)=>{

    cb(null,"uploads");

  },

  filename:
  (req,file,cb)=>{

    cb(

      null,

      Date.now()
      +
      path.extname(
        file.originalname
      )

    );

  }

});

const upload =
multer({ storage });

router.post(

  "/verify",

  upload.single("image"),

  verifyDisposal

);

module.exports =
router;