Vue.component('register', {
  props: ['isLogin'],
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  },
  methods: {
    register() {
      axios
        .post(`${baseUrl}/users`, {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password
        })
        .then(user => {
          Swal.fire({
            title: 'Success Login',
            type: 'success',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch(err => {
          console.log(err.message)
        })
    }
  },
  template: `
  <div class="modal fade" id="registerform" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
  aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Register</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form v-on:submit.prevent="register">
                    <div class="form-group">
                        <label class="col-form-label">First name:</label>
                        <input type="text" v-model="firstName" class="form-control form-rounded" name="name" placeholder="Name" required>
                    </div>
                    <div class="form-group">
                        <label class="col-form-label">Last name:</label>
                        <input type="text" v-model="lastName" class="form-contro form-roundedl" name="name" placeholder="Name" required>
                    </div>
                    <div class="form-group">
                        <label class="col-form-label">Email:</label>
                        <input type="text" v-model="email" class="form-control form-rounded" name="email" placeholder="Email" required>
                    </div>
                    <div class="form-group">
                        <label class="col-form-label">Password:</label>
                        <input type="password" v-model="password" class="form-control form-rounded" name="password"
                            placeholder="Password" required>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                      <button type="submit" class="btn btn-success" v-on:click.prevent="register">Register</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  </div>
  `
})