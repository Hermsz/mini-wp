let baseUrl = 'http://localhost:4000'

new Vue ({
  
  el: "#app",
  data: {
    allArticles: [],
    userArticle : [],
    isLogin: false,
    search: "",
    currentPage: "",
    author: "",
    newTitle:"",
    newContent:"",
    image: null,
    editId:"",
    editTitle: "",
    editContent: ""
  },

  methods: {

    deleteArticle(id) {
      console.log('masuk')
      this.allArticles = this.allArticles.filter(article => article._id !== id)
    },
    addArticle() {
      let fd = new FormData()
      fd.append('title', this.newTitle)
      fd.append('content', this.newContent)
      fd.append('image', this.image)
      axios
        .post(`${baseUrl}/articles`, fd, {
          headers: {
            token: localStorage.getItem('token'),
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(({data}) => {
          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Article added successfully',
            showConfirmButton: false,
            timer: 1500
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

    find_allArticle() {
      axios
        .get(`${baseUrl}/articles`)
        .then(({ data }) => {
          this.allArticles = data
          this.author = localStorage.getItem('name')
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

    find_userArticle() {
      axios
      .get(`${baseUrl}/articles/myarticle`, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        this.userArticle = data
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
    editForm(id, title, content) {
      this.currentPage = "editArticlePage",
      this.editId = id,
      this.editTitle = title,
      this.editContent = content
    },
    changeLoginState() {
      this.isLogin = true
      this.currentPage="my_article"
    },

    getImage(event) {
      this.image = event.target.files[0]
    },
    updateArticle() {
      
      let fd = new FormData()
      fd.append('title', this.editTitle)
      fd.append('content', this.editContent)
      fd.append('image', this.image)

      axios
        .put(`${baseUrl}/articles/${this.editId}`,fd ,{
          headers: {
            token: localStorage.getItem('token'),
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((id) => {
          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Article updated successfully',
            showConfirmButton: false,
            timer: 1500
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
      if(this.currentPage == 'my_article') {
        return this.userArticle.filter(article => {
          return article.title.toLowerCase().match(this.search.toLowerCase())
        })
      } 
      else {
        return this.allArticles.filter(article => {
          return article.title.toLowerCase().match(this.search.toLowerCase())
        })
      }
    }
  },

  created: function() {
    if(localStorage.getItem('token')) {
      this.isLogin = true
      this.currentPage = "my_article"
      this.find_userArticle()
    } else {
      this.find_allArticle()
    }
  },

  components: {
    wysiwyg: vueWysiwyg.default.component
  },

  watch: {
    currentPage: function() {
      if(this.currentPage === "my_article") {
        this.find_userArticle()
      }
    }
  }
})