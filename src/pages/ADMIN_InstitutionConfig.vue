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
      edit: false, institutionEdit:{},
      currentPage: 1,
      itemsPerPage: 2,
    };
  },
  computed: {
    institutionsList() {
      return this.institutionStore.getInstitutions.data;
    },
    totalPages() {
      return Math.ceil(this.institutionStore.getInstitutions.pagination.total / this.itemsPerPage);
    },
  },
  methods: {
    toggleEdit(data) {
      this.institutionEdit = data;
      this.edit = true;
    },
    toggleAdd() {
      this.edit = false;
      this.modals.newInstitution = true;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    async fetchData(page, limit) {
      try {
        await this.institutionStore.fetchInstitutions(page, limit);
      } 
      catch (error) {
        console.error('Failed to fetch institutions:', error);
      }
    },
    async updateData() {
      /*
      console.log(this.institutionEdit.designation);
      console.log(this.institutionEdit.phoneNumber);
      console.log(this.institutionEdit.email);
      console.log(this.institutionEdit.url);
      console.log(this.institutionEdit.address);
      */
      let data = {
        "designation": this.institutionEdit.designation,
        "phoneNumber": this.institutionEdit.phoneNumber,
        "email": this.institutionEdit.email,
        "url": this.institutionEdit.url,
        "address": this.institutionEdit.address
      }; //console.log(data);

      try {
        await this.institutionStore.updateInstitution(this.institutionEdit.id, data)
      }
      catch (error) {
        console.error('Failed to fetch institutions:', error);
      }
    },
  },
  watch: {
    currentPage(newPage) {
      this.fetchData(newPage - 1, this.itemsPerPage);  // Ajusta o índice da página para começar em 0
    },
    itemsPerPage(newLimit) {
      this.fetchData(this.currentPage - 1, newLimit);  // Ajusta o índice da página para começar em 0
    }
  },
  mounted() {
    this.fetchData(this.currentPage - 1, this.itemsPerPage);  // Ajusta o índice da página para começar em 0
  }
}
</script>

<template>
  <div>
    <card>
      <!------------------------------------------------->
      <div class="d-flex justify-content-between">
        <h4 class="card-title">Institutions</h4>
        <base-button
          round
          icon
          type="default"
          @click="toggleAdd();
          modals.newInstitution = true;"
        >
          <i class="tim-icons icon-simple-add text-white"></i>
        </base-button>
      </div>
      <!------------------------------------------------->
      <div class="d-flex justify-content-between">
        <base-input
          type="text"
          label="Search"
          placeholder="Search"
          class="col-md-6"
        >
        </base-input>
        <base-input label="Items per Page" class="col-md-6">
          <select class="form-control" v-model="itemsPerPage">
            <option :value="2">2</option>
            <option :value="4">4</option>
            <option :value="8">8</option>
          </select>
        </base-input>
      </div>
      <!------------------------------------------------->
      <div>
        <div v-if="institutionsList.length">
          <div class="row">
            <div class="col-md-6" v-for="institution in institutionsList" :key="institution.id">

              <card class="d-flex flex-column">
                <img
                  slot="image"
                  :src="institution.logoUrl"
                  :alt="institution.designation"
                  height="115px"
                  width="115px"
                />
                <div>
                  <h4 class="card-title">{{ institution.designation }}</h4>
                  <h5 class="card-subtitle mb-2" v-if="institution.address">
                    <i class="tim-icons icon-square-pin text-white"></i> 
                    {{ institution.address }}
                  </h5>
                  <h5 class="card-subtitle mb-2" v-if="institution.phoneNumber">
                    <i class="tim-icons icon-tablet-2 text-white"></i> 
                    {{ institution.phoneNumber }}
                  </h5>
                  <h5 class="card-subtitle mb-2" v-if="institution.email">
                    <i class="tim-icons icon-email-85 text-white"></i> 
                    {{ institution.email }}
                  </h5>
                  <a :href="institution.url" class="card-link" v-if="institution.url">Institution Website</a>
                </div>
                <div class="d-flex flex-column mt-2">
                  <base-button
                    round
                    icon
                    type="warning"
                    @click="
                      toggleEdit( institution );
                      modals.newInstitution = true;
                    "
                  >
                    <i class="tim-icons icon-pencil text-white"></i>
                  </base-button>
                  <base-button round icon type="danger">
                    <i class="tim-icons icon-trash-simple text-white"></i>
                  </base-button>
                </div>
              </card>
              
            </div>
          </div>
        </div>
        <div v-else>
          <p>No institutions available.</p>
        </div>
      </div>

      <!-- Pagination -->
      <div class="pagination-container">
        <button class="pagination-button" @click="prevPage" :disabled="currentPage === 1">Anterior</button>
        <span class="pagination-info">Página {{ currentPage }} de {{ totalPages }}</span>
        <button class="pagination-button" @click="nextPage" :disabled="currentPage === totalPages">Próxima</button>
      </div>
    </card>

    <modal :show.sync="modals.newInstitution" body-classes="p-0">
      <card type="secondary"
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0 mb-0">
        <template>

          <h5 class="modal-title text-black" id="exampleModalLabel" v-if="!edit">
            Add Institution
          </h5>
          <h5 class="modal-title" id="exampleModalLabel" v-else>Edit Institution | id:{{ institutionEdit.id }}</h5>
        </template>

        <div  v-if="!edit">
          <base-input type="text" label="Institution Name"></base-input>
          <base-input type="number" label="Phone Number"></base-input>
          <base-input type="email" label="Email"></base-input>
          <base-input type="url" label="Website"></base-input>
          <base-input type="text" label="Address"></base-input>
          <label for="" class="control-label">Image</label>
          <br>
          <img slot="image" src="https://placehold.co/240" alt="Card image cap" height="115px" width="115px"/>
          <br>
          <input type="file">
        </div>

        <div  v-else>
          <base-input type="text" label="Institution Name" :value="institutionEdit.designation"></base-input>
          <base-input type="number" label="Phone Number" :value="institutionEdit.phoneNumber"></base-input>
          <base-input type="email" label="Email" :value="institutionEdit.email"></base-input>
          <base-input type="url" label="Website" :value="institutionEdit.url"></base-input>
          <base-input type="text" label="Address" :value="institutionEdit.address"></base-input>
          <label for="" class="control-label">Image</label>
          <br>
          <img slot="image" src="https://placehold.co/240" alt="Card image cap" height="115px" width="115px"/>
          <br>
          <input type="file">
        </div>
        
        <template slot="footer">
          <base-button type="secondary" @click="modals.newInstitution = false">Close</base-button>
          <base-button type="primary" v-if="!edit">Add</base-button>
          <base-button v-else type="primary" @click="teste">Save changes</base-button>
        </template>
      </card>
    </modal>
  </div>
</template>

<style>
.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 5px;
}

.pagination-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination-info {
  margin: 0 10px;
  font-weight: bold;
}
</style>
