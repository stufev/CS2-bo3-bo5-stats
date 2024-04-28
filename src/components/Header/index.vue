<template>
  <header class="header">
    <div class="header__wrapper container">
      <div class="logo">CS2 BO3/BO5</div>
      <nav class="nav">
        <ul class="nav__list">
          <li class="nav__item">
            <a class="nav__link" href="">СТАТИСТИКА</a>
          </li>
          <li class="nav__item">
            <a class="nav__link" href="">СОБРАТЬ СОСТАВ</a>
          </li>
        </ul>
      </nav>
      <button class="login-button">
        Log in
      </button>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  background-color: #323232;
}

.header__wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  color: #fff;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 32px;
  line-height: normal;
}

.nav__list {
  display: flex;
  column-gap: 50px;
}

.nav__link {


}
</style>