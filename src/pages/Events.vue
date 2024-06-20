<template>
  <div>
    <card>
      <div class="d-flex justify-content-between">
        <h4 class="card-title"><v-date-picker
          v-model="value"
          event-color="red"
          :events="events"
        ></v-date-picker></h4>
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
        <div v-for="event of eventsList" :key="event.id" @click="alert(event.id)">
          <card class="d-flex flex-row col-md-6">
            <router-link :to="{ name: 'event', params: { id: event.id } }">
              <div class="d-flex justify-content-between">
                <div>
                  <h3 class="card-title">
                    {{ event.name }}
                  </h3>
                  <h6>{{ event.description }}</h6>
                </div>
              </div>
            </router-link>
          </card>
        </div>
        <div>
          <p>No events found.</p>
        </div>
      </div>
    </card>
  </div>
</template>

<script>
import { useEventsStore } from '../stores/events';
export default {
  data() {
    return {
      eventStore: useEventsStore(),
    };
  },
  computed: {
    eventsList() {
      return this.eventStore.getAll;
    },
  },
  mounted() {
    this.eventStore.fetchAllEvents();
  },
};
</script>

<style></style>