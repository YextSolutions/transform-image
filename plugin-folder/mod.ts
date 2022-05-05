import { encodeToString } from "https://deno.land/std@0.97.0/encoding/hex.ts";
import axiod from "https://deno.land/x/axiod@0.23.2/mod.ts";
import { BeverageEntity, PrimaryPhoto } from "./types.ts";

declare const CLOUDINARY_API_KEY: string;
declare const CLOUDINARY_SECRET: string;
declare const YEXT_KNOWLEDGE_API_KEY: string;

const eager = "f_png,e_bgremoval";

export const removeBackground = async (beverage: BeverageEntity) => {
  const timestamp = Math.floor(Date.now() / 1000);
  const public_id = `${beverage.entityId}`;

  const signature = await generateCloudinarySignature(
    `eager=${eager}&public_id=${public_id}&timestamp=${timestamp}${CLOUDINARY_SECRET}`
  );

  if (beverage.primaryProfile.primaryPhoto?.image.url) {
    const imageUrl = await uploadImageAndRemoveBackground(
      beverage.primaryProfile.primaryPhoto.image.url,
      public_id,
      signature,
      timestamp
    );

    const requestBody = {
      primaryPhoto: {
        image: {
          url: imageUrl,
        },
      },
    };

    await editKgEntity(public_id, requestBody);
  }
};

const generateCloudinarySignature = async (params: string) => {
  const data = new TextEncoder().encode(params);
  const digest = await crypto.subtle.digest("sha-1", data.buffer);
  return encodeToString(new Uint8Array(digest));
};

const uploadImageAndRemoveBackground = async (
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

export const editKgEntity = async (
  entityId: string,
  requestBody: { primaryPhoto: PrimaryPhoto }
): Promise<string> => {
  console.log(
    `Adding transformed image ${requestBody.primaryPhoto.image.url} to ${entityId} in KG`
  );

  try {
    const res = await axiod.put(
      `https://api-sandbox.yext.com/v2/accounts/3155222/entities/${entityId}`,
      requestBody,
      {
        params: {
          api_key: YEXT_KNOWLEDGE_API_KEY,
          v: "20220322",
        },
      }
    );

    return res.data.response.meta.id;
  } catch (error) {
    if (error.response) {
      console.error(`${error.response.status}: ${error.response.data}`);
    }
    throw error;
  }
};
