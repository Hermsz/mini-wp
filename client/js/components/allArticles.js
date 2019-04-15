Vue.component('allArticle', {
  props:['isLogin','allarticles', 'author','editForm', ],
  data() {
    return {
      search:''
    }
  },
  methods: {

    deleteArticle(id) {
      this.$emit('delete-article', id)
    },
    deleteArticle(id) {
      axios
        .delete(`${baseUrl}/articles/${id}`, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(() => {
          return axios
          .get(`${baseUrl}/articles`)
        })
        .then(({ data }) => {
          Swal.fire({
            title: 'Are you sure you want to delete this Article ?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete ?'
          })
          .then((selected) => {
            if(selected.value) {
              Swal({
                type: 'success',
                title: 'Deleted File',
                showConfirmButton: false,
                timer: 1500
              })
            }
            this.$emit('delete-article', id)
          })
          .catch(err => {
            return err
          })
        })
        .catch(err => {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: `${err.message} Something went wrong!`,
            footer: '<a href>Why do I have this issue?</a>'
          })
        })
    },

  },
  computed: {
    filteredArticles: function() {
        return this.allarticles.filter(article => {
          return article.title.toLowerCase().match(this.search.toLowerCase())
        })
    }
  },
  template: `

  <div class="row">
  <div class="col-md-6 offset-md-3">
  <h3>Type something to search for article</h3>
    <input class="form-rounded" type="text" v-model="search" placeholder="search articles" />
      <div v-for="(article, index) in filteredArticles">
        <img v-bind:src="article.featured_image" class="img-fluid thumbnail" alt="Responsive image">
        <h2>{{ article.title }}</h2>
        <article> {{ article.content }} </article>
        <article> {{ author }} </article>
        <button class="btn btn-outline-danger" v-if="isLogin"
        v-on:click=deleteArticle(article._id)>Delete</button>
        <button class="btn btn-outline-warning" v-if="isLogin"
          v-on:click="editForm(article._id, article.title, article.content)" data-toggle="modal" data-target="#updateForm">Update</button><hr>
      </div>
  </div>   
</div>`
})