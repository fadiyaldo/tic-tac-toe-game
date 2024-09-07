

function Gameboard(){
    const columns= 3;
    const rows= 3;

    const board = [];


    // make a 2d array which will be the board
    for( let i =0; i<rows; i++){
        board[i]=[]
        for (let j =0; j< columns; j++){
            board[i].push(Cell());
        }
    }

    // This will be the method of getting the entire board that our
    // UI will eventually need to render it.
    const getBoard = () => board;
  
    // In order to drop a token, we need to find what the lowest point of the
    // selected column is, *then* change that cell's value to the player number
    const dropToken = (row, column,  player) => {
        board[row][column].addToken(player);
    };
  
    // This method will be used to print our board to the console.
    // It is helpful to see what the board looks like after each turn as we play,
    // but we won't need it after we build our UI
    const printBoard= ()=>{
        const boardWithCellValues= board.map((row)=> row.map((cell)=> cell.getValue()))
        console.log(boardWithCellValues);
    }
  
    // Here, we provide an interface for the rest of our
    // application to interact with the board
    return { getBoard, dropToken, printBoard };

}

    function Cell() {
        let value = "";
      
        // Accept a player's token to change the value of the cell
        const addToken= (player)=>{
            value = player;
        }
      
        // How we will retrieve the current value of this cell through closure
        const getValue= ()=> value
      
        return {
          addToken,
          getValue
        };
      }




function GameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
  ) {
    const board = Gameboard();
  
    const players = [
      {
        name: playerOneName,
        token: "X"
      },
      {
        name: playerTwoName,
        token: "O"
      }
    ];
  
    let activePlayer = players[0];
  
    const switchPlayerTurn = () => {
      activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    const getActivePlayer = () => activePlayer;
  
    const printNewRound = () => {
      board.printBoard();
      console.log(`${getActivePlayer().name}'s turn.`);
    };

    const checkWinner=()=>{
        let realBoard=board.getBoard()
        //console.log(realBoard[0][0].getValue())
        // vertical win
        if ((realBoard[0][0].getValue() != 0) && (realBoard[0][0].getValue() === realBoard[1][0].getValue()) &&  (realBoard[1][0].getValue() === realBoard[2][0].getValue())){
            console.log(`${getActivePlayer().name} is the winner`);
            return true;
        }
        else if ( (realBoard[0][1].getValue() != 0) &&(realBoard[0][1].getValue() === realBoard[1][1].getValue()) &&  (realBoard[1][1].getValue() === realBoard[2][1].getValue())){
            console.log(`${getActivePlayer().name} is the winner`);
            return true;
        }
        else if ( (realBoard[0][2].getValue() != 0) &&(realBoard[0][2].getValue() === realBoard[1][2].getValue()) &&  (realBoard[1][2].getValue() === realBoard[2][2].getValue())){
            console.log(`${getActivePlayer().name} is the winner`);
            return true;
        }


        // horizontal win
        else if ( (realBoard[0][1].getValue() != 0) && (realBoard[0][0].getValue() === realBoard[0][1].getValue()) &&  (realBoard[0][1].getValue() === realBoard[0][2].getValue())){
          console.log(`${getActivePlayer().name} is the winner`);
          return true;
            
        }
        else if ((realBoard[1][0].getValue() != 0) && (realBoard[1][0].getValue() === realBoard[1][1].getValue()) &&  (realBoard[1][1].getValue() === realBoard[1][2].getValue())){
              console.log(`${getActivePlayer().name} is the winner`);
              return true;
        }
        else if ( (realBoard[2][0].getValue() != 0) && (realBoard[2][0].getValue() === realBoard[2][1].getValue()) &&  (realBoard[2][1].getValue() === realBoard[2][2].getValue())){
              console.log(`${getActivePlayer().name} is the winner`);
              return true;
        }

        // diaglonal
        else if ((realBoard[0][0].getValue() != 0) &&(realBoard[0][0].getValue() === realBoard[1][1].getValue()) &&  (realBoard[1][1].getValue() === realBoard[2][2].getValue())){
              console.log(`${getActivePlayer().name} is the winner`);
              return true;
        }
        else if ((realBoard[0][2].getValue() != 0) &&(realBoard[0][2].getValue() === realBoard[1][1].getValue()) &&  (realBoard[1][1].getValue() === realBoard[2][0].getValue())){
              console.log(`${getActivePlayer().name} is the winner`);
              return true;
        }
        
        

    }
  
    const playRound = (row, column) => {
      // Drop a token for the current player
      console.log(
        `Dropping ${getActivePlayer().name}'s token into column ${column}...`
      );
      board.dropToken(row, column, getActivePlayer().token);
  
      /*  This is where we would check for a winner and handle that logic,
          such as a win message. */
      
        //checkWinner()
        //console.log(checkWinner())
      if(checkWinner()=== true){

        board.printBoard()
        //console.log("game over!!");
        return console.log("game over!!");}
        //return 
      //}
      // Switch player turn
      switchPlayerTurn();
      printNewRound();
    };
  
    // Initial play game message
    printNewRound();
  
    // For the console version, we will only use playRound, but we will need
    // getActivePlayer for the UI version, so I'm revealing it now
    return {
      playRound,
      getActivePlayer,
      getBoard: board.getBoard,
      checkWinner
    };
  }

  function ScreenController() {
    const game = GameController();
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');
    const winnerText= document.querySelector(".winner")
  
    const updateScreen = () => {
      // clear the board
      boardDiv.textContent = "";
  
      // get the newest version of the board and player turn
      const board = game.getBoard();
      const activePlayer = game.getActivePlayer();
  
      // Display player's turn
      playerTurnDiv.textContent = `${activePlayer.name}'s turn...`
  
      // Render board squares
      board.forEach((row,index) => {
        // let rowNum =document.createElement("button");;
        // rowNum.classList.add("row")
        // rowNum.dataset.row= index;
        // boardDiv.appendChild(rowNum);
        let rownum= index;
        //cellButton.dataset.column = index
        row.forEach((cell, index) => {
          // Anything clickable should be a button!!
          const cellButton = document.createElement("button");
          cellButton.classList.add("cell");
          // Create a data attribute to identify the column
          // This makes it easier to pass into our `playRound` function 
          cellButton.dataset.row= rownum;
          cellButton.dataset.column = index
          cellButton.textContent = cell.getValue();
          boardDiv.appendChild(cellButton);
        })
      })
    }
  
    // Add event listener for the board
    function clickHandlerBoard(e) {
      const selectedColumn = e.target.dataset.column;
      const selectedRow = e.target.dataset.row;
      console.log(selectedColumn)
      console.log(selectedRow)
      // Make sure I've clicked a column and not the gaps in between
      if (!selectedColumn) return;
      if(!selectedRow) return;
      //console.log(selectedRow);
    //   if(game.checkWinner()=== true){
    //     console.log("game over!!")
        
    //     winnerText.textContent += " whoever won";
    //     //boardDiv.appendChild(winnerText);
    //   }
      game.playRound(selectedRow, selectedColumn);
    //   if(game.checkWinner()=== true){
    //     console.log("game over!!")
        
    //     winnerText.textContent += " whoever won";
    //     //boardDiv.appendChild(winnerText);
    //   }
      updateScreen();
    }
    boardDiv.addEventListener("click", clickHandlerBoard);
  
    // Initial render
    updateScreen();
  
    // We don't need to return anything from this module because everything is encapsulated inside this screen controller.
  }
  
  ScreenController();

  