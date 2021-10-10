<template>
   <div>
      <h1>Страница с постами</h1>
      <my-input
         :model-value="searchQuery"
         @update:model-value="setSearchQuery"
         placeholder="Поиск..."
         v-focus
      />
      <div class="add__btns">
         <my-button @click="showDialog">
            Создать пост
         </my-button>
         <div style="text-align: center">
            <h5>Сортировка</h5>
            <my-select
               :model-value="selectedSort"
               @update:model-value="setSelectedSort"
               :options="sortOptions"
            />
         </div>
      </div>
      <my-dialog v-model:show="dialogVisible">
         <post-form @create='createPost'/>
      </my-dialog>
      <post-list
         :posts="sortedAndSearchedPosts"
         @remove="removePost"
         v-if="!isPostsLoading"/>

      <p v-else>Идет загрузка...</p>
      <div class="observer"
           v-intersection="loadMorePosts"/>
   </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'
import MyButton from "@/components/UI/MyButton";
import {mapState, mapGetters, mapActions, mapMutations} from "vuex"

export default {
   components: {
      MyButton,
      PostForm,
      PostList
   },
   data() {
      return {
         dialogVisible: false

      }
   },

   methods: {
      ...mapMutations({
         setPage: 'post/setPage',
         setSearchQuery: 'post/setSearchQuery',
         setSelectedSort: 'post/setSelectedSort'
      }),
      ...mapActions({
         loadMorePosts: 'post/loadMorePosts',
         fetchPosts: 'post/fetchPosts'
      }),

      createPost(post) {
         this.posts.push(post)
         this.dialogVisible = false
      },
      removePost(post) {
         this.posts = this.posts.filter(p => p !== post)
      },
      showDialog() {
         this.dialogVisible = true
      },
   },

   mounted(){
      this.fetchPosts()
   },

   computed: {
      ...mapState({
         posts: state => state.post.posts,
         isPostsLoading: state => state.post.isPostsLoading,
         selectedSort: state => state.post.selectedSort,
         searchQuery: state => state.post.searchQuery,
         page: state => state.post.page,
         limit: state => state.post.limit,
         totalPages: state => state.post.totalPages,
         sortOptions: state => state.post.sortOptions
      }),

      ...mapGetters({
         sortedPosts: 'post/sortedPosts',
         sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
      })
   }
}
</script>

<style scoped>
.add__btns {
   margin-top: 15px;
   display: flex;
   justify-content: space-between;
   align-items: center;
}

.page__wrapper {
   margin-top: 10px;
   padding-bottom: 10px;
   display: grid;
   grid-auto-flow: column;
   justify-content: space-between;
}

.page {
   border: 1px solid black;
   padding: 0.8em 1em;
   width: 100px;
   display: block;
   max-width: 1em;
   text-align: center;
   box-sizing: content-box;
}

.page:hover {
   background: #ccc;
}

.current-page {
   box-shadow:inset 0 0 0 2px tomato;
   border: 1px solid tomato;
}

.observer{
}

</style>