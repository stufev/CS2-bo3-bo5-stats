<template>
  <main class="main">
    <div class="create__wrapper container">
      <div class="create__title">Выберете игроков</div>
      <div class="create__select">
        <MultiSelect
            class="w-full md:w-20rem"
            v-model="selectedCities"
            :options="cities"
            filter
            optionLabel="name"
            placeholder="Пикните 10 игроков"
            :minSelectedLabels="10"
            :maxSelectedLabels="10"
        />
      </div>
      <button class="create__btn">Рассчитать</button>
      <div class="create__content">
        <ul class="create__list">
          <li class="create__item" v-for="i in 5">
            <div class="create__name">RuSsss</div>
            <div class="create__score">123</div>
          </li>
          <li class="create__item create__item--final">
            <div class="create__name">СРЕДНИЙ ADR</div>
            <div class="create__score">123</div>
          </li>
        </ul>
        <ul class="create__list">
          <li class="create__item" v-for="i in 5">
            <div class="create__name">RuSsss</div>
            <div class="create__score">123</div>
          </li>
          <li class="create__item create__item--final">
            <div class="create__name">СРЕДНИЙ ADR</div>
            <div class="create__score">123</div>
          </li>
        </ul>
      </div>
      <button class="create__btn create__btn--share">Поделиться</button>
    </div>
  </main>
</template>

<script setup>
import MultiSelect from 'primevue/multiselect';
import {ref} from "vue";

const selectedCities = ref();
const cities = ref([
  {name: 'RuSsss', code: '1'},
  {name: 'RuSsss', code: '2'},
  {name: 'RuSsss', code: '3'},
  {name: 'RuSsss', code: '4'},
  {name: 'RuSsss', code: '5'},
  {name: 'RuSsss', code: '6'},
  {name: 'RuSsss', code: '7'},
  {name: 'RuSsss', code: '8'},
  {name: 'RuSsss', code: '9'},
  {name: 'RuSsss', code: '10'},
  {name: 'RuSsss', code: '11'},
  {name: 'RuSsss', code: '12'},
  {name: 'RuSsss', code: '13'},
]);
</script>

<style lang="scss" scoped>
.main {
  background-color: #161616;
  min-height: 100vh;
}

.create__wrapper {
  padding-top: calc(96px + 83px);
  padding-bottom: 90px;

  @media (max-width: 768px) {
    padding-top: calc(96px + 60px);
    padding-bottom: 60px;
  }
}

.create__title {
  font-size: 32px;
  margin-bottom: 50px;

  @media (max-width: 768px) {
    font-size: 28px;
    margin-bottom: 25px;
  }
}

.create__select {

}

.create__btn {
  width: 350px;
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

  &--share {
    color: #C91419;
    background: #fff;
    width: 100%;

    &:hover {
      background: #C91419;
      color: #fff;
    }
  }
}

.create__content {
  width: 100%;
  background-color: #323232;
  border-radius: 22px;
  padding-top: 40px;
  padding-bottom: 40px;
  padding-left: 25px;
  padding-right: 25px;
  display: flex;
  justify-content: space-between;

  @media (max-width: 1100px) {
    padding-top: 30px;
    padding-bottom: 30px;
    padding-left: 15px;
    padding-right: 15px;
  }
}

.create__list {
  flex: 1;

  &:first-child {
    border-right: 1px solid #fff;
  }
}

.create__item {
  display: flex;
  justify-content: space-between;
  margin-right: 20px;
  margin-left: 20px;
  padding-top: 7px;
  padding-bottom: 7px;
  border-bottom: 1px solid #fff;

  &:last-child {
    border: none;
  }

  &--final {
    padding-top: 15px;
  }
}
</style>