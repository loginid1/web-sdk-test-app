interface Payload {
  [key: string]: any;
}

class HTTP {
  public static async post(url: string, payload: Payload) {
    const headers = {
      "Content-Type": "application/json",
    };
    const body = JSON.stringify(payload);

    const response = await fetch(url, {
      method: "POST",
      headers,
      body,
    });

    const data = await response.json();

    if (!response.ok) {
      throw data;
    }

    return data;
  }
}

export default HTTP;
