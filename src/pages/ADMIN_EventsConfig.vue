<script>
import Modal from "../components/Modal";
import { useEventsStore } from "../stores/events";

export default {
  components: {
    Modal,
  },

  data() {
    return {
      eventsStore: useEventsStore(),
      modals: {
        newEvent: false,
      },
      edit: false,

      nameInput: '',
      descriptionInput: '',
    };
  },
  computed: {
    eventsList() {
      return this.eventsStore.getAll
    }
  },
  methods: {
    toggleEdit() {
      this.edit = true;
    },
    toggleAdd() {
      this.edit = false;
      this.nameInput = ''
      this.descriptionInput = ''
      this.modals.newEvent = true;
    },
    addEvent() {
      let information = {
        name: this.nameInput,
        description: this.descriptionInput,
        dates: []
      }
      this.eventsStore.addEvent(information)
      this.eventsStore.fetchEvents()
    },
    removeEvent(id) {
      this.eventsStore.removeEvent(id)
      this.eventsStore.fetchAllEvents()
    }
  },
  mounted () {
    this.eventsStore.fetchAllEvents()
  },
};

</script>

<template>
  <div>
    <card>
      <div class="d-flex justify-content-between">
        <h4 class="card-title">Events</h4>
        <base-button
          round
          icon
          type="default"
          @click="toggleAdd();
          modals.newEvent = true;
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

      
      
      <div>
        <div v-if="eventsList.length">
          <card class="d-flex flex-row col-md-6" v-for="event in eventsList" :key="event.id">
          <img
            slot="image"
            class=""
            :src="event.logoUrl"
            :alt="event.designation"
            height="115px"
            width="115px"
          />
          <div class="d-flex justify-content-between">
            <div>
              <h4 class="card-title">
                {{ event.name }}
              </h4>
              <a :href="event.url" class="card-link" v-if="event.url">Event Website</a>
            </div>
            <div class="d-flex flex-column">
              <base-button
                round
                icon
                type="warning"
                @click="
                  toggleEdit();
                  modals.newEvent = true;
                "
              >
                <i class="tim-icons icon-pencil text-white"></i>
              </base-button>
              <base-button round icon type="danger" @click="removeEvent(event.id)">
                <i class="tim-icons icon-trash-simple text-white"></i>
              </base-button>
            </div>
          </div>
        </card>
      </div>
        <div v-else>
          <p>No events available.</p>
        </div>
      </div>
      

    </card>

    <modal :show.sync="modals.newEvent" body-classes="p-0">
      <card type="secondary"
                  header-classes="bg-white pb-5"
                  body-classes="px-lg-5 py-lg-5"
                  class="border-0 mb-0">
      <template>
        <h5 class="modal-title text-black" id="exampleModalLabel" v-if="!edit">
          Add Event
        </h5>
        <h5 class="modal-title" id="exampleModalLabel" v-else>Edit Event</h5>
      </template>
      <div>
        <base-input
          type="text"
          label="Event Name"
          v-model="nameInput"
        >
        </base-input>
        <base-input
          type="text"
          label="Description"
          v-model="descriptionInput"
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
        <base-button type="secondary" @click="modals.newEvent = false"
          >Close</base-button
        >
        <base-button type="primary" v-if="!edit" @click="addEvent">Add</base-button>
        <base-button v-else type="primary">Save changes</base-button>
      </template>
    </card>
    </modal>
  </div>
</template>

<style></style>