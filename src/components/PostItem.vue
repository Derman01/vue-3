<template>
    <div class="post">
        <div>
            <div><strong>Название: </strong>{{post.title}}</div>
            <div><strong>Описание: </strong>{{post.body}}</div>
        </div>
        <div class="post__btns">
           <my-button
               @click="$router.push(`/posts/${post.id}`)"
           >
              Открыть
           </my-button>
            <my-button
                @click="$emit('remove', post)">
              Удалить
            </my-button>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        post:{
            type: Object,
            required: true
        }
    },
  methods:{
      deleteItem(){
        this.$emit('delete', this.post)
      }
  }
}
</script>

<style scoped>
.post{
    padding: 15px;
    border: 3px solid teal;
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
}

button{
    margin-top: 0;
    font-size: 1em;
}
</style>