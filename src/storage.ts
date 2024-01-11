interface Config {
  baseUrl: string;
  appId: string;
  privateKey: string;
}

class Store {
  private static readonly KEY = "AUTO_DIRECTWEB";
  private static readonly ACCESS_TOKEN = "LOGINID_ACCESS_TOKEN";

  public static storeEnvVariables(config: Config) {
    const jsonConfig = JSON.stringify(config);
    localStorage.setItem(Store.KEY, jsonConfig);
  }

  public static getEnvVariables() {
    const jsonConfig = localStorage.getItem(Store.KEY);
    return jsonConfig ? (JSON.parse(jsonConfig) as Config) : null;
  }

  public static storeAccessToken(token: string) {
    localStorage.setItem(Store.ACCESS_TOKEN, token);
  }

  public static getAccessToken() {
    const token = localStorage.getItem(Store.ACCESS_TOKEN);
    if (token === undefined) {
      throw new Error("No access token found");
    }
    return token;
  }
}

export default Store;
