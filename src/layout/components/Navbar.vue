<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened" class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="name-container" trigger="click">
        <div class="name-wrapper">
          <div>{{ name }}</div>
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">登出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Breadcrumb from '@/components/Breadcrumb';
import Hamburger from '@/components/Hamburger';

export default {
    name:"NavBar",
    components: {
        Breadcrumb,
        Hamburger
    },
    computed: {
        ...mapGetters([
            'sidebar',
            'name'
        ])
    },
    methods: {
        toggleSideBar() {
            this.$store.dispatch('app/toggleSideBar');
        },
        async logout() {
            await this.$store.dispatch('user/logout');
            this.$router.push(`/login?redirect=${this.$route.fullPath}`);
        }
    }
};
</script>

<style lang="scss" scoped>
.navbar {
  position: relative;
  overflow: hidden;
  height: 50px;
  background: #FFF;
  box-shadow: 0 1px 4px rgba(0,21,41,0.08);

  .hamburger-container {
    float: left;
    height: 100%;
    transition: background 0.3s;
    line-height: 46px;
    cursor: pointer;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5A5E66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025)
        }
      }
    }

    .name-container {
      margin-right: 50px;

      .name-wrapper {
        position: relative;


        .el-icon-caret-bottom {
          position: absolute;
          top: 25px;
          right: -20px;
          font-size: 12px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
