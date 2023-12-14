
// For time based things
const sleep = ms => new Promise(r => setTimeout(r, ms)); 


let gameElementDiv = document.getElementById('gameElements')

let backgroundElementDiv = document.getElementById('backgroundElements')


// Global values
let cameraX = 0 // Leftmost point of scene

let gravity = -1 // -1 y velocity per tick

let screenXminimum = 0
let screenXmaximum = 19825 // temporary




//============================================
// Everything below this point is in functions
//============================================


async function outsideSceneSequence()
{
    let gameUpdateLoop = setInterval(gameUpdate, 1)
    let updateCameraLoop = setInterval(updateCamera, 1)
}


async function bossSceneSequence()
{
    let gameUpdateLoop = setInterval(gameUpdate, 1)
    let updateCameraLoop = setInterval(updateCamera, 1)
}




async function gameUpdate()
{
    for(let gameElement of gameElementDiv.childNodes)
    {
        // apply X and Y velocity to all elements

        // Get all of element's update functions and run them as necesarry
    }
}







// Updates the camera values and the css styles of everything on screen
function updateCamera()
{
    let elementToFollow = document.querySelector('.cameraFollows')

    let x = elementToFollow.getAttribute('x')
    let width = elementToFollow.getAttribute('width')


    if((x + (width/2)) - (window.innerWidth/2) < screenXminimum)
    {
        cameraX = screenXminimum
    }
    else if((x + (width/2)) + (window.innerWidth/2) > screenXmaximum)
    {
        cameraX = screenXmaximum
    }
    else
    {
        cameraX = (x + (width/2)) - (window.innerWidth/2)
    }
    


    for(element of gameElementDiv.childNodes)
    {
        element.style.left = `${element.getAttribute('x') - cameraX}px`
        element.style.bottom = `${element.getAttribute('y') - cameraY}px`
    }
    for(element of backgroundElementDiv.childNodes)
    {
        element.style.left = `${element.getAttribute('x') - cameraX}px`
        element.style.bottom = `${element.getAttribute('y') - cameraY}px`
    }
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
    width 
    height
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
function evaluatePhysics(element) 
{

}



// The element with this evaluates all other elements to see if it's colliding with any of them, and calls their onCollision functions if it is
function evaluateCollisions(element) 
{

}



// Evaluates player controls and health(?)
function playerUpdate(element) 
{

}



// Evaluates boss AI?
function bossUpdate(element) 
{

}



// Will teleport to the other side of the screen (just off screen) when it goes off screen, maintaining the velocity
function wrapsAroundScreen(element) 
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




function hurtPlayer(colliderElement, collidingElement)
{
    return collidingElement
}



function hurtBoss(colliderElement, collidingElement)
{
    return collidingElement
}



function physicsCollision(colliderElement, collidingElement)
{
    return collidingElement
}



function flingCharacter(colliderElement, collidingElement, direction)
{
    return collidingElement
}



function applyVelocity(colliderElement, collidingElement, x, y)
{
    return collidingElement
}



function despawnSelf(colliderElement, collidingElement)
{
    return collidingElement
}



function changePage(colliderElement, collidingElement, pageUrl)
{

    window.location.href = pageUrl;
    //return collidingElement
}





