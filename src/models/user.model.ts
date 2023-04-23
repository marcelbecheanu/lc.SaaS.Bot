import axios, { AxiosResponse } from 'axios';
import * as cheerio from 'cheerio';

import settings from '../configs/settings.json';
const { domain } = settings.scrappers.vinted;

interface VintedUserID {
  v_uid: string,
  anon_id: string
}

interface VintedAuthorization {
  id: VintedUserID;
  token: string;
  csrfToken: string;
  headers?: { [key: string]: string };
}

interface VintedProfile {
  login: string;
  name: string;
  email: string;
  photo: string;
  country: {
    id: number;
    code: string;
    title: string;
  };
  currency: string;
  original: Function;
}

/**
 * Retrieves a X-CSRF-Token from the given Vinted session token.
 * @param token - The Vinted session token.
 * @returns The X-CSRF-Token.
 * @throws If an error occurs while retrieving the X-CSRF-Token.
 */
async function getXCSRFToken(token: string): Promise<string> {
  try {
    const response = await axios({
      method: 'GET',
      url: domain,
      timeout: 2000,
      headers: {
        Cookie: `_vinted_fr_session=${token};`
      }
    });

    const $ = cheerio.load(response.data);
    const body = $('meta[name="csrf-token"]').attr('content');
    if (typeof body !== 'string') throw new Error('X-CSRF-Token not found');
    return body;
  } catch (ex) {
    throw new Error(`Failed to retrieve X-CSRF-Token: ${ex}`);
  }
}

/**
 * Fetches user data from Vinted using a session token and CSRF token.
 * @param tokens - An object containing the session token and CSRF token.
 * @returns A Promise resolving to the user data as a VintedUserID, or null if no user data was found.
 * @throws If an error occurs while fetching the user data.
 */
async function getUserID(tokens: { sessionToken: string, csrfToken: string }): Promise<VintedUserID> {
  const url = `${domain}/api/v2/users/stats`;

  try {
    const response = await axios({
      method: 'GET',
      url,
      timeout: 2000,
      headers: {
        'Cookie': `_vinted_fr_session=${tokens.sessionToken}`,
        'x-csrf-token': tokens.csrfToken,
      }
    });

    const headers = response.headers["set-cookie"];
    if (!headers || !Array.isArray(headers)) {
      throw new Error(`Failed to fetch headers from ${url}`);
    }

    const vUidCookie = headers.find(cookie => cookie.startsWith('v_uid='));
    if (!vUidCookie) {
      throw new Error('v_uid cookie not found in response headers');
    }

    var vUid = vUidCookie.split('=')[1];
    if (!vUid) {
      throw new Error('v_uid value not found in response headers');
    }
    vUid = vUid.split(';')[0];

    const vAnonIDCookie = headers.find(cookie => cookie.startsWith('anon_id='));
    if (!vAnonIDCookie) {
      throw new Error('anon_id cookie not found in response headers');
    }

    var vAnonID = vAnonIDCookie.split('=')[1];
    if (!vAnonID) {
      throw new Error('anon_id value not found in response headers');
    }
    vAnonID = vAnonID.split(';')[0];

    return {
      v_uid: vUid,
      anon_id: vAnonID,
    }
  } catch (err) {
    throw new Error(`Failed to fetch user data from ${url}: ${err}`);
  }
}

async function getUserProfile(authorization: VintedAuthorization): Promise<VintedProfile> {
  const url = `${domain}/api/v2/users/${authorization.id.v_uid}`
  try{
    const response = await axios({
      method: 'GET',
      url,
      timeout: 2000,
      headers: {
        'Cookie': `_vinted_fr_session=${authorization.token}`,
        'x-csrf-token': authorization.csrfToken,
      }
    });

    const userProfile = response.data.user;

    return {
      login: userProfile.login,
      name: userProfile.real_name,
      email: userProfile.email,
      photo: userProfile.photo.full_size_url,
      country: {
        id: userProfile.country_id,
        code: userProfile.country_code,
        title: userProfile.country_title
      },
      currency: userProfile.currency,
      original: () => { 
        return userProfile;
      }
    }
  } catch (err) {
    throw new Error(`Failed to fetch user data from ${url}: ${err}`);
  }
}




export { VintedAuthorization, getUserID, getUserProfile, getXCSRFToken }