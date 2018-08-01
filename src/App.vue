<template>
	<div id="app">
		<h1>App</h1>
		<Counter />
	</div>
</template>

<script>
import Counter from "./components/Counter.vue";

export default {
  components: {
    Counter
  }
};
</script>

<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
}
</style>