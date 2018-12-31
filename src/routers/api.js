import VueRouter from "vue-router";

export default new VueRouter({
  routes: [
    {
      path: "tracks",
      name: "tracks"
    },
    {
      path: "tracks/:id",
      name: "track"
    },
    {
      path: "users",
      name: "users"
    },
  ]
});
