<template>
  <section class="app-main">
    <transition
      name="fade-transform"
      mode="out-in"
    >
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { TagsViewModule } from '@/store/modules/tags-view'
import { Route } from 'vue-router'

@Component({
  name: 'AppMain',
  components: {
  }
})
export default class extends Vue {
message = '';
header = '';

get cachedViews() {
  return TagsViewModule.cachedViews
}

get key() {
  return this.$route.path
}

created() {
  // this.$route.

}

  @Watch('$route', { immediate: true, deep: true })
onUrlChange(newVal: Route) {
  this.message = this.$route.meta?.info
  this.header = this.$route.meta?.header
  // Some action
}
}
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: #EEEEEE;
}

.fixed-header + .app-main {
  padding-top: 50px;
  height: 100vh;
  overflow: auto;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header + .app-main {
    padding-top: 84px;
  }
}
</style>
