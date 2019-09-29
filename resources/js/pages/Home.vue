<template>
    <div class="container">
        <div class="card card-default">
            <div class="card-header">Список задач</div>
            <div class="card-body">
                <p>
                    Зарегестрируйся или войди, чтобы добавить задачу и отметить её выполнение.
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Home",
        beforeCreate() {
            if(this.$auth.check()){
                this.$router.push({name: 'todolist'})
            }
        }
    }
</script>

<style scoped>

</style>
