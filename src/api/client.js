import { Api } from "api";
import Crypto from "crypto";

const getSignature = (verb, path, data = '') =>  {
    const expires = getExpires();
    return Crypto
      .createHmac("sha256", Api.secret)
      .update(verb + path + expires + data)
      .digest("hex");
};

const getExpires = () => {
    const date = new Date().getTime() + 60 * 1000; // 1 min in the future
    return date;
}

const expires = getExpires();
const signature = getSignature("GET", "/realtime");

const Client = new WebSocket(Api.endpoint);

Client.onopen = event => {
    Client.send(
      JSON.stringify({
        op: "authKeyExpires",
        args: [Api.apiId, expires, signature]
      })
    );
}

export default Client;


