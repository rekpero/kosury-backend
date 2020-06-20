import { MongoHelper } from "../database";
import { logger } from "../utils";

const getCollection = (database: string, collection: string) => {
  return MongoHelper.client.db(database).collection(collection);
};

export const getTodos = async () => {
  const collection: any = getCollection("sample_restaurants", "neighborhoods");
  try {
    const result = await collection.find({}).toArray();
    return result;
  } catch (err) {
    throw err;
  }
};
