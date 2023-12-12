/*
    Make it like Wario Ware Incorporated
    Make it to floor 20
    Have the game controlled only using the mouse
       


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

    

    Game progression
        Intro cutscene 
            - Late for work
            - Running out of the house to work
        Mandatory Level 1 using ellis's template
            - Getting to work 
        Cutscene
            - Showing up at the reception
            - Boss is busy yelling at some other people for something stupidly minor
            - Boss sees you, is angry, and tells you to hop in the elevator and get to work
            - Boss tells you a few promotions may be in order if you get it done fast enough ("despite your tardiness, you've been a valuable asset to the company")
            - Hop in the elevator
            - Boss's title is shown in the cutscene (foreshadowing for when you'll replace him)
            - Tutorial mentioning how you only need to use the mouse to get all your work done (thank IT for that)
        Microgame section
            - Rise to the top of the corporate ladder
            - Coffee is part of the speedup animation
            - Game over is getting fired
            - Level up is getting a major promotion
            - The level 2 and level 3 microgames 
        Boss microgame (floor 20)
            - You exit the elevator
            - Your current title is the one just below the boss's
            - Walking out of the elevator uses the same engine as the mandatory level 1
            - Boss is happy with your performance
            - You're in the corner office
            - Boss gives some speech about the true purpose of the company, and you're given the choice to either try and replace him or continue working for him (and his bad morality)
                - If you agree to keep working for him, you get the BAD ENDING 
                    - There's a button you can click to go back and get the good ending
                - If you disagree with the boss's morality, you go into a "boss"fight!!
                    - The boss flips his table and everything on it lands in front of you, giving the choice of weapons for the bossfight
                    - You're given the choice between a few different weapons
                        - Ballpoint blade (fast paced hack and slash, hollow knight)
                        - Paperclip whip / Keyboard and mace / Rotary phone whip (long range but slower, think something like the whip from spelunky but longer)
                        - Stapler boomerang/gun (ranged weapon. You can shoot mini paperclips or throw the whole stapler.)

                    - Starting the bossfight:
                        - The boss kicks his rolling chair forward for his first attack
                    - Boss has various attacks
                        - "YOU'RE FIRED" (fire attack)
                        - Hot coffee splash attack (maybe he drinks the coffee and speeds up for a second phase?)
                        - Shoulder dash
                        - Iron fist
                        - "The big wig" armor (?) (nvm this one is kinda bad)
                        - Final attack where he sends some major attack at you, but you send it back and it knocks him out of the window, ending the bossfight
                        
        Boss defeated section     
            - Once you defeat the boss, you knock him out the window, and he escapes using a golden parachute

    For audio:
        playbackspeed and/or playbackRate (for speedups)
        play() 
        currentTime (for getting position in the song?)
*/







// Get the elevator elements
// Get the floor elements
// Do the thing
function microgamesSceneSequence()
{

}








/*

gameManager:

    Constructor
        - initial lives
        - initial difficulty
        - initial speed
        - list of floors and transitions 
            
        
        - Integer that manages the index of the floor list the game is currently at
            
    
    
    Global async script that starts the microgame section
        - Shows the elevator thing
        - Begins iterating through the floor list
        - Returns whether the player reached an "end" (see list of floors)
        - Returns the score
    

    - Manages the intro *inside* the elevator (not the pre-game cutscene)
    - Your current title is shown in the microgame ideas thing (it increases as you climb higher)
    - Manages the elevator doors opening
    - Manages the elevator doors closing
    - Manages the moments between floors
    - Plays the music between floors

*/


class GameManager
{
    constructor(floorList = [])
    {
        this.lives = 4
        this.difficulty = 1
        this.speed = 1 // TODO change this to make the value equal to Time Per Music Segment in milliseconds (multiply it for microgames)
        this.floorList = floorList // ["floorname", "speed+1", "floorname", "boss", "floornameBoss"]
        this.currentFloorListIndex = 0
        this.interruptOnNextFloor = false // Shouldnt have to use this, but just in case
    }



    async processFloorList()
    {
        while(this.interruptOnNextFloor == false)
        {
            switch(this.floorList[this.currentFloorListIndex])
            {   
                /*
                cases
                  "XXXXX" Name of the floor so the game knows what floor to put in that slot
                  "random XXX" (get random floor from the XXX list)
                  "speed+1"
                  "difficulty+1" 
                  "lives+1"
                  "setTitle XXX" (set your title to something better during the floor transition)
                  "boss" (boss transition)
                  "end" (end of the game)
                */
            }



            // Increase the floor count and roll over if it 
            this.currentFloorListIndex++
            if  (this.currentFloorListIndex >= this.floorList.length)  {this.currentFloorListIndex = 0}
        }
    }
}










let AllMicrogames = 
{
    // "MicrogameName" : new Microgame(dsklfj, sdlfj)
}


/*
Floor/Microgame class:
    - Floor element that is a div that fills the whole screen
        - Contains all the game elements

    - Timer integer in beats (0 = no time limit) (make the default value be inherited from the gameManager)

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

