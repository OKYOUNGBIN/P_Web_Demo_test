// // aws 객체불러오기
// var AWS = require('aws-sdk')
// var fs = require('fs');

// // 접속정보 설정
// AWS.config.loadFromPath('./awsConfig.json')

// var file = fs.createReadStream('../models/chair/leg/tablechair_0101_leg.glb')

// var params = {
//     Bucket: 'xr-box/shop_file/XR-SQUARE_test',
//     Key: 'object.glb',
//     ACL: 'public-read', /* 권한: 도메인에 객체경로 URL 을 입력하여 접근 가능하게 설정 */
//     Body: file,
//     ContentType:'model/glb'
// }

// let s3 = new AWS.S3();

// s3.upload(params, function(err, data){
//     if(err){
//         console.log("err: ", err)
//     }
//     console.log('============')
//     console.log("data: ", data)
// })

import dotenv from 'dotenv'
import aws from 'aws-sdk'
import crypto from 'crypto'
import { promisify } from "util"
const randomBytes = promisify(crypto.randomBytes)

dotenv.config()

const region = "ap-northeast-2"
const bucketName = "/xr-box/shop_file/XR-SQUARE_test/"
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4'
})

export async function generateUploadURL() {
  const rawBytes = await randomBytes(16)
  const imageName = rawBytes.toString('hex')

  const params = ({
    Bucket: bucketName,
    Key: imageName,
    Expires: 60
  })
  
  const uploadURL = await s3.getSignedUrlPromise('putObject', params)
  return uploadURL
}