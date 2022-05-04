<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse"/>

    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :active-text-color="variables.menuActiveText"
        :background-color="variables.menuBg"
        :collapse="isCollapse"
        :collapse-transition="false"
        :default-active="activeMenu"
        :text-color="variables.menuText"
        :unique-opened="false"
        mode="vertical"
      >
        <!--default-active: 当前激活菜单的 index-->
        <!--collapse: 是否水平折叠收起菜单-->
        <!--unique-opened:是否只保持一个子菜单的展开-->
        <!--collapse-transition:是否开启折叠动画-->

        <sidebar-item v-for="route in permission_routes" :key="route.path" :base-path="route.path" :item="route"/>

      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: {SidebarItem, Logo},
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
    // routes() {
    //   return this.$router.options.routes
    // },
    activeMenu() {
      const route = this.$route
      const {meta, path} = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
