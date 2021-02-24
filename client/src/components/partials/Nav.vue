<template>
    <nav class="navbar container" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a class="navbar-item" href="/">
                <strong class="is-size-3">MandiDaliya</strong>
            </a>
            <a class="navbar-burger burger" role="button" aria-label="menu" aria-expanded="false" data-target="navbarBasic">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>
        <div id="navbar" class="navbar-menu">
            <div class="navbar-start">
                <router-link to="/" class="navbar-item">Home</router-link>
                <router-link to="/mandi" class="navbar-item">Mandi</router-link>
                <router-link to="/favourites" class="navbar-item">Favourites</router-link>
                <router-link to="/about" class="navbar-item">About</router-link>
            </div>
            <div class="navbar-end">
                <div class="navbar-item">
                    <Login />
                    <Signup />
                </div>
            </div>
        </div>
    </nav>
</template>
<script>
import Login from '@/components/auth/Login'
import Signup from '@/components/auth/Signup'
export default {
    name: 'Nav',
    components: {
        Login,
        Signup,
    },

}
</script>
<style lang="scss" scoped>
    nav {
        margin-top: 25px;
        margin-bottom: 30px;
        a {
            font-weight: bold;
            color: #2c3e50;
            &.router-link-exact-active {
                color: #d88d00;
            }
        }
    }
    .navbar-end {
        .a {
            color: white;
        }
    }
</style>