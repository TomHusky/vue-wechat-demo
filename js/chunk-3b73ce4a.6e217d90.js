(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3b73ce4a"],{"389b":function(t,i,s){"use strict";s.r(i);var n=function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"game"},[s("div",{directives:[{name:"drag",rawName:"v-drag"}],staticClass:"game-head"}),s("canvas",{attrs:{id:"chess",width:"450px",height:"450px"},on:{click:t.dot}})])},o=[],r=(s("cb29"),{data:function(){return{chessBoard:[],wins:[],me:!0,over:!1,count:0,myWin:[],computerWin:[],paint:null}},mounted:function(){this.initPaint(),this.initChessBoard(),this.initWins(),this.intBoard(),this.writeCenterDot()},methods:{initPaint:function(){var t=document.getElementById("chess");this.paint=t.getContext("2d");var i=this.paint;i.strokeStyle="#0C0C0C",i.moveTo(0,449),i.lineTo(0,0),i.moveTo(0,0),i.lineTo(449,0),i.moveTo(225,226),i.lineTo(225,226),i.stroke()},initChessBoard:function(){for(var t=0;t<15;t++){this.chessBoard[t]=[];for(var i=0;i<15;i++)this.chessBoard[t][i]=0}},intBoard:function(){for(var t=0;t<15;t++)this.paint.moveTo(15+30*t,15),this.paint.lineTo(15+30*t,435),this.paint.moveTo(15,15+30*t),this.paint.lineTo(435,15+30*t),this.paint.stroke()},initWins:function(){for(var t=0;t<15;t++){this.wins[t]=[];for(var i=0;i<15;i++)this.wins[t][i]=[]}this.countNumWins();for(var s=0;s<this.count;s++)this.myWin[s]=0,this.computerWin[s]=0},oneStep:function(t,i,s){this.paint.beginPath(),this.paint.arc(15+30*t,15+30*i,13,0,2*Math.PI),this.paint.closePath();var n=this.paint.createRadialGradient(15+30*t+2,15+30*i,13,15+30*t,15+30*i,5);s?(n.addColorStop(0,"#0A0A0A"),n.addColorStop(1,"#636766")):(n.addColorStop(0,"#D1D1D1"),n.addColorStop(1,"#F9F9F9")),this.paint.fillStyle=n,this.paint.fill()},writeCenterDot:function(){this.paint.beginPath(),this.paint.arc(225,225,3,0,2*Math.PI),this.paint.closePath(),this.paint.fillStyle="red",this.paint.fill()},dot:function(t){if(!this.over&&this.me){var i=t.offsetX,s=t.offsetY,n=Math.floor(i/30),o=Math.floor(s/30);if(0==this.chessBoard[n][o]){this.oneStep(n,o,this.me),this.chessBoard[n][o]=1;for(var r=0;r<this.count;r++)this.wins[n][o][r]&&(this.myWin[r]++,this.computerWin[r]=-1,5==this.myWin[r]&&(window.alert("你赢了"),this.over=!0));this.over||(this.me=!this.me,this.AI())}}},countNumWins:function(){for(var t=0;t<15;t++)for(var i=0;i<11;i++){for(var s=0;s<5;s++)this.wins[t][i+s][this.count]=!0;this.count++}for(var n=0;n<15;n++)for(var o=0;o<11;o++){for(var r=0;r<5;r++)this.wins[o+r][n][this.count]=!0;this.count++}for(var e=0;e<11;e++)for(var a=0;a<11;a++){for(var h=0;h<5;h++)this.wins[e+h][a+h][this.count]=!0;this.count++}for(var c=0;c<11;c++)for(var f=14;f>3;f--){for(var u=0;u<5;u++)this.wins[c+u][f-u][this.count]=!0;this.count++}},AI:function(){for(var t=[],i=[],s=0,n=0,o=0,r=0;r<15;r++){t[r]=[],i[r]=[];for(var e=0;e<15;e++)t[r][e]=0,i[r][e]=0}for(var a=0;a<15;a++)for(var h=0;h<15;h++)if(0==this.chessBoard[a][h]){for(var c=0;c<this.count;c++)this.wins[a][h][c]&&(1==this.myWin[c]?t[a][h]+=200:2==this.myWin[c]?t[a][h]+=400:3==this.myWin[c]?t[a][h]+=1e3:4==this.myWin[c]&&(t[a][h]+=1e4),1==this.computerWin[c]?i[a][h]+=210:2==this.computerWin[c]?i[a][h]+=410:3==this.computerWin[c]?i[a][h]+=1100:4==this.computerWin[c]&&(i[a][h]+=2e4));t[a][h]>s?(s=t[a][h],n=a,o=h):t[a][h]==s&&i[a][h]>i[n][o]&&(n=a,o=h),i[a][h]>s?(s=i[a][h],n=a,o=h):i[a][h]==s&&t[a][h]>t[n][o]&&(n=a,o=h)}this.oneStep(n,o,!1),this.chessBoard[n][o]=2;for(var f=0;f<this.count;f++)this.wins[n][o][f]&&(this.computerWin[f]++,this.myWin[f]=-1,5==this.computerWin[f]&&(this.over=!0,window.alert("计算机赢了")));this.over||(this.me=!this.me)}}}),e=r,a=(s("e6b4"),s("2877")),h=Object(a["a"])(e,n,o,!1,null,"2d22febc",null);i["default"]=h.exports},ab04:function(t,i,s){},cb29:function(t,i,s){var n=s("23e7"),o=s("81d5"),r=s("44d2");n({target:"Array",proto:!0},{fill:o}),r("fill")},e6b4:function(t,i,s){"use strict";s("ab04")}}]);