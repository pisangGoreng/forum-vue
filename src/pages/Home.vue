<template>
  <h1>Welcome to the forum</h1>
  <!-- passing props -->
  <forum-list :forums="forums" />
</template>

<script>
import sourceData from '../data.json'
import ForumList from '../components/ForumList.vue'

export default {
  components: {
    ForumList
  },
  data() {
    return {
      forums: sourceData.forums
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
