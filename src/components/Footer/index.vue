<template>
  <footer class="footer">
    <div class="footer__wrapper container">
      <div class="footer__top">
        <div class="footer__logo">
          <a href="/">
            CS2 BO3/BO5
          </a>
        </div>
        <nav class="footer__nav">
          <ul class="footer__list">
            <li class="footer__item">
              <a class="footer__link" href="/">Статистика</a>
            </li>
            <li class="footer__item">
              <a class="footer__link" href="">Собрать состав</a>
            </li>
          </ul>
        </nav>
      </div>
      <div class="footer__bottom">
        <div class="footer__text">{{ getYear }}</div>
        <div class="footer__text">All right reserved</div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import {computed} from "vue";

const getYear = computed(() => {
  const dateObj = new Date();
  return dateObj.getFullYear();
});
</script>

<style lang="scss" scoped>
.footer {
  background: #323232;
}

.footer__wrapper {
  padding-top: 25px;
  padding-bottom: 25px;
  display: flex;
  flex-direction: column;
  row-gap: 60px;
}

.footer__top {
  display: flex;
  align-items: baseline;
  column-gap: 96px;

  @media (max-width: 768px) {
    column-gap: 42px;
  }

  @media (max-width: 675px) {
    column-gap: 24px;
  }
}

.footer__logo {
  font-size: 24px;
  font-weight: 600;

  a:hover {
    color: #ffffff;
  }

  @media (max-width: 768px) {
    font-size: 18px;
  }
}

.footer__list {
  display: flex;
  column-gap: 67px;
  align-items: baseline;

  @media (max-width: 768px) {
    column-gap: 32px;
  }

  @media (max-width: 675px) {
    column-gap: 24px;
  }
}

.footer__link {
  font-weight: 500;
}

.footer__text {
  font-weight: 500;
  font-size: 15px;
}
</style>