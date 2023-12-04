/*
    Make it like Wario Ware Incorporated
    Make it to floor 20
    Have the game controlled only using the mouse


    Stucture:

        gameManager class:

            Constructor
                - initial lives
                - initial difficulty
                - initial speed
                - list of floors and transitions (["floorname", "speed+1", "floorname", "boss", "floornameBoss"])
                    - Name of the floor so the game knows what floor to put in that slot
                    - "random XXX" (get random floor from the XXX list)
                    - "speed+1"
                    - "difficulty+1" 
                    - "lives+1"
                    - "boss" (boss transition)
                    - "end" (end of the game)
                
                - Integer that manages the index of the floor list the game is currently at
                    
            
            
            Global async script that starts the game
                - Shows the elevator thing
                - Begins iterating through the floor list
                - Returns whether the player reached an "end" (see list of floors)
                - Returns the score
            

            - Manages the intro *inside* the elevator (not the pre-game cutscene)
            - Manages the elevator doors opening
            - Manages the elevator doors closing
            - Manages the moments between floors
            - Plays the music between floors




        Floor class:
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


    Microgame ideas
        - Spam click to drink a cup of coffee
        - 




    For audio:
        playbackspeed and/or playbackRate (for speedups)
        play() 
        currentTime (for getting position in the song?)
*/