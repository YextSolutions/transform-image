// deno-lint-ignore-file no-var
import { removeBackground } from "./mod.ts";
import { config } from "https://deno.land/x/dotenv@v3.1.0/mod.ts";

declare global {
  var CLOUDINARY_API_KEY: string;
  var CLOUDINARY_SECRET: string;
  var YEXT_KNOWLEDGE_API_KEY: string;
}

const envVars = config();
globalThis.CLOUDINARY_API_KEY = envVars.CLOUDINARY_API_KEY;
globalThis.CLOUDINARY_SECRET = envVars.CLOUDINARY_SECRET;
globalThis.YEXT_KNOWLEDGE_API_KEY = envVars.YEXT_KNOWLEDGE_API_KEY;

const testBeverage = {
  entityId: "wine_241",
  primaryProfile: {
    primaryPhoto: {
      image: {
        url: "https://a.mktgcdn.com/p-sandbox/zfWLZuxYqveLOCPyvy8BE5KSjw0Jeqw01obj17KQ16s/400x600.jpg",
      },
    },
  },
};

Deno.test("test remove background", async () => {
  await removeBackground(testBeverage);
});
