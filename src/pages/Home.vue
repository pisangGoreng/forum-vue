<template>
  <h1 class="push-top">Welcome to the forum</h1>
  <!-- passing props -->
  <CategoryList :categories="categories" />
</template>

<script>
import CategoryList from '../components/CategoryList.vue'

export default {
  components: {
    CategoryList
  },
  // data() {
  //   return {
  //     categories: this.$store.state.categories
  //   }
  // },
  computed: {
    categories() {
      return this.$store.state.categories
    }
  }
}
</script>

<style></style>

//
<div class="breadcumbs">
//       <li>
//         <a href="#"><i class="fa fa-home fa-btn"></i>HOME</a>
//       </li>
//       <li>
//         <a href="category.html">DISCUSSIONS</a>
//       </li>
//       <li class="active">
//         <a href="#">COOKING</a>
//       </li>
//     </div>
