<style>
</style>
<template>
  <v-container fluid>
    <h1>User List</h1>
    <v-list v-if="users.length" two-line>
      <v-list-tile v-for="user in users" :key="user.id" avatar @click="userClicked(user)">
        <v-list-tile-avatar>
          <v-icon class="grey lighten-1 white--text">folder</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{ user.username }}</v-list-tile-title>
          <v-list-tile-sub-title>{{ user.id }} | {{ user.email }} | {{ user.created_at }} </v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-btn icon ripple>
            <v-icon color="grey lighten-1">info</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
    <div v-else>
      <v-progress-circular
        indeterminate
        color="primary"
      ></v-progress-circular>
    </div>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import api from "../lib/api";


export default {
  data() {
    return {
      users: [],
    };
  },
  computed: {
    // ...mapGetters({
    //   users: 'users'
    // })
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    ...mapActions([
      'setActiveUser'
    ]),
    getUsers() {
      api
        .get('users')
        .then(users => {
          this.users = users;
        });
        // .catch(e => commit(RECEIVE_TRACKS_FAILURE, e));
    },
    userClicked(user) {
      console.log(user);
      this.setActiveUser(user);
      // this.$router.push({ name: 'track', params: { id } });
    }
  }
};
</script>
