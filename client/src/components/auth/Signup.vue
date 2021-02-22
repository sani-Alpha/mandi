<template>
    <div class="main">
        <h2 class="title">SignUp</h2>
        <form v-on:submit="signup">
            <input class="first name" type="text" /><br>
            <input class="last name" type="text" /><br>
            <input class="email" type="text" /><br>
            <input class="password" type="password" /><br>
            <input class="button is-primary" type="submit" value="SignUp" /><br>
        </form>
    </div>
</template>

<script>
export default {
    
}
</script>