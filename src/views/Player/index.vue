<template>
  <main class="main">
    <div class="main__wrapper container">
      <div class="player">
        <div class="player__wrapper">
          <!--  Двойной блок  -->
          <div class="player__blocks">
            <div class="player__avatar">
              <img class="player__image" src="https://placehold.co/140x140" :alt="`${name} avatar`"/>
              <div class="player__nickname">{{ name }}</div>
            </div>
            <div class="player__stats">
              <div class="player__title">Основная статистика</div>
              <div class="player__content">
                <div class="player__data">
                  <div class="player__key">TIER</div>
                  <div class="player__value">1</div>
                </div>
                <div class="player__data">
                  <div class="player__key">МЕСТО</div>
                  <div class="player__value">1</div>
                </div>
                <div class="player__data">
                  <div class="player__key">РАУНДЫ</div>
                  <div class="player__value">745</div>
                </div>
                <div class="player__data">
                  <div class="player__key">K/D</div>
                  <div class="player__value">1.23</div>
                </div>
                <div class="player__data">
                  <div class="player__key">ADR</div>
                  <div class="player__value">123</div>
                </div>
                <div class="player__data">
                  <div class="player__key">РЕЙТИНГ</div>
                  <div class="player__value">1.16</div>
                </div>
              </div>
            </div>
          </div>
          <!--  FACE IT  -->
          <div class="player__block">
            <div class="player__title">FACE IT</div>
            <div class="player__content">
              <div class="player__data">
                <div class="player__key">TIER</div>
                <div class="player__value">1</div>
              </div>
              <div class="player__data">
                <div class="player__key">МЕСТО</div>
                <div class="player__value">1</div>
              </div>
              <div class="player__data">
                <div class="player__key">РАУНДЫ</div>
                <div class="player__value">745</div>
              </div>
              <div class="player__data">
                <div class="player__key">K/D</div>
                <div class="player__value">1.23</div>
              </div>
              <div class="player__data">
                <div class="player__key">ADR</div>
                <div class="player__value">123</div>
              </div>
              <div class="player__data">
                <div class="player__key">РЕЙТИНГ</div>
                <div class="player__value">1.16</div>
              </div>
            </div>
          </div>
          <!--  STEAM  -->
          <div class="player__block">
            <div class="player__title">STEAM</div>
            <div class="player__content">
              <div class="player__data">
                <div class="player__key">TIER</div>
                <div class="player__value">1</div>
              </div>
              <div class="player__data">
                <div class="player__key">МЕСТО</div>
                <div class="player__value">1</div>
              </div>
              <div class="player__data">
                <div class="player__key">РАУНДЫ</div>
                <div class="player__value">745</div>
              </div>
              <div class="player__data">
                <div class="player__key">K/D</div>
                <div class="player__value">1.23</div>
              </div>
              <div class="player__data">
                <div class="player__key">ADR</div>
                <div class="player__value">123</div>
              </div>
              <div class="player__data">
                <div class="player__key">РЕЙТИНГ</div>
                <div class="player__value">1.16</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>

export default {
  name: 'player',
  props: ['name'],
}
</script>

<style lang="scss" scoped>
.main {
  background-color: #161616;
  min-height: 100vh;
}

.player {
  padding-top: calc(96px + 83px);
  padding-bottom: 96px;

  @media (max-width: 768px) {
    padding-top: calc(40px + 60px);
  }
}

.player__wrapper {
  border: 1px solid #323232;
  border-radius: 22px;
  padding: 24px;
}

.player__blocks {
  display: flex;
  column-gap: 24px;
  row-gap: 24px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
}

.player__avatar {
  flex: 0 0 30%;
  border-radius: 17px;
  background-color: #323232;
  padding-top: 28px;
  padding-bottom: 28px;
}

.player__image {
  display: block;
  width: 100%;
  max-width: 140px;
  margin-bottom: 28px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 5px;
}

.player__nickname {
  text-align: center;
  font-size: 24px;
  font-weight: 500;
}

.player__stats {
  flex: 1 1 auto;
  border-radius: 17px;
  background-color: #323232;
  padding: 28px;
}

.player__title {
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 17px;
}

.player__content {
  display: flex;
  flex-wrap: wrap;
  row-gap: 40px;
  column-gap: 50px;
}

.player__data {
  //flex: 1 1 0;
}

.player__key {
  font-weight: 300;
  font-size: 16px;
  margin-bottom: 8px;
}

.player__value {
  font-size: 24px;
  font-weight: 500;
}

.player__block {
  border-radius: 17px;
  background-color: #323232;
  padding: 28px;

  &:not(:last-child) {
    margin-bottom: 24px;
  }
}
</style>