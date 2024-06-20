<template>
  <div>
    <h1>{{ event.name }}</h1>
    <h5>{{ event.description }}</h5>
    <div>
      <div class="d-flex flex-row">
        <div v-for="date of event.EventDates" :key="date.date">
          <li>
            <dl>
              <dt>{{ date.date }}</dt>
              <dd>{{ date.startTime }} - {{ date.endTime }}</dd>
            </dl>
          </li>
        </div>
      </div>
    </div>
    <hr />
    <card class="d-flex flex-row col-md-12">
      <h4 class="card-title">Participants</h4>
      <card
        class="d-flex flex-row col-md-6"
        v-for="participant in eventStore.getParticipants"
        :key="participant.UserID"
      >
        <h4 class="card-title">{{ participant['User.name'] }}</h4>
        <h6>{{ participant.role }}</h6>
      </card>
    </card>
  </div>
</template>

<script>
import { useEventsStore } from "../stores/events";
export default {
  data() {
    return {
      eventStore: useEventsStore(),
    };
  },
  computed: {
    event() {
      return this.eventStore.getFoundEvent;
    },
  },
  mounted() {
    this.eventStore.fetchEvent(this.$route.params.id);
    this.eventStore.fetchParticipants(this.$route.params.id);
  },
};
</script>

<style></style>
