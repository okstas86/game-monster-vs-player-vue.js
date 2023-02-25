function getRandomValue(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
  data() {
    return {
      healthPlayer: 100,
      healthMonster: 100,
      currentRound: 0,
      winner: null,
      logMesseges: [],
    };
  },
  watch: {
    healthPlayer(value) {
      if (value <= 0 && this.healthMonster <= 0) {
        this.winner = "Draw";
      } else if (value <= 0) {
        this.winner = "monster";
      }
    },
    healthMonster(value) {
      if (value <= 0 && this.healthPlayer <= 0) {
        this.winner = "Draw";
      } else if (value <= 0) {
        this.winner = "player";
      }
    },
  },
  computed: {
    monsterBarStyles() {
      if (this.healthMonster < 0) {
        return { width: "0%" };
      }
      return { width: this.healthMonster + "%" };
    },
    playerBarStyles() {
      if (this.healthPlayer < 0) {
        return { width: "0%" };
      }
      return { width: this.healthPlayer + "%" };
    },
    useSpecialAttack() {
      return this.currentRound % 3 !== 0;
    },
  },
  methods: {
    startGame() {
      this.healthPlayer = 100;
      this.healthMonster = 100;
      this.currentRound = 0;
      this.winner = null;
      this.logMessege = [];
    },
    attackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(12, 5);
      this.healthMonster -= attackValue;
      this.addLogMessege("player", "attack ", attackValue);
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomValue(25, 10);
      this.healthPlayer -= attackValue;
      this.addLogMessege("monster", "attack ", attackValue);
    },
    specialAttack() {
      this.currentRound++;
      const attackValue = getRandomValue(25, 10);
      this.healthMonster -= attackValue;
      this.addLogMessege("player", "attack ", attackValue);
      this.attackPlayer();
    },
    heal() {
      this.currentRound++;
      const healValue = getRandomValue(20, 10);
      if (this.healthPlayer + healValue > 100) {
        this.healthPlayer = 100;
      } else {
        this.healthPlayer += healValue;
      }
      this.addLogMessege("player", "heal", healValue);
      this.attackPlayer();
    },
    surrender() {
      this.winner = "monster";
    },
    addLogMessege(who, what, value) {
      this.logMesseges.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
});
app.mount("#game");
