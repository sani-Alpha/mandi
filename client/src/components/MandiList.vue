<template>
    <div class="commodities container">
        <!-- <h2 class="subtitle is-3">Check all the commodities in Mandi</h2> -->
        <div class="columns is-multiline">
            <div class="row is-one-quarter">
                <CommodityCard />
            </div>
            <div class="row is-one-quarter">
                <CommodityCard />
            </div>
            <div class="row is-one-quarter">
                <CommodityCard />
            </div>
            <div class="row is-one-quarter">
                <CommodityCard />
            </div>
            <div class="row is-one-quarter">
                <CommodityCard />
            </div>
            <div class="row is-one-quarter">
                <CommodityCard />
            </div>
            <div class="row is-one-quarter">
                <CommodityCard />
            </div>
            <div class="row is-one-quarter">
                <CommodityCard />
            </div>
            <div class="row is-one-quarter">
                <CommodityCard />
            </div>
            <div class="row is-one-quarter">
                <CommodityCard />
            </div>
            <div class="row is-one-quarter">
                <CommodityCard />
            </div>
            <div class="row is-one-quarter">
                <CommodityCard />
            </div>
            <div class="row is-one-quarter">
                <CommodityCard />
            </div>
        </div>
    </div>
</template>
<script>
import CommodityCard from '@/components/CommodityCard';

export default {
    name: 'MandiList',
    components: {
        CommodityCard,
    },
}
</script>
<style lang="scss" scoped>
    .commodities {
        margin-top: 100px;
        margin-left: 100px;
        text-align: center;
    }
</style>