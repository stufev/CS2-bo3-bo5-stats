<template>
  <main class="main">
    <div class="create__wrapper container" v-if="players">
      <div class="create__title">Выберете игроков</div>
      <div class="create__select">
        <MultiSelect
            class="w-full md:w-20rem"
            v-model="selectedPlayers"
            :options="players"
            filter
            optionLabel="nickname"
            placeholder="Пикните 10 игроков"
            :minSelectedLabels="10"
            :maxSelectedLabels="10"
        />
      </div>
      <div class="create__select">
        <h2>Укажите игроков которые должны быть в одной команде</h2>
        <div>
          <MultiSelect
              class="w-full md:w-20rem"
              v-model="mandatoryPairs"
              :options="players"
              filter
              optionLabel="nickname"
              placeholder="Должны играть вместе"
              :minSelectedLabels="2"
              :maxSelectedLabels="5"
          />
        </div>
      </div>
      <button class="create__btn" @click="splitTeams(selectedPlayers, mandatoryPairs)">Рассчитать</button>
      <div class="create__content" v-if="completedTeam1 && completedTeam2">
        <ul class="create__list">
          <li class="create__item" v-for="player in completedTeam1" :key="player.id">
            <div class="create__name">{{ player.nickname }}</div>
            <!--            <Dropdown v-model="selectedPlayer1" :options="players" optionLabel="nickname" placeholder="Выбрать игрока"/>-->
            <div class="create__score">{{ player.adr }}</div>
          </li>
          <li class="create__item create__item--final">
            <div class="create__name">СРЕДНИЙ ADR</div>
            <div class="create__score">{{ teamAdr1 }}</div>
          </li>
        </ul>
        <ul class="create__list">
          <li class="create__item" v-for="player in completedTeam2" :key="player.id">
            <div class="create__name">{{ player.nickname }}</div>
            <!--            <Dropdown v-model="selectedPlayer2" :options="players" optionLabel="nickname" placeholder="Выбрать игрока"/>-->
            <div class="create__score">{{ player.adr }}</div>
          </li>
          <li class="create__item create__item--final">
            <div class="create__name">СРЕДНИЙ ADR</div>
            <div class="create__score">{{ teamAdr2 }}</div>
          </li>
        </ul>
      </div>
      <button class="create__btn create__btn--share" v-if="completedTeam1 && completedTeam2">Поделиться</button>
    </div>
  </main>
</template>

<script setup>
import MultiSelect from 'primevue/multiselect';
import Dropdown from 'primevue/dropdown';
import {onMounted, ref} from "vue";
import getCollection from "@/composables/getCollection.js";

const players = ref(null);

onMounted(async () => {
  const {error, documents: usersCollection} = await getCollection('users');
  players.value = usersCollection?.value;
})

const selectedPlayers = ref();

const mandatoryPairs = ref([
  // Пример обязательных пар игроков
  ["tr1sotni", "fr0gster"],
  // Добавьте остальные пары здесь
]);

const completedTeam1 = ref(null);
const teamAdr1 = ref(null);
const completedTeam2 = ref(null);
const teamAdr2 = ref(null);

const splitTeams = (players, pairs) => {
  let team1 = [];
  let team2 = [];

  // Сначала распределяем обязательные пары
  pairs.forEach(pair => {
    const player1 = players.find(p => p.nickname === pair[0]);
    const player2 = players.find(p => p.nickname === pair[1]);

    if (player1 && player2) {
      // Если сумма ADR текущей команды 1 меньше чем команды 2
      if (team1.reduce((sum, p) => sum + p.adr, 0) <= team2.reduce((sum, p) => sum + p.adr, 0)) {
        team1.push(player1, player2);
      } else {
        team2.push(player1, player2);
      }

      // Удаляем этих игроков из списка доступных
      players = players.filter(p => p.nickname !== pair[0] && p.nickname !== pair[1]);
    }
  });

  // Сортируем оставшихся игроков по ADR
  players.sort((a, b) => b.adr - a.adr);

  // Добавляем оставшихся игроков по очереди в команды
  players.forEach(player => {
    if (team1.reduce((sum, p) => sum + p.adr, 0) <= team2.reduce((sum, p) => sum + p.adr, 0)) {
      team1.push(player);
    } else {
      team2.push(player);
    }
  });

  console.log(team1)
  const adr1 = team1.reduce((total, next) => total + next.adr, 0)
  const adr2 = team2.reduce((total, next) => total + next.adr, 0)

  // return { team1, team2 };
  completedTeam1.value = team1;
  completedTeam2.value = team2;
  teamAdr1.value = adr1;
  teamAdr2.value = adr2;
};
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