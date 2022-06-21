// deno-lint-ignore-file no-var
import { removeBackground, removeBackgroundHook } from "./mod.ts";
import { config } from "https://deno.land/x/dotenv@v3.1.0/mod.ts";

declare global {
  var CLOUDINARY_API_KEY: string;
  var CLOUDINARY_API_SECRET: string;
  var YEXT_ACCOUNT_API_KEY: string;
}

const envVars = config();
globalThis.CLOUDINARY_API_KEY = envVars.CLOUDINARY_API_KEY;
globalThis.CLOUDINARY_API_SECRET = envVars.CLOUDINARY_API_SECRET;
globalThis.YEXT_ACCOUNT_API_KEY = envVars.YEXT_ACCOUNT_API_KEY;

Deno.test("test removeBackground", async () => {
  const newUrl = await removeBackground(testInput);
  console.log(newUrl);
});

Deno.test("test removeBackgroundHook", async () => {
  const newUrl = await removeBackgroundHook(sampleWebhookPayload);
  console.log(newUrl);
});

const testInput =
  "beer_200|https://a.mktgcdn.com/p-sandbox/u1CbRYcog_nCU6s6c-34zOK90mgAgk7a8U9NuCUiH6g/400x600.jpg?timestamp=1655818656183";

const sampleWebhookPayload = {
  meta: {
    eventType: "ENTITY_CREATED",
    uuid: "45e6f8f4-f543-4441-b365-3d44f3606c2f",
    timestamp: 1655817466176,
    accountId: "3155222",
    actor: "USER",
    appSpecificAccountId: "0daf7d22540f47d8a4b3b6a8058a7bc447732d9c",
  },
  entityId: "3055441398205470641",
  primaryProfile: {
    primaryPhoto: {
      image: {
        url: "https://a.mktgcdn.com/p-sandbox/u1CbRYcog_nCU6s6c-34zOK90mgAgk7a8U9NuCUiH6g/400x600.jpg",
        width: 400,
        height: 600,
        sourceUrl:
          "https://products3.imgix.drizly.com/ci-southern-tier-2x-ipa-2521ef63f0ab8d91.png?auto=format%2Ccompress&ch=Width%2CDPR&fm=jpg&q=20",
        thumbnails: [
          {
            url: "https://a.mktgcdn.com/p-sandbox/u1CbRYcog_nCU6s6c-34zOK90mgAgk7a8U9NuCUiH6g/400x600.jpg",
            width: 400,
            height: 600,
          },
          {
            url: "https://a.mktgcdn.com/p-sandbox/u1CbRYcog_nCU6s6c-34zOK90mgAgk7a8U9NuCUiH6g/300x450.jpg",
            width: 300,
            height: 450,
          },
          {
            url: "https://a.mktgcdn.com/p-sandbox/u1CbRYcog_nCU6s6c-34zOK90mgAgk7a8U9NuCUiH6g/196x294.jpg",
            width: 196,
            height: 294,
          },
        ],
      },
    },
    description:
      "An India Pale Ale kicked up a notch to form a true Double IPA: feverishly hoppy with a malty backbone and higher-than-standard alcohol content. Citrusy hops tease the senses with aromatics and lingering bitterness, while just the right balance of malts disguises 2XIPA’s extra gravity. Double your expectations, this is an ale that demands reverence.",
    name: "beer_200",
    c_abv: "8.2",
    c_alcoholType: "Beer",
    c_category: "Ale",
    c_originCountry: "United States",
    c_price: "11.54",
    c_rating: "4.6",
    c_subCategory: "IPA",
    c_usState: "New York",
    meta: {
      accountId: "3155222",
      uid: "ll2nOw",
      id: "3055441398205470641",
      timestamp: "2022-06-21T13:17:46",
      folderId: "0",
      language: "en",
      countryCode: "US",
      entityType: "ce_beverage",
    },
  },
  languageProfiles: [],
  changedFields: { language: "en", fieldNames: ["primaryPhoto"] },
};
