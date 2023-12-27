const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { log } = require("console");
let globalColor="black"
// vertically:^^^^^,horizontally:>>>>>>
globaklcheck=false
const board=
[
[
  {color:"black",vertically:0,horizontally:7,pieces:"rook",isTouched:false},
  {color:"black",vertically:1,horizontally:7,pieces:"knight",isTouched:false},
  {color:"black",vertically:2,horizontally:7,pieces:"bishop",isTouched:false},
  {color:"black",vertically:3,horizontally:7,pieces:"queen",isTouched:false},
  {color:"black",vertically:4,horizontally:7,pieces:"king",isTouched:false},
  {color:"black",vertically:5,horizontally:7,pieces:"bishop",isTouched:false},
  {color:"black",vertically:6,horizontally:7,pieces:"knight",isTouched:false},
  {color:"black",vertically:7,horizontally:7,pieces:"rook",isTouched:false},
 ],
 [
  {color:"black",vertically:0,horizontally:6,pieces:"pawn",isTouched:false},
  {color:"black",vertically:1,horizontally:6,pieces:"pawn",isTouched:false},
  {color:"black",vertically:2,horizontally:6,pieces:"pawn",isTouched:false},
  {color:"black",vertically:3,horizontally:6,pieces:"pawn",isTouched:false},
  {color:"black",vertically:4,horizontally:6,pieces:"pawn",isTouched:false},
  {color:"black",vertically:5,horizontally:6,pieces:"pawn",isTouched:false},
  {color:"black",vertically:6,horizontally:6,pieces:"pawn",isTouched:false},
  {color:"black",vertically:7,horizontally:6,pieces:"pawn",isTouched:false},
 ],
 [
  {color:null,vertically:0,horizontally:5,pieces:null,isTouched:false},
  {color:null,vertically:1,horizontally:5,pieces:null,isTouched:false},
  {color:null,vertically:2,horizontally:5,pieces:null,isTouched:false},
  {color:null,vertically:3,horizontally:5,pieces:null,isTouched:false},
  {color:null,vertically:4,horizontally:5,pieces:null,isTouched:false},
  {color:null,vertically:5,horizontally:5,pieces:null,isTouched:false},
  {color:null,vertically:6,horizontally:5,pieces:null,isTouched:false},
  {color:null,vertically:7,horizontally:5,pieces:null,isTouched:false},
 ],
 [
  {color:null,vertically:0,horizontally:4,pieces:null,isTouched:false},
  {color:null,vertically:1,horizontally:4,pieces:null,isTouched:false},
  {color:null,vertically:2,horizontally:4,pieces:null,isTouched:false},
  {color:null,vertically:3,horizontally:4,pieces:null,isTouched:false},
  {color:null,vertically:4,horizontally:4,pieces:null,isTouched:false},
  {color:null,vertically:5,horizontally:4,pieces:null,isTouched:false},
  {color:null,vertically:6,horizontally:4,pieces:null,isTouched:false},
  {color:null,vertically:7,horizontally:4,pieces:null,isTouched:false},
 ],
 [
  {color:null,vertically:0,horizontally:3,pieces:null,isTouched:false},
  {color:null,vertically:1,horizontally:3,pieces:null,isTouched:false},
  {color:null,vertically:2,horizontally:3,pieces:null,isTouched:false},
  {color:null,vertically:3,horizontally:3,pieces:null,isTouched:false},
  {color:null,vertically:4,horizontally:3,pieces:null,isTouched:false},
  {color:null,vertically:5,horizontally:3,pieces:null,isTouched:false},
  {color:null,vertically:6,horizontally:3,pieces:null,isTouched:false},
  {color:null,vertically:7,horizontally:3,pieces:null,isTouched:false},
 ],
 [
  {color:null,vertically:0,horizontally:2,pieces:null,isTouched:false},
  {color:null,vertically:1,horizontally:2,pieces:null,isTouched:false},
  {color:null,vertically:2,horizontally:2,pieces:null,isTouched:false},
  {color:null,vertically:3,horizontally:2,pieces:null,isTouched:false},
  {color:null,vertically:4,horizontally:2,pieces:null,isTouched:false},
  {color:null,vertically:5,horizontally:2,pieces:null,isTouched:false},
  {color:null,vertically:6,horizontally:2,pieces:null,isTouched:false},
  {color:null,vertically:7,horizontally:2,pieces:null,isTouched:false},
 ],
 [
  {color:"white",vertically:0,horizontally:1,pieces:"pawn",isTouched:false},
  {color:"white",vertically:1,horizontally:1,pieces:"pawn",isTouched:false},
  {color:"white",vertically:2,horizontally:1,pieces:"pawn",isTouched:false},
  {color:"white",vertically:3,horizontally:1,pieces:"pawn",isTouched:false},
  {color:"white",vertically:4,horizontally:1,pieces:"pawn",isTouched:false},
  {color:"white",vertically:5,horizontally:1,pieces:"pawn",isTouched:false},
  {color:"white",vertically:6,horizontally:1,pieces:"pawn",isTouched:false},
  {color:"white",vertically:7,horizontally:1,pieces:"pawn",isTouched:false},
 ],
 [
  {color:"white",vertically:0,horizontally:0,pieces:"rook",isTouched:false},
  {color:"white",vertically:1,horizontally:0,pieces:"knight",isTouched:false},
  {color:"white",vertically:2,horizontally:0,pieces:"bishop",isTouched:false},
  {color:"white",vertically:3,horizontally:0,pieces:"queen",isTouched:false},
  {color:"white",vertically:4,horizontally:0,pieces:"king",isTouched:false},
  {color:"white",vertically:5,horizontally:0,pieces:"bishop",isTouched:false},
  {color:"white",vertically:6,horizontally:0,pieces:"knight",isTouched:false},
  {color:"white",vertically:7,horizontally:0,pieces:"rook",isTouched:false},
 ],
]
// pawn  unexpected
let  enPassant={black:{vertically:null,horizontally:null},white:{vertically:7,horizontally:0}}
// let datas = {
//   from:{vertically:1,horizontally:0},
//   to:{vertically:1,horizontally:0}
// }



function check(data) {
  // data={verticly,horizontally}
  const rookStep = allowRook(data)
  for (let i = 0; i < rookStep.length; i++) {
    if (board[rookStep[i].vertically][rookStep[i].horizontally].pieces=="rook"||board[rookStep[i].vertically][rookStep[i].horizontally].pieces=="queen") {
      console.log("rook");
      return true
    }
  }
  const bishopStep = allowBishop(data)
  for (let i = 0; i < bishopStep.length; i++) {
    if (board[bishopStep[i].vertically][bishopStep[i].horizontally].pieces=="bishop"||board[bishopStep[i].vertically][bishopStep[i].horizontally].pieces=="queen") {
      console.log("bish",bishopStep);
   
      return true
    }
  }

  
  const knightStep = allowknight(data)
  for (let i = 0; i < knightStep.length; i++) {
    if (board[knightStep[i].vertically][knightStep[i].horizontally].pieces=="knight") {
      console.log("knight",knightStep);
      
      return true
    }
  }  


  const kingStep = allowKing(data)
  for (let i = 0; i < kingStep.length; i++) {
    if (board[kingStep[i].vertically][kingStep[i].horizontally].pieces=="king") {
      return true
    }
  }  


  // pawn
  if (board[data.vertically][data.horizontally].color=="black"&&data.vertically<7) {
    if (data.horizontally+1<7) {
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
  if (board[data.vertically][data.horizontally].color=="white" &&data.vertically>0) {
    if (data.horizontally+1<7) {
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



function allowSteps(data) {
  if (board[data.from.vertically][data.from.horizontally].pieces == "pawn" && board[data.from.vertically][data.from.horizontally].color == "white") {
    const steps = allowWhitePawn({
      vertically: data.from.vertically,
      horizontally: data.from.horizontally,
    })
    return steps
  }
  if (board[data.from.vertically][data.from.horizontally].pieces == "pawn" && board[data.from.vertically][data.from.horizontally].color == "black") {
    const steps = allowBlackPawn({
      vertically: data.from.vertically,
      horizontally: data.from.horizontally,
    })
    return steps
  }  
  if (board[data.from.vertically][data.from.horizontally].pieces == "rook") {
    const steps = allowRook({
      vertically: data.from.vertically,
      horizontally: data.from.horizontally,
    })
    return steps
  }
  if (board[data.from.vertically][data.from.horizontally].pieces == "knight") {
    const steps = allowknight({
      vertically: data.from.vertically,
      horizontally: data.from.horizontally,
    })
    return steps
  }      
  if (board[data.from.vertically][data.from.horizontally].pieces == "bishop") {
    const steps = allowBishop({
      vertically: data.from.vertically,
      horizontally: data.from.horizontally,
    })
    return steps
  }      
  if (board[data.from.vertically][data.from.horizontally].pieces == "queen") {
    const steps = allowQueen({
      vertically: data.from.vertically,
      horizontally: data.from.horizontally,
    })
    return steps
  }      
  if (board[data.from.vertically][data.from.horizontally].pieces == "king") {
    const steps = allowKing({
      vertically: data.from.vertically,
      horizontally: data.from.horizontally,
    })
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




function allowQueen(data) {
  const steps1=allowBishop(data)
  const steps2=allowRook(data)
  for (let i = 0; i < steps2.length; i++) {
    steps1.push(steps2[i])
  }
  return steps1
}





function allowBishop(data) {
  let opponentColor = "black"
  let activeColor=board[data.vertically][data.horizontally].color
  if (board[data.vertically][data.horizontally].color=="black") {
    opponentColor = "white"
    activeColor="black"
  }
  let allow = [];
  for (let i = 1; i <data.vertically; i++) {
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



function allowKing(data) {
      // data = { vertically: 0, horizontally: 0 };
      let allow = [];
      const activeColor=board[data.vertically][data.horizontally].color
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
return allow
}









function allowknight(data) {
    // data = { vertically: 0, horizontally: 0 };
  let allow = [];
    const activeColor=board[data.vertically][data.horizontally].color
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










function allowRook(data) {
    // data = { vertically: 0, horizontally: 0 };
    let opponentColor = "black"
    let activeColor="white"
    if (board[data.vertically][data.horizontally].color=="black") {
      opponentColor = "white"
      activeColor="black"
    }
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
  // data = { vertically: 0, horizontally: 0 };
  let allow = [];
  if (data.vertically < 1) {
    return [];
  }
  if (board[data.vertically - 1][data.horizontally].color == null) {
    allow.push({
      vertically: data.vertically - 1,
      horizontally: data.horizontally,
    });
  }
  if (
    data.vertically > 0 &&
    board[data.vertically][data.horizontally].isTouched == false &&
    board[data.vertically - 2][data.horizontally].color == null &&
    board[data.vertically - 1][data.horizontally].color == null
  ) {


    allow.push({
      vertically: data.vertically - 2,
      horizontally: data.horizontally,
    });
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
      allow.push({
        vertically: data.vertically - 1,
        horizontally: data.horizontally + 1,
      });      
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
    allow.push({
      vertically: data.vertically - 1,
      horizontally: data.horizontally - 1,
    });
  } else {
    if (data.horizontally < 7 && data.horizontally > 0) {
      if (board[data.vertically-1][data.horizontally - 1].color == "black" ||enPassant.black.vertically==data.vertically-1 &&enPassant.black.horizontally==data.horizontally-1 ) {
        allow.push({
          vertically: data.vertically - 1,
          horizontally: data.horizontally - 1,
        });
      }
      if (board[data.vertically-1][data.horizontally + 1].color == "black"||enPassant.black.vertically==data.vertically-1 &&enPassant.black.horizontally==data.horizontally+1) {
        allow.push({
          vertically: data.vertically - 1,
          horizontally: data.horizontally + 1,
        });
      }
    }
  }
  return allow;
}

function allowBlackPawn(data) {
  // data = { vertically: 0, horizontally: 0 };
  let allow = [];
  if (data.vertically > 6) {
    return [];
  }
  if (board[data.vertically + 1][data.horizontally].color == null) {
    allow.push({
      vertically: data.vertically + 1,
      horizontally: data.horizontally,
    });
  }
  if (
    data.vertically < 6 &&
    board[data.vertically][data.horizontally].isTouched == false &&
    board[data.vertically + 2][data.horizontally].color == null &&
    board[data.vertically + 1][data.horizontally].color == null
  ) {
    allow.push({
      vertically: data.vertically + 2,
      horizontally: data.horizontally,
    });
  }
  if (
    data.horizontally == 7 &&
    board[data.vertically+1][data.horizontally - 1].color == "white" ||enPassant.white.vertically==data.vertically+1 &&enPassant.white.horizontally==data.horizontally-1
  ) {
    allow.push({
      vertically: data.vertically + 1,
      horizontally: data.horizontally - 1,
    });
  } else if (
    data.horizontally == 0 &&
    board[data.vertically+1][data.horizontally + 1].color == "white"||enPassant.white.vertically==data.vertically+1 &&enPassant.white.horizontally==data.horizontally+1
  ) {
    allow.push({
      vertically: data.vertically + 1,
      horizontally: data.horizontally + 1,
    });
  } else {
    if (data.horizontally > 0 && data.horizontally < 7) {
      if (board[data.vertically+1][data.horizontally + 1].color == "white"||enPassant.white.vertically==data.vertically+1 &&enPassant.white.horizontally==data.horizontally+1) {
        allow.push({
          vertically: data.vertically + 1,
          horizontally: data.horizontally + 1,
        });
      }
      if (board[data.vertically+1][data.horizontally - 1].color == "white"||enPassant.white.vertically==data.vertically+1 &&enPassant.white.horizontally==data.horizontally-1) {
        allow.push({
          vertically: data.vertically + 1,
          horizontally: data.horizontally - 1,
        });
      }
    }
  }
  return allow;
}

function step(data) {
  // if (board[data.to.horizontally][data.from.vertically].color== board[data.from.horizontally][data.from.vertically].color) {
  // 			throw new HttpException(400, 'you cannot perform this step');
  // }
  if (globalColor=="white") {
    globalColor="black"
  }else{
    globalColor="white"
  }
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
  board[data.to.vertically][data.to.horizontally].color =
  board[data.from.vertically][data.from.horizontally].color;
  board[data.to.vertically][data.to.horizontally].pieces =
  board[data.from.vertically][data.from.horizontally].pieces;
  board[data.from.vertically][data.from.horizontally].color = null;
  board[data.from.vertically][data.from.horizontally].pieces = null;
  board[data.from.vertically][data.from.horizontally].isTouched = true;
  board[data.to.vertically][data.to.horizontally].isTouched = true;


      if (board[data.to.vertically][data.to.horizontally].color=="white") {
        enPassant.black.vertically=null
        enPassant.black.horizontally=null
      }else{
        enPassant.white.vertically=null
        enPassant.white.horizontally=null
      }

      
      // if (board[data.to.vertically][data.to.horizontally].pieces=="pawn") {
      //   if (board[data.to.vertically][data.to.horizontally].color=="white") {
      //     if (data.from.vertically-data.to.vertically==1 && Math.abs(data.from.horizontally-data.to.horizontally==1)&&board[data.to.vertically][data.to.horizontally].color==null) {
      //       board[data.to.vertically-1][data.to.horizontally].color = null;
      //       board[data.to.vertically-1][data.to.horizontally].pieces = null;
      //     }
      //   }
      //   if (board[data.to.vertically][data.to.horizontally].color=="black") {
      //     if (data.to.vertically-data.from.vertically==1 && Math.abs(data.from.horizontally-data.to.horizontally==1)&&board[data.to.vertically][data.to.horizontally].color==null) {
      //       board[data.to.vertically+1][data.to.horizontally].color = null;
      //       board[data.to.vertically+1][data.to.horizontally].pieces = null;
      //     }
      //   }        
      // }


  return board;
}

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("start", (data) => {
    socket.join(board);
    socket.emit("receive_start", board);
  });

  socket.on("step", (data) => {
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
    console.log(    check({ vertically: data.to.vertically,
      horizontally: data.to.horizontally}))

    const steps= allowSteps(data)
    if (steps) {
      const myStep={
        vertically: data.to.vertically,
        horizontally: data.to.horizontally
  }

  if (checkSteps(myStep,steps)&&globalColor!==board[data.from.vertically][data.from.horizontally].color) {

    step(data);
  }      
    }
    socket.emit("receive_step", board);
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});

// if (
//   board[vertically + 1][horizontally + 1].color == "white" &&
//   board[vertically + 1][horizontally].color == null &&
//   board[vertically + 1][horizontally].isTouched == false
// ) {
//   allow.push({ vertically: vertically + 2, horizontally });
// }

// if (board[vertically + 1][horizontally].color == null) {
//   allow.push({ vertically: vertically + 1, horizontally });
// }

// if (
//   Math.abs(data.to.vertically - data.from.vertically) == 1 &&
//   data.to.horizontally == data.from.horizontally &&
//   board[data.to.horizontally][data.to.vertically].color == null
// ) {
//   allow.push(data);
// }

// if (
//   board[data.to.horizontally][data.to.vertically].color ==
//   board[data.from.horizontally][data.from.vertically].color
// ) {
//   return false;
// }
// if (Math.abs(data.from.vertically - data.to.vertically) != 1) {
//   if (Math.abs(data.from.vertically - data.to.vertically) != 2) {
//     return false;
//   }

//   return false;
// }
// if (data.from.horizontally != data.to.horizontally) {
//   if (Math.abs(data.from.horizontally - data.to.horizontally) !== 1) {
//   }
//   return false;
// }
