import Vue from 'vue';
import { Api } from "api";
import Crypto from "crypto";
import App from './App.vue';

Vue.mixin({
  methods: {
    getSignature(verb, path, data = '') {
      const expires = this.getExpires();
      return Crypto
        .createHmac("sha256", Api.secret)
        .update(verb + path + expires + data)
        .digest("hex");
    },
    getExpires() {
      const date = new Date().getTime() + 60 * 1000; // 1 min in the future
      return date;
    }
  }
});

Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

new Vue({
  el: '#app',
  render: h => h(App)
})
