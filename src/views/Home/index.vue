<template>
  <main class="main">
    <div class="main__wrapper container">
      <ul class="main__menu">
        <li class="main__item" @click="scrollTo(tier1)">TIER 1</li>
        <li class="main__item" @click="scrollTo(tier2)">TIER 2</li>
        <li class="main__item" @click="scrollTo(adr)">ADR</li>
      </ul>
      <!--  TIER 1  -->
      <div class="main__block" ref="tier1">
        <div class="main__title">TIER 1 Легенды</div>
        <div class="main__content">
          <table class="main__table">
            <tr>
              <th>#</th>
              <th>ИГРОК</th>
              <th>РАУНДЫ</th>
              <th>K/D</th>
              <th>РЕЙТИНГ</th>
            </tr>
            <tr v-for="(item, index) in dynamicData" :key="item.id">
              <td>{{ index + 1 }}</td>
              <td class="main__name--full" @click="goToPlayer(item.name)">{{ item.name }}</td>
              <td class="main__name--short">RuSsss</td>
              <td>{{ item.rounds }}</td>
              <td :class="{'td--green': item.kd > 0, 'td--red': item.kd < 0}">
                {{ item.kd }}
              </td>
              <td>{{ item.rating }}</td>
            </tr>
          </table>
        </div>
      </div>
      <!--  TIER 2  -->
      <div class="main__block" ref="tier2">
        <div class="main__title">TIER 2 Легенды</div>
        <div class="main__content">
          <table class="main__table">
            <tr>
              <th>#</th>
              <th>ИГРОК</th>
              <th>РАУНДЫ</th>
              <th>K/D</th>
              <th>РЕЙТИНГ</th>
            </tr>
            <tr v-for="(item, index) in dynamicData" :key="item.id">
              <td>{{ index + 1 }}</td>
              <td class="main__name--full">{{ item.name }}</td>
              <td class="main__name--short">RuSsss</td>
              <td>{{ item.rounds }}</td>
              <td :class="{'td--green': item.kd > 0, 'td--red': item.kd < 0}">
                {{ item.kd }}
              </td>
              <td>{{ item.rating }}</td>
            </tr>
          </table>
        </div>
      </div>
      <!--  ADR  -->
      <div class="main__block" ref="adr">
        <div class="main__title">ADR</div>
        <div class="main__content">
          <table class="main__table">
            <tr>
              <th>#</th>
              <th>ИГРОК</th>
              <th>ADR</th>
            </tr>
            <tr v-for="(item, index) in dynamicData" :key="item.id">
              <td>{{ index + 1 }}</td>
              <td class="main__name--full">{{ item.name }}</td>
              <td class="main__name--short">RuSsss</td>
              <td>{{ item.adr }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import {computed, ref} from "vue";
import router from "@/router/index.js";

const dynamicData = computed(() => {
  return [
    {
      id: 0,
      name: 'Руслан “RuSsss” Шигапов',
      rounds: 745,
      kd: '+116',
      rating: 1.16,
      adr: 123,
    },
    {
      id: 1,
      name: 'Алексей “ololosha ^_^” Каплун',
      rounds: 453,
      kd: '+106',
      rating: 1.12,
      adr: 99,
    }
  ]
});

const tier1 = ref(null);
const tier2 = ref(null);
const adr = ref(null);

function scrollTo(view) {
  const yOffset = -90;
  const element = view;
  const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
  window.scrollTo({top: y, behavior: 'smooth'});
}

function goToPlayer(name) {
  //todo pass only player nick lowercase
  router.push({name: 'Player', params: {name: 'russss'}});
  window.scrollTo(0,0);
}

</script>

<style lang="scss" scoped>
.main {
  background-color: #161616;
  min-height: 100vh;
}

.main__menu {
  padding-top: calc(96px + 83px);
  padding-bottom: 90px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 40px;

  @media (max-width: 768px) {
    padding-top: calc(96px + 60px);
    padding-bottom: 60px;
  }
}

.main__block {
  padding-bottom: 85px;

  @media (max-width: 768px) {
    padding-bottom: 65px;
  }
}

.main__item {
  font-size: 24px;
  text-transform: uppercase;
  transition: all .2s linear;
  cursor: pointer;

  &:hover {
    color: #C91419;
  }
}

.main__title {
  font-size: 32px;
  margin-bottom: 50px;

  @media (max-width: 768px) {
    font-size: 28px;
    margin-bottom: 25px;
  }
}

.main__content {
  border-radius: 22px;
  border: 1px solid #323232;
  padding-top: 31px;
  padding-bottom: 31px;
  padding-left: 42px;
  padding-right: 42px;

  @media(max-width: 768px) {
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 20px;
    padding-right: 20px;
  }
}

.main__table {
  border-collapse: collapse;
  width: 100%;
}

.main__table th {
  text-align: left;
  padding-bottom: 25px;
  border-bottom: 1px solid #323232;
  font-size: 16px;
  font-weight: 600;

  &:last-child {
    text-align: right;
  }

  @media(max-width: 768px) {
    text-align: center;
  }
}

.main__table td {
  padding-bottom: 25px;
  padding-top: 25px;
  border-bottom: 1px solid #323232;
  font-size: 16px;

  &:last-child {
    text-align: right;
  }

  &.td--green {
    color: #68e04a;
  }

  &.td--red {
    color: #ff2323;
  }

  @media(max-width: 768px) {
    text-align: center;
  }
}

.main__name--full {
  cursor: pointer;
  transition: all .2s linear;

  &:hover {
    color: #ff2323;
  }

  @media(max-width: 768px) {
    display: none;
  }
}

.main__name--short {
  display: none;
  cursor: pointer;
  transition: all .2s linear;

  &:hover {
    color: #ff2323;
  }

  @media(max-width: 768px) {
    display: block;
  }
}

</style>