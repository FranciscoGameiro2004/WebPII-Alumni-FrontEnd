<script>
import Modal from "../components/Modal";
import { useInstitutionsStore } from "../stores/institutions";

export default {
  components: {
    Modal,
  },

  data() {
    return {
      institutionStore: useInstitutionsStore(),
      modals: {
        newInstitution: false,
      },
      edit: false,
    };
  },
  methods: {
    toggleEdit() {
      this.edit = true;
    },
    toggleAdd() {
      this.edit = false;
      this.modals.newInstitution = true;
    },
  },
};

</script>

<template>
  <div>
    <card>
      <div class="d-flex justify-content-between">
        <h4 class="card-title">Institutions</h4>
        <base-button
          round
          icon
          type="default"
          @click="toggleAdd();
          modals.newInstitution = true;
          "
          >
          <i class="tim-icons icon-simple-add text-white"></i>
        </base-button>
      </div>
      <div class="d-flex justify-content-between">
        <base-input
          type="text"
          label="Search"
          placeholder="Search"
          class="col-md-6"
        >
        </base-input>
      </div>

      <!--
      <div>
        <div v-if="institutions.length">
        <ul>
          <li v-for="institution in institutions" :key="institution.id">{{ institution.name }}</li>
        </ul>
      </div>
        <div v-else>
          <p>No institutions available.</p>
        </div>
      </div>
      -->

    </card>

    <modal :show.sync="modals.newInstitution">
      <template slot="header">
        <h5 class="modal-title" id="exampleModalLabel" v-if="!edit">
          Add Institution
        </h5>
        <h5 class="modal-title" id="exampleModalLabel" v-else>Edit Institution</h5>
      </template>
      <div>
        <base-input
          type="text"
          label="Institution Name"
        >
        </base-input>
        <base-input
          type="number"
          label="Phone Number"
        >
        </base-input>
        <base-input
          type="email"
          label="Email"
        >
        </base-input>
        <base-input
          type="url"
          label="Website"
        >
        </base-input>
        <base-input
          type="text"
          label="Address"
        >
        </base-input>
        <base-input
          type="text"
          label="Zip Code"
          placeholder="1111-111"
          class="col-md-6"
        >
        </base-input>
        <label for="" class="control-label">Image</label>
        <br>
        <img
          slot="image"
          class=""
          src="https://placehold.co/240"
          alt="Card image cap"
          height="115px"
          width="115px"
        />
        <br>
        <input type="file">
      </div>
      <template slot="footer">
        <base-button type="secondary" @click="modals.newInstitution = false"
          >Close</base-button
        >
        <base-button type="primary" v-if="!edit">Add</base-button>
        <base-button v-else type="primary">Save changes</base-button>
      </template>
    </modal>
  </div>
</template>

<style></style>