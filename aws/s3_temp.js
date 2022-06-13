import dotenv from 'dotenv'
import aws from 'aws-sdk'
import crypto from 'crypto'
import { promisify } from "util"
const randomBytes = promisify(crypto.randomBytes)

dotenv.config()

const region = "ap-northeast-2"
//const tempBucketName = "xr-box/shop_file/xr-temp"
const tempBucketName = "https://d2d3yuaczk15qx.cloudfront.net/shop_file/xr-temp/"
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4'
})

export async function tempUploadURL() {
  const rawBytes = await randomBytes(16)
  const glbName = rawBytes.toString('hex')

  const params = ({
    Bucket: tempBucketName,
    Key: glbName,
  })
  
  const tempUploadURL = await s3.getSignedUrlPromise('putObject', params)
  return tempUploadURL
}