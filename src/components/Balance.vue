
<template>
	<div class="balance">
		<h1 class="balance__amount"> {{ balance }} XBT</h1>
	</div>
</template>

<script>
import { Api } from "api";
import Client from "../api/client";
import axios from "axios";

export default {
  data: () => {
    return {
      balance: 0
    };
  },
  methods: {
    getBalance() {
      Client.addEventListener("open", event => {
        Client.send(
          JSON.stringify({
            op: "subscribe",
            args: ["wallet"]
          })
        );
      });

      Client.addEventListener("message", event => {
        const result = JSON.parse(event.data);
        try {
          if (result.table === "wallet") {
            const balance = result.data[0].amount / 100000000;
            this.balance = balance.toFixed(4);
          }
        } catch (e) {}
      });
    }
  },

  mounted() {
    this.getBalance();
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
</style>