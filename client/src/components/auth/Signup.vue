<template>
  <div class="container">
    <v-btn class="button is-dark is-xl" @click="overlay = !overlay">
      <a class="signup">
        <strong>Sign Up</strong>
      </a>
    </v-btn>
    <v-overlay :value="overlay" :opacity="opacity">
      <v-row align="center" justify="center">
        <div style="height:100; width:800">
          <v-row justify="center">
            <div class="hero is-fullheight is-primary">
              <div class="hero-body">
                <div class="section">
                  <div class="container">
                    <div class="title has-text-centered">Sign Up</div>
                    <div class="subtitle">With Your Email</div>
                    <hr class="signup-hr" />
                    <div class="box">
                      <form id="register-form" action="submit" v-on:submit="signup">
                        <div class="field">
                          <label class="label" for="username">Username</label>
                          <div class="control">
                            <input
                              class="input"
                              type="text"
                              placeholder="Username"
                              name="username"
                            />
                          </div>
                          <label class="label" for="email">Email</label>
                          <div class="control">
                            <input
                              class="input"
                              type="email"
                              placeholder="Email"
                              name="email"
                            />
                          </div>
                          <div class="columns row-one">
                            <div class="column">
                              <label class="label" for="firstName"
                                >First Name</label
                              >
                              <div class="control">
                                <input
                                  class="input"
                                  type="text"
                                  placeholder="First Name"
                                  name="firstName"
                                />
                              </div>
                            </div>
                            <div class="column">
                              <label class="label" for="lastName"
                                >Last Name</label
                              >
                              <div class="control">
                                <input
                                  class="input"
                                  type="text"
                                  placeholder="Last Name"
                                  name="lastName"
                                />
                              </div>
                            </div>
                          </div>
                          <div class="columns">
                            <div class="column">
                              <label class="label" for="password"
                                >Password</label
                              >
                              <div class="control">
                                <input
                                  class="input"
                                  type="password"
                                  placeholder="Password"
                                  name="password"
                                />
                              </div>
                            </div>
                            <div class="column">
                              <label class="label" for="password"
                                >Re-type Password</label
                              >
                              <div class="control">
                                <input
                                  class="input"
                                  type="password"
                                  placeholder="Confirm Password"
                                  name="retypePassword"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <br />
                      <div class="control">
                        <button
                          class="button is-block is-danger is-large is-fullwidth"
                          type="submit"
                        >
                          Register
                        </button>
                        <br />
                        <p class="has-text-black">
                          &nbsp; || &nbsp; <a href=""> Login Instead?</a> &nbsp;|| &nbsp;
                        </p>
                      </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </v-row>
        </div>
      </v-row>
    </v-overlay>
  </div>
</template>

<script>
// import bcrypt from 'bcryptjs';
// import router from '../../router';
import axios from 'axios';

export default {
  name: "Signup",
  methods: {
        signup: (e) => {
            e.preventDefault();
            let email = e.target.elements.email.value;
            let password = e.target.elements.password.value;
            //bcrypt.hash(e.target.elements.password.value, 10, (err,hash) => {
              //  if(err) console.log(err);
                //password = hash;
            //});
            let name = e.target.elements.firstName.value + e.target.elements.lastName.value;
            let username = e.target.elements.username.value;
            let signup = () => {
                let data = {
                    name: name,
                    username: username,
                    email: email,
                    password: password,                    
                }
                console.log(data);
                axios.post('/api/register', data)
                    .then((response) => {
                        console.log(response);
                        alert('Signed Up Successfully');
                        location.reload();
                    }).catch((errors) => {
                        console.log('cannot sign up');
                        console.log(errors);
                    });
            }
            signup();
        }
    },
  data: () => ({
    overlay: false,
    opacity: 0.9,
    absolute: true,
  }),
};
</script>

<style lang="scss" scoped>
.column {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}
.row-one {
  padding-top: 13px;
}
form .field {
  margin: auto;
  max-width: 740px;
}
</style>
