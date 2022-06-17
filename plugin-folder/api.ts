import axiod from "https://deno.land/x/axiod@0.23.2/mod.ts";

declare const YEXT_ACCOUNT: string;
declare const YEXT_ACCOUNT_API_KEY: string;

export const editEntity = async (
  entityId: string,
  // deno-lint-ignore no-explicit-any
  data: Record<string, any>
) => {
  try {
    await axiod.put(
      `https://api-sandbox.yext.com/v2/accounts/${YEXT_ACCOUNT}/entities/${entityId}`,
      data,
      {
        params: {
          api_key: YEXT_ACCOUNT_API_KEY,
          v: "20220322",
        },
      }
    );
  } catch (error) {
    if (error.response) {
      console.error(`${error.response.status}: ${error.response.data}`);
    }
    throw error;
  }

  console.log(`Edited entity ${entityId}`);
};
