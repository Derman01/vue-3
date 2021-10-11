<template>
  <navbar/>
  <div class="app">
    <router-view/>
  </div>
</template>

<script>
import PostForm from './components/PostForm.vue'
import PostList from './components/PostList.vue'
import Navbar from './components/Navbar.vue'

export default {
  components:{
    PostForm,
    PostList,
    Navbar
  }
}
</script>
<style>

  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family:sans-serif;
  }
  
  .app{
    padding:10px;
  }
</style>