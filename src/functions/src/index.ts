import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
//import { Storage } from "@google-cloud/storage";
import * as fs from "fs";
import { createCanvas, loadImage } from "canvas";
import GIFEncoder from "gifencoder";
import { Request, Response } from "express";
import cors from "cors"

admin.initializeApp();
const bucket = admin.storage().bucket();
console.log("Bucket configured:", admin.storage().bucket().name);

console.log("Connecting to Firestore database...");
const db = admin.firestore();
console.log("FireStore connection successful.");

const corsHandler = cors({ origin: true });

// Functionality to create a GIF file based on a list of images and save on db 
export const createGif = functions.https.onRequest((req: Request, res: Response) => {
  corsHandler(req, res, async () => {
    if (req.method === "OPTIONS") {
      res.status(204).send(""); // Catch CORS preflight requests
      return;
    }

    if (req.method !== "POST") {
      res.status(405).send("Method not allowed!");
      return;
    }

    try {
      // Autogenerate title by current date + time
      const now = new Date();
      const formattedDate = now.toISOString().replace(/T/, '_').replace(/:/g, '-').split('.')[0];
      const autoTitle = `GIF_${formattedDate}`;

      // Validate request and URLs
      const { imageUrls } = req.body;
      if (!imageUrls || !Array.isArray(imageUrls)) {
        console.error("Invalid data on request: ", req.body);
        res.status(400).send("Image URLs are required.");
        return;
      }

      console.log("Downloading images...");
      const images = await Promise.all(imageUrls.map(async (url) => {
        console.log(`Download image: ${url}`);
        return loadImage(url);
      }));

      console.log("Images downloaded successfully");

      // Set GIF dimensions manually
      const width = 500;
      const height = 500;
      const encoder = new GIFEncoder(width, height);
      const canvas = createCanvas(width, height);
      const ctx = canvas.getContext("2d");

      // Start GIFEncoder process
      const gifPath = `/tmp/gif-${Date.now()}.gif`;
      const stream = fs.createWriteStream(gifPath);
      encoder.createReadStream().pipe(stream);
      encoder.start();
      encoder.setRepeat(0);
      encoder.setDelay(500);
      encoder.setQuality(10);

      for (const img of images) {
        ctx.drawImage(img, 0, 0, width, height);
        // @ts-expect-error CanvasRenderingContext2D type error
        encoder.addFrame(ctx.getImageData(0, 0, width, height).data);
      }
      
      encoder.finish();

      await new Promise((resolve, reject) => {
        stream.on("finish", () => resolve(undefined));
        stream.on("error", reject);
      });

      console.log("GIF generated correctly: ", gifPath);

      // Upload GIF to Firebase Storage on folder /gifs/
      const file = bucket.file(`gifs/${Date.now()}.gif`);
      await file.save(fs.readFileSync(gifPath), { contentType: "image/gif" });
      await file.makePublic();

      const gifUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;

      console.log("GIF URL: ", gifUrl);

      // Save on Firestore
      const docRef = await db.collection("gifs").add({
        imagenes: imageUrls,
        gif: { src: gifUrl, title: autoTitle },
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      console.log("New GIF document created with ID: ", docRef.id);
      res.status(200).json({ id: docRef.id, gifUrl, title: autoTitle });
      return;

    } catch (error) {
      console.error("Error generating GIF on backend: ", error);
      res.status(500).send("Status 500 - Internal Server Error");
      return;
  }})
})


// Functionality to get a list of all GIFs on Firestore
export const getAllGifs = functions.https.onRequest((req: Request, res: Response) => {
  corsHandler(req, res, async () => { 
    if (req.method === "OPTIONS") {
      res.status(204).send(""); // Catch CORS preflight requests
      return;
    }
    
    if (req.method !== "GET") {
      res.status(405).send("Method not allowed!");
      return;
    }
  
    try {
      const snapshot = await db.collection("gifs").orderBy("createdAt", "desc").get();
      
      const gifs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
  
      res.status(200).json({ gifs });
    } catch (error) {
      console.error("Error getting GIFs: ", error);
      res.status(500).send("Status 500 - Internal Server Error");
    }
  })
})


// Functionality to delete a GIF from db by ID
export const deleteGif = functions.https.onRequest((req: Request, res: Response) => {
  corsHandler(req, res, async () => {
    if (req.method === "OPTIONS") {
      res.status(204).send(""); // Catch CORS preflight requests
      return;
    }

    if (req.method !== "DELETE") {
      return res.status(405).send("Method not allowed!");
    }

    try {
      const { id } = req.body;
      if (!id) {
        return res.status(400).send("GIF ID is required");
      }

      const docRef = db.collection("gifs").doc(id);
      const doc = await docRef.get();

      if (!doc.exists) {
        return res.status(404).send("GIF not found");
      }

      const gifData = doc.data();
      if (!gifData?.gif?.src) {
        return res.status(400).send("URL Gif not found");
      }

      const fileName = gifData.gif.src.split("/").pop();
      const file = bucket.file(`gifs/${fileName}`);
      await file.delete();
      await docRef.delete();
      console.log(`GIF deleted from Firestore: ${id}`);

      return res.status(200).json({ message: "Delete GIF successful!" });

    } catch (error) {
      console.error("Error deleting GIF: ", error);
      return res.status(500).send("Status 500 - Internal Server Error");
    }
  })
})