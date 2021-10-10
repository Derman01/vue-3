import axios from "axios";

export const postModule = {
    state: ()=>({
        posts: [],
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
    }),
    getters:{
        sortedPosts(state) {
            return [...state.posts].sort((post1, post2) =>
                post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]))
        },
        sortedAndSearchedPosts(state, getters) {
            return getters.sortedPosts.filter(post =>
                post.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
        }
    },
    mutations:{
        setPosts(state, posts){
            state.posts = posts
        },
        setLoading(state, bool){
            state.isPostsLoading = bool
        },
        setPage(state, page){
            state.page = page
        },
        setSelectedSort(state, selectedSort){
            state.selectedSort = selectedSort
        },
        setTotalPage(state, totalPage){
            state.totalPage = totalPage
        },
        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery
        },
    },
    actions:{
        async fetchPosts({state, commit}) {
            commit('setLoading', true)
            try {
                const response = await axios.get(
                    'http://jsonplaceholder.typicode.com/posts',{
                        params: {
                            _page: state.page,
                            _limit: state.limit
                        }
                    })
                commit('setTotalPage', Math.ceil(response.headers['x-total-count'] / state.limit))
                commit('setPosts', response.data)
            } catch (e) {
                alert('Error')
            } finally {
                commit('setLoading', false)
            }
        },

        async loadMorePosts({state, commit}) {
            try {
                commit('setPage', state.page + 1)
                const response = await axios.get(
                    'http://jsonplaceholder.typicode.com/posts',{
                        params: {
                            _page: state.page,
                            _limit: state.limit
                        }
                    })
                commit('setPosts', [...state.posts, ...response.data])
            } catch (e) {
                alert('Error')
            }
        },
    },
    namespaced: true
}