<template>
  <div class="row">
    <div class="col-md-12">
      <user-card :user="user" :ownProfile="ownProfile"></user-card>
    </div>
    <div :class="classShow" v-if="showAcademic">
      <card>
        <div class="d-flex justify-content-between">
          <h4 class="card-title">Academic</h4>
          <base-button round icon type="default">
            <i class="tim-icons icon-simple-add text-white"></i>
          </base-button>
        </div>
        <card class="d-flex flex-row">
          <img
            slot="image"
            class=""
            src="https://placehold.co/240"
            alt="Card image cap"
            height="115px"
            width="115px"
          />
          <div class="d-flex justify-content-between">
            <div>
              <h6 class="card-subtitle text-muted mb-0">Licenciatura em</h6>
              <h4 class="card-title">
                Tecnologias e Sistemas de Informação para a Web
              </h4>
              <h5 class="card-subtitle mb-2">
                Escola Superior de Media Artes e Design
              </h5>
              <h6 class="card-subtitle mb-2 text-muted">2022 - (presente)</h6>
              <a href="#" class="card-link">Site Instituição</a>
            </div>
            <div v-if="ownProfile" class="d-flex flex-column">
              <base-button round icon type="warning">
                <router-link :to="{ hash: '#editProfile' }"
                  ><i class="tim-icons icon-pencil text-white"></i
                ></router-link>
              </base-button>
              <base-button round icon type="danger">
                <router-link :to="{ hash: '#editProfile' }"
                  ><i class="tim-icons icon-trash-simple text-white"></i
                ></router-link>
              </base-button>
            </div>
          </div>
        </card>
      </card>
    </div>

    <div :class="classShow" v-if="showCareer">
      <card>
        <div class="d-flex justify-content-between">
          <h4 class="card-title">Professional Career</h4>
          <base-button round icon type="default">
            <i class="tim-icons icon-simple-add text-white"></i>
          </base-button>
        </div>
        <card class="d-flex flex-row">
          <img
            slot="image"
            class=""
            src="https://placehold.co/240"
            alt="Card image cap"
            height="115px"
          />
          <div class="d-flex justify-content-between">
            <div>
              <h4 class="card-title">Empresa Fixe Lta.</h4>
              <!--! Isto é um texto satírico -->
              <h5 class="card-subtitle mb-2">Nome Cargo</h5>
              <h6 class="card-subtitle mb-2 text-muted">2022 - (presente)</h6>
              <a href="#" class="card-link">Site Empresa</a>
            </div>
            <div v-if="ownProfile" class="d-flex flex-column">
              <base-button round icon type="warning">
                <router-link :to="{ hash: '#editProfile' }"
                  ><i class="tim-icons icon-pencil text-white"></i
                ></router-link>
              </base-button>
              <base-button round icon type="danger">
                <router-link :to="{ hash: '#editProfile' }"
                  ><i class="tim-icons icon-trash-simple text-white"></i
                ></router-link>
              </base-button>
            </div>
          </div>
        </card>
      </card>
    </div>

    <div class="col-md-12" v-if="ownProfile" id="editProfile">
      <edit-profile-form :model="model"> </edit-profile-form>
    </div>
  </div>
</template>
<script>
import EditProfileForm from "./Profile/EditProfileForm";
import UserCard from "./Profile/UserCard";
export default {
  components: {
    EditProfileForm,
    UserCard,
  },
  data() {
    return {
      model: {
        company: "Creative Code Inc.",
        email: "mike@email.com",
        username: "michael23",
        firstName: "Mike",
        lastName: "Andrew",
        address: "Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09",
        city: "Melbourne",
        country: "Australia",
        about:
          "Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo.",
      },
      user: {
        fullName: "Mike Andrew",
        title: "NameTag",
        following: false,
        level: 69,
      },
      ownProfile: true,
      showAcademic: true,
      showCareer: true,
    };
  },
  computed: {
    counter() {
      let counter = 0;
      counter += this.showAcademic ? 1 : 0;
      counter += this.showCareer ? 1 : 0;
      return counter;
    },
    classShow() {
      if (this.counter == 2) {
        return "col-md-6";
      }
      return "col-md-12";
    },
  },
};
</script>
<style></style>
