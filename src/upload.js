import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
        accessKeyId:process.env.ACCESS_KEY,
        secretAccessKey:process.env.SECRET_ACCESS_KEY,
        region:"ap-northeast-1"
    });

const upload =multer({ 
    storage:multerS3({
        s3: s3,
        bucket:"clonegram",
        acl: 'public-read',
        metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }
    }),
    
});

export const uploadMiddleware = upload.single("file");

export const uploadController = (req, res) => {
    const {file:{location}} = req;
    console.log(req.file);
    //cors회피하기
    res.set({'access-control-allow-origin':'*'});
    
    res.json({location});
}