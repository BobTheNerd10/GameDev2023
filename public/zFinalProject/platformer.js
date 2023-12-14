
// Default values
let cameraX = 0 // This is the leftmost point of the camera

// For elements with the 'evalutePhysics' update function
let gravity = -1 // -1 y velocity per tick
let Xfriction = 0.99 // multiplied onto Xvelocity every tick
let playerXfriction = 0.75 // multiplied onto the player's Xvelocity every tick

let screenXminimum = 0
let screenXmaximum = 19825 // temporary




async function outsideSceneSequence()
{
    screenXminimum = 0
    screenXmaximum = 19825 // temporary

    let gameUpdateLoop = setInterval(gameUpdate, 10)
    let updateCameraLoop = setInterval(updateCamera, 10)
}


async function bossSceneSequence()
{
    let gameUpdateLoop = setInterval(gameUpdate, 10)
    let updateCameraLoop = setInterval(updateCamera, 10)
}




// For time based things
const sleep = ms => new Promise(r => setTimeout(r, ms)); 


let gameElementDiv = document.getElementById('gameElements')

let backgroundElementDiv = document.getElementById('backgroundElements')


/*
Things left to work on in this file:
    -make evaluateCollisions call the things it needs to
    -playerUpdate
    -bossUpdate
    -hurtCollider
    -physicsCollision (make things not fall through eachother)
*/





async function gameUpdate()
{
    for(let gameElement of gameElementDiv.children)
    {
        
        // apply X and Y velocity if the element has any
        x = gameElement.getAttribute('x')
        y = gameElement.getAttribute('y')
        xVelocity = gameElement.getAttribute('xVelocity')
        yVelocity = gameElement.getAttribute('yVelocity')

        gameElement.setAttribute('x', x + xVelocity)
        gameElement.setAttribute('y', y + yVelocity)


        // Get all of element's update functions and run them as necesarry
        // *Hopefully* update functions won't need arguments? I hope this is good enough!! sldfjskldfj haha
        updateFunctions = gameElement.getAttribute('onUpdate')

        for(updateFunction of updateFunctions.split(';'))
        {
            updateFunction = updateFunction.trim()

            eval(`${updateFunction}(${gameElement})`)

            // No other code is needed because the update function edits the game elements directly (THANK GOD I PUT ALL THE GAME ATTRIBUTES IN HTML TAGS YAAAYYYY)
        }
    }
}





// Updates the camera values and the css styles of everything on screen
function updateCamera()
{
    for(element of gameElementDiv.children)
    {
        element.style.left = `${element.getAttribute('x') - cameraX}px`
        element.style.bottom = `${element.getAttribute('y')/* - cameraY*/}px`

        element.style.width = `${element.getAttribute('width')}px`
        element.style.height = `${element.getAttribute('height')}px`
    }

    for(element of backgroundElementDiv.children)
    {
        element.style.left = `${element.getAttribute('x') - cameraX}px`
        element.style.bottom = `${element.getAttribute('y')/* - cameraY*/}px`

        element.style.width = `${element.getAttribute('width')}px`
        element.style.height = `${element.getAttribute('height')}px`
    }



    let elementToFollow = document.querySelector('.cameraFollows')

    // Failsafe in case an element to follow with the camera cant be found
    if(elementToFollow == null)
    {
        return
    }

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
}




/* 
===============================================================================================================================================================
Update components   Update components   Update components   Update components   Update components   Update components   Update components   Update components 
===============================================================================================================================================================    
Called every update/tick/frame
*/


// The element with this will have gravity applied, and other global physics things 
function evaluatePhysics(element) 
{
    // Apply gravity
    initialYVelocity = element.getAttribute('yVelocity')
    element.setAttribute('yVelocity', initialYVelocity + gravity)


    // Apply friction (yes this is a very lazy way to make x velocity go back to zero, but it'll be fineee)
    initialXVelocity = element.getAttribute('xVelocity')
    element.setAttribute('xVelocity', initialXVelocity * Xfriction)
}




// The element with this evaluates all other elements to see if it's colliding with any of them, and calls their onCollision functions if it is
function evaluateCollisions(elementThatChecks) 
{
    x1       = elementThatChecks.getAttribute('x')
    y1       = elementThatChecks.getAttribute('y')
    width1   = elementThatChecks.getAttribute('width')
    height1  = elementThatChecks.getAttribute('height')

    // Compare the elementThatChecks with all the checkedElements
    for(checkedElement of gameElementDiv.children)
    {
        x2       = checkedElement.getAttribute('x')
        y2       = checkedElement.getAttribute('y')
        width2   = checkedElement.getAttribute('width')
        height2  = checkedElement.getAttribute('height')

        if(
            x1 + width1  > x2            && // Rightmost point of collision check element is beyond the leftmost  point of the checked element
            x1           < x2 + width2   && // Leftmost  point of collision check element is beyond the rightmost point of the checked element
            y1 + height1 > y2            && // Topmost   point of collision check element is above the bottommost point of the checked element
            y1           < y2 + height2     // Bottomost point of collision check element is beyond the topmost   point of the checked element
        )
        {
            // Run elementToCheck's elements, affecting element
        }
    }
}






// Evaluates player controls and health(?)
function playerUpdate(playerElement) 
{
    // Apply velocities to player depending on whether the player is pushing buttons



    initialXVelocity = playerElement.getAttribute('xVelocity')
    playerElement.setAttribute('xVelocity', initialXVelocity * playerXfriction)
}





// Evaluates boss AI?
function bossUpdate(element) 
{

}



// Will teleport to the other side of the screen (just off screen) when it goes off screen, maintaining the velocity
function wrapsAroundScreen(element) 
{
    x = element.getAttribute('x')
    y = element.getAttribute('y')
    width = element.getAttribute('width')
    height = element.getAttribute('height')

    if(x - width < screenXminimum)
    {
        element.setAttribute('x', screenXmaximum + width - 1)// The minus one is so this doesnt try to wrap around the screen every frame. It's a hack but it hopefully won't look bad
    }
    else if(x + width > screenXmaximum)
    {
        element.setAttribute('x', screenXminimum - width + 1)// The minus one is so this doesnt try to wrap around the screen every frame. It's a hack but it hopefully won't look bad
    }
}



/* 
==============================================================================================================================================================
Collision components   Collision components   Collision components   Collision components   Collision components   Collision components   Collision components
============================================================================================================================================================== 
Called whenever an object with the "evaluateCollisions" component collides with another element
*/

function hurtCollider(colliderElement, collidingElement)
{
    // only hurt if the collider is 
}



function physicsCollision(colliderElement, collidingElement)
{

}



function applyVelocity(colliderElement, _collidingElement, addedXVelocity, addedYVelocity)
{
    initialXVelocity = colliderElement.getAttribute('xVelocity')
    initialYVelocity = colliderElement.getAttribute('yVelocity')

    colliderElement.setAttribute('xVelocity', addedXVelocity + initialXVelocity)
    colliderElement.getAttribute('yVelocity', addedYVelocity + initialYVelocity)
}



function despawnSelf(_colliderElement, collidingElement)
{
    collidingElement.remove()
}



function changePage(_colliderElement, _collidingElement, pageUrl)
{
    window.location.href = pageUrl;
}





