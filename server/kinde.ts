import {
  createKindeServerClient,
  GrantType,
  type SessionManager
} from '@kinde-oss/kinde-typescript-sdk';
import type { Context } from 'hono';
import { getCookie, setCookie, deleteCookie } from 'hono/cookie';

// Client for authorization code flow
export const kindeClient = createKindeServerClient(
  GrantType.AUTHORIZATION_CODE,
  {
    authDomain: process.env.KINDE_DOMAIN!,
    clientId: process.env.KINDE_CLIENT_ID!,
    clientSecret: process.env.KINDE_CLIENT_SECRET!,
    redirectURL: process.env.KINDE_REDIRECT_URI!,
    logoutRedirectURL: process.env.KINDE_REDIRECT_URI!
  }
);

// Client for client credentials flow
// const kindeApiClient = createKindeServerClient(GrantType.CLIENT_CREDENTIALS, {
//   authDomain: "https://<your_kinde_subdomain>.kinde.com",
//   clientId: "<your_kinde_client_id>",
//   clientSecret: "<your_kinde_client_secret>",
//   logoutRedirectURL: "http://localhost:3000"
// });

let store: Record<string, unknown> = {};

// export const sessionManager: SessionManager = {
//   async getSessionItem(key: string) {
//     return store[key];
//   },
//   async setSessionItem(key: string, value: unknown) {
//     store[key] = value;
//   },
//   async removeSessionItem(key: string) {
//     delete store[key];
//   },
//   async destroySession() {
//     store = {};
//   }
// };

export const sessionManager = (c: Context): SessionManager => ({
  async getSessionItem(key: string) {
    return getCookie(c, key);
  },
  async setSessionItem(key: string, value: unknown) {
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: 'lax'
    } as const;

    if (typeof value === 'string') {
      setCookie(c, key, value, cookieOptions);
    } else {
      setCookie(c, key, JSON.stringify(value), cookieOptions);
    }
  },
  async removeSessionItem(key: string) {
    deleteCookie(c, key);
  },
  async destroySession() {
    ['id_token', 'access_token', 'user', 'refresh_token'].forEach((key) => {
      deleteCookie(c, key);
    });
  }
});
