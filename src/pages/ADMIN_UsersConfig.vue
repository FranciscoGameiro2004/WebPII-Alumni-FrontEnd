<template>
  <div>
    <card>
      <div class="d-flex justify-content-between">
        <h4 class="card-title">Users</h4>
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

      <base-table :data="tableData" :columns="columns">
        <template slot="columns">
          <th class="text-center">#</th>
          <th>Name</th>
          <th>Username</th>
          <th>Level</th>
          <th>Type</th>
          <th class="text-right">Actions</th>
        </template>
        <template slot-scope="{ row }">
          <td>{{ row.id }}</td>
          <td>{{ row.name }}</td>
          <td>{{ row.job }}</td>
          <td>{{ row.level }}</td>
          <td>
            <select class="form-control" id="exampleFormControlSelect1" v-model="row.type">
            <option value="Normal">Normal</option>
            <option value="Moderator">Moderator</option>
            <option value="Admin">Admin</option>
          </select>
          </td>
          <td class="td-actions text-right">
            <base-button type="info" size="sm" icon>
              <i class="tim-icons icon-single-02"></i>
            </base-button>
            <base-button type="warning" size="sm" v-if="!row.restricted" icon>
              <i class="tim-icons icon-lock-circle"></i>
            </base-button>
            <base-button type="success" size="sm" v-else icon>
              <i class="tim-icons icon-key-25"></i>
            </base-button>
            <base-button type="danger" size="sm" icon>
              <i class="tim-icons icon-simple-remove"></i>
            </base-button>
          </td>
        </template>
      </base-table>
    </card>
  </div>
</template>

<script>
import BaseTable from "../components/BaseTable";
export default {
  data() {
    return {
      modals: {
        newInstitution: false,
      },
      edit: false,
      tableData: [
        {
          id: 1,
          name: "	Andrew Mike",
          level: "10",
          job: "Develop",
          type: "Normal",
          restricted: true
        },
        {
          id: 2,
          name: "	John Doe",
          level: "20",
          job: "Design",
          type: "Admin",
          restricted: false
        },
      ],
    };
  },
  methods: {
    toggleEdit() {
      this.edit = true;
    },
    toggleAdd() {
      this.edit = false;
    },
  },
  components: {
    BaseTable
  }
};
</script>

<style></style>
