<template>
  <div class="favourites">
    <div class="main is-primary">
        <div class="container">
          <h2 class="title is-size-1">Your Favourite Commodities</h2>
        </div>
      <div class="main-body">
        <Favourite/>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import router from '../router';
import Favourite from '@/components/Favourite';

export default {
  name: "Favourites",
  components: {
    Favourite,
  },
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
};
</script>
