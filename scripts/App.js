/**
*    @author:         Tauan Binato Flores {@link mailto:pg10tauan@vfs.com}
*    @version:        1.0.0
*
*    @summary:        Battleship game. This entire file is responsable for SOUND , SFX , randomization of ships inside
                      a 10x10 matriz (size changeable) and controling user inputs.
*/
'use strict';

/*
 * The Game
 *
*/

//Matriz Constants
const MAX_ROWS = 10;
const MAX_COLS = 10;
const TOTAL_SHIPS = 5;
const SHIP_EXCEPTION = 4;

//Sound MUS/SFX Volume Constants
const GAME_PLAY_MUS   = 30;
const LASER_SHOOT_SFX = 40;
const ONE_HIT_SFX     = 80;

//Score Gained Constants
const LOW_SHIP_SINKED  = 200;
const MID_SHIP_SINKED  = 500;
const HIGH_SHIP_SINKED = 1000;
const LOSS_ON_MISS     = 50;

//Map Matriz
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

//Ships hits
let ship_size2_hits   = 0;
let ship_size3_hits   = 0;
let ship_size4_hits   = 0;
let ship_size4_2_hits = 0;
let ship_size5_hits   = 0;

//Player shoots
let playerShoots      = 45;
//Player score
let playerScore       = 0;


//Class App ======================================================================================================================
class App{


  constructor(){

    //Randomize ships inside matrizMap
    this.putShipsInMatriz();

    console.log(mapMatriz[0]+"\n"+ mapMatriz[1] +"\n"+ mapMatriz[2] +"\n"+ mapMatriz[3] +"\n"+ mapMatriz[4] +"\n"
    + mapMatriz[5] +"\n"+ mapMatriz[6] +"\n"+ mapMatriz[7] +"\n"+ mapMatriz[8] +"\n"+ mapMatriz[9]);


    //Initialize Visual Grid
    this.initGrid();
    //Initialize Shoots in screen
    this.initPlayerShoots();

    //Init all audio
    this.initGameMenuSound();

    //Setup handlers
    this.setupHandlers();

  }

  /* ============================================================================================================================== */
  /* ============================================================================================================================== */
  /* ====================================================== SOUND/SFX STUFF ===================================================== */
  /* ============================================================================================================================== */
  /* ============================================================================================================================== */

  initGameMenuSound()
  {
    var sound = new buzz.sound("assets/sciAudio.mp3");
    sound.load();
    //sound.loop().play();
    sound.setVolume(GAME_PLAY_MUS);
  }

  playMissSound()
  {
    var sound = new buzz.sound("assets/SFX/SFX_LaserShoot.wav");
    sound.load();
    sound.play();
    sound.setVolume(LASER_SHOOT_SFX);
  }

  playHitSound()
  {
    var sound = new buzz.sound("assets/SFX/SFX_OneBlockHit.wav");
    sound.load();
    sound.play();
    sound.setVolume(ONE_HIT_SFX);
  }

  /* ============================================================================================================================== */
  /* ============================================================================================================================== */
  /* ====================================================== Draw STUFF ============================================================ */
  /* ============================================================================================================================== */
  /* ============================================================================================================================== */

  //Draw an table 10x10 using for loops (Can change MAX values using constants)
  initGrid()
  {

    let gameGrid = '<table id="game-map">';
    for (var r = 0; r < MAX_ROWS;r++)
    {
        gameGrid += '<tr>';
        for (var c = 0; c < MAX_COLS; c++)
        {
            gameGrid += `<td align="center" data-row="${r}" data-col="${c}"></td>`;
        }
        gameGrid += '</tr>';
    }
    gameGrid += '</table>';

    document.querySelector(".tableContainer").innerHTML = gameGrid;
  }

  //Draw the variable number of shoots on screen
  initPlayerShoots()
  {
    $('#numberOfShoots').text(`${playerShoots}`);
  }

  //Draw the NEW variable number of shoots on screen
  reduceShoots()
  {
    //Reduce player shoots
    playerShoots--;

    if(playerShoots < 0)
    playerShoots = 0;

    //Changing on Screen
    $('#numberOfShoots').text(`${playerShoots}`);
  }

  //Draw the variable number score on screen
  initPlayerScore()
  {
    $('#numberOfScore').text(`${playerScore}`);
  }

  //Draw gain score on screen
  increaseScore(valueToIncrease)
  {
    //Increase player score
    playerScore += valueToIncrease;

    //Changing on Screen
    $('#numberOfScore').text(`${playerScore}`);
  }

  //Draw gain score on screen
  reduceScoreOnMiss()
  {
    //Increase player score
    playerScore -= LOSS_ON_MISS;

    if(playerScore < 0)
    playerScore = 0;

    //Changing on Screen
    $('#numberOfScore').text(`${playerScore}`);
  }


  /* ============================================================================================================================== */
  /* ============================================================================================================================== */
  /* ====================================================== USER INPUTS (Handlers) ================================================ */
  /* ============================================================================================================================== */
  /* ============================================================================================================================== */

  //Check if one kind of ship was sinked. if it is change the element class and give respective score multiply.
  checkIfShipSinked()
  {

    if(ship_size2_hits == 2)
    {
      $("#ship_Size2").addClass("shipImage5Sinked");
      console.log("2 sinked");
      this.increaseScore(LOW_SHIP_SINKED);
      ship_size2_hits = 0;

    }
    if(ship_size3_hits == 3)
    {
      $("#ship_Size3").addClass("shipImage4Sinked");
      console.log("3 sinked");
      this.increaseScore(LOW_SHIP_SINKED);
      ship_size3_hits = 0;
    }
    if(ship_size4_hits == 4 && ship_size4_2_hits == 0)
    {
      $("#ship_Size4").addClass("shipImage2Sinked");
      console.log("4 sinked");
      this.increaseScore(MID_SHIP_SINKED);
      ship_size4_hits = 0;
    }
    if(ship_size4_2_hits == 4)
    {
      $("#ship_Size42").addClass("shipImage3Sinked");
      console.log("4.2 sinked");
      this.increaseScore(MID_SHIP_SINKED);
      ship_size4_2_hits = 0;
    }
    if(ship_size5_hits == 5)
    {
      $("#ship_Size5").addClass("shipImage1Sinked");
      console.log("5 sinked");
      this.increaseScore(HIGH_SHIP_SINKED);
      ship_size5_hits = 0;
    }

  }

  restartClickHandler()
  {
    //Check for an event click inside game container.
    $('.restart').click((event) =>
    {
      window.location.reload();
    });
  }

  //Shoot handler is responsable of controling user clicks inputs and check if a ship was sinked.
  shoot_Handler()
  {

    //Check for an event click inside game container.
    $('.tableContainer').click((event) =>
    {
      let element = $(event.target);
      let pos =
      {
        row:    element.data('row'),
        column: element.data('col')
      };

        //handlering undefined clicks
        if(pos.row != undefined && pos.column != undefined)
        {

          //Reduce shoots
          this.reduceShoots();

          //Get what number is inside the matriz given a position.
          var matrizNum = mapMatriz[pos.row][pos.column];

          //Check if the shoot has been already made it. If it is mark as -1 to be handled by default.
          if(element.prop('classList').length > 0)
          {
              matrizNum = -1;
          }

          //Check shoot hits types and miss based on the number found in position
          switch (matrizNum)
          {
            case 2:
              this.playHitSound()
              element.addClass('explosion-gif');
              ship_size2_hits++;
              this.checkIfShipSinked();
              break;

            case 3:
              this.playHitSound()
              element.addClass('explosion-gif');
              ship_size3_hits++;
              this.checkIfShipSinked();
              break;

            case 4:
              this.playHitSound()
              element.addClass('explosion-gif');
              ship_size4_hits++;
              if(ship_size4_hits > 4)
               {
                 ship_size4_2_hits++;
               }
              this.checkIfShipSinked();
              break;

            case 5:
              this.playHitSound()
              element.addClass('explosion-gif');
              ship_size5_hits++;
              this.checkIfShipSinked();
              break;

            default:
              if(matrizNum == -1)
                {
                  break;
                }
              this.playMissSound();
              element.addClass('miss-ship');
              this.reduceScoreOnMiss();
              break;

          }

        }
    });

  }

  //Hanlder Game
  setupHandlers()
  {
    this.shoot_Handler();
    this.restartClickHandler();
  }

/* ================================================================================================================================= */
/* ================================================================================================================================= */
/* ====================================================== RANDOMIZING SHIPS ======================================================== */
/* ================================================================================================================================= */
/* ================================================================================================================================= */

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

  //Get a rundem number between two values (min <= x < max)
  getRandomInt(min, max)
  {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  //Check inside one array if one number is there ,
  //this function allows one exception number to exist twice inside the array.
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

  //Check if the number is inside matriz scope.
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

    //Check horizontal insertion ====================================================================================================
    if (insertionType == 0)
    {
      //Here we walk on columns
      while (count < shipSize)
      {
          //Check if reach the maximum range of the matriz
          if(this.checkIfMatrizMaxiumWasReached(column))
          {
            return false;
          }

          //Check if there is something diferent from 0 inside the given position.
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

      //Went through everything so inserted correctly.
      return true;
    }

    //Check vertical insertion =======================================================================================================
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

        //Check if there is something diferent from 0 inside the given position.
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

      //Went through everything so inserted correctly.
      return true;
    }


  }

  //Check and put all total ships inside the matriz ===================================================================================
  putShipsInMatriz()
  {

    //Function variables
    let shipsPlaced = 0;
    let shipsAlreadyPlaced = new Array(5);
    let indexCounter = 0;



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
//=====================================================================================================================================

} //end of App class

//Create an app instance.
let app = new App();
