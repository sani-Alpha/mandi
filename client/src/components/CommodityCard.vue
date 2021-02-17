<template>
    <div class="commodity-card">
        <div class="card">
            <div class="card-content">
                <h2 class="is-size-4 has-text-weight-bold">Commdity Name</h2>
                <small class="details">Details</small>
                <span>Price</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
    .card {
        background-image: url('https://placekitten.com/400/400');
        height: 200px;
        background-position: center;
        background-size: cover;
        text-align: center;
    }
    .card-content {
        padding-top: 50px;
        position: absolute;
        color: white;
        background-color: rgba(0,0,0,0.35);
        top: 0;
        padding: 10px;
        height: 200px;
        width: 100%;
        span {
            font-size: 18px;
            text-align: center;
            width: 100%;
            position: absolute;
            bottom: 10px;
            right: 0;
        }
        h2 {
            margin-top: 10px;
        }
    }
    .details {
        background-color: #151515;
        color: white;
        font-size: .75rem;
        padding: 2px 10px;
        position: absolute;
        top: 0;
        right: 0;
    }
</style>