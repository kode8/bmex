
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
    async getOrder() {
      const expires = this.getExpires();
      const signature = this.getSignature(
        "POST",
        "/api/v1/order/closePosition?filter={'symbol': 'XBTUSD'}'"
      );

      const headers = {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        "api-expires": expires,
        "api-key": Api.apiId,
        "api-signature": signature,
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest"
      };

      axios
        .post(
          "https://cryptic-headland-94862.herokuapp.com/https://testnet.bitmex.com/api/v1/order/closePosition",
          {
            headers: headers
          }
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