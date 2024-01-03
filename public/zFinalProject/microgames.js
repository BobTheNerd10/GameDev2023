/*
Microgame ideas
        Level 1 games
            - Make coffee
            - Spin on an office chair (this isnt work, what)
            - Spam click to drink a cup of coffee
            - Make and throw a paper airplane (this isnt work, what)
            - Water office plants
            - Mop/sweep the floors
            - Take out the trash
        Level 2 games
            - Sharpen a pencil    
            - Shred papers
            - Look busy (spam click) (this isnt work, what)
            - Put out a fire (??? this one is kinda bad)
            - Help give a presentation
            - Get some water from the water cooler
            - Organize papers to make them even (click in rhythm)
        Level 3 games
            - Hire and fire people (hire the ill witted "qualified" people, fire the moral people who made mistakes)
            - Buy low, sell high
            - Sign on the dotted line
            - higher ups decision making
            - Delete confidential documents (digital)
        Boss game (floor 20)
            - final level (corner office, "Boss" fight) (see below)




Todo in this file
    TONS OF STUFF
*/


// Start the game
async function microgamesSceneSequence()
{
    sounds.buttonPress.play()

    let elevatorElement = document.querySelector('elevator')

    let bombElement = document.querySelector('bomb')

    let eventList = 
    [
        // Level 1 games
        'microgame',
        'microgame',
        'microgame',
        'microgame',
        'microgame',
        'microgame',
        'microgame',
        'promotion 1',
        // Level 2 games
        'microgame',
        'microgame',
        'microgame',
        'microgame',
        'microgame',
        'microgame',
        'microgame',
        'promotion 1',
        // Level 3 games
        'microgame',
        'microgame',
        'microgame',
        'microgame',
        'microgame',
        // Boss
        'end'



    ]

    let gameManagerInstance = new GameManager(elevatorElement, bombElement, eventList)


    await gameManagerInstance.processEventList()



    //window.location.href = "platformer_bossFight.html";
}










// For time based things
const sleep = ms => new Promise(r => setTimeout(r, ms)); 


let sounds = 
{
    "intro"              : new Audio('sound/microgames/level1_intro.ogg'),
    "levelUp"            : new Audio('sound/microgames/level2_intro.ogg'),
    "jingle"             : new Audio('sound/microgames/level1_jingle.ogg'),
    "win"                : new Audio('sound/microgames/level1_win.ogg'),
    "gameOver"           : new Audio('sound/microgames/levelX_gameOver.ogg'),
    "lose"               : new Audio('sound/microgames/levelX_lose.ogg'),

    
    "level1_intro"       : new Audio('sound/microgames/level1_intro.ogg'),
    "level1_jingle"      : new Audio('sound/microgames/level1_jingle.ogg'),
    "level1_win"         : new Audio('sound/microgames/level1_win.ogg'),
    "level2_intro"       : new Audio('sound/microgames/level2_intro.ogg'),
    "level2_jingle"      : new Audio('sound/microgames/level2_jingle.ogg'),
    "level2_win"         : new Audio('sound/microgames/level2_win.ogg'),
    "level3_intro"       : new Audio('sound/microgames/level3_intro.ogg'),
    "level3_jingle"      : new Audio('sound/microgames/level3_jingle.ogg'),
    "level3_win"         : new Audio('sound/microgames/level3_win.ogg'),
    "levelEndless_intro" : new Audio('sound/microgames/levelEndless_intro.ogg'),
    "levelX_gameOver"    : new Audio('sound/microgames/levelX_gameOver.ogg'),
    "levelX_lose"        : new Audio('sound/microgames/levelX_lose.ogg'),
    

    "buttonPress"        : new Audio('sound/microgames/buttonPress.ogg'),
}

// 1714 ms = 4 beats
let beatsPerMinute = 140
let minutesPerBeat = 1 / beatsPerMinute
let secondsPerBeat = minutesPerBeat * 60
let beatLengthInMs = secondsPerBeat * 1000


class GameManager
{
    constructor(elevatorDiv, bombElement, eventList = [])
    {
        this.elevatorDiv = elevatorDiv
        this.bombElement = bombElement
        this.lives = 4
        this.level = 1
        this.score = 0 // 0 = G, 1 = Floor 1, 2 = Floor 2, etc. There is no microgame on floor G
        this.eventList = eventList 
        this.currentEventListIndex = 0
        this.interruptOnNextEvent = false // Shouldnt have to use this, but just in case

        this.playerHasWon = false // set upon game over or upon win
    }
    

    


    async processEventList(currentEventIndex = 0)
    {
        
        sounds.intro.play()
        await sleep(beatLengthInMs * 8)

        while(true)
        {
            let currentEvent = this.eventList[currentEventIndex].split(" ")
            console.log(currentEvent)
            // currentEvent is a list
            // Index 0 is the type of event, every index after it is the parameters for the event (such as the promotion or the microgames)

            switch(currentEvent[0])
            {   
                case "microgame":
                    //currentEvent[1] // name of the microgame to get the microgame from the allmicrogames list
                    
                    //currentMicrogame = AllMicrogames[currentEvent[1]]

                    //currentMicrogame.loadMicrogame()
                    this.score += 1

                    sounds.jingle.play()
                    await sleep(beatLengthInMs * 4)
                    // Play the number increase animation

                    // Await for the jingle to be almost over

                    /*
                    // Display the splashtext
                    currentMicrogame.splashtext

                    // Open the elevator doors

                    //currentMicrogame.microgameStart()
                    
                    
                    //currentTime = currentMicrogame.time

                    while(currentTime > 0)
                    {
                        // Play the bomb's tick animation
                        currentMicrogame.timerUpdate(currentTime)
                        

                        // Await 1 beat/time increment

                        currentTime--


                    }

                    // Bomb explodes
                    currentMicrogame.timerUpdate(currentTime) // Should always be 0

                    currentMicrogame.microgameEnd()
                    playerHasWon = currentMicrogame.playerHasWon

                    // Close elevator doors

                    currentMicrogame.unloadMicrogame()
                    

                    */

                    let playerHasWon = true // TEMPORARY
                    if(playerHasWon)
                    {
                        sounds.win.play()
                        await sleep(beatLengthInMs * 4)
                    }
                    else
                    {
                        sounds.lose.play()
                        await sleep(beatLengthInMs * 4)

                        this.lives = this.lives - 1
                    }

                    break



                case "promotion":
                    currentEvent[1] // "1"
                    currentEvent[2] // "YourNewTitle"

                    this.level += Number(currentEvent[1])

                    // Play the promotion animation and jingle
                    sounds.levelUp.play()

                    switch(this.level){
                        case 1:
                            sounds.jingle  = sounds.level1_jingle
                            sounds.win     = sounds.level1_win
                            sounds.levelUp = sounds.level2_intro
                            break
                        case 2:
                            sounds.jingle  = sounds.level2_jingle
                            sounds.win     = sounds.level2_win
                            sounds.levelUp = sounds.level3_intro
                            break
                        case 3:
                            sounds.jingle  = sounds.level3_jingle
                            sounds.win     = sounds.level3_win
                            sounds.levelUp = sounds.levelEndless_intro
                            break

                    }

                    await sleep(beatLengthInMs * 8)


                    // It has coffee in it hehe (maybe not)
                    // Effectively speeds up the game (maybe not)
                    break


                    
                case "end":
                    // Increase the score number and play the number animation (in practice, it'll happen on floor 20)
                    // Play some sort of transition
                    this.playerHasWon = true
                    
                    sounds.levelEndless_intro.play()
                    await sleep(beatLengthInMs * 8)
                    return



                default:
                    console.error(`Invalid eventList event: ${currentEvent[0]}`)
                    break
            }


            // Is the player out of lives
            if(this.lives <= 0)
            {
                // Play game over sequence
                sounds.gameOver.play()
                this.playerHasWon = false
                return 
            }

            // Increase the floor count and roll over if it's higher than the total amount of floors
            currentEventIndex++
            if  (currentEventIndex >= this.eventList.length)  {currentEventIndex = 0}
        }
    }
}



/*
========================================================================================================================================================
Microgames beyond this point   Microgames beyond this point   Microgames beyond this point   Microgames beyond this point   Microgames beyond this point
========================================================================================================================================================
*/


let AllMicrogames = 
{
    // "MicrogameName" : new MICROGAMECLASS()
}



// Base microgame class (never used in of itself. Only used as a base)
class Microgame
{
    constructor(htmlDiv)
    {
        this.htmlDiv = htmlDiv
    }

    time = 7
    splashtext = "Do the thing!"
    

    // Called when the elevator doors are still closed (at the start of the jingle before the microgame)
    loadMicrogame()
    {
        // Loads the floor's assets and makes them visible behind the elevator door
        // This can set the timer variable and splashtext variable if needed
    }


    // Called when the elevator doors are fully open
    microgameStart()
    {
        // play the microgame's music and do any other microgame initialization
    }


    // Called every timer tick. Can be used to sync up stuff in the game with the timer
    timerUpdate(timerTick = this.time)
    {

    }

    // Called when the timer tick = 0, IE when the bomb explodes, IE when the game is over and the doors are about to close
    microgameEnd()
    {

    }


    // Returns a bool for whether the player has won the microgame
    get playerHasWon()
    {
        return true // temporary
    }


    // Called when doors are fully closed and the win/lose jinge is playing
    // Hide the microgame's assets and html div
    unloadMicrogame()
    {

    }
}
