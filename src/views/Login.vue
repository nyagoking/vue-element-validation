<template>
  <el-card class="login-form">
    <div>LOGIN</div>
    <div>
      <el-form ref="loginForm" :rules="rules" :model="loginModel">
        <el-form-item label="ID" prop="id">
          <el-input v-model="loginModel.id" class="login-id"></el-input>
        </el-form-item>
        <el-form-item label="PASSWORD" prop="password">
          <el-input v-model="loginModel.password" class="login-password" show-password></el-input>
        </el-form-item>
        <el-row class="button-area">
          <el-button class="login-btn" type="primary" :disabled="!validationResult" @click="login">
            Login
          </el-button>
        </el-row>
      </el-form>
    </div>
  </el-card>
</template>

<script lang="ts">
import ElementUi from 'element-ui';
import { ElForm, ValidateCallback } from 'element-ui/types/form';
import Vue from 'vue';
import Component from 'vue-class-component';

interface LoginModel {
  id: string;
  password: string;
}

Vue.use(ElementUi);

@Component
export default class Login extends Vue {
  /* data */
  public $refs!: { [key: string]: ElForm };
  private loginModel: LoginModel | null = null;
  private validationResult: boolean = false;
  private data() {
    return {
      rules: {
        id: [{ required: true, message: 'required', trigger: 'blur' }],
        password: [{ required: true, message: 'required', trigger: 'blur' }],
      },
    };
  }

  /* lifecycle hooks */
  private created() {
    this.loginModel = {
      id: '',
      password: '',
    };
  }
  private beforeUpdate() {
    this.updateValidationResult();
  }

  /* methods */
  private login() {
    alert('Login clicked!');
  }
  private updateValidationResult() {
    const callback: ValidateCallback = (isValid: boolean, invalidFields: object) => {
      this.validationResult = isValid;
    };

    this.$refs.loginForm.validate(callback);
  }
}
</script>

<style lang="scss">
.login-form {
  width: 480px;
  margin: auto;
}
</style>
