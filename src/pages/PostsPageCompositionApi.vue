<template>
   <div>
      <h1>Страница с постами</h1>
      <my-input
         v-model="searchQuery"
         placeholder="Поиск..."
         v-focus/>
      <div class="add__btns">
         <my-button> Создать пост</my-button>
         <div style="text-align: center">
            <h5>Сортировка</h5>
            <my-select
               v-model="selectedSort"
               :options="sortOptions" />
         </div>
      </div>
      <my-dialog v-model:show="dialogVisible">
         <post-form/>
      </my-dialog>
      <post-list
         :posts="sortedAndSearchedPosts"
         v-if="!isPostLoading"
      />
      <p v-else>Идет загрузка...</p>
   </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'
import usePosts from "../hooks/usePosts";
import useSortedPosts from "../hooks/useSortedPosts";
import useSortedAndSearchedPosts from "../hooks/useSortedAndSearchedPosts";


export default {
   components: {
      PostForm,
      PostList
   },
   data() {
      return {
         dialogVisible: false,
         sortOptions: [
            {value: 'title', name: 'По названию'},
            {value: 'body', name: 'По содержанию'}
         ],
      }
   },
   setup(props){
      const {posts, isPostLoading, totalPages} = usePosts(10)
      const {sortedPosts, selectedSort} = useSortedPosts(posts)
      const {searchQuery, sortedAndSearchedPosts} = useSortedAndSearchedPosts(sortedPosts)

      return{
         posts,
         totalPages,
         isPostLoading,
         sortedPosts,
         selectedSort,
         searchQuery,
         sortedAndSearchedPosts,
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