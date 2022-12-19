import axios from 'axios';
import qs from 'qs';
import pkceChallenge from 'pkce-challenge';

const authServer = axios.create({
  baseURL: 'http://localhost:8081',
});

export interface OAuthAuthorizationTokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: 'bearer' | string;
  expires_in: number;
  scope: string;
  [key: string]: string | number;
}

export default class AuthService {
  public static async getFirstAccessTokens(config: {
    code: string;
    codeVerifier: string;
    redirectUri: string;
  }) {
    const data = {
      code: config.code,
      code_verifier: config.codeVerifier,
      redirect_uri: config.redirectUri,
      grant_type: 'authorization_code',
      client_id: 'alganews-admin',
    };

    const encodedData = qs.stringify(data);

    return authServer
      .post<OAuthAuthorizationTokenResponse>('/oauth/token', encodedData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then((res) => res.data);
  }

  public static getLoginScreenUrl(codeChallenge: string) {
    const config = qs.stringify({
      response_type: 'code',
      client_id: 'alganews-admin',
      redirect_uri: `${window.location.origin}/authorize`,
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
    });

    return `http://localhost:8081/oauth/authorize?${config}`;
  }

  public static async imperativelySendToLoginScreen() {
    const { code_challenge, code_verifier } = await pkceChallenge();
    this.setCodeVerifier(code_verifier);

    const loginUrl = this.getLoginScreenUrl(code_challenge);

    // imperativo
    // gera efeito colateral
    window.location.href = loginUrl;
  }

  public static getAccessToken() {
    return window.localStorage.getItem('accessToken');
  }
  public static setAccessToken(token: string) {
    return window.localStorage.setItem('accessToken', token);
  }

  public static getRefreshToken() {
    return window.localStorage.getItem('refreshToken');
  }
  public static setRefreshToken(token: string) {
    return window.localStorage.setItem('refreshToken', token);
  }

  public static getCodeVerifier() {
    return window.localStorage.getItem('codeVerifier');
  }
  public static setCodeVerifier(getCodeVerifier: string) {
    return window.localStorage.setItem('codeVerifier', getCodeVerifier);
  }
}
