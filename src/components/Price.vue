
<template>
	<div class="price">
		<h1 class="price__usd" :class="tick"> ${{ price }}</h1>
	</div>
</template>

<script>
import { Api } from "api";
import Client from "../api/client";

export default {
  data: () => {
    return {
      price: 1,
      tick: null
    };
  },
  methods: {
    async lastPrice() {
      Client.addEventListener("open", event => {
        Client.send(
          JSON.stringify({
            op: "subscribe",
            args: ["instrument:XBTUSD"]
          })
        );
      });

      Client.addEventListener("message", event => {
        const result = JSON.parse(event.data);
        try {
          if (result.data[0].lastPrice) {
            const { lastPrice, lastTickDirection } = result.data[0];
            this.price = lastPrice;
            if (lastTickDirection) {
              this.tick = lastTickDirection;
            }
          }
        } catch (e) {}
      });
    }
  },

  mounted() {
    this.lastPrice();
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
.price__usd.PlusTick,
.price__usd.ZeroPlusTick {
  color: green;
  &::after {
    content: "▲";
  }
}
.price__usd.ZeroMinusTick,
.price__usd.MinusTick {
  color: red;
  &::after {
    content: "▼";
  }
}
</style>