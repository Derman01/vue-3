<template>
  <div>
    <h1>Страница с постами</h1>
    <my-input
        v-model="searchQuery"
        placeholder="Поиск..."
    />
    <div class="add__btns">
      <my-button @click="showDialog">
        Создать пользователя
      </my-button>
      <my-select
          v-model="selectedSort"
          :options="sortOptions"
      />
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
    <div class="page__wrapper">
      <div
          v-for="page in pageBind.totalPage"
          :key="page"
          class="page"
          :class="{ 'current-page': page === pageBind.page}"
          @click="changePage(page)"
      >
        {{page}}
      </div>
    </div>
  </div>
</template>

<script>
import PostForm from './components/PostForm.vue'
import PostList from './components/PostList.vue'
import axios from 'axios'

export default {
  components:{
    PostForm,
    PostList
  },

  data(){
    return {
      posts:[],
      dialogVisible: false,
      isPostsLoading: false,
      selectedSort: '',
      searchQuery: '',
      pageBind:{
        page: 1,
        limit: 10,
        totalPage: 0
      },
      sortOptions:[
        {value:'title', name: 'По названию'},
        {value:'body', name: 'По содержанию'}
      ],
    }
  },

  methods:{
    createPost(post){
      this.posts.push(post)
      this.dialogVisible = false
    },
    removePost(post){
      this.posts = this.posts.filter(p=>p !== post)
    },
    showDialog(){
      this.dialogVisible = true
    },
    async fetchPosts(){
      this.isPostsLoading = true
      try {
          const response = await axios.get(
              'http://jsonplaceholder.typicode.com/posts',
              {
                params:{
                  _page: this.pageBind.page,
                  _limit: this.pageBind.limit
                }
              })
          this.pageBind.totalPage = response.headers['x-total-count'] / this.pageBind.limit
          this.pageBind.totalPage = Math.ceil(this.pageBind.totalPage)
          this.posts = response.data
      }
      catch (e) {
        alert('Error')
      }
      finally {
        this.isPostsLoading = false
      }
    },
    changePage(pageNumber){
      this.pageBind.page = pageNumber
    }
  },

  watch:{
    pageBind:{
      handler(newValue){
        this.fetchPosts()
      },
      deep: true
    }
  },

  mounted() {
    this.fetchPosts()
  },

  computed:{
    sortedPosts(){
      return[...this.posts].sort((post1, post2)=>
          post1[this.selectedSort]
              ?.localeCompare(post2[this.selectedSort]))
    },
    sortedAndSearchedPosts(){
      return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  }
}
</script>

<style>
@import url('style.css');
*{
  transition: all 0.5s;
}

.add__btns{
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page__wrapper{
  margin-top: 10px;
  padding-bottom: 10px;
  display: grid;
  grid-auto-flow: column;
  justify-content: space-between;
}

.page{
  border: 1px solid black;
  padding: 0.8em 1em;
}
.page:hover{
  background: #ccc;
}
.current-page{
  border: 2px solid tomato;
}

</style>