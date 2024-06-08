<template>
  <div class="create">
    <div class="create__title">Создать игрока</div>
    <form class="create__wrapper" ref="form">
      <div class="create__input">
        <div class="create__form">
          <label for="name">Имя</label>
          <InputText id="name" v-model="name"/>
        </div>
      </div>
      <div class="create__input">
        <div class="create__form">
          <label for="surname">Фамилия</label>
          <InputText id="surname" v-model="surname"/>
        </div>
      </div>
      <div class="create__input">
        <div class="create__form">
          <label for="nickname">Ник</label>
          <InputText id="nickname" v-model="nickname"/>
        </div>
      </div>
      <div class="create__input">
        <div class="create__form">
          <label for="rounds">Количество раундов</label>
          <InputText id="rounds" v-model="rounds"/>
        </div>
      </div>
      <div class="create__input">
        <div class="create__form">
          <label for="adr">ADR</label>
          <InputText id="adr" v-model="adr"/>
        </div>
      </div>
      <div class="create__input">
        <div class="create__form">
          <label for="kills">Kills</label>
          <InputText id="kills" v-model="kills"/>
        </div>
      </div>
      <div class="create__input">
        <div class="create__form">
          <label for="Deaths">Deaths</label>
          <InputText id="Deaths" v-model="deaths"/>
        </div>
      </div>
      <div class="create__input">
        <div class="create__form">
          <label for="assists">Assists</label>
          <InputText id="assists" v-model="assists"/>
        </div>
      </div>
    </form>
    <p class="create__error">{{ error }}</p>
    <button class="create__button" @click="handleSubmit">ДОБАВИТЬ</button>
  </div>
</template>

<script setup>
import {ref} from "vue";
import InputText from 'primevue/inputtext'
import useCollection from "@/composables/useCollection.js";

const form = ref(null);

const {error, addDoc} = useCollection('users');

const name = ref('');
const surname = ref('');
const nickname = ref('');
const rounds = ref(null);
const adr = ref(null);
const kills = ref(null);
const deaths = ref(null);
const assists = ref(null);

// todo Добавить валидацию

const handleSubmit = async () => {
  const user = {
    name: name.value,
    surname: surname.value,
    nickname: nickname.value,
    rounds: +rounds.value,
    adr: +adr.value,
    k: +kills.value,
    d: +deaths.value,
    a: +assists.value,
  };

  await addDoc(user);
  if (!error.value) {
    alert(`Игрок ${user.name} добавлен`);
    window.location.reload();
  }
}
</script>

<style lang="scss" scoped>
.create {
  background-color: #161616;
  min-height: 100vh;
  padding-top: calc(96px + 83px);
  padding-bottom: 90px;
}

.create__title {
  font-size: 32px;
  margin-bottom: 36px;
  text-align: center;
  letter-spacing: 1px;
  font-weight: 500;
}

.create__wrapper {
  max-width: 622px;
  margin-left: auto;
  margin-right: auto;
}

.create__form {
  display: flex;
  flex-direction: column;
  column-gap: 2px;
}

.create__input {
  margin-bottom: 20px;
  width: 100%;

  input {
    height: 30px;
    padding-left: 16px;
  }
}

.create__error {
  color: #C91419;
}

.create__button {
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
  margin-right: auto;
  margin-left: auto;
  max-width: 622px;

  &:hover {
    background: #fff;
    color: #C91419;
  }
}
</style>