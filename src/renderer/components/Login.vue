<template>
    <div class="login">
        <div class="title">登录</div>
        <el-form ref="form" :model="form" label-width="180px">
            <el-form-item label="账户:">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码:">
                <el-input v-model="form.password" show-password></el-input>
            </el-form-item>
        </el-form>
        <el-button type="primary" @click="login">确定</el-button>
    </div>
</template>

<script>
import { login } from '../api'
import { mapActions } from 'vuex'

export default {
    data () {
        return {
            form: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        ...mapActions('Users', ['setToken']),
        async login () {
            let res = await login(this.form)
            if(res.code === 0) {
                this.setToken(res.data.token)
                this.$router.push({ name: 'choice' })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.login {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .title {
        font-size: 48px;
        font-weight: 700;
        text-align: center;
        margin-bottom: 137px;
    }
    ::v-deep .el-form-item__label {
        font-size: 48px;
    }
}
</style>