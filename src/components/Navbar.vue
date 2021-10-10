<template>
   <div class="navbar">
      <h1 @click="$router.push('/')">Vue 3</h1>
      <div class="navbar__btns">
         <my-button @click="$router.push('/posts')">Посты</my-button>
         <my-button @click="$router.push('/about')" style="margin-left: 20px">О сайте</my-button>
         <my-button @click="$router.push('/store')" style="margin-left: 20px">store</my-button>
         <my-button @click="$router.push('/composition')" style="margin-left: 20px">composition Api</my-button>
      </div>
   </div>
</template>

<script>
import MyButton from "./UI/MyButton";

export default {
   name: "Navbar",
   components: {MyButton},
}
</script>

<style scoped>
   .navbar{
      background: lightgray;
      box-shadow: 2px 2px 4px gray;
      display: flex;
      align-items: center;
      padding: 0 15px;
   }
   .navbar__btns{
      margin-left: auto;
   }
   h1{
      cursor: pointer;
   }
</style>