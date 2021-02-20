<template>
  <div class="about">
    <div class="main is-primary">
      <div class="main-body">
        <div class="container">
          <h2 class="title is-size-1">Your Favourites in Mandi</h2>
        </div>
      </div>
    </div>
    <MandiList />
    <div class="dashboard">
      <h2>Dashboard</h2>
      <p>Welcome {{user.name}}</p>
    </div>
  </div>
</template>
<script>
import MandiList from '../components/MandiList';
import axios from 'axios';
import router from '@/router';
export default {
  name: 'Login',
  components: {
        MandiList,
        Login,
  },
  data() {
    return {
      user: {
        name: "Sandy"
      }
    }
  },
  // methods: {
  //   getUserData: function() {
  //     let self = this;
  //     axios.get('/api/user')
  //       .then((response) => {
  //         console.log(response);
  //         self.$set(this, "user", response.data.user);
  //       })
  //       .catch((errors) => {
  //         console.log(errors);
  //         router.push('/favourites');
  //       });
  //   }
  // },
  // mounted() {
  //   this.getUserData();
  // }
}
</script>