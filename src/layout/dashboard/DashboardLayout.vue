<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link
          to="/dashboard"
          :name="$t('sidebar.dashboard')"
          icon="tim-icons icon-chart-pie-36"
        />
        <sidebar-link
          to="/publications"
          name="Posts"
          icon="tim-icons icon-chat-33"
        />
        <sidebar-link
          to="/events"
          name="Events"
          icon="tim-icons icon-calendar-60"
        />
        <div v-if="isAdmin">
          <hr>
        <sidebar-link
          to="/admin/degree"
          name="Degrees"
          icon="tim-icons icon-book-bookmark"
          
        />
        <sidebar-link
          to="/admin/institution"
          name="Institutions"
          icon="tim-icons icon-bank"
          
        />
        <sidebar-link
          to="/admin/company"
          name="Companies"
          icon="tim-icons icon-badge"
          
        />
        <sidebar-link
          to="/admin/event"
          name="Events"
          icon="tim-icons icon-calendar-60"
          
        />
        <sidebar-link
          to="/admin/user"
          name="Users"
          icon="tim-icons icon-single-02"
          
        />
        <hr>
      </div>
        <div v-if="showTemplatePages">
          <br>
        <sidebar-link
          to="/icons"
          :name="$t('sidebar.icons')"
          icon="tim-icons icon-atom"
        />
        <sidebar-link
          to="/notifications"
          :name="$t('sidebar.notifications')"
          icon="tim-icons icon-bell-55"
        />
        <sidebar-link
          to="/table-list"
          :name="$t('sidebar.tableList')"
          icon="tim-icons icon-puzzle-10"
        />
        <sidebar-link
          to="/typography"
          :name="$t('sidebar.typography')"
          icon="tim-icons icon-align-center"
        />
        <sidebar-link
          to="/dashboard?enableRTL=true"
          :name="$t('sidebar.rtlSupport')"
          icon="tim-icons icon-world"
        />
        </div>
      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar"> </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
import { useUserStore } from '../../stores/users.js'
export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
  },
  computed: {
    isAdmin() {
      return this.userStore.getUserType == 'admin' 
    },
  },
  data() {
    return {
      showTemplatePages: false,
      userStore: useUserStore(),
    }
  },
};
</script>
