<template>
    <div class="main">
        <h2 class="title">Login</h2>
        <form v-on:submit="login">
            <input class="email" type="text" /><br>
            <input class="password" type="password" /><br><br>
            <v-button class="button is-primary is-dark" @click="overlay=false" value="Login">Login</v-button><br>
        </form>
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

<style lang="scss" scoped>
    h2 {
        color: white;
    }
</style>