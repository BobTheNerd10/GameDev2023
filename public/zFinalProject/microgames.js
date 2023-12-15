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
    let elevatorElement = document.querySelector('elevator')

    let bombElement = document.querySelector('bomb')

    let eventList = 
    [
        // Level 1 games
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        'promotion +1',
        // Level 2 games
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        'promotion +1',
        // Level 3 games
        '',
        '',
        '',
        '',
        '',
        // Boss
        'end'



    ]

    let gameManagerInstance = new GameManager(elevatorElement, bombElement, eventList)


    await gameManagerInstance.processEventList()



    //window.location.href = "platformer_bossFight.html";
}



// For time based things
const sleep = ms => new Promise(r => setTimeout(r, ms)); 





class GameManager
{
    constructor(elevatorDiv, bombElement, eventList = [])
    {
        this.elevatorDiv = elevatorDiv
        this.bombElement = bombElement
        this.lives = 4
        this.speed = 1 
        this.score = 0 // 0 = G, 1 = Floor 1, 2 = Floor 2, etc. There is no microgame on floor G
        this.eventList = eventList 
        this.currentEventListIndex = 0
        this.interruptOnNextEvent = false // Shouldnt have to use this, but just in case

        this.playerHasWon = false // set upon game over or upon win
    }
    

    


    async processEventList(currentEventIndex = 0)
    {
        
        // Play intro to minigame section

        while(true)
        {
            currentEvent = this.eventList[currentEventIndex].split(" ")
            // currentEvent is a list
            // Index 0 is the type of event, every index after it is the parameters for the event (such as the promotion or the microgames)

            switch(currentEvent[0])
            {   
                case "microgame":
                    currentEvent[1] // name of the microgame to get the microgame from the allmicrogames list
                    
                    currentMicrogame = AllMicrogames[currentEvent[1]]

                    currentMicrogame.loadMicrogame()
                    this.score += 1

                    // Play the jingle
                    // Play the number increase animation

                    // Await for the jingle to be almost over

                    // Display the splashtext
                    currentMicrogame.splashtext

                    // Open the elevator doors

                    currentMicrogame.microgameStart()
                    
                    
                    currentTime = currentMicrogame.time

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

                    if(playerHasWon)
                    {
                        // play the win jingle
                    }
                    else
                    {
                        // play the lose jingle
                        this.lives = this.lives - 1
                    }

                    break



                case "promotion":
                    currentEvent[1] // "+1" "1" "-1"
                    currentEvent[2] // "YourNewTitle"


                    // Play the promotion animation and jingle
                    // It has coffee in it hehe
                    // Effectively speeds up the game
                    break


                    
                case "end":
                    // Increase the score number and play the number animation (in practice, it'll happen on floor 20)
                    // Play some sort of transition
                    this.playerHasWon = true
                    return



                default:
                    console.error(`Invalid eventList event: ${currentEvent[0]}`)
                    break
            }


            // Is the player out of lives
            if(this.lives <= 0)
            {
                // Play game over sequence
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


    // Called when doors are fully closed and the win/loss jinge is playing
    // Hide the microgame's assets and html div
    unloadMicrogame()
    {

    }
}
