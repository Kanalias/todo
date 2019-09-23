<template>
    <div class="container">
        <div class="row justify-content-md-center">
            <div class="col-6">
                <div class="card card-default">
                    <div class="card-header">
                        Вход
                    </div>
                    <div class="card-body" >
                        <div class="alert alert-danger" v-if="has_error && !success">
                            <p v-if="error == 'login_error'"></p>
                            <p v-else>Не удается войти с данными учетными данными</p>
                        </div>
                        <form method="post" @submit.prevent="login" autocomplete="off">
                            <div class="form-group">
                                <label for="email">E-mail</label>
                                <input
                                    type="email"
                                    id="email"
                                    class="form-control"
                                    placeholder="user@example.com"
                                    v-model="email"
                                    required
                                >
                            </div>
                            <div class="form-group">
                                <label for="password">Пароль</label>
                                <input
                                    type="password"
                                    id="password"
                                    class="form-control"
                                    v-model="password"
                                    required
                                >
                            </div>
                            <button type="submit" class="btn btn-outline-primary">Войти</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                email: null,
                password: null,
                success: false,
                has_error: false,
                error: ''
            }
        },
        methods: {
           login(){
               var app = this;
               this.$auth.login({
                   data:{
                       email: app.email,
                       password: app.password
                   },
                   success: function () {
                       app.success = true;
                       const redirectTo = 'todolist';
                       this.$router.push({name: redirectTo})
                   },
                   error: function () {
                       app.has_error = true;
                       app.error = res.response.data.error
                   },
                   rememberMe: true,
                   fetchUser: true
               })
           }
        }
    }
</script>

<style scoped>

</style>
