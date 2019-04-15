Vue.component('navbar', {
  props: ['isLogin'],
  methods: {
    signOut() {
      Swal.fire({
        title: 'Do you want to leave?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sign Out'
      })
      .then(selected => {
        if(selected.value) {
          Swal.fire({
            type: 'success',
            title: 'Log out success',
            showConfirmButton: false,
            timer: 1500
          })
        
          if(gapi) {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
                console.log('User signed out.');
            })
          } 
          localStorage.clear()
          this.currentPage = ""
        }
      })
    },
    getArticles() {
      this.$emit('get-all-articles')
    }
  },
  template: `
  <nav class="navbar navbar-expand-lg navbar-light white">
    <a class="navbar-brand" href=""><i class="fab fa-wordpress-simple"></i></a>
        <button class="btn btn-outline-primary mr-auto" v-on:click.prevent="getArticles">Read All Article</button>
    <div class = "navbar-nav ml-auto">
      <button type="button" v-if="isLogin" class="btn btn-outline-primary my-2 my-sm-0" data-toggle="modal" data-target="#addArticle-form"
      style="margin-right: 10px">Write</button>
      <button class="btn btn-outline-primary my-2 my-sm-0" v-if="!isLogin" data-toggle="modal" data-target="#registerform" type="submit" style="margin-right: 10px"> Register </button>
      <button class="btn btn-outline-success my-2 my-sm-0" v-if="!isLogin" data-toggle="modal" data-target="#loginform" type="submit"> Login </button>
      <button class="btn btn-outline-danger my-2 my-sm-0" v-if="isLogin" v-on:click.prevent="signOut" type="submit">Logout</button>
    </div>
  </nav>
      `
})