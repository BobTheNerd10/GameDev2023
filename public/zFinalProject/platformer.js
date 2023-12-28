
// Default values
let cameraX = 0 // This is the leftmost point of the camera

// For elements with the 'evalutePhysics' update function
let gravity = -0.05 // -1 y velocity per tick

let Xfriction = 0.975 // Friction from being on the floor (player ignores this)

let screenXminimum = 0
let screenXmaximum = 19825 // temporary

let keysDown = []
let controls 

let controlsUpdateLoop
let gameUpdateLoop
let cameraUpdateLoop


async function outsideSceneSequence()
{
    screenXminimum = 0
    screenXmaximum = 19825 // temporary
    
    controlsSetup()
    controlsUpdateLoop = setInterval(controlsUpdate, 10)
    gameUpdateLoop     = setInterval(gameUpdate,     10)
    cameraUpdateLoop   = setInterval(cameraUpdate,   10)
}


async function bossSceneSequence()
{
    controlsSetup()
    controlsUpdateLoop = setInterval(controlsUpdate, 10)
    gameUpdateLoop     = setInterval(gameUpdate,     10)
    cameraUpdateLoop   = setInterval(cameraUpdate,   10)
}



/*
Things left to work on in this file:
    -bossUpdate (moving, animations, ai, attacks)
*/




// For time based things
const sleep = ms => new Promise(r => setTimeout(r, ms)); 


let gameElementDiv = document.getElementById('gameElements')

let backgroundElementDiv = document.getElementById('backgroundElements')


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

            eval(`${updateFunction}(gameElement)`)

            // No other code is needed because the update function edits the game elements directly (THANK GOD I PUT ALL THE GAME ATTRIBUTES IN HTML TAGS YAAAYYYY)
        }
    }
}





// Updates the camera values and the css styles of everything on screen
function cameraUpdate()
{
    // update positions of all game elements on screen to make them relative to camera
    for(element of gameElementDiv.children)
    {
        element.style.left = `${element.getAttribute('x') - cameraX}px`
        element.style.bottom = `${element.getAttribute('y')/* - cameraY*/}px`

        element.style.width = `${element.getAttribute('width')}px`
        element.style.height = `${element.getAttribute('height')}px`
    }

    // update positions of all background elements on screen to make them relative to camera
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




function controlsSetup()
{   
    document.addEventListener('keydown', function(event)
    {
        keysDown.push(event.key)
    })



    document.addEventListener('keyup', function(event)
    {
        const indexOfKey = keysDown.indexOf(event.key);
        if (indexOfKey == -1) // indexOf returns -1 if it can't find anything, so this is a failsafe just in case
        { 
            console.error(`controlsSetup: key ${event.key} was released but wasn't held down! This may be normal on page refresh.`)
        }
        else
        {
            keysDown.splice(indexOfKey, 1); // remove the released key from the keys down array
        }
    })
}




function controlsUpdate()
{
    let controls = 
    {
        left  : false,
        right: false,
        jump : false
    }

    for(key of keysDown)
    {
        switch(key)
        {
            case "a":
            case "ArrowLeft":
                controls.left = true;
                break
            case "d":
            case "ArrowRight":
                controls.right = true;
                break
            case "w":
            case "ArrowUp":
            case "Spacebar": // Old browsers sometimes returned Spacebar
            case " ": // space key
                controls.jump = true;
                break
        }
    }
}






function angleFromPoints(x1, y1,  x2, y2)
{
    if(x2 == x1 && y2 == y1)
    {
        console.error("angleFromPoints: Can't calculate the angle from two points of the same position!")
        return 0
    }


    // Calculate the angle from the reference angle
    if(x2-x1 != 0)
    {
        angleFromReferenceAngle = Math.atan( (y2-y1) / (x2-x1) )
    }
    else
    {
        angleFromReferenceAngle = 90
    }
    


    // Add the reference angle to a 90 degree increment depending on what quadrant it's in
    if     (x2 >= x1  &&  y2 >= y1) // Quadrant 1 (top right)
    {
        trueAngle = angleFromReferenceAngle
    }
    else if(x2 <= x1  &&  y2 >= y1) // Quadrant 2 (top left)
    {
        trueAngle = 180 - angleFromReferenceAngle
    }
    else if(x2 <= x1  &&  y2 <= y1) // Quadrant 3 (bottom left)
    {
        trueAngle = 180 + angleFromReferenceAngle
    }
    else      // Quadrant 4 (bottom right)
    {
        trueAngle = 360 - angleFromReferenceAngle
    }

    return trueAngle
}




/* 
===============================================================================================================================================================
Update components   Update components   Update components   Update components   Update components   Update components   Update components   Update components 
===============================================================================================================================================================    
Called every update/tick/frame
*/


// The element with this will have gravity applied
function evaluateGravity(element) 
{
    // Apply gravity
    initialYVelocity = element.getAttribute('yVelocity')
    if(initialYVelocity > -50) // -50 pixels per frame is a pretty high terminal velocity i think
    {
        element.setAttribute('yVelocity', initialYVelocity + gravity)
    }
}



// The element with this will have friction appllied
function evaluateFriction(element) 
{
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
            // Get all of element's update functions and run them as necesarry
            // *Hopefully* update functions won't need arguments? I hope this is good enough!! sldfjskldfj haha
            updateFunctions = gameElement.getAttribute('onUpdate')

            for(updateFunctionWithArgs of updateFunctions.split(';'))
            {
                updateFunctionWithArgs = updateFunctionWithArgs.trim()
                updateFunctionWithArgs = updateFunctionWithArgs.split(' ')
                
                updateFunction = updateFunctionWithArgs.shift()
                
                updateFunctionArgs = ""

                for(arg of updateFunctionWithArgs)
                {
                    updateFunctionArgs = ", " + arg
                }
            

                eval(`${updateFunction}(elementThatChecks, checkedElement ${updateFunctionArgs})`)

                // No other code is needed because the update function edits the game elements directly (THANK GOD I PUT ALL THE GAME ATTRIBUTES IN HTML TAGS YAAAYYYY)
            }
        }
    }
}






// Evaluates player controls and health(?)
function playerUpdate(playerElement) 
{
    xVelocity  = playerElement.getAttribute('xVelocity')
    yVelocity  = playerElement.getAttribute('yVelocity')
    isGrounded = playerElement.getAttribute('isGrounded')
    

    if(!(controls.left == true && controls.right == true)) // As long as left and right arent both pressed at the same time...
    {
        // Apply velocities to the player!
        if(controls.left  == true){ xVelocity = -1 }
        if(controls.right == true){ xVelocity =  1 }
    }


    if(controls.jump == true && isGrounded){
        isGrounded = false
        yVelocity += 5
    }

    
    playerElement.setAttribute('xVelocity',  xVelocity)
    playerElement.setAttribute('yVelocity',  yVelocity)
    playerElement.setAttribute('isGrounded', isGrounded)
}





// Evaluates boss AI?
function bossUpdate(bossElement) 
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
    x1         = colliderElement.getAttribute('x')
    y1         = colliderElement.getAttribute('y')
    width1     = colliderElement.getAttribute('width')
    height1    = colliderElement.getAttribute('height')

    xCentre1   = x1 + (width1  / 2)
    yCentre1   = y1 + (height1 / 2)


    x2         = collidingElement.getAttribute('x')
    y2         = collidingElement.getAttribute('y')
    width2     = collidingElement.getAttribute('width')
    height2    = collidingElement.getAttribute('height')

    xCentre2   = x2 + (width2  / 2)
    yCentre2   = y2 + (height2 / 2) 

    
    if(xCentre1 > xCentre2)
    {
        colliderElement.setAttribute('xVelocity', 0.5)
    }
    else
    {
        colliderElement.setAttribute('xVelocity', -0.5)
    }

    if(yCentre1 > yCentre2)
    {
        colliderElement.setAttribute('isGrounded', false)
        colliderElement.setAttribute('yVelocity', 0.5)
    }
    else
    {
        colliderElement.setAttribute('yVelocity', -0.5)
    }
}



function physicsCollision(colliderElement, collidingElement)
{
    x1         = colliderElement.getAttribute('x')
    y1         = colliderElement.getAttribute('y')
    xVelocity1 = colliderElement.getAttribute('xVelocity')
    yVelocity1 = colliderElement.getAttribute('yVelocity')
    width1     = colliderElement.getAttribute('width')
    height1    = colliderElement.getAttribute('height')

    centreX1 = x1 + (width1 /2)
    centreY1 = y1 + (height1/2)

    x2         = collidingElement.getAttribute('x')
    y2         = collidingElement.getAttribute('y')
    xVelocity2 = collidingElement.getAttribute('xVelocity')
    yVelocity2 = collidingElement.getAttribute('yVelocity')
    width2     = collidingElement.getAttribute('width')
    height2    = collidingElement.getAttribute('height')

    centreX2 = x2 + (width2 /2)
    centreY2 = y2 + (height2/2)



    // Determine the angle of the collision given the positions of the two objects and their widths and heights

    collisionDirection = "" // onTop, onLeft, onBottom, onRight

    angleOfCollision   = angleFromPoints(centreX2, centreY2,  centreX1, centreY1)
    
    angleOfTopRight    = angleFromPoints(centreX2, centreY2,    x2 + width2, y2 + height2)
    angleOfTopLeft     = angleFromPoints(centreX2, centreY2,    x2,          y2 + height2)
    angleOfBottomLeft  = angleFromPoints(centreX2, centreY2,    x2,          y2          )
    angleOfBottomRight = angleFromPoints(centreX2, centreY2,    x2 + width2, y2          )

    if(angleOfTopRight <= angleOfCollision && angleOfCollision <= angleOfTopLeft)
    {
        collisionDirection = 'fromTop'
    }
    else if(angleOfTopLeft < angleOfCollision && angleOfCollision < angleOfBottomLeft)
    {
        collisionDirection = 'fromLeft'
    }
    else if(angleOfBottomLeft <= angleOfCollision && angleOfCollision <= angleOfBottomRight)
    {
        collisionDirection = 'fromBottom'
    }
    else // This sucks but it's easier! Hooray for the last possible option!
    {
        collisionDirection = 'fromRight'
    }



    // Apply some force to stop the collider object

    switch(collisionDirection)
    {
        case "fromTop":
            colliderElement.setAttribute('isGrounded', true)
            colliderElement.setAttribute('yVelocity',  0)
            colliderElement.setAttribute('y',          y2 + height2)
            break

        case "fromLeft":
            colliderElement.setAttribute('xVelocity', 0)
            colliderElement.setAttribute('x',         x2 - width1)
            break

        case "fromBottom":
            colliderElement.setAttribute('yVelocity', 0)
            colliderElement.setAttribute('y',         y2 - height1)
            break

        case "fromRight":
            colliderElement.setAttribute('xVelocity', 0)
            colliderElement.setAttribute('x',         x2 + width2)
            break
    }
}



function flingCollider(colliderElement, _collidingElement, addedXVelocity, addedYVelocity)
{
    initialXVelocity = colliderElement.getAttribute('xVelocity')
    initialYVelocity = colliderElement.getAttribute('yVelocity')

    colliderElement.setAttribute('xVelocity', addedXVelocity + initialXVelocity)
    colliderElement.getAttribute('yVelocity', addedYVelocity + initialYVelocity)

    if(addedYVelocity + initialYVelocity > 0)
    {
        colliderElement.setAttribute('isGrounded', false)
    }
}



// Should be the last collision component, or else things will break
function despawnSelf(_colliderElement, collidingElement)
{
    collidingElement.remove()
}



function changePage(_colliderElement, _collidingElement, pageUrl)
{
    window.location.href = pageUrl;
}





