<template>
  <div class="edit">
    <div class="edit__title">Редактировать игрока {{ nickname }}</div>
    <form class="edit__wrapper" ref="form">
      <div class="edit__input">
        <div class="edit__form">
          <label for="name">Имя</label>
          <InputText id="name" v-model="name"/>
        </div>
      </div>
      <div class="edit__input">
        <div class="edit__form">
          <label for="surname">Фамилия</label>
          <InputText id="surname" v-model="surname"/>
        </div>
      </div>
      <div class="edit__input">
        <div class="edit__form">
          <label for="nickname">Ник</label>
          <InputText id="nickname" v-model="nickname"/>
        </div>
      </div>
      <div class="edit__input">
        <div class="edit__form">
          <label for="rounds">Количество раундов</label>
          <InputText id="rounds" v-model="rounds"/>
        </div>
      </div>
      <div class="edit__input">
        <div class="edit__form">
          <label for="adr">ADR</label>
          <InputText id="adr" v-model="adr"/>
        </div>
      </div>
      <div class="edit__input">
        <div class="edit__form">
          <label for="kills">Kills</label>
          <InputText id="kills" v-model="kills"/>
        </div>
      </div>
      <div class="edit__input">
        <div class="edit__form">
          <label for="Deaths">Deaths</label>
          <InputText id="Deaths" v-model="deaths"/>
        </div>
      </div>
      <div class="edit__input">
        <div class="edit__form">
          <label for="assists">Assists</label>
          <InputText id="assists" v-model="assists"/>
        </div>
      </div>
      <div class="edit__input">
        <div class="edit__form">
          <label for="assists">1 K</label>
          <InputText id="assists" v-model="k1"/>
        </div>
      </div>
      <div class="edit__input">
        <div class="edit__form">
          <label for="assists">2 K</label>
          <InputText id="assists" v-model="k2"/>
        </div>
      </div>
      <div class="edit__input">
        <div class="edit__form">
          <label for="assists">3 K</label>
          <InputText id="assists" v-model="k3"/>
        </div>
      </div>
      <div class="edit__input">
        <div class="edit__form">
          <label for="assists">4 K</label>
          <InputText id="assists" v-model="k4"/>
        </div>
      </div>
      <div class="edit__input">
        <div class="edit__form">
          <label for="assists">5 K</label>
          <InputText id="assists" v-model="k5"/>
        </div>
      </div>
    </form>
    <p class="edit__error">{{ error }}</p>
    <button class="edit__button" @click="handleSubmit">ИЗМЕНИТЬ</button>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import InputText from 'primevue/inputtext'
import editCollection from "@/composables/editCollection.js";
import getCollectionById from "@/composables/getCollectionById.js";
import router from "@/router/index.js";

const props = defineProps({
  id: String
});

const form = ref(null);

const {error, editDoc} = editCollection('users');

const name = ref('');
const surname = ref('');
const nickname = ref('');
const rounds = ref(null);
const adr = ref(null);
const kills = ref(null);
const deaths = ref(null);
const assists = ref(null);
const k1 = ref(null);
const k2 = ref(null);
const k3 = ref(null);
const k4 = ref(null);
const k5 = ref(null);

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
    k1: +k1.value,
    k2: +k2.value,
    k3: +k3.value,
    k4: +k4.value,
    k5: +k5.value,
  };

  // await addDoc(user);
  await editDoc(user, props.id);
  if (!error.value) {
    alert(`Игрок ${user.name} изменён`);
    await router.push('/');
  }
}

const player = ref(null);
onMounted(async () => {
  const {error, document: userCollection} = await getCollectionById('users', props.id);
  player.value = userCollection.value;
  console.log(player.value)

  if (player.value) {
    updateForm();
  }
})

const updateForm = () => {
  name.value = player.value?.name;
  surname.value = player.value?.surname;
  nickname.value = player.value?.nickname;
  rounds.value = player.value?.rounds;
  adr.value = player.value?.adr;
  kills.value = player.value?.k;
  deaths.value = player.value?.d;
  assists.value = player.value?.a;
  k1.value = player.value?.k1;
  k2.value = player.value?.k2;
  k3.value = player.value?.k3;
  k4.value = player.value?.k4;
  k5.value = player.value?.k5;
}
</script>


<style lang="scss" scoped>
.edit {
  background-color: #161616;
  min-height: 100vh;
  padding-top: calc(96px + 83px);
  padding-bottom: 90px;
}

.edit__title {
  font-size: 32px;
  margin-bottom: 36px;
  text-align: center;
  letter-spacing: 1px;
  font-weight: 500;
}

.edit__wrapper {
  max-width: 622px;
  margin-left: auto;
  margin-right: auto;
}

.edit__form {
  display: flex;
  flex-direction: column;
  column-gap: 2px;
}

.edit__input {
  margin-bottom: 20px;
  width: 100%;

  input {
    height: 30px;
    padding-left: 16px;
  }
}

.edit__error {
  color: #C91419;
}

.edit__button {
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