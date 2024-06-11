<script>
import { CollapseTransition } from "vue2-transitions";
import Modal from "@/components/Modal";
import { useAuthStore } from "../../stores/auth";

export default {
  components: {
    CollapseTransition,
    Modal,
  },
  data() {
    return {      
      activeNotifications: false,
      showMenu: false,
      searchModalVisible: false,
      searchQuery: "",
      session: false,
      //! DUMMY USERS
      users: [
        {
          id: 1,
          name: "	Andrew Mike",
          level: "10",
          nameTag: "Develop",
          type: "Normal",
          restricted: true,
          profilePicURL: 'https://placehold.co/240',
        },
        {
          id: 2,
          name: "	John Doe",
          level: "20",
          nameTag: "Design",
          type: "Admin",
          restricted: false,
          profilePicURL: 'https://placehold.co/240',
        },
      ],
    };
  },
  computed: {
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    },
    isRTL() {
      return this.$rtl.isRTL;
    },
    loggedIn() {
      return this.session;
    },
    filteredUsers() {
      const users = this.users.filter((user) =>
        user.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      return this.searchQuery !== "" ? users : [];
    },
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
  },
};
</script>

<template>
  <nav
    class="navbar navbar-expand-lg navbar-absolute"
    :class="{ 'bg-white': showMenu, 'navbar-transparent': !showMenu }"
  >
    <div class="container-fluid">
      <div class="navbar-wrapper">
        <div
          class="navbar-toggle d-inline"
          :class="{ toggled: $sidebar.showSidebar }"
        >
          <button
            type="button"
            class="navbar-toggler"
            aria-label="Navbar toggle button"
            @click="toggleSidebar"
          >
            <span class="navbar-toggler-bar bar1"></span>
            <span class="navbar-toggler-bar bar2"></span>
            <span class="navbar-toggler-bar bar3"></span>
          </button>
        </div>
        <a class="navbar-brand" href="#pablo">{{ routeName }}</a>
      </div>
      <button
        class="navbar-toggler"
        type="button"
        @click="toggleMenu"
        data-toggle="collapse"
        data-target="#navigation"
        aria-controls="navigation-index"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-bar navbar-kebab"></span>
        <span class="navbar-toggler-bar navbar-kebab"></span>
        <span class="navbar-toggler-bar navbar-kebab"></span>
      </button>

      <collapse-transition>
        <div class="collapse navbar-collapse show" v-show="showMenu">
          <ul class="navbar-nav" :class="$rtl.isRTL ? 'mr-auto' : 'ml-auto'">
            <div
              class="search-bar input-group"
              @click="searchModalVisible = true"
            >
              <!-- <input type="text" class="form-control" placeholder="Search...">
              <div class="input-group-addon"><i class="tim-icons icon-zoom-split"></i></div> -->
              <button
                class="btn btn-link"
                id="search-button"
                data-toggle="modal"
                data-target="#searchModal"
              >
                <i class="tim-icons icon-zoom-split"></i>
              </button>
              <!-- You can choose types of search input -->
            </div>
            <modal
              :show.sync="searchModalVisible"
              class="modal-search"
              id="searchModal"
              :centered="false"
              :show-close="true"
            >
              <input
                slot="header"
                v-model="searchQuery"
                type="text"
                class="form-control"
                id="inlineFormInputGroup"
                placeholder="SEARCH"
              />
              <div>
                <!-- User section -->
                <div class="d-flex justify-content-around">
                  <card
                    class="d-flex flex-row col-md-5"
                    v-for="user in filteredUsers"
                    :key="user.id"
                    >
                      <img
                        slot="image"
                        class=""
                        :src="user.profilePicURL"
                        alt="Card image cap"
                        height="115px"
                        width="115px" />
                        <router-link
                      :to="{ name: 'profile', params: { id: user.id } }"
                    >
                      <div class="d-flex justify-content-between">
                        <div class="d-flex flex-column justify-content-center">
                          <div
                            class="d-flex flex-column justify-content-center"
                          >
                            <h2 class="card-title">
                              {{ user.name }}
                            </h2>
                            <h5 class="card-subtitle mb-2">
                              LVL {{ user.level }} - {{ user.nameTag }}
                            </h5>
                          </div>
                        </div>
                        <div class="d-flex flex-column"></div></div
                    ></router-link>
                  </card>
                </div>
              </div>
            </modal>

            <!--Notificações-->
            <base-dropdown
              tag="li"
              :menu-on-right="!$rtl.isRTL"
              title-tag="a"
              class="nav-item"
              v-if="loggedIn"
            >
              <a
                slot="title"
                href="#"
                class="dropdown-toggle nav-link"
                data-toggle="dropdown"
                aria-expanded="true"
              >
                <div class="notification d-none d-lg-block d-xl-block"></div>
                <i class="tim-icons icon-sound-wave"></i>
                <p class="d-lg-none">New Notifications</p>
              </a>
              <li class="nav-link">
                <a href="#" class="nav-item dropdown-item"
                  >Mike John responded to your email</a
                >
              </li>
              <li class="nav-link">
                <a href="#" class="nav-item dropdown-item"
                  >You have 5 more tasks</a
                >
              </li>
              <li class="nav-link">
                <a href="#" class="nav-item dropdown-item"
                  >Your friend Michael is in town</a
                >
              </li>
              <li class="nav-link">
                <a href="#" class="nav-item dropdown-item"
                  >Another notification</a
                >
              </li>
              <li class="nav-link">
                <a href="#" class="nav-item dropdown-item">Another one</a>
              </li>
            </base-dropdown>
            
            <!--Conta logada-->
            <base-dropdown
              tag="li"
              :menu-on-right="!$rtl.isRTL"
              title-tag="a"
              class="nav-item"
              menu-classes="dropdown-navbar"
              v-if="loggedIn"
            >
              <a
                slot="title"
                href="#"
                class="dropdown-toggle nav-link"
                data-toggle="dropdown"
                aria-expanded="true"
              >
                <div class="photo">
                  <img src="img/anime3.png" />
                </div>
                <b class="caret d-none d-lg-block d-xl-block"></b>
                <p class="d-lg-none">Log out</p>
              </a>
              <li class="nav-link">
                <a href="#" class="nav-item dropdown-item">Profile</a>
              </li>
              <li class="nav-link">
                <a href="#" class="nav-item dropdown-item">Settings</a>
              </li>
              <div class="dropdown-divider"></div>
              <li class="nav-link">
                <a href="#" class="nav-item dropdown-item">Log out</a>
              </li>
            </base-dropdown>

            <!--Conta não logada-->
            <base-dropdown
              tag="li"
              :menu-on-right="!$rtl.isRTL"
              title-tag="a"
              class="nav-item"
              menu-classes="dropdown-navbar"
              v-if="!loggedIn"
            >
              <a
                slot="title"
                href="#"
                class="dropdown-toggle nav-link"
                data-toggle="dropdown"
                aria-expanded="true"
              >
                <i class="tim-icons icon-single-02"></i>
                <b class="caret d-none d-lg-block d-xl-block"></b>
                <p class="d-lg-none">Account</p>
              </a>
              <li class="nav-link">
                <a
                  class="nav-item dropdown-item"
                  @click="$router.push({ name: 'register' })"
                  >Register</a
                >
              </li>
              <div class="dropdown-divider"></div>
              <li class="nav-link">
                <a
                  class="nav-item dropdown-item"
                  @click="$router.push({ name: 'login' })"
                  >Log In</a
                >
              </li>
            </base-dropdown>

          </ul>
        </div>
      </collapse-transition>
    </div>
  </nav>
</template>

<style scoped>
/* Custom styles for dropdown items */
.nav-item.dropdown-item {
  font-size: 16px;
  color: #333;
}

.nav-item.dropdown-item:hover {
  color: #007bff;
  text-decoration: underline;
}

/* Additional styling for the navbar */
.navbar-toggler {
  border: none;
}

.navbar-toggler-bar {
  background-color: #333;
}
</style>

