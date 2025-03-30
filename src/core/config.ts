// import * as dotenv from 'dotenv';
// dotenv.config();

export const LA_LIGA_URL_PUBLIC_SERVICE =
  process.env.LA_LIGA_URL_PUBLIC_SERVICE ||
  'https://apim.laliga.com/public-service/api/v1/subscriptions/laliga-easports-2024';

export const LANGUAGE_AND_KEY_PUBLIC_SERVICE =
  process.env.LANGUAGE_AND_KEY_PUBLIC_SERVICE ||
  'contentLanguage=?es&subscription-key=c13c3a8e2f6b46da9c5c425cf61fab3e';

export const LA_LIGA_URL_WEBVIEW =
  process.env.LA_LIGA_URL_WEBVIEW ||
  'https://apim.laliga.com/webview/api/web/subscriptions/laliga-easports-2024';

export const LANGUAGE_AND_KEY_WEBVIEW =
  process.env.LANGUAGE_AND_KEY_WEBVIEW ||
  'contentLanguage=es&subscription-key=ee7fcd5c543f4485ba2a48856fc7ece9';

export const SUPABASE_URL = process.env.SUPABASE_URL;
export const SUPABASE_KEY = process.env.SUPABASE_KEY;
