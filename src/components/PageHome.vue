<template>
  <h1>Welcome to the forum</h1>
  <!-- passing props -->
  <ThreadList :threads="threads" />
</template>

<script>
import sourceData from '../data.json'
import ThreadList from './ThreadList.vue'

export default {
  components: {
    ThreadList
  },
  data() {
    return {
      threads: sourceData.threads
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
