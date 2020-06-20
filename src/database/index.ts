import mongodb from "mongodb";
import dotenv from "dotenv";
import { logger } from "../utils";

// initialize configuration
dotenv.config();

export class MongoHelper {
  public static client: mongodb.MongoClient;

  public static connect(url: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      mongodb.MongoClient.connect(
        url,
        { useNewUrlParser: true },
        (err, client: mongodb.MongoClient) => {
          if (err) {
            reject(err);
          } else {
            MongoHelper.client = client;
            resolve(client);
          }
        }
      );
    });
  }

  public disconnect(): void {
    MongoHelper.client.close();
  }
}
