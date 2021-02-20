<template>
    <div class="main">
        <h2 class="title">Login</h2>
        <form v-on:submit="login">
            <input class="email" type="text" /><br>
            <input class="password" type="password" /><br>
            <input class="button is-primary" type="submit" value="Login" /><br>
        </form>
    </div>
</template>

<script>
import router from '../router';
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
    }
}
</script>