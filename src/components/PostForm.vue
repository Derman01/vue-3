<template>
    <form @submit.prevent>
        <h4>Создание постов</h4>
        <my-input
            v-model="post.title"
            placeholder="Название"
            v-focus
        />
        <my-input
            v-model="post.body"
            placeholder="Описание"/>
        <my-button 
            class="btn" 
            type="submit"
            style="align-self: flex-end; margin-top: 10px"
            @click="createPost">Создать пост</my-button>
    </form>
</template>

<script>
export default {
   data(){
      return{
         post:{
            title: '',
            body: ''
         }
      }
   },

   methods:{
      createPost(){
         this.post.id = Date.now()
         this.$emit('create', this.post)

         this.post = {
            title: '',
            body: ''
         }
      }
   },
}
</script>

<style scoped>

form{
    display: flex;
    flex-direction: column;
}
</style>