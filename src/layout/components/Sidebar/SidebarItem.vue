<template>
  <div
    v-if="!item.meta || !item.meta.hidden"
    :class="['menu-wrapper', isCollapse ? 'simple-mode' : 'full-mode', {'first-level': isFirstLevel}]"
  >
    <template v-if="!alwaysShowRootMenu && theOnlyOneChild && !theOnlyOneChild.children">
      <sidebar-item-link
        v-if="theOnlyOneChild.meta"
        :to="resolvePath(theOnlyOneChild.path)"
      >
        <el-menu-item
          :index="resolvePath(theOnlyOneChild.path)"
          :class="{'submenu-title-noDropdown': isFirstLevel}"
        >
          <unicon
            v-if="theOnlyOneChild.meta.icon"
            :name="theOnlyOneChild.meta.icon"
            width="20"
            height="20"
            style="margin-right:10px"
          />
          <!-- <img width="20"
            height="20"
            src="https://cdn2.vectorstock.com/i/1000x1000/40/76/flat-group-people-icon-symbol-background-vector-5524076.jpg"> -->
          <span
            v-if="theOnlyOneChild.meta.title"
            slot="title"
          >{{ $t('route.' + theOnlyOneChild.meta.title) }}</span>
        </el-menu-item>
      </sidebar-item-link>
    </template>
    <el-submenu
      v-else
      :index="resolvePath(item.path)"
      popper-append-to-body
    >
      <template slot="title">
        <unicon
          v-if="item.meta && item.meta.icon"
          :name="item.meta.icon"
          width="20"
          height="20"
          style="margin-right:10px"
        />
        <span
          v-if="item.meta && item.meta.title"
          slot="title"
        >{{ $t('route.' + item.meta.title) }}</span>
      </template>
      <template v-if="item.children">
        <sidebar-item
          v-for="child in item.children"
          :key="child.path"
          :item="child"
          :is-collapse="isCollapse"
          :is-first-level="false"
          :base-path="resolvePath(child.path)"
          class="nest-menu"
        />
      </template>
    </el-submenu>
  </div>
</template>

<script lang="ts">
import path from 'path'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Route, RouteConfig } from 'vue-router'
import { isExternal } from '@/utils/validate'
import SidebarItemLink from './SidebarItemLink.vue'

@Component({
  // Set 'name' here to prevent uglifyjs from causing recursive component not work
  // See https://medium.com/haiiro-io/element-component-name-with-vue-class-component-f3b435656561 for detail
  name: 'SidebarItem',
  components: {
    SidebarItemLink
  }
})
export default class extends Vue {
  @Prop({ required: true }) private item!: RouteConfig;
  @Prop({ default: false }) private isCollapse!: boolean;
  @Prop({ default: true }) private isFirstLevel!: boolean;
  @Prop({ default: '' }) private basePath!: string;

  get alwaysShowRootMenu() {
    if (this.item.meta && this.item.meta.alwaysShow) {
      return true
    }
    return false
  }

  get showingChildNumber() {
    if (this.item.children) {
      const showingChildren = this.item.children.filter(item => {
        if (item.meta && item.meta.hidden) {
          return false
        } else {
          return true
        }
      })
      return showingChildren.length
    }
    return 0
  }

  get theOnlyOneChild() {
    if (this.showingChildNumber > 1) {
      return null
    }
    if (this.item.children) {
      for (const child of this.item.children) {
        if (!child.meta || !child.meta.hidden) {
          return child
        }
      }
    }
    // If there is no children, return itself with path removed,
    // because this.basePath already conatins item's path information
    return { ...this.item, path: '' }
  }

  private resolvePath(routePath: string) {
    if (isExternal(routePath)) {
      return routePath
    }
    if (isExternal(this.basePath)) {
      return this.basePath
    }
    return path.resolve(this.basePath, routePath)
  }
}
</script>

<style lang="scss">
.el-submenu.is-active > .el-submenu__title {
  color: white !important;
}

// .el-icon-arrow-down:before{
//   color:white;
// }

.full-mode {
  .nest-menu .el-submenu > .el-submenu__title,
  .el-submenu .el-menu-item {
    min-width: $sideBarWidth !important;
    background-image: $subMenuBg !important;
    &.is-active{
      border-right: 5px solid white;
      color: white!important;
    }
  }
}

.simple-mode {
  &.first-level {
    .submenu-title-noDropdown {
      padding: 0 !important;
      position: relative;

      .el-tooltip {
        padding: 0 !important;
      }
    }
    .el-menu-item{
      text-align: center;
    }

    .unicon{
      margin-right: 0 !important;
    }

    .el-submenu {
      overflow: hidden;
      text-align: center;

      & > .el-submenu__title {
        padding: 0px !important;
        background-color: #E3000F;

        .el-submenu__icon-arrow {
          display: none;
        }

        & > span {
          display: none;
          // visibility: hidden;
        }
      }
    }
  }
}
.el-menu-item.is-active{
  // color:white!important;
  background-color:#E3000F;
}

.el-menu-item.is-active .unicon{
  // fill:#9e9899!important;
}
// .unicon{
//   fill:white!important;
// }
</style>

<style lang="scss" scoped>
.svg-icon {
  margin-right: 16px;
}

.simple-mode {
  .svg-icon {
    margin-left: 20px;
  }
}
.el-menu-item:hover{
  background-color:#E3000F;
}
</style>
