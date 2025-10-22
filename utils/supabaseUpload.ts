import { S3Client } from '@aws-sdk/client-s3'

const client = new S3Client({
  forcePathStyle: true,
  region: 'us-west-1',
  endpoint: 'https://dxzmebuimxtfznmcdwht.storage.supabase.co/storage/v1/s3',
  credentials: {
    accessKeyId: 'b50a54073f89acb3233e7ca907d5cc44',
    secretAccessKey: 'b70f09a89f6ebf4ba414afd14649781f6626003fa7ba6fa7dafd4d3445c434cc',
  }
})

export default client;