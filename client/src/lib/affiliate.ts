import { CONFIG } from "./config";

/**
 * Appends the Amazon Associate ID tag to a given Amazon URL.
 * @param url The Amazon product URL.
 * @returns The URL with the associate tag appended.
 */
export function getAffiliateUrl(url: string): string {
  if (!url.includes("amazon.")) return url;
  
  try {
    const urlObj = new URL(url);
    urlObj.searchParams.set("tag", CONFIG.AMAZON_ASSOCIATE_ID);
    return urlObj.toString();
  } catch (e) {
    // Fallback if URL is invalid
    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}tag=${CONFIG.AMAZON_ASSOCIATE_ID}`;
  }
}
