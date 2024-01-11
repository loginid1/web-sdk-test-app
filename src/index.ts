import Store from "./storage";
import UUIDList from "./uuidList";
import { EMAIL_VERIFY_MESSAGE } from "./message";
import {
  LoginIdConfiguration,
  LoginIdPasskey,
  LoginIdEmail,
  LoginIdCredentials,
  addRecoveryCredential,
  deletePasskeyCredential,
  deleteRecoveryCredential,
  getCredentialList,
  isPlatformAuthenticatorAvailable,
  lockPasskeyCredential,
  renamePasskeyCredential,
  renameRecoveryCredential,
  unlockPasskeyCredential,
} from "@loginid/web-sdk";

(async function () {
  const uuidList = new UUIDList();
  let loginIdConfig = new LoginIdConfiguration("", "");
  let lid = new LoginIdPasskey(loginIdConfig);
  let lidEmail = new LoginIdEmail(loginIdConfig);
  let lidCredentials = new LoginIdCredentials(loginIdConfig);

  const pkeyTextarea = document.getElementById("pkey") as HTMLTextAreaElement;
  const [
    usernameInput,
    credentialNameInput,
    credentialUUIDInput,
    appIdInput,
    baseUrlInput,
  ] = Array.from(document.getElementsByTagName("input"));
  const [
    configInfoButton,
    uvPlatformAuthenticatorAvailableButton,
    getCredentialListButton,
    renamePasskeyCredentialButton,
    lockPasskeyCredentialButton,
    unlockPasskeyCredentialButton,
    deletePasskeyCredentialButton,
    addPasskeyCredentialButton,
    addRecoveryCredentialButton,
    renameRecoveryCredentialButton,
    deleteRecoveryCredentialButton,
    loginButton,
    registerButton,
    registerEmailButton,
    loginEmailButton,
    configureButton,
  ] = Array.from(document.getElementsByTagName("button"));

  const getValues = () => ({
    username: usernameInput.value,
    credentialName: credentialNameInput.value,
    credentialUUID: credentialUUIDInput.value,
    appId: appIdInput.value,
    baseURL: baseUrlInput.value,
    privateKey: pkeyTextarea.value,
  });

  configureButton.addEventListener("click", async () => {
    const { baseURL, appId, privateKey } = getValues();
    loginIdConfig = new LoginIdConfiguration(baseURL, appId);
    lid = new LoginIdPasskey(loginIdConfig);
    lidEmail = new LoginIdEmail(loginIdConfig);
    lidCredentials = new LoginIdCredentials(loginIdConfig);

    const config = {
      baseUrl: baseURL,
      appId,
      privateKey,
    };

    Store.storeEnvVariables(config);

    alert("New Web SDK configured!");
  });

  window.addEventListener("load", () => {
    const config = Store.getEnvVariables();
    if (!config) return;

    const { baseUrl, appId, privateKey } = config;
    baseUrlInput.value = baseUrl;
    appIdInput.value = appId;
    pkeyTextarea.value = privateKey;

    configureButton.click();
  });

  configInfoButton.addEventListener("click", () => {
    const baseUrl = loginIdConfig.getBaseUrl();
    const appId = loginIdConfig.getAppId();
    const httpClient = loginIdConfig.getHttpClient();

    if (
      !httpClient ||
      baseUrl !== getValues().baseURL ||
      appId !== getValues().appId
    ) {
      throw new Error("Invalid configuration");
    }

    const result = {
      baseUrl,
      appId,
    };

    alert(JSON.stringify(result, null, 2));
  });

  uvPlatformAuthenticatorAvailableButton.addEventListener("click", async () => {
    const result = await isPlatformAuthenticatorAvailable();
    alert(JSON.stringify(result, null, 2));
  });

  registerButton.addEventListener("click", async () => {
    const { username, credentialName } = getValues();
    const options = {
      ...(credentialName && { credname: credentialName }),
    };

    try {
      const result = await lid.signupWithPasskey(username, options);
      alert(JSON.stringify(result, null, 2));

      const { auth_data } = result;
      Store.storeAccessToken(auth_data.token);
    } catch (e) {
      console.log(e);
      alert(e.message);
    } finally {
      usernameInput.value = "";
      credentialNameInput.value = "";
    }
  });

  loginButton.addEventListener("click", async () => {
    const { username } = getValues();

    try {
      const result = await lid.signinWithPasskey(username || null);
      alert(JSON.stringify(result, null, 2));

      const { auth_data } = result;
      Store.storeAccessToken(auth_data.token);
    } catch (e) {
      console.log(e);
      alert(e.message);
    } finally {
      usernameInput.value = "";
    }
  });

  registerEmailButton.addEventListener("click", async () => {
    const { username } = getValues();

    try {
      uuidList.add(EMAIL_VERIFY_MESSAGE);

      const result = await lidEmail.signupWithEmail(username);
      alert(JSON.stringify(result, null, 2));

      const { auth_data } = result;
      Store.storeAccessToken(auth_data.token);
    } catch (e) {
      console.log(e);
      alert(e.message);
    } finally {
      usernameInput.value = "";
      uuidList.remove(EMAIL_VERIFY_MESSAGE);
    }
  });

  loginEmailButton.addEventListener("click", async () => {
    const { username } = getValues();

    try {
      uuidList.add(EMAIL_VERIFY_MESSAGE);

      const result = await lidEmail.signinWithEmail(username);
      alert(JSON.stringify(result, null, 2));

      const { auth_data } = result;
      Store.storeAccessToken(auth_data.token);
    } catch (e) {
      console.log(e);
      alert(e.message);
    } finally {
      usernameInput.value = "";
      uuidList.remove(EMAIL_VERIFY_MESSAGE);
    }
  });

  getCredentialListButton.addEventListener("click", async () => {
    try {
      const accessToken = Store.getAccessToken();
      const result = await getCredentialList(loginIdConfig, accessToken);
      alert(JSON.stringify(result, null, 2));

      uuidList.clear();

      for (const cred of result) {
        uuidList.add(cred.cred_uuid);
      }
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  });

  renamePasskeyCredentialButton.addEventListener("click", async () => {
    const { credentialName, credentialUUID } = getValues();

    try {
      const accessToken = Store.getAccessToken();
      const result = await renamePasskeyCredential(
        loginIdConfig,
        accessToken,
        credentialUUID,
        credentialName
      );
      alert(JSON.stringify(result, null, 2));
    } catch (e) {
      console.log(e);
      alert(e.message);
    } finally {
      credentialNameInput.value = "";
      credentialUUIDInput.value = "";
    }
  });

  lockPasskeyCredentialButton.addEventListener("click", async () => {
    const { credentialUUID } = getValues();

    try {
      const accessToken = Store.getAccessToken();
      const result = await lockPasskeyCredential(
        loginIdConfig,
        accessToken,
        credentialUUID
      );
      alert(JSON.stringify(result, null, 2));
    } catch (e) {
      console.log(e);
      alert(e.message);
    } finally {
      credentialUUIDInput.value = "";
    }
  });

  unlockPasskeyCredentialButton.addEventListener("click", async () => {
    const { credentialUUID } = getValues();

    try {
      const accessToken = Store.getAccessToken();
      const result = await unlockPasskeyCredential(
        loginIdConfig,
        accessToken,
        credentialUUID
      );
      alert(JSON.stringify(result, null, 2));
    } catch (e) {
      console.log(e);
      alert(e.message);
    } finally {
      credentialUUIDInput.value = "";
    }
  });

  deletePasskeyCredentialButton.addEventListener("click", async () => {
    const { credentialUUID } = getValues();

    try {
      const accessToken = Store.getAccessToken();
      const result = await deletePasskeyCredential(
        loginIdConfig,
        accessToken,
        credentialUUID
      );
      alert(JSON.stringify(result, null, 2));

      uuidList.remove(credentialUUID);
    } catch (e) {
      console.log(e);
      alert(e.message);
    } finally {
      credentialUUIDInput.value = "";
    }
  });

  addPasskeyCredentialButton.addEventListener("click", async () => {
    const { username, credentialName } = getValues();
    const options = {
      ...(credentialName && { credname: credentialName }),
    };

    try {
      const accessToken = Store.getAccessToken();
      const result = await lidCredentials.addPasskeyWithToken(
        username,
        accessToken,
        options
      );
      alert(JSON.stringify(result, null, 2));
    } catch (e) {
      console.log(e);
      alert(e.message);
    } finally {
      usernameInput.value = "";
      credentialNameInput.value = "";
    }
  });

  addRecoveryCredentialButton.addEventListener("click", async () => {
    try {
      const accessToken = Store.getAccessToken();
      const result = await addRecoveryCredential(loginIdConfig, accessToken);
      alert(JSON.stringify(result, null, 2));

      uuidList.add(result.id);
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  });

  renameRecoveryCredentialButton.addEventListener("click", async () => {
    const { credentialName, credentialUUID } = getValues();

    try {
      const accessToken = Store.getAccessToken();
      const result = await renameRecoveryCredential(
        loginIdConfig,
        accessToken,
        credentialUUID,
        credentialName
      );
      alert(JSON.stringify(result, null, 2));
    } catch (e) {
      console.log(e);
      alert(e.message);
    } finally {
      credentialNameInput.value = "";
      credentialUUIDInput.value = "";
    }
  });

  deleteRecoveryCredentialButton.addEventListener("click", async () => {
    const { credentialUUID } = getValues();

    try {
      const accessToken = Store.getAccessToken();
      const result = await deleteRecoveryCredential(
        loginIdConfig,
        accessToken,
        credentialUUID
      );
      alert(JSON.stringify(result, null, 2));

      uuidList.remove(credentialUUID);
    } catch (e) {
      console.log(e);
      alert(e.message);
    } finally {
      credentialUUIDInput.value = "";
    }
  });
})();
