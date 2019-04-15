function onSignIn(googleUser) {

  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

  
  const id_token = googleUser.getAuthResponse().id_token;

  axios
    .post(`${baseUrl}/users/googleLogin`, {
      token: id_token
    })
    .then(({data}) => {
      localStorage.setItem('token', data.token)
      localStorage.setItem('userId', data.userId)
    })
    .catch(err => {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: `${err.message} Something went wrong!`,
        footer: '<a href>Why do I have this issue?</a>'
      })
    })

}

Vue.component('loginform', {
  props: ['isLogin'],
  data() {
    return {
      email_login : "",
      password_login : ""
    }
  },
  methods: {
    webLogin() {
      axios
        .post(`${baseUrl}/users/weblogin`, {
          email: this.email_login,
          password: this.password_login
        })
        .then(({ data }) => {
          Swal.fire({
            title: 'Success Login',
            type: 'success',
            showConfirmButton: false,
            timer: 1500
          })
          localStorage.setItem('token', data.token)
          localStorage.setItem('userId', data.foundUser._id)
          localStorage.setItem('name', data.foundUser.firstName)
          this.$emit('success-login')
        })
        .catch(err => {
          console.log(err)
        })
    },

  },
  template:`
    <div class="modal fade" id="loginform" tabindex="-1" role="dialog" aria-labelledby="loginform"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control form-rounded" id="exampleInputEmail1" aria-describedby="emailHelp"
                  v-model="email_login" placeholder="Enter email">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone
                  else.</small>
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control form-rounded" id="exampleInputPassword1" v-model="password_login"
                  placeholder="Password">
              </div>
              <div class="g-signin2" data-onsuccess="onSignIn"></div>
              <div class="form-check">
                <input type="checkbox" class="form-check-input form-rounded" id="exampleCheck1">
                <label class="form-check-label" for="exampleCheck1">Check me out</label>
              </div>
              <button type="submit" v-on:click.prevent="webLogin" class="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>`
})