<template>
  <div id="app">
    <template v-if="!!user">
      <SiderLeft></SiderLeft>
      <SiderRight></SiderRight>
    </template>
    <template v-else>
      <SigninAndSignup></SigninAndSignup>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SigninAndSignup from './components/SigninAndSignup'
import SiderLeft from './components/SiderLeft'
import HelloWorld from './components/HelloWorld'
import SiderRight from './components/SiderRight'

export default {
  computed: mapState(['user']),
  components: {SigninAndSignup, SiderLeft, SiderRight},
  methods: {
    hiddenFaces() {
      this.$store.commit('hiddenFaces')
    }
  }
}
</script>

<style>
#app {
  margin: 0 auto;
  width: 80%;
  height: 100%;
  background: rgba(240, 240, 240, .6);
  display: flex;
}

@media(max-width: 1000px) {
  #app {
    margin: 0;
    width: 100%;
  }
}

.iconfont {
  font-size: 22px;
}
</style>

