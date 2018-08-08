
<template>
	<div class="close-position">
		<button class="close-position__button" v-on:click="getOrder">Close position</button>
	</div>
</template>

<script>
import { Api } from "api";
import axios from "axios";

export default {
  data: () => {
    return {};
  },
  methods: {
    getOrder() {
      var verb = "POST",
        path = "/api/v1/order/closePosition",
        expires = this.getExpires(),
        data = { symbol: "XBTUSD" };

      var postBody = JSON.stringify(data);
      const signature = this.getSignature(verb, path, postBody);

      console.log(signature);

      var headers = {
        "content-type": "application/json",
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
        // This example uses the 'expires' scheme. You can also use the 'nonce' scheme. See
        // https://www.bitmex.com/app/apiKeysUsage for more details.
        "api-expires": expires,
        "api-key": Api.apiId,
        "api-signature": signature
      };

      const requestOptions = {
        headers: headers,
        //  url: "https://testnet.bitmex.com" + "/api/v1/order/cancelAllAfter",
        method: "POST",
        body: postBody
      };

      fetch(
        "http://cryptic-headland-94862.herokuapp.com/https://testnet.bitmex.com" +
          path,
        requestOptions
      )
        .then(function(response) {
          // handle success
          console.log(response);
        })
        .catch(function(error) {
          // handle error
        });
    }
  },

  mounted() {
    // this.getOrder();
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
button {
  font-size: 14px;
  padding: 10px 20px;
  border: 0;
  margin: 20px;
  background: green;
  color: white;
  border-radius: 2px;
}
</style>