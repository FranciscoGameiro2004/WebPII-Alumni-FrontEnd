<script>
import EditProfileForm from "./Profile/EditProfileForm";
import UserCard from "./Profile/UserCard";
import Modal from "../components/Modal"
import { useUserStore } from"../stores/users"

export default {
  components: {
    EditProfileForm,
    UserCard,
    Modal,
  },
  data() {
    return {
      userStore: useUserStore(),
      userLogged: {},
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

      userId:0,

      ownProfile: false,
      showAcademic: true,
      showCareer: true,
      modals: {
        newCareer: false,
        newAcademic: false
      },
      edit: true
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
    editModal () {
      return this.edit
    },
    profileId(){
      return this.$route.params.id
    },
    userInfo(){
      return this.usersStore.getUser
    }
  },
  methods: {
    toggleEdit() {
      this.edit = true
    },
    toggleAdd() {
      this.edit = false
    },
  },
  mounted () {
    console.log("Profile.vue")
    this.userId = this.userStore.getUserLogged.id; console.log(this.userId);
    this.userLogged = this.userStore.getUserLogged; console.log(this.userLogged);
  },
  /*
  watch: {
    // Observando mudanças em userLogged e userToken
    'userStore.getUserLogged': {
      handler(newVal, oldVal) {
        console.log('getUserLogged mudou de', oldVal, 'para', newVal);
        if( newVal != null) {
          this.userLogged = 
        }
      },
      immediate: true,
    },
  }
  */
};
</script>

<template>
  <div class="row">
    <div class="col-md-12">
      <user-card 
        :user="userLogged" 
        :ownProfile="ownProfile">
      </user-card>
    </div>
    
    <div :class="classShow" v-if="userLogged.degrees">
      <card v-for="degree of userLogged.degrees" :key="degree.degrees">
        <div class="d-flex justify-content-between">
          <h4 class="card-title">Academic</h4>
          <base-button round icon type="default" v-if="ownProfile" @click="toggleAdd(); modals.newAcademic = true">
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
                {{ degree.degree }}
              </h4>
              <!-- <h5 class="card-subtitle mb-2">
                Escola Superior de Media Artes e Design
              </h5> -->
              <h6 class="card-subtitle mb-2 text-muted">{{ degree.firstYear }} - {{ degree.lastYear ? degree.lastYear : '(presente)' }}</h6>
              <a href="#" class="card-link">Site Instituição</a>
            </div>

            <div v-if="ownProfile" class="d-flex flex-column">
              <base-button round icon type="warning" @click="toggleEdit(); modals.newAcademic = true">
                  <i class="tim-icons icon-pencil text-white"></i
                >
              </base-button>
              <base-button round icon type="danger">
                <i class="tim-icons icon-trash-simple text-white"></i
                >
              </base-button>
            </div>
          </div>
        </card>
      </card>
    </div>
    <div :class="classShow" v-else>
      <h1>Nenhuma curso registado</h1>
    </div>

    <div :class="classShow" v-if="userLogged.jobs">
      <card v-for="job of userLogged.jobs" :key="job.role">
        <div class="d-flex justify-content-between">
          <h4 class="card-title">Professional Career</h4>
          <base-button round icon type="default" @click="toggleAdd(); modals.newCareer = true" v-if="ownProfile">
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
              <base-button round icon type="warning" @click="toggleEdit(); modals.newCareer = true">
                <i class="tim-icons icon-pencil text-white"></i
                >
              </base-button>
              <base-button round icon type="danger">
                <i class="tim-icons icon-trash-simple text-white"></i
                >
              </base-button>
            </div>
          </div>
        </card>
      </card>
    </div>
    <div :class="classShow" v-else>
      <h1>Nenhuma emprego registado</h1>
    </div>

    
    <div class="col-md-12" v-if="ownProfile" id="editProfile">
      <edit-profile-form :model="model"></edit-profile-form>
    </div>

    <modal :show.sync="modals.newCareer">
     <template slot="header">
        <h5 class="modal-title" id="exampleModalLabel" v-if="!editModal">Add job</h5>
        <h5 class="modal-title" id="exampleModalLabel" v-else>Edit job</h5>
     </template>
     <div>
      <base-input label="Company">
        <select class="form-control" id="exampleFormControlSelect1">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </base-input>
      <base-input label="Role"
                  type="text"
                  placeholder="Enter role">
      </base-input>
      <div class="d-flex justify-content-center">
        <base-input class="col-md-4" label="First Year"
                  type="number"
                  placeholder="YYYY">
      </base-input>
      <base-input class="col-md-4" label="Last Year"
                  type="number"
                  placeholder="YYYY">
      </base-input>
      </div>
     </div>
     <template slot="footer">
         <base-button type="secondary" @click="modals.newCareer = false">Close</base-button>
         <base-button type="primary" v-if="!editModal">Add</base-button>
        <base-button v-else type="primary">Save changes</base-button>
     </template>
   </modal>

   <modal :show.sync="modals.newAcademic">
     <template slot="header">
        <h5 class="modal-title" id="exampleModalLabel" v-if="!editModal">Add degree</h5>
        <h5 class="modal-title" id="exampleModalLabel" v-else>Edit degree</h5>
     </template>
     <div>
      <base-input label="Institution">
        <select class="form-control" id="exampleFormControlSelect1">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </base-input>
      <base-input label="Degree">
        <select class="form-control" id="exampleFormControlSelect1">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </base-input>
      <div class="d-flex justify-content-center">
        <base-input class="col-md-4" label="First Year"
                  type="number"
                  placeholder="YYYY">
      </base-input>
      <base-input class="col-md-4" label="Last Year"
                  type="number"
                  placeholder="YYYY">
      </base-input>
      </div>
     </div>
     <template slot="footer">
         <base-button type="secondary" @click="modals.newAcademic = false">Close</base-button>
         <base-button type="primary" v-if="!editModal">Add</base-button>
        <base-button v-else type="primary">Save changes</base-button>
     </template>
   </modal>
  </div>
</template>

<style></style>
