<template>
  <header class="header">
    <div class="header__wrapper container">
      <div class="logo">
        <a href="/">
          CS2 BO3/BO5
        </a>
      </div>
      <nav class="nav">
        <ul class="nav__list">
          <li class="nav__item">
            <a class="nav__link" href="/">СТАТИСТИКА</a>
          </li>
          <li class="nav__item">
            <a class="nav__link" href="">СОБРАТЬ СОСТАВ</a>
          </li>
        </ul>
      </nav>
      <button class="login-button">
        Log in
      </button>
      <nav class="burger" role="navigation">
        <div class="burger__wrapper">
          <input type="checkbox"/>
          <span></span>
          <span></span>
          <span></span>
          <ul class="burger__menu">
            <li class="nav__item">
              <a class="nav__link" href="/">СТАТИСТИКА</a>
            </li>
            <li class="nav__item">
              <a class="nav__link" href="">СОБРАТЬ СОСТАВ</a>
            </li>
            <li class="nav__item">
              <button class="login-button">
                Log in
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  background-color: #323232;
  position: fixed;
  width: 100vw;
  z-index: 999;
  -webkit-box-shadow: 0px 6px 6px -1px rgba(0,0,0,0.1);
  -moz-box-shadow: 0px 6px 6px -1px rgba(0,0,0,0.1);
  box-shadow: 0px 6px 6px -1px rgba(0,0,0,0.1);
}

.header__wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 22px;
  padding-bottom: 22px;

  @media (max-width: 768px) {
    padding-top: 13px;
    padding-bottom: 13px;
  }
}

.logo {
  color: #fff;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 32px;
  line-height: normal;

  a:hover {
    color: #ffffff;
  }

  @media (max-width: 768px) {
    font-size: 28px;
  }
}

.nav {
  @media (max-width: 768px) {
    display: none;
  }
}

.nav__list {
  display: flex;
  column-gap: 50px;
}

.nav__link {
  font-weight: 500;
}

.login-button {
  width: 85px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: #C91419;
  transition: all .2s linear;
  border-radius: 15px;

  &:hover {
    background: #fff;
    color: #C91419;
  }

  @media (max-width: 768px) {
    display: none;
  }
}

// burger
.burger {
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
}

.burger__wrapper {
  display: block;
  position: relative;
  z-index: 1;
  -webkit-user-select: none;
  user-select: none;
}

.burger__wrapper a {
  text-decoration: none;
  color: #232323;
  transition: color 0.3s ease;
}

.burger__wrapper a:hover {
  color: tomato;
}

.burger__wrapper input {
  display: block;
  width: 40px;
  height: 32px;
  position: absolute;
  top: -7px;
  left: -5px;
  cursor: pointer;
  opacity: 0; /* hide this */
  z-index: 2; /* and place it over the hamburger */
  -webkit-touch-callout: none;
}

.burger__wrapper span {
  display: block;
  width: 33px;
  height: 4px;
  margin-bottom: 5px;
  position: relative;
  background: #cdcdcd;
  border-radius: 3px;
  z-index: 1;
  transform-origin: 4px 0px;
  transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1.0),
  background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1.0),
  opacity 0.55s ease;
}

.burger__wrapper span:first-child {
  transform-origin: 0% 0%;
}

.burger__wrapper span:nth-last-child(2) {
  transform-origin: 0% 100%;
  margin-bottom: 0;
}

.burger__wrapper input:checked ~ span {
  opacity: 1;
  transform: rotate(45deg) translate(-2px, -1px);
}

.burger__wrapper input:checked ~ span:nth-last-child(3) {
  opacity: 0;
  transform: rotate(0deg) scale(0.2, 0.2);
}

.burger__wrapper input:checked ~ span:nth-last-child(2) {
  transform: rotate(-45deg) translate(0, -1px);
}

.burger__menu {
  position: fixed;
  width: 50vw;
  padding-top: 25px;
  padding-left: 25px;
  padding-right: 25px;
  background: #ededed;
  list-style-type: none;
  -webkit-font-smoothing: antialiased;
  transform-origin: 0% 0%;
  transform: translate(100vw, 0);
  transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1.0);
  top: 60px;
  right: 0;
  height: 100vh;
}

.burger__menu li {
  text-align: right;
  padding: 10px 0;
  font-size: 22px;
}

.burger__wrapper input:checked ~ ul {
  transform: none;
}

.nav__item {
  .login-button {
    display: block;
    margin-left: auto;
  }
}
</style>