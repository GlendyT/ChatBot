"use server";

import client from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";
import { FAQDocument } from "../types";

const db = client.db(process.env.MONGODB_DBNAME);

export async function fetchFAQS() {
  try {
    const collectionName = process.env.MONGODB_COLLECTIONNAME as string;
    const documentId = process.env.MONGODB_DOCUMENTID as string;

    const faqs = await db.collection<FAQDocument>(collectionName).findOne({
      _id: ObjectId.createFromHexString(documentId),
    });

    console.log("FAQS from MongoDB", faqs);

    if (!faqs) {
      throw new Error("Error fetching data from db!");
    }
    return faqs;
  } catch (error) {
    console.log(error);
    return null
  }
}
 