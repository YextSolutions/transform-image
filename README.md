# transform-image
This is a function that can be used as a plugin in a Yext account for uploading and transforming images via the Cloudinary Eager Transform API.

## Modifying and Testing the Function Locally
Prerequistes:
 - Yext Account
 - Cloudinary Account

1. Clone this repo
2. Add your Cloudinary API Key and Secret to a `.env` file to test locally.
3. To change the type of transform you want to apply to an image, you can modify the following line in `mod.ts` with different [Cloudinary Transformations](https://cloudinary.com/documentation/transformation_reference):
  ```js
  const eager = "f_png,e_bgremoval";
  ```
4. To test the transform function, you can change the following line in  `test.ts`:
  ```js
  const testInput = "beer_60|https://a.mktgcdn.com/p-sandbox/rrK5bxcoVAgkGckDnA7GlhyC1VOpV6eEf4KjjlFumQs/400x600.jpg";
  ```
  After running the test, you can copy and paste the new URL that will be logged to the terminal in the browser to see the transformed image.
  
## Uploading the Function to a Yext Account
[This guide](https://hitchhikers.yext.com/guides/local-function-development-with-deno/) demonstrates how to develop functions locally using Deno and how to then upload them to a Yext account as a plugin.
