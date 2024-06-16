<script>
import Modal from "../components/Modal"
import { useDegreesStore } from "../stores/degrees.js";

export default {
  components: {
    Modal,
  },

  data() {
    return {
      degreeStore: useDegreesStore(),
      modals: {
        newInstitution: false,
      },
      edit: false, institutionEdit:{},
      currentPage: 1,
      itemsPerPage: 2,
    };
  },
  computed: {
    degreesList() {
      return this.degreeStore.degrees;
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
  mounted() {
    console.clear();
    console.log("mounted")
    //this.fetchData(this.currentPage - 1, this.itemsPerPage);  // Ajusta o índice da página para começar em 0
  }
};
</script>

<template>
  <div>
    <card>

      <div class="d-flex justify-content-between">
        <h4 class="card-title">Degrees</h4>
        <base-button
          round
          icon
          type="default"
          @click="
            toggleAdd();
            modals.newDegree = true;
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
        <base-input label="Institution" class="col-md-6">
          <select class="form-control" id="exampleFormControlSelect1">
            <option value="">Select</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </base-input>
      </div>



      <!--hardcode-->
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
            <h6 class="card-subtitle text-muted mb-0">Licenciatura em</h6>
            <h4 class="card-title">
              Tecnologias e Sistemas de Informação para a Web
            </h4>
            <h5 class="card-subtitle mb-2">
              Escola Superior de Media Artes e Design
            </h5>
            <a href="#" class="card-link">Site Instituição</a>
          </div>
          <div class="d-flex flex-column">
            <base-button
              round
              icon
              type="warning"
              @click="
                toggleEdit();
                modals.newDegree = true;
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

    <modal :show.sync="modals.newDegree"  body-classes="p-0">
      <card type="secondary"
                  header-classes="bg-white pb-5"
                  body-classes="px-lg-5 py-lg-5"
                  class="border-0 mb-0">
      <template>
        <h5 class="modal-title" id="exampleModalLabel" v-if="!edit">
          Add degree
        </h5>
        <h5 class="modal-title" id="exampleModalLabel" v-else>Edit degree</h5>
      </template>
      <div>
        <base-input label="Type">
          <select class="form-control" id="exampleFormControlSelect1">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </base-input>
        <base-input
          type="text"
          label="Designation"
          placeholder="Web Technologies"
        >
        </base-input>
        <base-input label="Institution">
          <select class="form-control" id="exampleFormControlSelect1">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </base-input>
      </div>
      <template slot="footer">
        <base-button type="secondary" @click="modals.newDegree = false"
          >Close</base-button
        >
        <base-button type="primary" v-if="!edit">Add</base-button>
        <base-button v-else type="primary">Save changes</base-button>
      </template>
    </card>
    </modal>
  </div>
</template>

<style></style>
