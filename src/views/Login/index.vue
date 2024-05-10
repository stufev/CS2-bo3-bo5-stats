<template>
  <div class="login">
    <div class="login__background">
      <img class="login__image" :src="bgImage" alt="">
    </div>

    <div class="login__wrapper">

      <div class="login__title">Войти</div>

      <div class="login__input">
        <div class="login__form">
          <label for="username">Username</label>
          <InputText id="username" v-model="login"/>
        </div>
      </div>

      <div class="login__input">
        <div class="login__form">
          <label for="password">Password</label>
          <Password v-model="password" :feedback="false" toggleMask id="password"/>
        </div>
      </div>

      <button class="login__button">Войти</button>

      <a class="login__subtitle" href="/signup">зарегистрироваться</a>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputText from 'primevue/inputtext'
import Password from 'primevue/password';
import bgImage from '@/assets/images/blob.svg'

const login = ref('');
const password = ref('');

</script>

<style lang="scss" scoped>
.login {
  background-color: #161616;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding-left: 15px;
  padding-right: 15px;
}

.login__background {
  position: absolute;
  width: 50vw;
  height: auto;
  top: -30%;
  left: -7%;

  @media (max-width: 1100px) {
    display: none;
  }
}

.login__image {
  display: block;
}

.login__wrapper {
  max-width: 522px;
  width: 100%;
  background-color: #323232;
  border-radius: 22px;
  padding-top: 40px;
  padding-bottom: 40px;
  padding-left: 25px;
  padding-right: 25px;
  z-index: 1;

  @media (max-width: 1100px) {
    padding-top: 30px;
    padding-bottom: 30px;
    padding-left: 15px;
    padding-right: 15px;
  }
}

.login__title {
  font-size: 32px;
  margin-bottom: 36px;
  text-align: center;
  letter-spacing: 1px;
  font-weight: 500;
}

.login__form {
  display: flex;
  flex-direction: column;
  column-gap: 2px;
}

.login__input {
  margin-bottom: 20px;
  width: 100%;

  input {
    height: 30px;
    padding-left: 16px;
  }
}

.login__button {
  width: 100%;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: #C91419;
  transition: all 0.2s linear;
  border-radius: 15px;
  margin-bottom: 20px;
  margin-top: 45px;

  &:hover {
    background: #fff;
    color: #C91419;
  }
}

.login__subtitle {
  text-transform: uppercase;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 1px;
}

// username

// password
.login__input :deep(.p-password) {
  .p-password-input {
    height: 30px;
    width: 100%;
    padding-left: 16px;
  }

  .p-input-icon {
    transform: translateY(-50%);
  }
}
</style>