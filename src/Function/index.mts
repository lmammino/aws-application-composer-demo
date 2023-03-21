import { Handler } from "aws-lambda";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({});
const {BUCKET_NAME} = process.env;

export const handler: Handler<object, object> = async event => {
  const key = `test_${Date.now()}.txt`;

  const putObjectCommand = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: `Hello World created at ${new Date()}!`
  });

  const response = await s3Client.send(putObjectCommand);

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: "Hello World!",
      s3Key: key,
      bucketName: BUCKET_NAME,
    })
  };
};
