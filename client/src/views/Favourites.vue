<template>
  <div class="favourites">
    <div class="main is-primary">
        <div class="container">
          <h2 class="title is-size-1">Your Favourite Commodities</h2>
        </div>
      <div class="main-body">
        <div class="container has-text-centered">
          <div class="column is-8">
            <div class="title has-text-black">Name: {{ user.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import router from '../router';

export default {
  name: "Favourites",
  data() {
      return {
          user:  {
            name: "DummyUser",
            authenticated: false,
          }
      }
  },
  methods: {
      getUserData: function (){ 
          let self = this;
          axios.get('/api/user')
          .then((response) => {
              self.$set(this, "user", response.data.user);
          })
          .catch((errors) => {
              console.log(errors);
              router.push('/');
          });
      }
  },
  mounted() {
      this.getUserData();
  },
  components: {

  },
};
</script>
