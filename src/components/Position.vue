
<template>
  <div class="position" v-if="currentQty === 0">
    <p>No positions</p>
  </div>
	<div class="position" v-else>
		<table>
      <tr>
        <th>Qty</th><th>Price</th><th>RealisedPNL</th> 
      </tr>
      <tr>
        <td :class="[isNegative(currentQty) ? 'negative' : 'positive']">{{ currentQty }}</td>
        <td :class="[isNegative(markPrice) ? 'negative' : 'positive']">{{ markPrice }}</td>
        <td :class="[isNegative(realisedPNL) ? 'negative' : 'positive']">{{ realisedPNL }} BTC</td> 
      </tr>
		</table>
    <p :class="[isNegative(currentQty) ? 'negative' : 'positive']"><b>LONG</b></p>
	</div>
</template>

<script>
import { Api } from "api";
import Client from "../api/client";
import axios from "axios";

export default {
  data: () => {
    return {
      currentQty: 0,
      markPrice: 0,
      realisedPNL: 0
    };
  },
  methods: {
    isNegative(num) {
      return num <= 0;
    },

    async getPosition() {
      Client.addEventListener("open", event => {
        Client.send(
          JSON.stringify({
            op: "subscribe",
            args: ["position"]
          })
        );
      });

      Client.addEventListener("message", event => {
        const result = JSON.parse(event.data);
        try {
          if (result.table === "position") {
            const {
              currentQty,
              unrealisedGrossPnl,
              unrealisedPnlPcnt,
              markPrice
            } = result.data[0];

            this.currentQty = currentQty;

            if (unrealisedGrossPnl) {
              this.realisedPNL = (unrealisedGrossPnl / 100000000).toFixed(4);
            }
            if (markPrice) {
              this.markPrice = markPrice;
            }
          }
        } catch (e) {}
      });
    }
  },

  mounted() {
    this.getPosition();
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
table {
  th,
  td {
    text-align: left;
    padding: 3px 10px;
  }
}
.negative {
  color: red;
}
.positive {
  color: green;
}
</style>