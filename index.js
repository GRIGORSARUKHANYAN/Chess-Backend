const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { verify } = require("crypto");
let globalColor="black"
// let activeColor="white"
let history=[]
let allPlayers =[]
// vertically:^^^^^,horizontally:>>>>>>
let promotionBishop={white:false,black:false}
globaklcheck=false
let board=
[
[
  {color:"black",vertically:0,horizontally:0,pieces:"rook",isTouched:false,positionColor:"white"},
  {color:"black",vertically:0,horizontally:1,pieces:"knight",isTouched:false,positionColor:"black"},
  {color:"black",vertically:0,horizontally:2,pieces:"bishop",isTouched:false,positionColor:"white"},
  {color:"black",vertically:0,horizontally:3,pieces:"queen",isTouched:false,positionColor:"black"},
  {color:"black",vertically:0,horizontally:4,pieces:"king",isTouched:false,positionColor:"white"},
  {color:"black",vertically:0,horizontally:5,pieces:"bishop",isTouched:false,positionColor:"black"},
  {color:"black",vertically:0,horizontally:6,pieces:"knight",isTouched:false,positionColor:"white"},
  {color:"black",vertically:0,horizontally:7,pieces:"rook",isTouched:false,positionColor:"black"},
 ],
 [
  {color:"black",vertically:1,horizontally:0,pieces:"pawn",isTouched:false,positionColor:"black"},
  {color:"black",vertically:1,horizontally:1,pieces:"pawn",isTouched:false,positionColor:"white"},
  {color:"black",vertically:1,horizontally:2,pieces:"pawn",isTouched:false,positionColor:"black"},
  {color:"black",vertically:1,horizontally:3,pieces:"pawn",isTouched:false,positionColor:"white"},
  {color:"black",vertically:1,horizontally:4,pieces:"pawn",isTouched:false,positionColor:"black"},
  {color:"black",vertically:1,horizontally:5,pieces:"pawn",isTouched:false,positionColor:"white"},
  {color:"black",vertically:1,horizontally:6,pieces:"pawn",isTouched:false,positionColor:"black"},
  {color:"black",vertically:1,horizontally:7,pieces:"pawn",isTouched:false,positionColor:"white"},
 ],
 [
  {color:null,vertically:2,horizontally:0,pieces:null,isTouched:false,positionColor:"white"},
  {color:null,vertically:2,horizontally:1,pieces:null,isTouched:false,positionColor:"black"},
  {color:null,vertically:2,horizontally:2,pieces:null,isTouched:false,positionColor:"white"},
  {color:null,vertically:2,horizontally:3,pieces:null,isTouched:false,positionColor:"black"},
  {color:null,vertically:2,horizontally:4,pieces:null,isTouched:false,positionColor:"white"},
  {color:null,vertically:2,horizontally:5,pieces:null,isTouched:false,positionColor:"black"},
  {color:null,vertically:2,horizontally:6,pieces:null,isTouched:false,positionColor:"white"},
  {color:null,vertically:2,horizontally:7,pieces:null,isTouched:false,positionColor:"black"},
 ],
 [
  {color:null,vertically:3,horizontally:0,pieces:null,isTouched:false,positionColor:"black"},
  {color:null,vertically:3,horizontally:1,pieces:null,isTouched:false,positionColor:"white"},
  {color:null,vertically:3,horizontally:2,pieces:null,isTouched:false,positionColor:"black"},
  {color:null,vertically:3,horizontally:3,pieces:null,isTouched:false,positionColor:"white"},
  {color:null,vertically:3,horizontally:4,pieces:null,isTouched:false,positionColor:"black"},
  {color:null,vertically:3,horizontally:5,pieces:null,isTouched:false,positionColor:"white"},
  {color:null,vertically:3,horizontally:6,pieces:null,isTouched:false,positionColor:"black"},
  {color:null,vertically:3,horizontally:7,pieces:null,isTouched:false,positionColor:"white"},
 ],
 [
  {color:null,vertically:4,horizontally:0,pieces:null,isTouched:false,positionColor:"white"},
  {color:null,vertically:4,horizontally:1,pieces:null,isTouched:false,positionColor:"black"},
  {color:null,vertically:4,horizontally:2,pieces:null,isTouched:false,positionColor:"white"},
  {color:null,vertically:4,horizontally:3,pieces:null,isTouched:false,positionColor:"black"},
  {color:null,vertically:4,horizontally:4,pieces:null,isTouched:false,positionColor:"white"},
  {color:null,vertically:4,horizontally:5,pieces:null,isTouched:false,positionColor:"black"},
  {color:null,vertically:4,horizontally:6,pieces:null,isTouched:false,positionColor:"white"},
  {color:null,vertically:4,horizontally:7,pieces:null,isTouched:false,positionColor:"black"},
 ],
 [
  {color:null,vertically:5,horizontally:0,pieces:null,isTouched:false,positionColor:"black"},
  {color:null,vertically:5,horizontally:1,pieces:null,isTouched:false,positionColor:"white"},
  {color:null,vertically:5,horizontally:2,pieces:null,isTouched:false,positionColor:"black"},
  {color:null,vertically:5,horizontally:3,pieces:null,isTouched:false,positionColor:"white"},
  {color:null,vertically:5,horizontally:4,pieces:null,isTouched:false,positionColor:"black"},
  {color:null,vertically:5,horizontally:5,pieces:null,isTouched:false,positionColor:"white"},
  {color:null,vertically:5,horizontally:6,pieces:null,isTouched:false,positionColor:"black"},
  {color:null,vertically:5,horizontally:7,pieces:null,isTouched:false,positionColor:"white"},
 ],
 [
  {color:"white",vertically:6,horizontally:0,pieces:"pawn",isTouched:false,positionColor:"white"},
  {color:"white",vertically:6,horizontally:1,pieces:"pawn",isTouched:false,positionColor:"black"},
  {color:"white",vertically:6,horizontally:2,pieces:"pawn",isTouched:false,positionColor:"white"},
  {color:"white",vertically:6,horizontally:3,pieces:"pawn",isTouched:false,positionColor:"black"},
  {color:"white",vertically:6,horizontally:4,pieces:"pawn",isTouched:false,positionColor:"white"},
  {color:"white",vertically:6,horizontally:5,pieces:"pawn",isTouched:false,positionColor:"black"},
  {color:"white",vertically:6,horizontally:6,pieces:"pawn",isTouched:false,positionColor:"white"},
  {color:"white",vertically:6,horizontally:7,pieces:"pawn",isTouched:false,positionColor:"black"},
 ],
 [
  {color:"white",vertically:7,horizontally:0,pieces:"rook",isTouched:false,positionColor:"black"},
  {color:"white",vertically:7,horizontally:1,pieces:"knight",isTouched:false,positionColor:"white"},
  {color:"white",vertically:7,horizontally:2,pieces:"bishop",isTouched:false,positionColor:"black"},
  {color:"white",vertically:7,horizontally:3,pieces:"queen",isTouched:false,positionColor:"white"},
  {color:"white",vertically:7,horizontally:4,pieces:"king",isTouched:false,positionColor:"black"},
  {color:"white",vertically:7,horizontally:5,pieces:"bishop",isTouched:false,positionColor:"white"},
  {color:"white",vertically:7,horizontally:6,pieces:"knight",isTouched:false,positionColor:"black"},
  {color:"white",vertically:7,horizontally:7,pieces:"rook",isTouched:false,positionColor:"white"},
 ],
]
// pawn  unexpected
let  enPassant={black:{vertically:null,horizontally:null},white:{vertically:7,horizontally:0}}
let kingsPossition = {black:{vertically:0,horizontally:4,check:false},white:{vertically:7,horizontally:4,check:false}}
let figures={black:{pawn:8,rook:2,knight:2,bishop:2,queen:1},white:{pawn:8,rook:2,knight:2,bishop:2,queen:1}}
// let kingsPossitionFake = {black:{vertically:0,horizontally:4,check:false},white:{vertically:7,horizontally:4,check:false}}

// let datas = {
//   from:{vertically:1,horizontally:0},
//   to:{vertically:1,horizontally:0}
// }
function squareColor(v, h) {
  let result = 'black';

  if (v % 2 === 0) {
    result = 'white';
    if (h % 2 === 1) {
      result = 'black';
    }
  } else {
    if (h % 2 === 1) {
      result = 'white';
    }
  }

  return result;
}



function checkMate(board,thisColor) {
  for (let v = 0; v < 8; v++) {
    for (let h = 0; h <8; h++) {
      if (board[v][h].color==thisColor) {
       let toArray= allowSteps({from:{vertically:v,horizontally:h}},thisColor)

        if (!toArray.length) {
          continue
        }
       let mate=allowedArray(board,{vertically:v,horizontally:h},toArray,thisColor)
       if (mate.length) {
        return false
       }
       
      }
      
    }
    
  }
  return true
}

function drawDeadPosition(figures) {
if (figures.white.pawn || figures.black.pawn || figures.black.queen ||figures.white.queen || figures.white.rook || figures.black.rook) {
  return false
}
if ((figures.white.knight && figures.white.bishop) || (figures.white.bishop>1 && promotionBishop.white ==false ) || (figures.black.bishop>1 && promotionBishop.black ==false ) ) {
  return false
}
return true
}
function draw50MoveRule(arrHistory) {
if (arrHistory.length<50) {
  return false
}
for (let i = arrHistory.length-50; i < arrHistory.length; i++) {
if (arrHistory[i].take==true) {
  return false
}
}
return true
}


function draw3foldRepetition(arrHistory) {
  for (let i = arrHistory.length-8; i < arrHistory.length-2; i++) {
    if ((arrHistory[i].from.vertically!==arrHistory[i+2].to.vertically||arrHistory[i].from.horizontally!==arrHistory[i+2].to.horizontally)) {
    return false
  }
  if ((arrHistory[i].to.vertically!==arrHistory[i+2].from.vertically||arrHistory[i].to.horizontally!==arrHistory[i+2].from.horizontally)) {
    return false
  }

}
return true
}


function allowedArray(board,from,toArray,thisColor) {
let result=[]
let isKing=false
let forbid=false
if (board[from.vertically][from.horizontally].pieces=="king") {
  isKing=true
}
if (!toArray||!toArray.length) {
  return []
}
for (let i = 0; i < toArray.length; i++) {
let data = {
  from:from,
  to:{vertically:toArray[i].vertically,horizontally:toArray[i].horizontally}
}
let step1 =step(data,board,true)
if (isKing) {
  if (from.horizontally-toArray[i].horizontally>1 && !check(board,{vertically:from.vertically,horizontally:from.horizontally },thisColor)) {
    if ( !check(board,{vertically:from.vertically,horizontally:from.horizontally -1},thisColor)) {

      if (!check(board,{vertically:from.vertically,horizontally:from.horizontally -2},thisColor)) {
        result.push(toArray[i])
      } 
    }
  }
  if (from.horizontally-toArray[i].horizontally<-1 && !check(board,{vertically:from.vertically,horizontally:from.horizontally },thisColor)) {
    if ( !check(board,{vertically:from.vertically,horizontally:from.horizontally +1},thisColor)) {
      if (!check(board,{vertically:from.vertically,horizontally:from.horizontally +2},thisColor)) {
        result.push(toArray[i])
      } 
    }
  }

  if (Math.abs(from.horizontally-toArray[i].horizontally)==1||Math.abs(from.horizontally-toArray[i].horizontally)==0) {
    if (!check(step1.board,{vertically:step1.kingsPossitionFake[thisColor].vertically,horizontally:step1.kingsPossitionFake[thisColor].horizontally},thisColor)) {
      result.push(toArray[i])
    }  
  }
}else{
  
  if (!check(step1.board,{vertically:step1.kingsPossitionFake[thisColor].vertically,horizontally:step1.kingsPossitionFake[thisColor].horizontally},thisColor)) {
    result.push(toArray[i])
  }  
}




}
return result
}






// board, stugvox tagavori position,tagavori guyn
function check(board,data,activeColor) {
  
  // data={verticly,horizontally}
  // let board =JSON.parse(JSON.stringify(experimentalBoard));
  const rookStep = allowRook(board,data,activeColor)  
  for (let i = 0; i < rookStep.length; i++) {
    if (board[rookStep[i].vertically][rookStep[i].horizontally].pieces=="rook"||board[rookStep[i].vertically][rookStep[i].horizontally].pieces=="queen") {
      return true
    }
  }
  const bishopStep = allowBishop(board,data,activeColor)
  for (let i = 0; i < bishopStep.length; i++) {
    if (board[bishopStep[i].vertically][bishopStep[i].horizontally].pieces=="bishop"||board[bishopStep[i].vertically][bishopStep[i].horizontally].pieces=="queen") {
      return true
    }
  }

  
  const knightStep = allowknight(board,data,activeColor)
  for (let i = 0; i < knightStep.length; i++) {
    if (board[knightStep[i].vertically][knightStep[i].horizontally].pieces=="knight") {
      return true
    }
  }  


  const kingStep = allowKing(board,data,activeColor)
  for (let i = 0; i < kingStep.length; i++) {
    if (board[kingStep[i].vertically][kingStep[i].horizontally].pieces=="king") {
      return true
    }
  }  


  // pawn
  
  if (activeColor=="black"&&data.vertically<8) {
    if (data.horizontally+1<8) {
      if (board[data.vertically+1][data.horizontally+1].color=="white" &&board[data.vertically+1][data.horizontally+1].pieces=="pawn" ) {
        return true
      }
    }

    if (data.horizontally-1>-1) {
      if (board[data.vertically+1][data.horizontally-1].color=="white" &&board[data.vertically+1][data.horizontally-1].pieces=="pawn" ) {
        return true
      }
    }
  }
  if (activeColor=="white" &&data.vertically>-1) {
    if (data.horizontally+1<8) {
      if (board[data.vertically-1][data.horizontally+1].color=="black" &&board[data.vertically-1][data.horizontally+1].pieces=="pawn" ) {
        return true
      }
    }

    if (data.horizontally-1>-1) {
      if (board[data.vertically-1][data.horizontally-1].color=="black" &&board[data.vertically-1][data.horizontally-1].pieces=="pawn" ) {
        return true
      }
    }
  }
return false
}



function allowSteps(data,activeColor) {

  // if (globalColor=="white") {
  //   activeColor="black"
  // }else{activeColor="white"}
  if (board[data.from.vertically][data.from.horizontally].pieces == "pawn" && board[data.from.vertically][data.from.horizontally].color == "white") {
    const steps = allowWhitePawn({
      vertically: data.from.vertically,
      horizontally: data.from.horizontally,
    },kingsPossition)
    return steps
  }
  if (board[data.from.vertically][data.from.horizontally].pieces == "pawn" && board[data.from.vertically][data.from.horizontally].color == "black") {
    const steps = allowBlackPawn({
      vertically: data.from.vertically,
      horizontally: data.from.horizontally,
    },kingsPossition)
    return steps
  }  
  if (board[data.from.vertically][data.from.horizontally].pieces == "rook") {
    const steps = allowRook(board,{
      vertically: data.from.vertically,
      horizontally: data.from.horizontally,
    },activeColor)
    return steps
  }
  if (board[data.from.vertically][data.from.horizontally].pieces == "knight") {
    const steps = allowknight(board,{
      vertically: data.from.vertically,
      horizontally: data.from.horizontally,
    },activeColor)
    return steps
  }      
  if (board[data.from.vertically][data.from.horizontally].pieces == "bishop") {
    const steps = allowBishop(board,{
      vertically: data.from.vertically,
      horizontally: data.from.horizontally,
    },activeColor)
    return steps
  }      
  if (board[data.from.vertically][data.from.horizontally].pieces == "queen") {
    const steps = allowQueen(board,{
      vertically: data.from.vertically,
      horizontally: data.from.horizontally,
    },activeColor)
    return steps
  }      
  if (board[data.from.vertically][data.from.horizontally].pieces == "king") {
    const steps = allowKing(board,{
      vertically: data.from.vertically,
      horizontally: data.from.horizontally,
    },activeColor)
    return steps
  }      
}
function checkSteps(step,allowSteps) {          
  for (let i = 0; i < allowSteps.length; i++) {
    if (step.vertically==allowSteps[i].vertically && step.horizontally==allowSteps[i].horizontally) {
      return true
    }
  }
  return false
}




function allowQueen(board,data,activeColor) {
  const steps1=allowBishop(board,data,activeColor)
  const steps2=allowRook(board,data,activeColor)
  for (let i = 0; i < steps2.length; i++) {
    steps1.push(steps2[i])
  }
  return steps1
}





function allowBishop(board,data,activeColor) {

  let opponentColor = "black"
  if (activeColor=="black") {
    opponentColor = "white"
  }
  let allow = [];
  for (let i = 1; i <data.vertically +1; i++) {
    if (data.vertically-i<0||data.horizontally-i<0) {
        break;
    }    
    if (board[data.vertically-i][data.horizontally-i].color == activeColor
      ) {
        break;
    }
    if (   board[data.vertically-i][data.horizontally-i].color == null
      ) {
        allow.push({
          vertically:data.vertically-i,
          horizontally: data.horizontally-i,
        });
    }
    if ( board[data.vertically-i][data.horizontally-i].color == opponentColor
      ) {
        allow.push({
          vertically:data.vertically-i,
          horizontally: data.horizontally-i,
        });
        break;
    }
  }



  

  for (let i = 1; i <data.vertically+1; i++) {
    if (data.vertically-i<0||data.horizontally+i>7
      ) {
        break;
    }    
    if (board[data.vertically-i][data.horizontally+i].color == activeColor
      ) {
        break;
    }
    if (   board[data.vertically-i][data.horizontally+i].color == null
      ) {
        allow.push({
          vertically:data.vertically-i,
          horizontally: data.horizontally+i,
        });
    }
    if ( board[data.vertically-i][data.horizontally+i].color == opponentColor
      ) {
        allow.push({
          vertically:data.vertically-i,
          horizontally: data.horizontally+i,
        });
        break;
    }
  }  








  for (let i = 1; i <8-data.vertically; i++) {
    if (data.vertically+i>7||data.horizontally-i<0
      ) {
        break;
    }    
    if (board[data.vertically+i][data.horizontally-i].color == activeColor
      ) {
        break;
    }
    if (   board[data.vertically+i][data.horizontally-i].color == null
      ) {
        allow.push({
          vertically:data.vertically+i,
          horizontally: data.horizontally-i,
        });
    }
    if ( board[data.vertically+i][data.horizontally-i].color == opponentColor
      ) {
        allow.push({
          vertically:data.vertically+i,
          horizontally: data.horizontally-i,
        });
        break;
    }
  }  







  for (let i = 1; i <8-data.vertically; i++) {
    if (data.vertically+i>7||data.horizontally+i>7
      ) {
        break;
    }    
    if (board[data.vertically+i][data.horizontally+i].color == activeColor
      ) {
        break;
    }
    if (   board[data.vertically+i][data.horizontally+i].color == null
      ) {
        allow.push({
          vertically:data.vertically+i,
          horizontally: data.horizontally+i,
        });
    }
    if ( board[data.vertically+i][data.horizontally+i].color == opponentColor
      ) {
        allow.push({
          vertically:data.vertically+i,
          horizontally: data.horizontally+i,
        });
        break;
    }
  }

return allow
}



function allowKing(board,data,activeColor) {
      // data = { vertically: 0, horizontally: 0 };
      let allow = [];
      if (data.vertically+1<8 &&data.horizontally+1<8 &&board[data.vertically+1][data.horizontally+1].color !==activeColor) {
        allow.push({
          vertically: data.vertically+1,
          horizontally: data.horizontally+1,
        });
      }
      
      if (data.vertically<8 &&data.horizontally+1<8 &&board[data.vertically][data.horizontally+1].color !==activeColor) {
        allow.push({
          vertically: data.vertically,
          horizontally: data.horizontally+1,
        });
      }    

      if (data.vertically<8 &&data.horizontally-1>-1 &&board[data.vertically][data.horizontally-1].color !==activeColor) {
        allow.push({
          vertically: data.vertically,
          horizontally: data.horizontally-1,
        });
      }      

      if (data.vertically+1<8 &&data.horizontally<8 &&board[data.vertically+1][data.horizontally].color !==activeColor) {
        allow.push({
          vertically: data.vertically+1,
          horizontally: data.horizontally,
        });
      }
      
      
      if (data.vertically+1<8 &&data.horizontally-1>-1 &&board[data.vertically+1][data.horizontally-1].color !==activeColor) {
        allow.push({
          vertically: data.vertically+1,
          horizontally: data.horizontally-1,
        });
      }      


      if (data.vertically-1>-1 &&data.horizontally-1>-1 &&board[data.vertically-1][data.horizontally-1].color !==activeColor) {
        allow.push({
          vertically: data.vertically-1,
          horizontally: data.horizontally-1,
        });
      }            



      if (data.vertically-1>-1 &&data.horizontally>-1 &&board[data.vertically-1][data.horizontally].color !==activeColor) {
        allow.push({
          vertically: data.vertically-1,
          horizontally: data.horizontally,
        });
      }            



      if (data.vertically-1>-1 &&data.horizontally+1<8 &&board[data.vertically-1][data.horizontally+1].color !==activeColor) {
        allow.push({
          vertically: data.vertically-1,
          horizontally: data.horizontally+1,
        });
      }    


      if ((data.vertically==7 ||data.vertically==0)  && data.horizontally==4 && board[data.vertically][data.horizontally].isTouched==false) {
        if (( board[data.vertically][5].color==null) &&( board[data.vertically][6].color==null)&&(board[data.vertically][7].isTouched==false && board[data.vertically][7].color==activeColor && board[data.vertically][7].pieces=="rook")) {
          allow.push({
            vertically: data.vertically,
            horizontally: 6,
          });
        }
        if (( board[data.vertically][3].color==null) &&(board[data.vertically][2].color==null) &&( board[data.vertically][1].color==null)&&(board[data.vertically][0].isTouched==false && board[data.vertically][0].color==activeColor && board[data.vertically][0].pieces=="rook")) {
          allow.push({
            vertically: data.vertically,
            horizontally: 2,
          });
        }
      }      

return allow
}









function allowknight(board,data,activeColor) {
    // data = { vertically: 0, horizontally: 0 };
  let allow = [];
  if (data.vertically+2<8 &&data.horizontally+1<8 &&board[data.vertically+2][data.horizontally+1].color !==activeColor ) {
    allow.push({
      vertically: data.vertically+2,
      horizontally: data.horizontally+1,
    });
  }

  if (data.vertically+2<8 &&data.horizontally-1>-1 && board[data.vertically+2][data.horizontally-1].color !== activeColor) {
    allow.push({
      vertically: data.vertically+2,
      horizontally: data.horizontally-1,
    });
  }  

  if (data.vertically+1<8 &&data.horizontally+2<8&& board[data.vertically+1][data.horizontally+2].color !== activeColor) {
    allow.push({
      vertically: data.vertically+1,
      horizontally: data.horizontally+2,
    });
  }



  if (data.vertically-1>-1 &&data.horizontally+2<8&& board[data.vertically-1][data.horizontally+2].color !== activeColor) {
    allow.push({
      vertically: data.vertically-1,
      horizontally: data.horizontally+2,
    });  
  }


  if (data.vertically-2>-1 &&data.horizontally-1>-1 && board[data.vertically-2][data.horizontally-1].color !== activeColor) {
    allow.push({
      vertically: data.vertically-2,
      horizontally: data.horizontally-1,
    });  
  }



  if (data.vertically-2>-1 &&data.horizontally+1<8 &&board[data.vertically-2][data.horizontally+1].color !== activeColor) {
    allow.push({
      vertically: data.vertically-2,
      horizontally: data.horizontally+1,
    });  
  }

  if (data.vertically-1>-1 &&data.horizontally-2>-1 && board[data.vertically-1][data.horizontally-2].color !== activeColor) {
    allow.push({
      vertically: data.vertically-1,
      horizontally: data.horizontally-2,
    });  
  }



  if (data.vertically+1<8 &&data.horizontally-2>-1 && board[data.vertically+1][data.horizontally-2].color !== activeColor) {
    allow.push({
      vertically: data.vertically+1,
      horizontally: data.horizontally-2,
    });  
  }  
return allow
}










function allowRook(board,data,activeColor) {
    // data = { vertically: 0, horizontally: 0 };
    let opponentColor 
    if (activeColor=="black") {
      opponentColor = "white"
    }else{opponentColor="black"}
  let allow = [];
  for (let i = data.vertically+1; i < 8; i++) {
    if (   board[i][data.horizontally].color == activeColor
      ) {
        break;
    }
    if (   board[i][data.horizontally].color == null
      ) {
        allow.push({
          vertically: i,
          horizontally: data.horizontally,
        });
    }
    if ( board[i][data.horizontally].color == opponentColor
      ) {
        allow.push({
          vertically: i,
          horizontally: data.horizontally,
        });
        break;
    }
  }

  for (let i = data.vertically-1; i > -1; i--) {
    if (   board[i][data.horizontally].color == activeColor
      ) {
        break;
    }
    if (   board[i][data.horizontally].color == null
      ) {
        allow.push({
          vertically: i,
          horizontally: data.horizontally,
        });
    }
    if ( board[i][data.horizontally].color == opponentColor
      ) {
        allow.push({
          vertically: i,
          horizontally: data.horizontally,
        });
        break;
    }
  }



  for (let i = data.horizontally-1; i > -1; i--) {
    if (   board[data.vertically][i].color == activeColor
      ) {
        break;
    }
    if (   board[data.vertically][i].color == null
      ) {
        allow.push({
          vertically: data.vertically,
          horizontally: i,
        });
    }
    if ( board[data.vertically][i].color == opponentColor
      ) {
        allow.push({
          vertically: data.vertically,
          horizontally: i,
        });
        break;
    }

  }


  for (let i = data.horizontally+1; i < 8; i++) {
    if (   board[data.vertically][i].color == activeColor
      ) {
        break;
    }
    if (   board[data.vertically][i].color == null
      ) {
        allow.push({
          vertically: data.vertically,
          horizontally: i,
        });
    }
    if ( board[data.vertically][i].color == opponentColor
      ) {
        allow.push({
          vertically: data.vertically,
          horizontally: i,
        });
        break;
    }
  }
  return allow
}


















// let isTouched={}
function allowWhitePawn(data) {
  let bigData={from:{ vertically: data.vertically, horizontally: data.horizontally},to:{ vertically: data.vertically, horizontally: data.horizontally} }
  // data = { vertically: 0, horizontally: 0 };
  let allow = [];
  if (data.vertically < 1) {
    return [];
  }
  // if (check(step(data,board,true),{vertically:kingsPossitionFake[activeColor].vertically,horizontally:kingsPossitionFake[activeColor].horizontally},activeColor)) {
  //   notAllowed=true
  // }
  if (board[data.vertically - 1][data.horizontally].color == null) {
    bigData.to.vertically=data.vertically - 1
    let step1=step(bigData,board,true)
      if (!check(step1.board,{vertically:step1.kingsPossitionFake["white"].vertically,horizontally:step1.kingsPossitionFake["white"].horizontally},"white")) {
        allow.push({
          vertically: data.vertically - 1,
          horizontally: data.horizontally,
        });
  }
    // allow.push({
    //   vertically: data.vertically - 1,
    //   horizontally: data.horizontally,
    // });
  }
  if (
    data.vertically > 0 &&
    board[data.vertically][data.horizontally].isTouched == false &&
    board[data.vertically - 2][data.horizontally].color == null &&
    board[data.vertically - 1][data.horizontally].color == null
  ) {
    bigData.to.vertically=data.vertically - 2
    let step1=step(bigData,board,true)
    if (!check(step1.board,{vertically:step1.kingsPossitionFake["white"].vertically,horizontally:step1.kingsPossitionFake["white"].horizontally},"white")) {
        allow.push({
          vertically: data.vertically - 2,
          horizontally: data.horizontally,
        });
  }

    // allow.push({
    //   vertically: data.vertically - 2,
    //   horizontally: data.horizontally,
    // });
  }
  // if (
  //   data.horizontally == 0 &&
  //   board[data.vertically-1][data.horizontally + 1].color == null&&
  //   (enPassant.black.vertically==data.vertically-1 &&enPassant.black.horizontally==data.horizontally+1)
  // ) {  
  //   allow.push({
  //   vertically: data.vertically - 1,
  //   horizontally: data.horizontally + 1,
  // });}

  if (
    data.horizontally == 0 &&
    board[data.vertically-1][data.horizontally + 1].color == "black"
    ||enPassant.black.vertically==data.vertically-1 &&enPassant.black.horizontally==data.horizontally+1
    ) {
    // if (board[data.vertically-1][data.horizontally + 1].color == "black"||enPassant.black.vertically==data.vertically-1 &&enPassant.black.horizontally==data.horizontally+1) {
      bigData.to.vertically=data.vertically - 1
      bigData.to.horizontally=data.horizontally + 1
      let step1 =step(bigData,board,true) 
      if (!check(step1.board,{vertically:step1.kingsPossitionFake["white"].vertically,horizontally:step1.kingsPossitionFake["white"].horizontally},"white")) {
        allow.push({
          vertically: data.vertically - 1,
          horizontally: data.horizontally+1,
        });
  }
    // allow.push({
    //     vertically: data.vertically - 1,
    //     horizontally: data.horizontally + 1,
    //   });      
    // }
    // if (enPassant.black.vertically==data.vertically-1 &&enPassant.black.horizontally==data.horizontally+1) {
    //   allow.push({
    //     vertically: data.vertically - 1,
    //     horizontally: data.horizontally + 1,
    //   });
    // }

  } else if (
    data.horizontally == 7 &&
    board[data.vertically-1][data.horizontally - 1].color == "black"
    ||enPassant.black.vertically==data.vertically-1 &&enPassant.black.horizontally==data.horizontally-1
  ) {
    bigData.to.vertically=data.vertically - 1
    bigData.to.horizontally=data.horizontally - 1
    let step1 =step(bigData,board,true) 
    if (!check(step1.board,{vertically:step1.kingsPossitionFake["white"].vertically,horizontally:step1.kingsPossitionFake["white"].horizontally},"white")) {
      allow.push({
        vertically: data.vertically - 1,
        horizontally: data.horizontally-1,
      });
}
    // allow.push({
    //   vertically: data.vertically - 1,
    //   horizontally: data.horizontally - 1,
    // });
  } else {
    if (data.horizontally < 7 && data.horizontally > 0) {
      if (board[data.vertically-1][data.horizontally - 1].color == "black" ||enPassant.black.vertically==data.vertically-1 &&enPassant.black.horizontally==data.horizontally-1 ) {
        bigData.to.vertically=data.vertically - 1
        bigData.to.horizontally=data.horizontally - 1
        let step1 =step(bigData,board,true) 
        if (!check(step1.board,{vertically:step1.kingsPossitionFake["white"].vertically,horizontally:step1.kingsPossitionFake["white"].horizontally},"white")) {
          allow.push({
            vertically: data.vertically - 1,
            horizontally: data.horizontally-1,
          });
    }
        // allow.push({
        //   vertically: data.vertically - 1,
        //   horizontally: data.horizontally - 1,
        // });
      }
      if (board[data.vertically-1][data.horizontally + 1].color == "black"||enPassant.black.vertically==data.vertically-1 &&enPassant.black.horizontally==data.horizontally+1) {
        bigData.to.vertically=data.vertically - 1
        bigData.to.horizontally=data.horizontally + 1
        let step1 = step(bigData,board,true)
        if (!check(step1.board,{vertically:step1.kingsPossitionFake["white"].vertically,horizontally:step1.kingsPossitionFake["white"].horizontally},"white")) {
          allow.push({
            vertically: data.vertically - 1,
            horizontally: data.horizontally+1,
          });
    }
        // allow.push({
        //   vertically: data.vertically - 1,
        //   horizontally: data.horizontally + 1,
        // });
      }
    }
  }
  return allow;
}

function allowBlackPawn(data,kingsPossitionFake) {
  let bigData={from:{ vertically: data.vertically, horizontally: data.horizontally},to:{ vertically: data.vertically, horizontally: data.horizontally} }

  // data = { vertically: 0, horizontally: 0 };
  let allow = [];
  if (data.vertically > 6) {
    return [];
  }
  if (board[data.vertically + 1][data.horizontally].color == null) {
    bigData.to.vertically=data.vertically + 1
    bigData.to.horizontally=data.horizontally 
    let step1 =step(bigData,board,true) 
    if (!check(step1.board,{vertically:step1.kingsPossitionFake["black"].vertically,horizontally:step1.kingsPossitionFake["black"].horizontally},"black")) {
      allow.push({
        vertically: data.vertically + 1,
        horizontally: data.horizontally,
      });
}

  }
  if (
    data.vertically < 6 &&
    board[data.vertically][data.horizontally].isTouched == false &&
    board[data.vertically + 2][data.horizontally].color == null &&
    board[data.vertically + 1][data.horizontally].color == null
  ) {
    bigData.to.vertically=data.vertically + 2
    bigData.to.horizontally=data.horizontally 
    let step1 = step(bigData,board,true)
    if (!check(step1.board,{vertically:step1.kingsPossitionFake["black"].vertically,horizontally:step1.kingsPossitionFake["black"].horizontally},"black")) {
      allow.push({
        vertically: data.vertically + 2,
        horizontally: data.horizontally,
      });
}

  }
  if (
    data.horizontally == 7 &&
    board[data.vertically+1][data.horizontally - 1].color == "white" ||enPassant.white.vertically==data.vertically+1 &&enPassant.white.horizontally==data.horizontally-1
  ) {
    bigData.to.vertically=data.vertically + 1
    bigData.to.horizontally=data.horizontally - 1
    let step1 =step(bigData,board,true) 
    if (!check(step1.board,{vertically:step1.kingsPossitionFake["black"].vertically,horizontally:step1.kingsPossitionFake["black"].horizontally},"black")) {
      allow.push({
        vertically: data.vertically + 1,
        horizontally: data.horizontally -1,
      });
}    

  } else if (
    data.horizontally == 0 &&
    board[data.vertically+1][data.horizontally + 1].color == "white"||enPassant.white.vertically==data.vertically+1 &&enPassant.white.horizontally==data.horizontally+1
  ) {
    bigData.to.vertically=data.vertically + 1
    bigData.to.horizontally=data.horizontally + 1
    let step1 = step(bigData,board,true)
    if (!check(step1.board,{vertically:step1.kingsPossitionFake["black"].vertically,horizontally:step1.kingsPossitionFake["black"].horizontally},"black")) {
      allow.push({
        vertically: data.vertically + 1,
        horizontally: data.horizontally +1,
      });
}  
  } else {
    if (data.horizontally > 0 && data.horizontally < 7) {
      if (board[data.vertically+1][data.horizontally + 1].color == "white"||enPassant.white.vertically==data.vertically+1 &&enPassant.white.horizontally==data.horizontally+1) {
        bigData.to.vertically=data.vertically + 1
        bigData.to.horizontally=data.horizontally + 1
        let step1 =step(bigData,board,true) 
        if (!check(step1.board,{vertically:step1.kingsPossitionFake["black"].vertically,horizontally:step1.kingsPossitionFake["black"].horizontally},"black")) {
          allow.push({
            vertically: data.vertically + 1,
            horizontally: data.horizontally + 1,
          });
    }  
      }
      if (board[data.vertically+1][data.horizontally - 1].color == "white"||enPassant.white.vertically==data.vertically+1 &&enPassant.white.horizontally==data.horizontally-1) {
        bigData.to.vertically=data.vertically + 1
        bigData.to.horizontally=data.horizontally - 1
        let step1 =step(bigData,board,true) 
        if (!check(step1.board,{vertically:step1.kingsPossitionFake["black"].vertically,horizontally:step1.kingsPossitionFake["black"].horizontally},"black")) {
          allow.push({
            vertically: data.vertically + 1,
            horizontally: data.horizontally -1,
          });
    }  
      }
    }
  }
  return allow;
}

function step(data,experimentalBoard,fake) {
  let kingsPossitionFake=JSON.parse(JSON.stringify(kingsPossition));
  // if (board[data.to.horizontally][data.from.vertically].color== board[data.from.horizontally][data.from.vertically].color) {
  // 			throw new HttpException(400, 'you cannot perform this step');
  // }
  let board =JSON.parse(JSON.stringify(experimentalBoard));

  if (board[data.from.vertically][data.from.horizontally].pieces=="pawn") {
    if (board[data.from.vertically][data.from.horizontally].color=="white") {
      if (data.from.vertically-data.to.vertically==1 && Math.abs(data.from.horizontally-data.to.horizontally)==1&&board[data.to.vertically][data.to.horizontally].color==null) {
        board[data.to.vertically+1][data.to.horizontally].color = null;
        board[data.to.vertically+1][data.to.horizontally].pieces = null;
      }
    }
    if (board[data.from.vertically][data.from.horizontally].color=="black") {
      if (data.to.vertically-data.from.vertically==1 && Math.abs(data.from.horizontally-data.to.horizontally)==1&&board[data.to.vertically][data.to.horizontally].color==null) {
        board[data.to.vertically-1][data.to.horizontally].color = null;
        board[data.to.vertically-1][data.to.horizontally].pieces = null;
      }
    }  









if (!fake) {
  if (Math.abs(data.to.vertically-data.from.vertically)==2) {
    if (board[data.from.vertically][data.from.horizontally].color=="white") {

      enPassant.white.vertically=data.from.vertically-1
      enPassant.white.horizontally=data.from.horizontally
    }else{
      enPassant.black.vertically=data.from.vertically+1
      enPassant.black.horizontally=data.from.horizontally
    }
  }  
}


  }



  if (board[data.from.vertically][data.from.horizontally].pieces == "king") {
    if (data.from.horizontally-data.to.horizontally>1) {
      board[data.to.vertically][0].color = null;
      board[data.to.vertically][0].pieces = null;
      board[data.to.vertically][3].color = board[data.from.vertically][data.from.horizontally].color;
      board[data.to.vertically][3].pieces = "rook";
      board[data.from.vertically][0].isTouched = true;
      board[data.to.vertically][4].isTouched = true;
    }
    if (data.from.horizontally-data.to.horizontally<-1) {
      board[data.to.vertically][7].color = null;
      board[data.to.vertically][7].pieces = null;
      board[data.to.vertically][5].color = board[data.from.vertically][data.from.horizontally].color;
      board[data.to.vertically][5].pieces = "rook";
      board[data.from.vertically][7].isTouched = true;
      board[data.to.vertically][4].isTouched = true;
    }

  }
  board[data.to.vertically][data.to.horizontally].color =
  board[data.from.vertically][data.from.horizontally].color;
  board[data.to.vertically][data.to.horizontally].pieces =
  board[data.from.vertically][data.from.horizontally].pieces;
  board[data.from.vertically][data.from.horizontally].color = null;
  board[data.from.vertically][data.from.horizontally].pieces = null;
  board[data.from.vertically][data.from.horizontally].isTouched = true;
  board[data.to.vertically][data.to.horizontally].isTouched = true;







if (board[data.to.vertically][data.to.horizontally].pieces=="king") {
  let activeColor=board[data.to.vertically][data.to.horizontally].color
  // if (globalColor=="white") {
  //   activeColor="black"
  // }else{
  //   activeColor="white"
  // }

  kingsPossitionFake[activeColor].vertically=data.to.vertically
  kingsPossitionFake[activeColor].horizontally=data.to.horizontally
}
if (!fake) {
  if (board[data.to.vertically][data.to.horizontally].color=="white") {
    enPassant.black.vertically=null
    enPassant.black.horizontally=null
  }else{
    enPassant.white.vertically=null
    enPassant.white.horizontally=null
  }  
}


  return {board,kingsPossitionFake};
}

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  allPlayers.push(socket.id)
  socket.on("start", (data) => {
    socket.join(board);
    for (let i = 0; i < allPlayers.length; i++) {
      socket.to(allPlayers[i]).emit("receive_step", {board,kingsPossition});
    }
    if (allPlayers.length) {
      socket.emit("receive_step", {board,kingsPossition});
    }
  });

  socket.on("step", (data) => {
    if (!data||!data.from||!data.to||(!data.from.vertically&&data.from.vertically!==0)||(!data.from.horizontally&&data.from.horizontally!==0)||(!data.to.vertically&&data.to.vertically!==0)||(!data.to.horizontally&&data.to.horizontally!==0)) {
      return false
    }
    if (data.from.vertically<0||data.from.vertically>7||data.from.horizontally<0||data.from.horizontally>7) {
      return false
    }
    if (data.to.vertically<0||data.to.vertically>7||data.to.horizontally<0||data.to.horizontally>7) {
      return []
    }    
    // socket.to(data.room).emit("receive_message", data);
    // if (board[data.from.vertically][data.from.horizontally].pieces == "pawn") {
    //   console.log(
    //     "bâ",
    //     allowQueen({
    //       vertically: data.from.vertically,
    //       horizontally: data.from.horizontally,
    //     })
    //   );
    // }
    // console.log(    check({ vertically: data.to.vertically,
    //   horizontally: data.to.horizontally}))
    let notAllowed=false
    let activeColor
    if (globalColor=="white") {
      activeColor="black"
    }else{activeColor="white"}
    if (board[data.from.vertically][data.from.horizontally].color ==globalColor) {
     notAllowed=true 
    }
// ban @lni hani comic
    if (!kingsPossition[activeColor].check) {
if (checkMate(board,activeColor)) {
  console.log("pat",activeColor,checkMate(board,activeColor));
}
    }
    let step1 =step(data,board,true) 

    if (check(step1.board,{vertically:step1.kingsPossitionFake[activeColor].vertically,horizontally:step1.kingsPossitionFake[activeColor].horizontally},activeColor)) {
      notAllowed=true
    }

    const steps= allowSteps(data,board[data.from.vertically][data.from.horizontally].color)
 let allow=allowedArray(board,{vertically:data.from.vertically,horizontally:data.from.horizontally},steps,activeColor)
    
    if (allow) {
      const myStep={
        vertically: data.to.vertically,
        horizontally: data.to.horizontally
  }

  if (!allow.length) {
    notAllowed=true
  }
  if (!checkSteps(myStep,allow)||globalColor==board[data.from.vertically][data.from.horizontally].color) {

    notAllowed=true
  }

if (!notAllowed) {
  let take = false
  if (board[data.to.vertically][data.to.horizontally].color == globalColor) {

    figures[globalColor][board[data.to.vertically][data.to.horizontally].pieces]--
    
    take=true
  }
  if (board[data.from.vertically][data.from.horizontally].pieces=="pawn") {
    if (data.from.horizontally!== data.to.horizontally && board[data.to.vertically][data.to.horizontally].color !== globalColor) {
      figures[globalColor]["pawn"]--
      take=true
    }
  }
  step1 = step(data,board,false)
  board = step1.board;
  kingsPossition=step1.kingsPossitionFake


  if (check(board,{vertically:kingsPossition[globalColor].vertically,horizontally:kingsPossition[globalColor].horizontally},globalColor)) {
    kingsPossition[globalColor].check=true
  }
  

     kingsPossition[activeColor].check=false
     if (kingsPossition[globalColor].check) {

      // console.log("mate",globalColor,checkMate(board,globalColor));
      if (checkMate(board,globalColor)) {
        socket.emit("receive_checkmate", activeColor);
        for (let i = 0; i < allPlayers.length; i++) {
          socket.to(allPlayers[i]).emit("receive_checkmate", activeColor);
        }
        if (allPlayers.length) {
          socket.emit("receive_checkmate", activeColor);
        }
      }
    }
    if (globalColor=="white") {
      globalColor="black"
    }else{
     globalColor="white" }
      data.take=take
     history.push(data)
if (history.length>7) {
  let draw =false
  if (draw3foldRepetition(history)) {
    console.log("drow--nichya 3");   
     draw=true
  }
  if (drawDeadPosition(figures)) {
    draw=true
    console.log("drow--nichya dead");    
  }
  if (draw50MoveRule(history)) {
    draw=true
    console.log("drow--nichya 50");    
  }
  if (draw) {
    for (let i = 0; i < allPlayers.length; i++) {
      socket.to(allPlayers[i]).emit("receive_draw", {board,kingsPossition});
    }
    if (allPlayers.length) {
      socket.emit("receive_draw", {board,kingsPossition});
    }
  }

  // if (draw(history)) {
  //   console.log("drow--nichya");
  //   console.table(history)
  // }
}
    //  console.log("this",kingsPossition[thiscolor].check);
    //  kingsPossition[thiscolor].check=false
// console.log(kingsPossition);
  // if (check(board,{vertically:kingsPossition[globalColor].vertically,horizontally:kingsPossition[globalColor].horizontally},globalColor)  ) {
  //   kingsPossition[globalColor].check=true
  // }
  // if (check(board,{vertically:kingsPossition[thiscolor].vertically,horizontally:kingsPossition[thiscolor].horizontally},activeColor)  ) {
  //   kingsPossition[thiscolor].check=false
  // }


if (board[data.to.vertically][data.to.horizontally].pieces=="pawn"&&(data.to.vertically == 0 || data.to.vertically == 7)) {
  // board[data.to.vertically][data.to.horizontally].pieces="queen"
  socket.emit("receive_promotion", {vertically:data.to.vertically,horizontally:data.to.horizontally});
}
}

    }
    for (let i = 0; i < allPlayers.length; i++) {
      socket.to(allPlayers[i]).emit("receive_step", {board,kingsPossition});
    }
    if (allPlayers.length) {
      socket.emit("receive_step", {board,kingsPossition});
    }
  });


  socket.on("promotion", (data) => {
    let promotionColor =board[data.position.vertically][data.position.horizontally].color
    figures[promotionColor][data.name]++
    figures[promotionColor]["pawn"]--
if (data.name=="bishop") {
  let oppositeBishop=false
  for (let v = 0; v < board.length; v++) {
for (let h = 0; h < board.length; h++) {
  if (board[v][h].pieces=="bishop" && board[v][h].color==promotionColor && 
  squareColor(v,h)!==squareColor(data.position.vertically,data.position.horizontally)) {
    oppositeBishop=true
  }
}

  }
  if (!oppositeBishop) {
    promotionBishop[promotionColor]=true
  }
}


    board[data.position.vertically][data.position.horizontally].pieces=data.name
    let color
    if (board[data.position.vertically][data.position.horizontally].color=="white") {
      color="black"
    }else{color="white"}

    if (check(board,{vertically:kingsPossition[color].vertically,horizontally:kingsPossition[color].horizontally},color)) {
      kingsPossition[color].check=true
      if (checkMate(board,color)) {
        socket.emit("receive_checkmate", globalColor);
        for (let i = 0; i < allPlayers.length; i++) {
          socket.to(allPlayers[i]).emit("receive_checkmate", globalColor);
        }
        if (allPlayers.length) {
          socket.emit("receive_checkmate", globalColor);
        }
      }
    }

    for (let i = 0; i < allPlayers.length; i++) {
      socket.to(allPlayers[i]).emit("receive_step", {board,kingsPossition} );
    }
    if (allPlayers.length) {
      socket.emit("receive_step", {board,kingsPossition});
    }
  })




  socket.on("showMoves", (data) => {
    if (!data||!data.from||!(data.from.vertically ||data.from.vertically==0) ||!(data.from.horizontally||data.from.horizontally==0)) {
      
      
      return false
    }
    
    if (data.from.vertically<0||data.from.vertically>7||data.from.horizontally<0||data.from.horizontally>7) {
      return false
    }
 
    if (board[data.from.vertically][data.from.horizontally].color==globalColor) {
      return false

    }
    let activeColor
    if (globalColor=="white") {
      activeColor="black"
    }else{
     activeColor="white" }
    
    let allow=allowSteps(data,activeColor)
    let showMoves=allowedArray(board,{vertically:data.from.vertically,horizontally:data.from.horizontally},allow,activeColor)

    // for (let i = 0; i < allPlayers.length; i++) {
    //   socket.to(allPlayers[i]).emit("receive_showMoves", showMoves);
    // }
      socket.emit("receive_showMoves", showMoves);
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});
