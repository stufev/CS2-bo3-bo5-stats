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
            <tr v-for="(item, index) in tierList1" :key="item.id">
              <td>{{ index + 1 }}</td>
              <td class="main__name--full" @click="goToPlayer(item.id)">
                {{ item.name }} "{{ item.nickname }}" {{ item.surname }}
              </td>
              <td class="main__name--short" @click="goToPlayer(item.id)">{{ item.nickname }}</td>
              <td>{{ item.rounds }}</td>
              <td :class="{'td--green': item.kd > 0, 'td--red': item.kd < 0}">
                {{ item.kd > 0 ? `+ ${item.kd}` : `- ${-item.kd}` }}
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
            <tr v-for="(item, index) in tierList2" :key="item.id">
              <td>{{ index + 1 }}</td>
              <td class="main__name--full" @click="goToPlayer(item.id)">
                {{ item.name }} "{{ item.nickname }}" {{ item.surname }}
              </td>
              <td class="main__name--short" @click="goToPlayer(item.id)">{{ item.nickname }}</td>
              <td>{{ item.rounds }}</td>
              <td :class="{'td--green': item.kd > 0, 'td--red': item.kd < 0}">
                {{ item.kd > 0 ? `+ ${item.kd}` : `- ${-item.kd}` }}
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
              <th v-if="isAdmin">Данные</th>
              <th>ADR</th>
            </tr>
            <tr v-for="(item, index) in documents" :key="item.id">
              <td>{{ index + 1 }}</td>
              <td class="main__name--full" @click="goToPlayer(item.id)">
                {{ item.name }} "{{ item.nickname }}" {{ item.surname }}
              </td>
              <td class="main__name--short" @click="goToPlayer(item.id)">{{ item.nickname }}</td>
              <td class="main__edit" v-if="isAdmin">
                <span @click="editPlayer(item.id)">РЕД.</span>
              </td>
              <td>{{ item.adr }}</td>
            </tr>
          </table>
        </div>
        <a class="add-player" href="/create" v-if="isAdmin">
          Добавить игрока
        </a>
      </div>
    </div>
  </main>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import router from "@/router/index.js";
import getCollection from "@/composables/getCollection.js";
import {transliterate} from 'transliteration';
import {projectAuth} from "@/firebase/config.js";

const documents = ref(null);

onMounted(async () => {
  // todo создать стор с данными игроков из firebase и в этом сторе сделать computed свойства, а не тут
  const {error, documents: usersCollection} = await getCollection('users');
  documents.value = usersCollection?.value;
  formData(usersCollection.value);
  await checkUser();
})

const formData = (data) => {
  let result = null;

  result = data.map(player => {
    return {
      ...player,
      tier: player.rounds > averageRounds.value ? 1 : 2,
      kd: player.k - player.d,
      rating: calculateRating(player)
    }
  })

  documents.value = result;
}

const calculateRating = (player) => {
  const AVERAGE_KPR = 0.679;
  const AVERAGE_SPR = 0.317;
  const AVERAGE_RMK = 1.277;

  if (player) {
    const killRating = player.k / player.rounds / AVERAGE_KPR;
    const survivalRating = (player.rounds  - player.d) / player.rounds / AVERAGE_SPR;
    const roundsWithMultipleKillsRating = (player.k1 + 4 * player.k2 + 9 * player.k3 + 16 * player.k4 + 25 * player.k5) / player.rounds / AVERAGE_RMK;
    const rating = (killRating + 0.7 * survivalRating + roundsWithMultipleKillsRating) / 2.7;

    return isNaN(rating) ? 0 : Math.round(rating * 100) / 100;
  }
}

const averageRounds = computed(() => {
  if (documents.value) {
    const totalRounds = documents.value.reduce((sum, player) => sum + player.rounds, 0);
    return totalRounds / documents.value.length;
  }
})

const tierList1 = computed(() => {
  if (documents.value) {
    return documents.value.filter(player => player.tier === 1)
  }
})

const tierList2 = computed(() => {
  if (documents.value) {
    return documents.value.filter(player => player.tier === 2)
  }
})

const tier1 = ref(null);
const tier2 = ref(null);
const adr = ref(null);

function scrollTo(view) {
  const yOffset = -90;
  const element = view;
  const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
  window.scrollTo({top: y, behavior: 'smooth'});
}

function goToPlayer(id) {
  router.push({name: 'Player', params: {id: id}});
  window.scrollTo(0, 0);
}

//admin panel
const isAdmin = ref(false);
const checkUser = () => {
  let user = projectAuth.currentUser;
  const allowedUserUid = [import.meta.env.VITE_MUSE_KEY, import.meta.env.VITE_FROGSTER_KEY]; // UID пользователей

  isAdmin.value = !(!user || !allowedUserUid.includes(user.uid));
}

const editPlayer = (id) => {
  router.push({name: 'EditUser', params: {id: id}});
  window.scrollTo(0, 0);
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

.main__edit {
  color: #ff2323;
  cursor: pointer;
}

.add-player {
  padding-left: 15px;
  padding-right: 15px;
  width: 235px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #C91419;
  background: #fff;
  transition: all 0.2s linear;
  border-radius: 15px;
  margin-top: 64px;
  margin-bottom: 96px;
  cursor: pointer;

  &:hover {
    background: #C91419;
    color: #fff;
  }
}
</style>