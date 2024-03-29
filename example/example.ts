import { Client, RemoteAuth } from "whatsapp-web.js";
import { Provider, build } from "../src";

const runAsync = () => {
  const awsS3Options = {
    accessKeyId: "JDHTTASGGG6TTA...", // required - AWS Access Key
    secretAccessKey: "59NyYYNAkN5jKt4JxsqWQQ4UCEqw6D...", // required - AWS Secret Access Key
    region: "us-east-2", // optional - default is "us-east-1"
    bucketName: "my-bucket", // optional - default is "whatsapp-web-session-files"
  };

  const store = build(Provider.AwsS3, awsS3Options);

  const client = new Client({
    authStrategy: new RemoteAuth({
      store: store,
      backupSyncIntervalMs: 300000,
    }),
  });

  client.on("qr", (qr) => {
    console.log(`qr`, qr);
  });

  client.on("ready", () => {
    console.log(`ready`);
  });

  client.on("remote_session_saved", () => {
    console.log(`remote_session_saved`);
  });
};
