import { encodeToString } from "https://deno.land/std@0.97.0/encoding/hex.ts";
import axiod from "https://deno.land/x/axiod@0.23.2/mod.ts";
import { editEntity } from "./api.ts";
import { WebhookPayload } from "./types.ts";

declare const CLOUDINARY_API_KEY: string;
declare const CLOUDINARY_API_SECRET: string;

const eager = "f_png,e_bgremoval";

export const removeBackgroundHook = async (payload?: WebhookPayload) => {
  if (payload?.changedFields.fieldNames.includes("primaryPhoto")) {
    console.log(`Transforming primaryPhoto for Entity ${payload?.entityId} `);

    const imageUrl = await removeBackground(
      `${payload.entityId}|${payload.primaryProfile.primaryPhoto.image.url}`
    );

    if (imageUrl) {
      await editEntity(payload.entityId, {
        c_transformedPhoto: { url: imageUrl },
      });
    }
  }
};

export const removeBackground = async (input: string) => {
  const timestamp = Math.floor(Date.now() / 1000);
  const [public_id, url] = input.split("|");

  const signature = await generateCloudinarySignature(
    `eager=${eager}&public_id=${public_id}&timestamp=${timestamp}${CLOUDINARY_API_SECRET}`
  );

  if (public_id && url) {
    const imageUrl = await uploadImageAndTransform(
      url,
      public_id,
      signature,
      timestamp
    );

    return imageUrl;
  }
};

const generateCloudinarySignature = async (params: string) => {
  const data = new TextEncoder().encode(params);
  const digest = await crypto.subtle.digest("sha-1", data.buffer);
  return encodeToString(new Uint8Array(digest));
};

const uploadImageAndTransform = async (
  file: string,
  public_id: string,
  signature: string,
  timestamp: number
): Promise<string> => {
  console.log(`Uploading ${public_id} to Cloudinary and transforming ${file}`);

  try {
    const response = await axiod.post(
      "https://api.cloudinary.com/v1_1/yext/image/upload",
      {
        file,
        public_id,
        api_key: CLOUDINARY_API_KEY,
        eager,
        signature,
        timestamp,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data.eager[0].url;
  } catch (error) {
    if (error.response) {
      console.error(`${error.response.status}: ${error.response.data}`);
    }
    throw error;
  }
};
