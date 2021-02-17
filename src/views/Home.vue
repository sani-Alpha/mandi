<template>
  <div class="home">
    <section class="main is-dark"> 
      <div class="main-body">
        <div class="container">
          <h1 class="title">Welcome to your Mandi!</h1>
          <h2 class="subtitle">Make sure you SignUp to get all the updates!</h2>
          <div class="button-block">
            <button class="button is-xl is-dark">Sign Up</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Home',
  components: {
  }
}
</script>
<style lang="scss" scoped>
  .main {
    text-align: center;
    background-image: url('https://cdn.auth0.com/blog/vue-meetup/event-banner.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 400px;
  }
  .main-body .title {
    text-shadow: 4px 4px 4px rgba(0,0,0,0.6);
    padding: 40px 0 20px 0;
    font-size: 60px;
  }
  .subtitle {
    text-shadow: 4px 4px 4px rgba(0,0,0,0.7);
    font-size: 30px;
  }
  .button-block {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    position: absolute;
    bottom: -150px;
    .button {
      margin-right: 50px;
      margin-left: 50px;
      padding-right: 50px;
    }
    .welcome {
      width: 400px;
      padding: 10px;
      margin-left: auto;
      margin-right: auto;
    }
  }
  .is-xl {
    font-size: 1.7rem;
  }
</style>
