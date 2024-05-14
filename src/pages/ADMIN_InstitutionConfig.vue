<template>
  <div>
    <card>
      <div class="d-flex justify-content-between">
        <h4 class="card-title">Institutions</h4>
        <base-button
          round
          icon
          type="default"
          @click="
            toggleAdd();
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

      <card class="d-flex flex-row col-md-6">
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
            <h4 class="card-title">
              Institution Name
            </h4>
            <h5 class="card-subtitle mb-2">
              <i class="tim-icons icon-square-pin text-white"></i> 
              Address Road 15 1111-111, Locality
            </h5>
            <h5 class="card-subtitle mb-2">
              <i class="tim-icons icon-tablet-2 text-white"></i> 
              912345678
            </h5>
            <h5 class="card-subtitle mb-2">
              <i class="tim-icons icon-email-85 text-white"></i> 
              institution@institution.org
            </h5>
            <a href="#" class="card-link">Institution Website</a>
          </div>
          <div class="d-flex flex-column">
            <base-button
              round
              icon
              type="warning"
              @click="
                toggleEdit();
                modals.newInstitution = true;
              "
            >
              <i class="tim-icons icon-pencil text-white"></i>
            </base-button>
            <base-button round icon type="danger">
              <i class="tim-icons icon-trash-simple text-white"></i>
            </base-button>
          </div>
        </div>
      </card>
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

<script>
import Modal from "../components/Modal"
export default {
  components: {
    Modal,
  },
  data() {
    return {
      modals: {
        newInstitution: false,
      },
      edit: false
    };
  },
  methods: {
    toggleEdit() {
      this.edit = true
    },
    toggleAdd() {
      this.edit = false
    },
  },
};
</script>

<style></style>