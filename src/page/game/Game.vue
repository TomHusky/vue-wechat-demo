<template>
  <div class="game">
    <div class="game-head" v-drag></div>
    <canvas @click="dot" id="chess" width="450px" height="450px"></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chessBoard: [],
      wins: [],
      //控制旗子颜色
      me: true,
      //是否结束
      over: false,
      count: 0,
      //统计我方和计算机反的赢法
      myWin: [],
      computerWin: [],
      paint: null,
    };
  },
  mounted() {
    this.initPaint();
    this.initChessBoard();
    this.initWins();
    //画棋盘
    this.intBoard();
    //画中点
    this.writeCenterDot();
  },
  methods: {
    initPaint() {
      let chess = document.getElementById("chess");
      this.paint = chess.getContext("2d");
      let paint = this.paint;
      paint.strokeStyle = "#0C0C0C";
      paint.moveTo(0, 449);
      paint.lineTo(0, 0);

      paint.moveTo(0, 0);
      paint.lineTo(449, 0);

      paint.moveTo(15 + 7 * 30, 15 + 7 * 30 + 1);
      paint.lineTo(15 + 7 * 30, 15 + 7 * 30 + 1);
      paint.stroke();
    },
    initChessBoard() {
      //初始化落子点，默认没有落子
      for (let i = 0; i < 15; i++) {
        this.chessBoard[i] = [];
        for (let j = 0; j < 15; j++) {
          this.chessBoard[i][j] = 0;
        }
      }
    },
    intBoard() {
      //画棋盘
      for (let i = 0; i < 15; i++) {
        this.paint.moveTo(15 + i * 30, 15);
        this.paint.lineTo(15 + i * 30, 435);

        this.paint.moveTo(15, 15 + i * 30);
        this.paint.lineTo(435, 15 + i * 30);
        this.paint.stroke();
      }
    },
    initWins() {
      //初始化赢法数组
      for (let i = 0; i < 15; i++) {
        this.wins[i] = [];
        for (let j = 0; j < 15; j++) {
          this.wins[i][j] = [];
        }
      }
      this.countNumWins();
      //初始化赢法
      for (let i = 0; i < this.count; i++) {
        this.myWin[i] = 0;
        this.computerWin[i] = 0;
      }
    },
    //画棋子
    oneStep(i, j, me) {
      this.paint.beginPath();
      this.paint.arc(15 + i * 30, 15 + j * 30, 13, 0, 2 * Math.PI);
      this.paint.closePath();
      let gradient = this.paint.createRadialGradient(
        15 + i * 30 + 2,
        15 + j * 30,
        13,
        15 + i * 30,
        15 + j * 30,
        5
      );
      if (me) {
        gradient.addColorStop(0, "#0A0A0A");
        gradient.addColorStop(1, "#636766");
      } else {
        gradient.addColorStop(0, "#D1D1D1");
        gradient.addColorStop(1, "#F9F9F9");
      }
      this.paint.fillStyle = gradient;
      this.paint.fill();
    },
    //画中点
    writeCenterDot() {
      this.paint.beginPath();
      this.paint.arc(15 + 7 * 30, 15 + 7 * 30, 3, 0, 2 * Math.PI);
      this.paint.closePath();
      this.paint.fillStyle = "red";
      this.paint.fill();
    },
    dot(e) {
      if (this.over) {
        return;
      }
      if (!this.me) {
        return;
      }
      let x = e.offsetX;
      let y = e.offsetY;
      let i = Math.floor(x / 30);
      let j = Math.floor(y / 30);
      if (this.chessBoard[i][j] == 0) {
        this.oneStep(i, j, this.me);
        this.chessBoard[i][j] = 1;
      } else {
        return;
      }
      for (let k = 0; k < this.count; k++) {
        if (this.wins[i][j][k]) {
          this.myWin[k]++; //我方该中赢法更近一步
          this.computerWin[k] = -1; //计算机该种赢法不存在了
          if (this.myWin[k] == 5) {
            window.alert("你赢了");
            this.over = true;
          }
        }
      }
      if (!this.over) {
        this.me = !this.me;
        this.AI();
      }
    },
    countNumWins() {
      //横线的赢法
      for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 11; j++) {
          for (let k = 0; k < 5; k++) {
            this.wins[i][j + k][this.count] = true;
          }
          this.count++;
        }
      }
      //竖线的赢法
      for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 11; j++) {
          for (let k = 0; k < 5; k++) {
            this.wins[j + k][i][this.count] = true;
          }
          this.count++;
        }
      }
      //正斜线的赢法
      for (let i = 0; i < 11; i++) {
        for (let j = 0; j < 11; j++) {
          for (let k = 0; k < 5; k++) {
            this.wins[i + k][j + k][this.count] = true;
          }
          this.count++;
        }
      }
      //反斜线的赢法
      for (let i = 0; i < 11; i++) {
        for (let j = 14; j > 3; j--) {
          for (let k = 0; k < 5; k++) {
            this.wins[i + k][j - k][this.count] = true;
          }
          this.count++;
        }
      }
    },
    AI() {
      let myScore = [];
      let computerScore = [];
      let max = 0;
      let u = 0;
      let v = 0;
      for (let i = 0; i < 15; i++) {
        myScore[i] = [];
        computerScore[i] = [];
        for (let j = 0; j < 15; j++) {
          myScore[i][j] = 0;
          computerScore[i][j] = 0;
        }
      }
      for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 15; j++) {
          if (this.chessBoard[i][j] == 0) {
            for (let k = 0; k < this.count; k++) {
              if (this.wins[i][j][k]) {
                if (this.myWin[k] == 1) {
                  myScore[i][j] += 200;
                } else if (this.myWin[k] == 2) {
                  myScore[i][j] += 400;
                } else if (this.myWin[k] == 3) {
                  myScore[i][j] += 1000;
                } else if (this.myWin[k] == 4) {
                  myScore[i][j] += 10000;
                }

                if (this.computerWin[k] == 1) {
                  computerScore[i][j] += 210;
                } else if (this.computerWin[k] == 2) {
                  computerScore[i][j] += 410;
                } else if (this.computerWin[k] == 3) {
                  computerScore[i][j] += 1100;
                } else if (this.computerWin[k] == 4) {
                  computerScore[i][j] += 20000;
                }
              }
            }
            if (myScore[i][j] > max) {
              max = myScore[i][j];
              u = i;
              v = j;
            } else if (myScore[i][j] == max) {
              if (computerScore[i][j] > computerScore[u][v]) {
                u = i;
                v = j;
              }
            }
            if (computerScore[i][j] > max) {
              max = computerScore[i][j];
              u = i;
              v = j;
            } else if (computerScore[i][j] == max) {
              if (myScore[i][j] > myScore[u][v]) {
                u = i;
                v = j;
              }
            }
          }
        }
      }
      this.oneStep(u, v, false);
      this.chessBoard[u][v] = 2;

      for (let k = 0; k < this.count; k++) {
        if (this.wins[u][v][k]) {
          this.computerWin[k]++; //赢法更近一步
          this.myWin[k] = -1; //我方该种赢法不存在了
          if (this.computerWin[k] == 5) {
            this.over = true;
            window.alert("计算机赢了");
          }
        }
      }
      if (!this.over) {
        this.me = !this.me;
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.game {
  width: 100%;
  height: 100%;
  background: #E6E6E6;
  overflow-y: scroll;

  .game-head {
    height: 60px;
    border-bottom: 1px solid #deab8a;
  }
}

canvas {
  display: block;
  margin: 20px auto;
  background-color: #d39d45;
  box-shadow: 1px 1px 2px #888888;
}
</style>