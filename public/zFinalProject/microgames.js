







// Start the game
function microgamesSceneSequence()
{

}







class GameManager
{
    constructor(floorList = [])
    {
        this.lives = 4
        this.difficulty = 1
        this.speed = 1 
        this.score = 0 // 0 = G, 1 = Floor 1, 2 = Floor 2, etc. There is no microgame on floor G
        this.floorList = floorList // ["floorname", "speed+1", "floorname", "boss", "floornameBoss"]
        this.currentFloorListIndex = 0
        this.interruptOnNextFloor = false // Shouldnt have to use this, but just in case
    }



    async processFloorList()
    {
        
        // TODO: Play intro to minigame section
        // TODO: Play the music intro

        while(this.interruptOnNextFloor == false)
        {
            currentIndexActions = this.floorList[this.currentFloorListIndex].split(" ")

            switch(currentIndexActions[0])
            {   
                case "microgame":
                    currentIndexActions[1] // name of the microgame to get the microgame from the allmicrogames list
                    
                    // Increase the score number and play its animation
                    // jingle
                    // Call microgame load function
                    // Display splash text
                    // Elevator doors open

                    // Transfer control over to the microgame 
                    // Load a bomb?
                    // Await for microgame to finish by calling that finish function
                    
                    // Close elevator doors
                    
                    // if win, play win sound, and win jingle
                    // if lose, play lose sound and lose jingle, and decrease lives
                    
                    break
                case "promotion":
                    currentIndexActions[1] // "+1" "1" "-1"
                    currentIndexActions[2] // "YourNewTitle"
                    // Play the promotion animation and jingle
                    break
                case "end":
                    // Increase the score number and play its animation
                    // Play the boss animation
                    // Play the boss animation music
                    // End the game and transition to platformer_bossFight.html
                    break
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






// TODO: figure out how to structure da microgames







let AllMicrogames = 
{
    // "MicrogameName" : new Microgame(dsklfj, sdlfj)
}










/*
Floor/Microgame class:
    - Floor element that is a div that fills the whole screen
        - Contains all the game elements

    - Timer integer in beats(make the default value be inherited from the gameManager)

    - An async function that is called to load the floor 
        - Loads the floor's assets
        - Returns the splashtext for the floor (so the splashtext can be dynamic)

    - An async function that is called when the floor starts
        - Takes the floor's difficulty as an input
        - Takes the floor's speed as an input 
        - Should play the music dependant on the speed

    - An async function that is called whevener the timer increments or decrements
        - Takes the current time as an input (increases from 0 if the floor has no time limit) (decreases to 0 if the floor has a time limit)

    - An async function that is called that returns whether the player has won or lost the game 
        - called when time is up for timed floors
        - called immediately, then awaited to signify the end of the floor for nontimed floors
        - returns a bool for whether the player has won or lost the game
    
    - An async function that is called when the floor is hidden by the elevators and is ready to be unloaded
        - unload the floor's assets
*/
class Microgame
{
    constructor()
    {

    }
}

