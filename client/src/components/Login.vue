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
            let email = 'ser@email.com';
            let password = 'password';
            let login = () => {
                let data = {
                    email: email,
                    password: password,
                }
                axios.post('/api/login', data)
                    .then((res) => {
                        console.log('logged in');
                        router.push('/favourites');
                    }).catch((err) => {
                        console.log('cannot log in');
                        console.log(err);
                    });
            }
            login();
        }
    }
}
</script>