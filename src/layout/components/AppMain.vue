<template>
  <section class="app-main">
    <!-- <transition name="fade-transform"
      enter-active-class="animate__animated animate__fadeInDown  animate__faster"
      leave-active-class="animate__animated animate__fadeOutDown  animate__faster"
      mode="out-in">
      <router-view :key="key" />
    </transition> -->
    <router-view :key="key" />
  </section>
</template>

<script>
import 'animate.css';
export default {
    name: "AppMain",
    computed: {
        key() {
            return this.$route.path;
        },
    },
};
</script>


<style scoped>
.app-main {
  position: relative;
  overflow: scroll;
  padding: 3vh 4vw 0vh;
  width: 100%;
  /*50 = navbar  */
  height: calc(100vh - 130px);
}

.fixed-header + .app-main {
  padding-top: 50px;
}

::-webkit-scrollbar {
  width: 0 !important;
}

::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog

.el-popup-parent--hidden {

  .fixed-header {
    padding-right: 15px;
  }
}
</style>
