<template>
  <div class="about">
    <div class="main is-primary">
      <div class="main-body">
        <div class="container">
          <h2 class="title is-size-1">Your Favourites in Mandi</h2>
        </div>
      </div>
    </div>
    <MandiList />
  </div>
</template>
<script>
import MandiList from '../components/MandiList';
export default {
    name: 'Favourites',
    components: {
        MandiList,
    },
}
</script>