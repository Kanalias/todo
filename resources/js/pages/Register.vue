<template>
    <div class="container">
        <div class="row justify-content-md-center">
            <div class="col-6">
                <div class="card card-default">
                    <div class="card-header">Регистрация</div>
                    <div class="card-body">
                        <div class="alert alert-danger" v-if="has_error && !success">
                            <p v-if="error == 'registration_validation_error'"> {{ error }}</p>
                            <p v-else-if="has_email && password_mismatch"> {{errors.email[0]}} {{errors.password[0]}}</p>
                            <p v-else-if="has_email"> {{errors.email[0]}} </p>
                            <p v-else-if="password_mismatch"> {{errors.password[0]}}</p>
                        </div>
                        <form autocomplete="off" @submit.prevent="register" v-if="!success" method="post">
                            <div class="form-group" v-bind:class="{ 'has-error': has_error && email_error }">
                                <label for="email">E-mail</label>
                                <input type="email"
                                       id="email"
                                       class="form-control"
                                       placeholder="user@example.com"
                                       v-model="email" required >
                            </div>
                            <div class="form-group" v-bind:class="{ 'has-error': has_error && password_mismatch}">
                                <label for="password">Пароль</label>
                                <input type="password"
                                       id="password"
                                       class="form-control"
                                       v-model="password"
                                       required
                                >
                            </div>
                            <div class="form-group" v-bind:class="{ 'has-error': has_error && password_mismatch}">
                                <label for="password_confirmation">Подтверждение пароля</label>
                                <input type="password"
                                       id="password_confirmation"
                                       class="form-control"
                                       v-model="password_confirmation"
                                       required
                                >
                            </div>
                            <button type="submit" class="btn btn-outline-primary">Зарегистрироваться</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Register",
        data() {
            return {
                email: '',
                password: '',
                password_confirmation: '',
                has_error: false,
                has_email: false,
                email_error: 'Данный адрес занят',
                password_mismatch: false,
                password_error: 'Пароли не совпадают',
                error: 'Непредвиденная ошибка, проверьте данные',
                errors: {},
                success: false
            }
        },
        methods: {
            register() {
                var app = this;
                this.$auth.register({
                    data: {
                        email: app.email,
                        password: app.password,
                        password_confirmation: app.password_confirmation
                    },
                    success: function () {
                        app.success = true;
                        this.$router.push({name: 'login', params: {successRegistrationRedirect: true}});
                    },
                    error: function (res) {
                        this.has_email = false;
                        this.password_mismatch = false;

                        app.has_error = true;
                        app.errors = res.response.data.errors || {};
                        if (app.errors.email){
                            this.has_email = true;
                        }
                        if (app.errors.password){
                            this.password_mismatch = true;
                        }
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
