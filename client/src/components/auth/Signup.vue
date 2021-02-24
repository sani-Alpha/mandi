<template>
    <div class="section">
        <div class="container">
            <div class="title">Sign Up</div>
            <div class="subtitle">With Your Email</div>  
            <form id="register-form" action="submit">
                <div class="field">
                    <label class="label" for="username">Email</label>
                    <div class="control has-icons-left">
                        <input class="email" type="email" placeholder="Email" name="email">
                        <span class="icon is-left">
                            <i class="fa">envelope-square</i>
                        </span>
                    </div>
                </div>
            </form> 
        </div>
    </div>
</template>

<script>
export default {
    
}
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