<template>
  <main class="main">
    <div class="create__wrapper container" v-if="players">
      <div class="create__title">Выберете 10 игроков</div>
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
      <Transition name="fade">
        <div v-if="selectedPlayers && selectedPlayers.length === 10">
          <div class="create__subtitle">При необходимости укажите игроков которые должны быть в одной команде</div>
          <div class="create__team">
            <div class="create__select-mini">
              <MultiSelect
                  class="w-full md:w-20rem"
                  v-model="mandatoryPairs1"
                  :options="selectedPlayers"
                  optionLabel="nickname"
                  placeholder="Должны играть вместе"
                  :minSelectedLabels="2"
                  :maxSelectedLabels="5"
              />
            </div>
            <div class="create__select-mini">
              <MultiSelect
                  class="w-full md:w-20rem"
                  v-model="mandatoryPairs2"
                  :options="selectedPlayers"
                  optionLabel="nickname"
                  placeholder="Должны играть вместе"
                  :minSelectedLabels="2"
                  :maxSelectedLabels="5"
              />
            </div>
          </div>
        </div>
      </Transition>
      <Transition name="fade">
        <button class="create__btn" @click="splitTeams(selectedPlayers, mandatoryPairs1, mandatoryPairs2)"
                v-if="selectedPlayers && selectedPlayers.length === 10">
          Рассчитать
        </button>
      </Transition>
      <p class="create__error">{{ error }}</p>
      <Transition name="fade">
        <div class="create__content" v-if="completedTeam1 && completedTeam2 && !error">
          <ul class="create__list">
            <li class="create__item" v-for="player in completedTeam1" :key="player.id">
              <div class="create__name">{{ player.nickname }}</div>
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
              <div class="create__score">{{ player.adr }}</div>
            </li>
            <li class="create__item create__item--final">
              <div class="create__name">СРЕДНИЙ ADR</div>
              <div class="create__score">{{ teamAdr2 }}</div>
            </li>
          </ul>
        </div>
      </Transition>
      <!--      <button class="create__btn create__btn&#45;&#45;share" v-if="completedTeam1 && completedTeam2">Поделиться</button>-->
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

const error = ref('');

const selectedPlayers = ref();

const mandatoryPairs1 = ref([]);
const mandatoryPairs2 = ref([]);

const completedTeam1 = ref(null);
const teamAdr1 = ref(null);
const completedTeam2 = ref(null);
const teamAdr2 = ref(null);

const splitTeams = (players, groups1, groups2) => {
  error.value = '';

  if (players.length < 10) {
    return error.value = 'Вы не выбрали 10 игроков';
  }

  let team1 = [];
  let team2 = [];

  // Проверяем, чтобы группы не содержали одинаковых игроков
  const allMandatoryPlayers = [...groups1, ...groups2];
  const uniquePlayers = new Set(allMandatoryPlayers.map(player => player.id));
  if (uniquePlayers.size !== allMandatoryPlayers.length) {
    return error.value = "Есть игроки, которые находятся в обеих обязательных группах.";
  }

  // Удаляем обязательных игроков из общего списка игроков
  const mandatoryPlayersIds = new Set(allMandatoryPlayers.map(player => player.id));
  let remainingPlayers = players.filter(player => !mandatoryPlayersIds.has(player.id));

  // Сортируем всех игроков по ADR
  remainingPlayers.sort((a, b) => b.adr - a.adr);
  allMandatoryPlayers.sort((a, b) => b.adr - a.adr);

  // Добавляем обязательные группы игроков в команды
  const addGroupToTeam = (group, team) => {
    team.push(...group);
  };

  addGroupToTeam(groups1, team1);
  addGroupToTeam(groups2, team2);

  // Добавляем оставшихся игроков поочередно в команды
  remainingPlayers.forEach(player => {
    if (team1.reduce((sum, p) => sum + p.adr, 0) <= team2.reduce((sum, p) => sum + p.adr, 0)) {
      team1.push(player);
    } else {
      team2.push(player);
    }
  });

  // Объединяем все игроки в командах и сортируем по ADR
  team1 = [...team1].sort((a, b) => b.adr - a.adr);
  team2 = [...team2].sort((a, b) => b.adr - a.adr);

  const adr1 = team1.reduce((total, next) => total + next.adr, 0)
  const adr2 = team2.reduce((total, next) => total + next.adr, 0)

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

.create__subtitle {
  font-size: 24px;
  margin-bottom: 25px;

  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 25px;
  }
}

.create__select {
  margin-bottom: 45px;
  height: 50px;

  .p-multiselect {
    height: 100%;
    display: flex;
    align-items: center;
    padding-left: 16px;
  }
}

.create__team {
  display: flex;
  width: 100%;
  justify-content: space-between;
  column-gap: 45px;
  margin-bottom: 50px;

  @media (max-width: 768px) {
    flex-direction: column;
    row-gap: 20px;
  }
}

.create__select-mini {
  flex: 1;
  height: 50px;

  .p-multiselect {
    min-height: 100%;
    display: flex;
    align-items: center;
    padding-left: 16px;
    height: 50px;
  }
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
  margin-bottom: 45px;

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

  @media (max-width: 768px) {
    width: 100%;
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
  margin-bottom: 45px;

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

  @media (max-width: 768px) {
    margin-left: 7px;
    margin-right: 7px;
  }
}

.create__error {
  padding-bottom: 20px;
  color: #C91419;
}

// transition
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<style lang="scss">
.p-multiselect-header {
  height: 40px;
  column-gap: 20px;
  padding-left: 16px;
}

.p-multiselect-filter-container {
  position: relative;

  .p-multiselect-filter {
    height: 22px;
  }

  svg {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
}

.p-multiselect-item {
  padding-left: 16px;
  padding-top: 3px;
  padding-bottom: 3px;

  .p-checkbox {
    margin-right: 12px;
  }
}

</style>