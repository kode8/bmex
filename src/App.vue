<template>
	<div id="app">
    <Price />
    <Balance />
    <Position />
    <ClosePosition />
	</div>
</template>

<script>
import Price from "./components/Price.vue";
import Balance from "./components/Balance.vue";
import Position from "./components/Position.vue";
import ClosePosition from "./components/ClosePosition.vue";

export default {
  data: () => {
    return {
      test: 1
    };
  },
  components: {
    Price,
    Balance,
    Position,
    ClosePosition
  }
};
</script>

<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
}
body {
  font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>