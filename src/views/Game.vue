<template>
  <fragment>
    <div class="pure-g headings flex-center" style="align-items: unset;">
      <div class="pure-u-1 pure-u-md-1-2 pure-u-lg-1-2 pure-u-xl-1-2 mr-2">
        <h2>YOU</h2>
        <div class="healthbar">
          <div class="health flex-center"
            :style="{ 'width': getPlayerHealth + '%', 'background-color': getPlayerBarColor }">
            {{getPlayerHealth ? getPlayerHealth : ''}}
          </div>
        </div>
      </div>
      <div class="pure-u-1 pure-u-md-1-2 pure-u-lg-1-2 pure-u-xl-1-2 mb-6 ml-2">
        <h2>MONSTER</h2>
        <div class="healthbar">
          <div class="health flex-center"
            :style="{ 'width': getMonsterHealth + '%', 'background-color': getMonsterBarColor }">
            {{getMonsterHealth ? monsterHealth : ''}}
          </div>
        </div>
      </div>
      <div class="pure-u-1 flex-center section-border" v-if="!gameIsRunning" @click="startGame">
        <button class="pure-button button-success start-game button-xlarge">
          START NEW GAME
        </button>
      </div>

      <div class="pure-u-1 flex-center action-buttons section-border" v-else>
        <button class="pure-button button-danger button-large mb-2" @click="attack('normal')">
          ATTACK
        </button>
        <button class="pure-button button-extra-danger button-large mb-2"
          @click="attack('special')">
          SPECIAL ATTACK
        </button>
        <button class="pure-button button-heal button-large mb-2" @click="heal">
          HEAL
        </button>
        <button class="pure-button button-warning button-large mb-2" @click="giveUp">
          GIVE UP
        </button>
      </div>
      <div class="pure-u-1 section-border logs" v-if="logs.length">
        <div class="log-container" :key="i.toString()" v-for="(log, i) of logs">
          <div :class="['log', { 'player-hit': log.isPlayer, 'monster-hit': !log.isPlayer }]">
            {{log.text}}
          </div>
          <hr />
        </div>
      </div>
    </div>
    <modal v-if="showModal">
      <template #modal-content>
        <p class="modal-heading has-text-centered">
          {{modalMessage}}
        </p>
        <div class="action-buttons">
          <button class="pure-button button-success" @click="startGame">
            Yes! Why not?
          </button>
          <button class="pure-button button-danger" @click="closeModal">
            No. I'm done!
          </button>
        </div>
      </template>
    </modal>
  </fragment>
</template>
<script>
export default {
  name: 'Game',
  metaInfo: {
    title: 'Game',
  },
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      gameIsRunning: false,
      newGame: false,
      modalMessage: '',
      showModal: false,
      logs: [],
    };
  },
  computed: {
    getPlayerHealth() {
      return this.playerHealth > 0 ? this.playerHealth : 0;
    },
    getMonsterHealth() {
      return this.monsterHealth > 0 ? this.monsterHealth : 0;
    },
    getPlayerBarColor() {
      return this.playerHealth > 50 ? 'rgba(0, 255, 0, 1)' : 'red';
    },
    getMonsterBarColor() {
      return this.monsterHealth > 50 ? 'rgba(0, 255, 0, 1)' : 'red';
    },
  },
  watch: {
    gameIsRunning(val) { // eslint-disable-line no-unused-vars
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.logs = [];
    },
  },
  methods: {
    closeModal() {
      this.showModal = false;
      this.modalMessage = '';
    },
    createLog(isPlayer = true, text = '') {
      this.logs.unshift({
        isPlayer,
        text,
      });
    },
    startGame() {
      this.gameIsRunning = !this.gameIsRunning;
      this.newGame = false;
      this.closeModal();
    },
    attack(mode = 'normal') {
      if (mode === 'normal') {
        const damage = this.calculateDamage(3, 10);
        this.monsterHealth -= damage;
        this.createLog(true, `Player hits Monster for ${damage}`);
        if (this.checkWinner()) {
          return;
        }
        this.monsterAttack(5, 15);
      } else if (mode === 'special') {
        const damage = this.calculateDamage(5, 15);
        this.monsterHealth -= damage;
        this.createLog(true, `Player hits Monster for ${damage}`);
        if (this.checkWinner()) {
          return;
        }
        this.monsterAttack(3, 10);
      }
    },
    monsterAttack(min = 3, max = 10) {
      const damage = this.calculateDamage(min, max);
      this.playerHealth -= damage;
      this.createLog(false, `Monster hits player for ${damage}`);
      this.checkWinner();
    },
    heal() {
      if (this.playerHealth < 90) {
        this.playerHealth += 10;
      } else {
        this.playerHealth = 100;
      }
      this.createLog(true, 'Player heals');
      this.monsterAttack();
    },
    giveUp() {
      this.gameIsRunning = false;
    },
    calculateDamage(min = 3, max = 10) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    checkWinner() {
      if (this.monsterHealth <= 0) {
        this.modalMessage = 'You won! New Game?';
        this.showModal = true;
        return true;
      }
      if (this.playerHealth <= 0) {
        this.modalMessage = 'You lost!! New Game?';
        this.showModal = true;
        return true;
      }
      return false;
    },
  },
};
</script>
<style lang="scss" scoped>
.pure-g {
  font-family: 'NotoSans';
  letter-spacing: 0;
}

.pure-g.headings {
  text-align: center;
}

@media screen and (min-width: 568px) {
  .pure-u-md-1-2,
  .pure-u-lg-1-2,
  .pure-u-xl-1-2 {
    width: 48%;
  }
}

@media screen and (max-width: 568px) {
  .mr-2 {
    margin-right: unset;
  }

  .ml-2 {
    margin-left: unset;
  }
}

h2 {
  font-size: 3rem;
}

.action-buttons {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.section-border {
  border: 1px solid #ddd;
  box-shadow: 0 0 0.25rem 0 rgba(0, 0, 0, 0.3);
  padding: 2rem 1.5rem;
  margin: 0 0 3rem 0;
}

.pure-button {
  font-family: 'NotoSansBoldItalic';
}

.pure-button-hover,
.pure-button:focus,
.pure-button:hover {
  background-image: none;
}

.healthbar {
  border: 1px solid #ddd;
  height: 5rem;
}

.health {
  background: rgba(0, 255, 0, 1);
  height: inherit;
  color: #fff;
  font-size: 2.3rem;
  font-family: 'NotoSansBold';
}

.log {
  font-size: 1.5rem;
  font-family: 'NotoSansBoldItalic';
}

.log.monster-hit {
  color: #f00;
  background: #e8a1a1;
}

.log.player-hit {
  color: #0f0;
  background: #bee5b4;
}
</style>
