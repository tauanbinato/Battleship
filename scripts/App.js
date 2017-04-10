/**
*    @author:         Tauan Binato Flores {@link mailto:pg10tauan@vfs.com}
*    @version:        1.0.0
*
*    @summary:        Basic app javascript front end handler, this class is responsable
*                     of showing on the screen all feedbacks and UI atributes.
*/
'use strict';

/*
 * The Game
 *
*/

//Constants
const MAX_ROWS = 10;
const MAX_COLS = 10;
const TOTAL_SHIPS = 5;
const SHIP_EXCEPTION = 4;


let mapMatriz =
[
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0]
];

class App{


  constructor(){

    alert(mapMatriz[0]+"\n"+ mapMatriz[1] +"\n"+ mapMatriz[2] +"\n"+ mapMatriz[3] +"\n"+ mapMatriz[4] +"\n"
    + mapMatriz[5] +"\n"+ mapMatriz[6] +"\n"+ mapMatriz[7] +"\n"+ mapMatriz[8] +"\n"+ mapMatriz[9]);
    //Put ships in matriz
    this.putShipsInMatriz();

    //Map
    //Initialize screen
    this.initGrid();
    //Setup handlers
    this.setupHandlers();

    alert(mapMatriz[0]+"\n"+ mapMatriz[1] +"\n"+ mapMatriz[2] +"\n"+ mapMatriz[3] +"\n"+ mapMatriz[4] +"\n"
    + mapMatriz[5] +"\n"+ mapMatriz[6] +"\n"+ mapMatriz[7] +"\n"+ mapMatriz[8] +"\n"+ mapMatriz[9]);
  }


  initGrid(){

    let gameGrid = '<table id="game-map">';
    for (var r = 0; r < MAX_ROWS;r++) {
        gameGrid += '<tr>';
        for (var c = 0; c < MAX_COLS; c++) {
            gameGrid += `<td align="center" data-row="${r}" data-col="${c}"></td>`;
        }
        gameGrid += '</tr>';
      }
      gameGrid += '</table>';

    document.querySelector("#game-area").innerHTML = gameGrid;
  }



  setupHandlers(){

    let d = document.querySelector("#game-area");
      d.addEventListener('click' , (event) => {
          //get the target of the event
          let theCellEl = event.target;


          //get the data-row and data-col
          let pos = {
            r: theCellEl.getAttribute('data-row'),
            c: theCellEl.getAttribute('data-col')
          };

          if(pos.r){
            theCellEl.className = "miss-ship";
          }


      });

  }

/* ============================================================================================================================== */
/* ============================================================================================================================== */
/* ====================================================== RANDOMIZING SHIPS ===================================================== */
/* ============================================================================================================================== */
/* ============================================================================================================================== */

  //Check inside a matriz if one of the ships is there.
  checkIfIsThere( i ,  j)
  {
    let number = mapMatriz[i][j];

    if (number != 0)
    {
     return true;
    }
    return false;
  }

  //Get a rundem number between two values
  getRandomInt(min, max)
  {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  //Check inside one array if one number is there , this function allows one exception number to exist twice inside the array.
  checkIfShipHasAlreadyBeenInserted(shipsArray , ship ){

    let numberOfException = 0;
    let maxException = 2;
    let isThere = 0;

    for (var i = 0; i < shipsArray.length; i++)
    {
      if(shipsArray[i] == ship)
      {
        if(shipsArray[i] == SHIP_EXCEPTION)
        {
          numberOfException++;

        }
        isThere++;
      }

    }

    if(numberOfException == 1){
      return false;
    }
    else if(numberOfException > maxException){
      return true;
    }
    else if(isThere > 0)
    {
      return true;
    }
    else
    {
      return false;
    }

  }

  //Get diferent size ships
  getShipBySize(size)
  {

    let Ships = {
      ship_5s: 5,
      ship_4s: 4,
      ship_3s: 3,
      ship_2s: 2
    };

     switch (size)
     {
         case 5:
           return Ships.ship_5s;
           break;

         case 4:
           return Ships.ship_4s;
           break;

         case 3:
           return Ships.ship_3s;
           break;

         case 2:
           return Ships.ship_2s;
           break;

       default:
           return 0;
     }

  }

  checkIfMatrizMaxiumWasReached(rOc)
  {
    if(rOc >= MAX_ROWS - 1)
    {
      return true;
    }
    return false;
  }

  //Try to put a ship in a matriz , returns true if succeed else returns false.
  checkMatrizPositionAndPutShip(row ,column ,insertionType ,shipSize)
  {

    /* insertionType = 0 : horizontal
       insertionType = 1 : vertical
    */

    //Counter
    let count = 0;

    //Saving row and column for insertion.
    let rowSaved = row;
    let columnSaved = column;

    //If there is someone there returns false.
    let isNotAvailable = this.checkIfIsThere( row , column);
    if(isNotAvailable)
    {
     return false;
    }

    //Check horizontal insertion ===========================================================
    if (insertionType == 0)
    {
      //Here we walk on columns or J
      while (count < shipSize)
      {
          //Check if reach the maximum range of the matriz
          if(this.checkIfMatrizMaxiumWasReached(column))
          {
            return false;
          }

          isNotAvailable = this.checkIfIsThere( row , column);
          if(isNotAvailable)
          {
            return false;
          }

        //Increment only the column to walk horitonzaly right in matriz.
        column++;
        count++;
      }

      //Reseting for insertion
      count = 0;
      column = columnSaved;
      //Put ship number there
      while (count < shipSize)
      {
        mapMatriz[row][column] = shipSize;
        column++;
        count++;
      }

      return true;
    }

    //Check vertical insertion ===========================================================
    if (insertionType == 1)
    {
      //Here we walk on columns or J
      while (count < shipSize)
      {
        //Check if reach the maximum range of the matriz
        if(this.checkIfMatrizMaxiumWasReached(row))
        {
          return false;
        }

        isNotAvailable = this.checkIfIsThere( row , column);
        if(isNotAvailable)
        {
          return false;
        }

        //Increment only the column to walk horitonzaly right in matriz.
        row++;
        count++;
      }

      //Reseting for insertion
      count = 0;
      row = rowSaved;
      //Put ship number there
      while (count < shipSize)
      {
        mapMatriz[row][column] = shipSize;
        row++;
        count++;
      }

      return true;
    }


  }


  putShipsInMatriz()
  {

    let shipsPlaced = 0;
    let shipsAlreadyPlaced = new Array(5);
    let indexCounter = 0;


      //Check and put all horizontal ships **********************************************************************************
      while(shipsPlaced < TOTAL_SHIPS)
      {
          //Get Random ShipSize   (2 <= x < 6)
          let rndShip = this.getRandomInt(2,6);
          let shipSize = this.getShipBySize(rndShip);

          //Check if the ship has already been inserted and try until find one new. (exception of 4 size ship)
            while(this.checkIfShipHasAlreadyBeenInserted(shipsAlreadyPlaced , shipSize) != false)
            {
              //Get new Random ShipSize   (2 <= x < 6)
              shipSize = this.getShipBySize(this.getRandomInt(2,6));
            }

          //Get Random Point (0 <= x < 10)
          let row = this.getRandomInt(0,10);
          let column = this.getRandomInt(0,10);
          //Get Random insertionType (0 <= x < 2)
          let RowOrColumn = this.getRandomInt(0,2);

          //Try insertion
          var isTrue = this.checkMatrizPositionAndPutShip(row,column,RowOrColumn, shipSize);

          //Only increment if the function succeeded in insertion.
          if(isTrue)
          {
              shipsPlaced++;
              shipsAlreadyPlaced[indexCounter] = shipSize;
              indexCounter++;
          }

      }



  }



}


let app = new App();
