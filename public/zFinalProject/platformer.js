
// For time based things
const sleep = ms => new Promise(r => setTimeout(r, ms)); 



let gameElementDiv = document.getElementById('gameElements')

let gameElements = gameElementDiv.childNodes



let backgroundElementDiv = document.getElementById('backgroundElements')

let backgroundElements = backgroundElementDiv.childNodes



// Global values
let airFriction     // Think back to the coefficient of friction from physics class, it's like that
let groundFriction  // Think back to the coefficient of friction from physics class, it's like that
let cameraX = 0 // Leftmost point of scene
let cameraY = 0 // Bottommost point of scene
let cameraZoom = 1




//============================================
// Everything below this point is in functions
//============================================




/* 
For each element: 
    Updates the camera values and the css styles of everything on screen
    Updates the x positions and y positions using the x velocity and y velocity
    um other things im sure!!
*/
async function gameUpdate()
{
    for(let gameElement of gameElements)
    {

    }
    for(let backgroundElement of backgroundElements)
    {

    }
}



async function outsideSceneSequence()
{
    gameUpdateLoop = setInterval(gameUpdate, 1)
    updateCameraLoop = setInterval(updateCamera, 1)
}



async function bossSceneSequence()
{

}




function updateCamera()
{

}




/*


Elements should be <img> but anything works

GameElement attributes:
    x
    y
    xVelocity
    yVelocity
    width
    height
    facing ("right" or "left")
    src (for the image sprite)
    cameraFollows (class)
    onUpdate (list of JS functions that's called every frame)
    onCollision (takes the colliding object as well as any arguments in the onCollision list as an input, and returns how it's modified as an output)


background element attributes:
    x
    y
    z (for parallax effect. Higher = further back. Not same as zindex)
    width (when the bg element is at 0 z)
    height (when the bg element is at 0 z)
    src

*/









/* 
===============================================================================================================================================================
Update components   Update components   Update components   Update components   Update components   Update components   Update components   Update components 
===============================================================================================================================================================    
Called every update/tick/frame
*/

let allUpdateComponents = 
{
    "evaluatePhysics" : evaluatePhysics,
    "evaluateCollisions" : evaluateCollisions,
    "player" : playerUpdate,
    "boss" : bossUpdate,
    "wrapsAroundScreen" : wrapsAroundScreen,
}


// The element with this will have gravity applied, and other global physics things 
function evaluatePhysics() 
{

}



// The element with this evaluates all other elements to see if it's colliding with any of them, and calls their onCollision functions if it is
function evaluateCollisions() 
{

}



// Evaluates player controls and health(?)
function playerUpdate() 
{

}



// Evaluates boss AI?
function bossUpdate() 
{

}



// Will teleport to the other side of the screen (just off screen) when it goes off screen, maintaining the velocity
function wrapsAroundScreen() 
{

}



/* 
==============================================================================================================================================================
Collision components   Collision components   Collision components   Collision components   Collision components   Collision components   Collision components
============================================================================================================================================================== 
Called whenever an object with the "evaluateCollisions" component collides with another element
*/

let allCollisionComponents = 
{
    "hurtPlayer" : hurtPlayer,
    "hurtBoss" : hurtBoss,
    "physicsCollision" : physicsCollision,
    "flingCharacter" : flingCharacter,
    "applyVelocity" : applyVelocity,
    "despawnSelf" : despawnSelf,
    "changePage" : changePage,
}




function hurtPlayer(collidingElement)
{
    return collidingElement
}



function hurtBoss(collidingElement)
{
    return collidingElement
}



function physicsCollision(collidingElement)
{
    return collidingElement
}



function flingCharacter(collidingElement, direction)
{
    return collidingElement
}



function applyVelocity(collidingElement, x, y)
{
    return collidingElement
}



function despawnSelf(collidingElement)
{
    return collidingElement
}



function changePage(collidingElement, pageUrl)
{
    return collidingElement
}





