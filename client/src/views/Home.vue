<template>
  <div class="home">
    <section class="main is-dark"> 
      <div class="main-body">
        <div class="bg-image"></div>
        <div class="container">
          <h1 class="title">Welcome To Your Mandi 🧺</h1>
          <h2 class="subtitle">Make sure you SignUp to get all the updates!</h2>
          <div class="button-block">
            <button class="button is-xl is-dark">Sign Up</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

// <script>
// export default{
//   name: 'Home',
//   components: {

//   }
// }
// </script>
<style lang="scss" scoped>
  .bg-image {
    text-align: center;
    background-image: url('../assets/banner-bg.jpeg');
    filter: blur(8px);
    -webkit-filter: blur(8px);
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    height: 400px;
  }
  .container {
    background-color: rgba(0,0,0,0); //fallback
    background-color: rgba(0,0,0,0.6); //override
    border: 3px solid #f1f1f1;
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 2;
    width: 80%;
    padding: 20px;
    text-align: center;
  }
  .main-body .title {
    color: white;
    text-shadow: 4px 4px 4px rgba(0,0,0,0);
    padding: 40px 0 20px 0;
    font-size: 60px;
  }
  .subtitle {
    color: white;
    text-shadow: 4px 4px 4px rgba(0,0,0,0);
    font-size: 30px;
  }
  .button-block {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    position: absolute;
    top: 115%;
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
