<template>
    <div class="container">
        <v-btn class="button is-dark" @click="overlay = !overlay">
            <a clas="login">
                <strong>Log In</strong>
            </a>
        </v-btn>
        <v-overlay :value="overlay" :opacity="opacity">
            <v-row align="center" justify="center">
                <div style="height:100; width:800">
                    <v-row justify="center">
                        <div class="hero is-fullheight is-primary">
                            <div class="hero-body">
                                <div class="container has-text-centered">
                                    <div class="column is-8 is-offset-2">
                                        <h3 class="title has-text-white">Login</h3>
                                         <hr class="login-hr">
                                         <p class="subtitle has-text-white">Please login to access full features</p>

                                        <div class="box">
                                            <div class="title has-text-grey">Please enter your email and password</div>
                                            <form v-on:submit="login">
                                                 <div class="field">
                                                    <div class="control">
                                                        <input class="input is-large" type="email" name="email" placeholder="Email" autofocus="">
                                                    </div>
                                                </div>
                                                <div class="field">
                                                    <div class="control">
                                                        <input class="input is-large" type="password" name="password" placeholder="Password" autofocus="">
                                                    </div>
                                                </div>
                                                <div class="control">
                                                <button class="button is-block is-danger is-large is-fullwidth" type="submit" @click="overlay = overlay">Login</button> <br>
                                                <p class="has-text-black">
                                                    &nbsp; || &nbsp; <a href="/signup"> Sign Up</a> &nbsp; || &nbsp;
                                                    <a href=""> Forgot Password?</a> &nbsp; || &nbsp;
                                                </p>
                                            </div>
                                            </form><br>
                                            
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
import router from '../../router';
import axios from 'axios';
import shajs from 'sha.js';

export default {
    name: "Login",
    methods: {
        login: (e) => {
            e.preventDefault();
            let email = e.target.elements.email.value;
            let password = shajs('sha256').update(e.target.elements.password.value).digest('hex');
            let login = () => {
                let data = {
                    email: email,
                    password: password,
                }
                axios.post('/api/login', data)
                    .then((response) => {
                        console.log(response);
                        alert('Logged In!');
                        router.push('/');
                        location.reload();
                    }).catch((errors) => {
                        console.log('cannot log in');
                        console.log(errors);
                        router.push('/');
                    });
            }
            login();
        }
    },
    data: () => ({
      overlay: false,
      opacity: 0.9,
      absolute: true,
    }),
}
</script>