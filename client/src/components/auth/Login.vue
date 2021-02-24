<template>
    <div class="hero is-fullheight is-primary">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-8 is-offset-2">
                    <h3 class="title has-text-white">Login</h3>
                    <hr class="login-hr">
                    <p class="subtitle has-text-white">Please login to access full features</p>

                    <div class="box">
                        <div class="title has-text-grey">Please enter your email and password</div>
                        <form action="submit">
                            <div class="field">
                                <div class="control">
                                    <input class="input is-large" type="email" placeholder="Email" autofocus="">
                                </div>
                            </div>
                            <div class="field">
                                <div class="control">
                                    <input class="input is-large" type="password" placeholder="Password" autofocus="">
                                </div>
                            </div>
                        </form><br>
                        <button class="button is-block is-danger is-large is-fullwidth">Login</button> <br>
                        <p class="has-text-black">
                            <a href="/signup"> Sign Up</a> &nbsp; . &nbsp;
                            <a href=""> Forgot Password?</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import router from '../../router';
import axios from 'axios';
export default {
    name: "Login",
    methods: {
        login: (e) => {
            e.preventDefault();
            let email = e.target.elements.email.vue;
            let password = e.target.elements.password.vue;
            let login = () => {
                let data = {
                    email: email,
                    password: password,
                }
                axios.post('/api/login', data)
                    .then((response) => {
                        console.log('logged in');
                        console.log(response);
                        router.push('/favourites');
                    }).catch((errors) => {
                        console.log('cannot log in');
                        console.log(errors);
                    });
            }
            login();
        }
    },
    data: () => ({
      absolute: true,
      overlay: false,
    }),
}
</script>