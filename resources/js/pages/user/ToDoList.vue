<template>
    <div class="container">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <div class="input-group mb-3">
            <form autocomplete="off" @submit.prevent="addTask" >
                <input type="text" class="form-control" placeholder="Введите задачу" v-model="nameTask" required>
                <div class="input-group-prepend">
                    <button class="btn btn-outline-primary" type="submit">Добавить</button>
                </div>
            </form>
        </div>

        <table class="table table-borderless table-hover">
            <thead class="thead-light">
                <tr>
                    <th scope="col">Задачи</th>
                    <th></th>
                </tr>
            </thead>
            <tbody >
                <tr  v-for="(item, index) in tasks.data">
                    <td v-if="item.status" style="color: #aaa;"><s> {{ item.text}}</s></td>
                    <td v-else> {{ item.text}}</td>
                    <td class="float-right">
                        <button  class="btn btn-success" type="button" @click.prevent="performTask(item.id, index, item.status)">
                            <i class="fa fa-check"></i>
                        </button>
                        <button class="btn btn-primary"
                                type="button"
                                v-b-modal="'modal-edit-task'"
                                @click.prevent="sendTask(item, index)">
                            <i class="fa fa-pencil"></i>
                        </button>
                        <button class="btn btn-danger" type="button" @click.prevent="deleteTask(item.id, index)">
                            <i class="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <b-modal id="modal-edit-task"
                 ref="modal"
                 ok-title="Изменить"
                 cancel-title="Отмена"
                 @show="resetModal"
                 @hide="resetModal"
                 @ok="handleOk"
        >
            <form ref="form" @submit.stop.prevent="handleSubmit">
            <b-form-group :state="nameState"
            label="Изменение задачи:"
            label-for="name-input"
            invalid-feedback="Name is required">

            <b-form-input
                v-model="editTask.text"
                :state="nameState"
                required>
            </b-form-input>
                </b-form-group>
            </form>
        </b-modal>
    </div>
</template>

<script>
    export default {
        name: "ToDoList",
        data() {
            return {
                tasks: '',
                nameTask: '',
                editTask: '',
                nameState: null,
                indexArray: 0,
                host: 'https://infinite-fjord-74032.herokuapp.com/'
            }
        },
        methods: {
            sendTask(item, index) {
                this.editTask = item;
                this.indexArray = index;
            },
            addTask(){
                if(this.nameTask){
                    axios.post(this.host + 'api/auth/todolist/create', {
                        bearer: localStorage.getItem('laravel-jwt-auth'),
                        text: this.nameTask
                    })
                        .then( value => {
                                this.tasks.data = value.data.data;
                            }
                        )
                        .catch(e => {
                            console.log(e);
                        });
                }
            },
            deleteTask(idTask, indexArray){
                //удаляем
                this.$bvModal.msgBoxConfirm('Подвердить удаление?',{
                    okTitle: 'Да',
                    cancelTitle: 'Нет',
                })
                    .then(value => {
                        if(value){
                            axios.post(this.host + 'api/auth/todolist/destroy', {
                                bearer: localStorage.getItem('laravel-jwt-auth'),
                                id: idTask
                            })
                                .then( value => {
                                        this.tasks.data.splice(indexArray, 1);
                                    }
                                )
                                .catch(e => {
                                    console.log(e);
                                });
                        }
                    })
                    .catch(err => {
                        // An error occurred
                    });
            },
            performTask(idTask, indexArray, statusTask){
                var msgBoxText = '';
                if(statusTask){
                    msgBoxText = 'Подтвердить отмену выполнения?'
                }
                else {
                    msgBoxText = 'Подтвердить выполнение?'
                }

                this.$bvModal.msgBoxConfirm(msgBoxText,{
                    okTitle: 'Да',
                    cancelTitle: 'Нет',
                })
                    .then(value => {
                        if(value){
                            axios.post(this.host + 'api/auth/todolist/update_status', {
                                id: idTask,
                                status: statusTask,
                            })
                                .then( value => {
                                    this.tasks.data = value.data.data;
                                })
                                .catch(e => {
                                });
                        }
                    })
                    .catch(err => {
                        // An error occurred
                    });
            },

            checkFormValidity() {
                const valid = this.$refs.form.checkValidity();
                this.nameState = valid ? 'valid' : 'invalid';
                return valid
            },
            resetModal() {
                this.nameState = null
            },
            handleOk(bvModalEvt) {
                bvModalEvt.preventDefault();
                this.handleSubmit()
            },
            handleSubmit() {
                if (!this.checkFormValidity()) {
                    return
                }
                // Вызов api
                axios.post(this.host + 'api/auth/todolist/update', {
                    id: this.editTask.id,
                    text: this.editTask.text,
                })
                    .then( value => {
                        Vue.set(this.tasks.data, this.indexArray, this.editTask);
                        }
                    )
                    .catch(e => {
                        console.log(e);
                    });

                this.$nextTick(() => {
                    this.$refs.modal.hide()
                })
            }
        },
        mounted() {
                this.error = this.users = null;
                this.loading = true;
                var token =  localStorage.getItem('laravel-jwt-auth');
                axios
                    .get(this.host + 'api/auth/todolist?bearer=' + token)
                    .then(response => {
                        this.loading = false;
                        this.tasks = response.data;
                    }).catch(error => {
                    this.loading = false;
                    this.error = error.response.data.message || error.message;
                });
        }
    }
</script>
