







// Start the game
function microgamesSceneSequence()
{
    /*
        Create the event list
        Create new game manager
        Set the parameters for the game manager

        await processEventList

        goto platformer_bossFight.html
    */
}







class GameManager
{
    constructor(eventList = [])
    {
        this.lives = 4
        this.speed = 1 
        this.score = 0 // 0 = G, 1 = Floor 1, 2 = Floor 2, etc. There is no microgame on floor G
        this.eventList = eventList // ["floorname", "speed+1", "floorname", "boss", "floornameBoss"]
        this.currentEventListIndex = 0
        this.interruptOnNextEvent = false // Shouldnt have to use this, but just in case
    }



    async processEventList()
    {
        
        // TODO: Play intro to minigame section
        // TODO: Play the music intro

        while(this.interruptOnNextEvent == false)
        {
            currentEvent = this.eventList[this.currentEventListIndex].split(" ")
            // currentEvent is a list
            // Index 0 is the type of event, every index after it is the parameters for the event (such as the promotion or the microgames)

            switch(currentIndexActions[0])
            {   
                case "microgame":
                    currentIndexActions[1] // name of the microgame to get the microgame from the allmicrogames list
                    
                    /*

                    Get the microgame by name
                    Call loadMicrogame function from the microgame (loads the game behind the elevator and returns the splashtext)
                    
                    Play jingle and jingle animation
                    Increase the score number and play the number animation during the jingle

                    Show the splashtext
                    open the elevator doors

                    call MicrogameStart
                    
                    get the timer variable from the microgame

                    until time = 0    
                        Tick down the timer and spawn the timer bomb if needed

                    MicrogameEnd()

                    Elevator doors close

                    unload microgame

                    if PlayerHasWon()
                        play win sound, and win jingle
                    else
                        play lose sound and lose jingle, and decrease lives

                    */
                    
                    break



                case "promotion":
                    currentIndexActions[1] // "+1" "1" "-1"
                    currentIndexActions[2] // "YourNewTitle"


                    // Play the promotion animation and jingle
                    // It has coffee in it hehe
                    break


                    
                case "end":
                    // Increase the score number and play the number animation (in practice, it'll happen on floor 20)
                    // Play some sort of transition
                    // End the game by returning
                    return



                default:
                    console.error(`Invalid FloorList action: ${currentIndexActions[0]}`)
                    break
            }


            // Is the player out of lives
            if(this.lives <= 0)
            {
                // TODO: Play game over sequence
                // TODO: Play game over music
            }

            // Increase the floor count and roll over if it's higher than the total amount of floors
            this.currentFloorListIndex++
            if  (this.currentFloorListIndex >= this.floorList.length)  {this.currentFloorListIndex = 0}
        }
    }
}








let AllMicrogames = 
{
    // "MicrogameName" : new MICROGAMECLASS()
}








/*
================================================================================================================================================================
Microgame classes beyond this point   Microgame classes beyond this point   Microgame classes beyond this point   Microgame classes beyond this point   
================================================================================================================================================================
*/





// Base microgame class (never used in of itself. Only used as a base)
class Microgame
{
    constructor(htmlDiv)
    {
        this.htmlDiv = htmlDiv
    }

    timer = 7
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
    timerUpdate(timerTick = this.timer)
    {

    }

    // Called when the timer tick = 0, IE when the bomb explodes, IE when the game is over and the doors are about to close
    microgameEnd()
    {

    }


    get playerHasWon()
    {
        return true // TODO change me to be the conditional
    }


    // Called when doors are fully closed and the win/loss jinge is playing
    // Hide the microgame's assets and html div
    unloadMicrogame()
    {

    }

}



