<template>
   <div>
      <h1>Страница с постами</h1>
      <my-input
         v-model="searchQuery"
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
               v-model="selectedSort"
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
         v-if="!isPostsLoading"
      />
      <p v-else>Идет загрузка...</p>
      <div class="observer" v-intersection="loadMorePosts"/>
   </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'
import axios from 'axios'

export default {
   components: {
      PostForm,
      PostList
   },
   data() {
      return {
         posts: [],
         dialogVisible: false,
         isPostsLoading: false,
         selectedSort: '',
         searchQuery: '',
         page: 1,
         limit: 10,
         totalPages: 0,
         sortOptions: [
            {value: 'title', name: 'По названию'},
            {value: 'body', name: 'По содержанию'}
         ],

      }
   },

   methods: {
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
      async fetchPosts() {
         this.isPostsLoading = true
         try {
            const response = await axios.get(
               'http://jsonplaceholder.typicode.com/posts',{
                  params: {
                     _page: this.page,
                     _limit: this.limit
                  }
               })
            this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
            this.posts = response.data
         } catch (e) {
            alert('Error')
         } finally {
            this.isPostsLoading = false
         }
      },

      async loadMorePosts() {
         try {
            this.page++
            const response = await axios.get(
               'http://jsonplaceholder.typicode.com/posts',{
                  params: {
                     _page: this.page,
                     _limit: this.limit
                  }
               })
            this.posts = [...this.posts, ...response.data]
         } catch (e) {
            alert('Error')
         }
      },
   },

   mounted(){
      this.fetchPosts()
      this.isPostsLoading = false
   },

   computed: {
      sortedPosts() {
         return [...this.posts].sort((post1, post2) =>
            post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
      },
      sortedAndSearchedPosts() {
         return this.sortedPosts.filter(post =>
            post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
      }
   }
}
</script>

<style>
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
</style>