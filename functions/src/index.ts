/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();
export const monthlyTask = functions.pubsub
  .schedule("0 0 1 * *")
  .timeZone("Asia/Tokyo")
  .onRun(async () => {
    const data = {
      message: "test",
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    };

    await db.collection("monthlyTasks").add(data);
  });

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
