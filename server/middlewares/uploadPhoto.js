const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const dotenv = require("dotenv");
dotenv.config();

//? config aws...
// aws.config = new aws.config();
aws.config.update({
  accessKeyId: process.env.AWS_Access_Key_Id,
  secretAccessKey: process.env.AWS_Secret_Key,
});

const s3 = new aws.S3();

// * upload feature...
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "ecommv1",
    acl: "public-read",
    metadata: (req, file, callback) => {
      callback(null, { fieldName: file.fieldname });
    },
    key: (req, file, callback) => {
      callback(null, `${Date.now().toString()}${file.originalname}`);
    },
  }),
});

exports.upload = upload;

// const outer = (() => {
//   const memory = {};
//   const inner = (n) => {
//     if (n in memory) {
//       return n;
//     } else {
//       if (n === 0 || n === 1) {
//         return n;
//       } else {
//         memory[n] = inner(n - 1) * n;
//         return memory[n];
//       }
//     }
//   };
//   return inner;
// })();
// console.log(outer(4));
// var a = 1;
// function b() {
//   a = 10;
//   return;
//   function a() {}
// }

// b();
// console.log(a);
