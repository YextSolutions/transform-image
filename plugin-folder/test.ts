// deno-lint-ignore-file no-var
import { removeBackground } from "./mod.ts";
import { config } from "https://deno.land/x/dotenv@v3.1.0/mod.ts";

declare global {
  var CLOUDINARY_API_KEY: string;
  var CLOUDINARY_SECRET: string;
}

const envVars = config();
globalThis.CLOUDINARY_API_KEY = envVars.CLOUDINARY_API_KEY;
globalThis.CLOUDINARY_SECRET = envVars.CLOUDINARY_SECRET;

const testInput =
  "beer_60|https://a.mktgcdn.com/p-sandbox/rrK5bxcoVAgkGckDnA7GlhyC1VOpV6eEf4KjjlFumQs/400x600.jpg";

Deno.test("test remove background", async () => {
  const newUrl = await removeBackground(testInput);
  console.log(newUrl);
});
