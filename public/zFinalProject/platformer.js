
// Default values
let cameraX = 0 // This is the leftmost point of the camera

// For elements with the 'evalutePhysics' update function
let gravity = -0.1 // y velocityper tick

let screenXminimum = 0
let screenXmaximum = 0

let keysDown = []
let controls = 
{
    left  : false,
    right: false,
    jump : false
}

let controlsUpdateLoop
let gameUpdateLoop
let cameraUpdateLoop


async function outsideSceneSequence()
{
    screenXminimum = 0
    screenXmaximum = 6000 + 500 
    
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




let sounds = 
{
    "carhorn"    : new Audio('sound/platformer/carhorn.mp3'),
    "door"       : new Audio('sound/platformer/door.mp3'),
    "exitEffect" : new Audio('sound/platformer/exitEffect.mp3'),
    "jump"       : new Audio('sound/platformer/jump.mp3'),
    "punch"      : new Audio('sound/platformer/punch.mp3'),
    "slip"       : new Audio('sound/platformer/slip.mp3'),
}




// For time based things
const sleep = ms => new Promise(r => setTimeout(r, ms)); 


let gameElementDiv = document.getElementById('gameElements')

let backgroundElementDiv = document.getElementById('backgroundElements')


async function gameUpdate()
{
    for(let gameElement of gameElementDiv.children)
    {
        
        // apply X and Y velocity if the element has any
        x = Number(gameElement.getAttribute('x'))
        y = Number(gameElement.getAttribute('y'))
        xVelocity = Number(gameElement.getAttribute('xVelocity'))
        yVelocity = Number(gameElement.getAttribute('yVelocity'))

        gameElement.setAttribute('x', x + xVelocity)
        gameElement.setAttribute('y', y + yVelocity)



        


        // Get all of element's update functions and run them as necesarry
        // *Hopefully* update functions won't need arguments? I hope this is good enough!! sldfjskldfj haha
        updateFunctions = gameElement.getAttribute('updateComponents')

        if(updateFunctions == null){continue} // Failsafe in case there are no update functions

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
    // bad solution to prevent the browser from automatically saving the user's scroll position on refresh
    window.scrollTo(0,0);

    // update positions of all game elements on screen to make them relative to camera
    for(element of gameElementDiv.children)
    {
        element.style.left = `${Number(element.getAttribute('x')) - cameraX}px`
        element.style.bottom = `${Number(element.getAttribute('y'))/* - cameraY*/}px`

        element.style.width = `${Number(element.getAttribute('width'))}px`
        element.style.height = `${Number(element.getAttribute('height'))}px`
    }

    // update positions of all background elements on screen to make them relative to camera
    for(element of backgroundElementDiv.children)
    {
        element.style.left = `${Number(element.getAttribute('x')) - cameraX}px`
        element.style.bottom = `${Number(element.getAttribute('y'))/* - cameraY*/}px`

        element.style.width = `${Number(element.getAttribute('width'))}px`
        element.style.height = `${Number(element.getAttribute('height'))}px`
    }



    let elementToFollow = document.querySelector('.cameraFollows')

    // Failsafe in case an element to follow with the camera cant be found
    if(elementToFollow == null)
    {
        return
    }

    let x = Number(elementToFollow.getAttribute('x'))
    let width = Number(elementToFollow.getAttribute('width'))

    if((x + (width/2)) - (window.innerWidth/2) < screenXminimum)
    {
        cameraX = screenXminimum
    }
    else if((x + (width/2)) + (window.innerWidth/2) > screenXmaximum)
    {
        cameraX = screenXmaximum - window.innerWidth
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
        if(keysDown.indexOf(event.key) != -1){return} // When holding down a key, browsers will spam the keydown function, so this checks to see if the key pressed is already in the keysdown list

        keysDown.push(event.key)
    })



    document.addEventListener('keyup', function(event)
    {
        const indexOfKey = keysDown.indexOf(event.key);
        if (indexOfKey == -1) // indexOf returns -1 if it can't find anything, so this is a failsafe just in case
        { 
            null
            //console.error(`controlsSetup: key ${event.key} was released but wasn't held down! This may be normal on page refresh.`)
        }
        else
        {
            keysDown.splice(indexOfKey, 1); // remove the released key from the keys down array
        }
    })
}




function controlsUpdate()
{
    nextControls = 
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
                nextControls.left = true;
                break
            case "d":
            case "ArrowRight":
                nextControls.right = true;
                break
            case "w":
            case "ArrowUp":
            case "Spacebar": // Old browsers sometimes returned Spacebar
            case " ": // space key
                nextControls.jump = true;
                break
        }
    }

    controls = nextControls
}






function radiansToDegrees(radians)
{
  var pi = Math.PI;
  return radians * (180/pi);
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
        angleFromReferenceAngle = radiansToDegrees(Math.atan( (y2-y1) / (x2-x1) ))
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
        trueAngle = 180 + angleFromReferenceAngle
    }
    else if(x2 <= x1  &&  y2 <= y1) // Quadrant 3 (bottom left)
    {
        trueAngle = 180 + angleFromReferenceAngle
    }
    else      // Quadrant 4 (bottom right)
    {
        trueAngle = 360 + angleFromReferenceAngle
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
    initialYVelocity = Number(element.getAttribute('yVelocity'))
    if(initialYVelocity > -6) // effectively the terminal velocity
    {
        element.setAttribute('yVelocity', initialYVelocity + gravity)
    }
}


// The element with this evaluates all other elements to see if it's colliding with any of them, and calls their collisionComponents functions if it is
function evaluateCollisions(elementThatChecks) 
{
    x1       = Number(elementThatChecks.getAttribute('x'))
    y1       = Number(elementThatChecks.getAttribute('y'))
    width1   = Number(elementThatChecks.getAttribute('width'))
    height1  = Number(elementThatChecks.getAttribute('height'))

    // Compare the elementThatChecks with all the checkedElements
    for(checkedElement of gameElementDiv.children)
    {
        if(checkedElement == elementThatChecks){continue}

        x2       = Number(checkedElement.getAttribute('x'))
        y2       = Number(checkedElement.getAttribute('y'))
        width2   = Number(checkedElement.getAttribute('width'))
        height2  = Number(checkedElement.getAttribute('height'))

        if(
            x1 + width1  > x2            && // Rightmost point of collision check element is beyond the leftmost  point of the checked element
            x1           < x2 + width2   && // Leftmost  point of collision check element is beyond the rightmost point of the checked element
            y1 + height1 > y2            && // Topmost   point of collision check element is above the bottommost point of the checked element
            y1           < y2 + height2     // Bottomost point of collision check element is beyond the topmost   point of the checked element
        )
        {
            // Get all of the collider element's collision functions and run them as necesarry
            collisionFunctions = checkedElement.getAttribute('collisionComponents')

            if(collisionFunctions == null){continue}

            for(collisionFunctionsWithArgs of collisionFunctions.split(';'))
            {
                collisionFunctionsWithArgs = collisionFunctionsWithArgs.trim()
                collisionFunctionsWithArgs = collisionFunctionsWithArgs.split(' ')
                
                collisionFunction = collisionFunctionsWithArgs.shift()
                
                collisionFunctionArgs = ""

                for(arg of collisionFunctionsWithArgs)
                {
                    collisionFunctionArgs += ", " + arg
                }
            

                eval(`${collisionFunction}(elementThatChecks, checkedElement ${collisionFunctionArgs})`)

                // No other code is needed because the update function edits the game elements directly (THANK GOD I PUT ALL THE GAME ATTRIBUTES IN HTML TAGS YAAAYYYY)
            }
        }
    }
}






// Evaluates player controls and health(?)
function playerUpdate(playerElement) 
{
    // Manage stun timer

    stunTime = playerElement.getAttribute('stunTime')

    if(stunTime > 0)
    {
        playerElement.setAttribute('stunTime', stunTime - 10) // stun time is in ms
        return
    }


    xVelocity  = Number(playerElement.getAttribute('xVelocity'))
    yVelocity  = Number(playerElement.getAttribute('yVelocity'))
    isGrounded = playerElement.getAttribute('isGrounded')

    if(!(controls.left == true && controls.right == true)) // As long as left and right arent both pressed at the same time...
    {
        // Apply velocities to the player
        if(controls.left  == true){ xVelocity += -1 }
        if(controls.right == true){ xVelocity +=  1 }
    }


    if(controls.jump == true && isGrounded == "true"){
        isGrounded = false
        yVelocity += 5
        sounds.jump.play()
    }

    
    playerElement.setAttribute('xVelocity',  xVelocity * 0.8) // the 0.8 is friction
    playerElement.setAttribute('yVelocity',  yVelocity)
    playerElement.setAttribute('isGrounded', isGrounded)
}


/*

// Evaluates boss AI?
function bossUpdate(bossElement) 
{

}

*/


// Will teleport to the other side of the screen (just off screen) when it goes off screen, maintaining the velocity
function wrapsAroundScreen(element) 
{
    x = Number(element.getAttribute('x'))
    y = Number(element.getAttribute('y'))
    width = Number(element.getAttribute('width'))
    height = Number(element.getAttribute('height'))


    if(x + width + 100 < screenXminimum)
    {
        element.setAttribute('x', screenXmaximum + width - 1)// The minus one is so this doesnt try to wrap around the screen every frame. It's a hack but it hopefully won't look bad
    }
    else if(x - 100 > screenXmaximum)
    {
        element.setAttribute('x', screenXminimum - width + 1)// The minus one is so this doesnt try to wrap around the screen every frame. It's a hack but it hopefully won't look bad
    }
}




// Will teleport to the other side of the screen (just off screen) when it goes off screen, maintaining the velocity
function flipLoop(element) 
{
    flipTick = Number(element.getAttribute('flipTick'))


    if(flipTick == 0)
    {
        // Invert the transform's scaling to make it flip directions!
        if(element.style.transform == "scaleX(-1)")
        {
            element.style.transform = "scaleX(1)"
        }
        else
        {
            element.style.transform = "scaleX(-1)"
        }   
    }


    if(flipTick == null || flipTick == 0)
    {
        element.setAttribute('flipTick', 5)
        return
    }

    

    // Decrease the flipTick by one
    element.setAttribute('flipTick', flipTick - 1)
}



/* 
==============================================================================================================================================================
Collision components   Collision components   Collision components   Collision components   Collision components   Collision components   Collision components
============================================================================================================================================================== 
Called whenever an object with the "evaluateCollisions" component collides with another element
*/

function hurtCollider(colliderElement, collidingElement)
{
    x1         = Number(colliderElement.getAttribute('x'))
    y1         = Number(colliderElement.getAttribute('y'))
    width1     = Number(colliderElement.getAttribute('width'))
    height1    = Number(colliderElement.getAttribute('height'))

    xCentre1   = x1 + (width1  / 2)
    yCentre1   = y1 + (height1 / 2)


    x2         = Number(collidingElement.getAttribute('x'))
    y2         = Number(collidingElement.getAttribute('y'))
    width2     = Number(collidingElement.getAttribute('width'))
    height2    = Number(collidingElement.getAttribute('height'))

    xCentre2   = x2 + (width2  / 2)
    yCentre2   = y2 + (height2 / 2) 



    colliderElement.setAttribute('stunTime', 400)
    
    if(xCentre1 > xCentre2)
    {
        colliderElement.setAttribute('xVelocity', 5)
    }
    else
    {
        colliderElement.setAttribute('xVelocity', -5)
    }

    if(yCentre1 > yCentre2)
    {
        colliderElement.setAttribute('isGrounded', false)
        colliderElement.setAttribute('yVelocity', 2)
    }
    else
    {
        colliderElement.setAttribute('yVelocity', -2)
    }
}



function physicsCollision(colliderElement, collidingElement)
{

    x1         = Number(colliderElement.getAttribute('x'))
    y1         = Number(colliderElement.getAttribute('y'))
    xVelocity1 = Number(colliderElement.getAttribute('xVelocity'))
    yVelocity1 = Number(colliderElement.getAttribute('yVelocity'))
    width1     = Number(colliderElement.getAttribute('width'))
    height1    = Number(colliderElement.getAttribute('height'))

    centreX1 = x1 + (width1 /2)
    centreY1 = y1 + (height1/2)

    x2         = Number(collidingElement.getAttribute('x'))
    y2         = Number(collidingElement.getAttribute('y'))
    xVelocity2 = Number(collidingElement.getAttribute('xVelocity'))
    yVelocity2 = Number(collidingElement.getAttribute('yVelocity'))
    width2     = Number(collidingElement.getAttribute('width'))
    height2    = Number(collidingElement.getAttribute('height'))

    centreX2 = x2 + (width2 /2)
    centreY2 = y2 + (height2/2)

    

    // Determine the angle of the collision given the positions of the two objects and their widths and heights

    collisionDirection = "" // onTop, onLeft, onBottom, onRight

    // Determine the closest point of the collider object to the colliding object. If it's a corner, use that. Otherwise, use the centre
    xToUse1 = 0
    yToUse1 = 0

    if     (x1 > x2 + width2 && y1 > y2 + height2) {xToUse1 = x1;          yToUse1 = y1} // Top right
    else if(x1 + width1 < x2 && y1 > y2 + height2) {xToUse1 = x1 + width1; yToUse1 = y1 + height1} // Top left
    else if(x1 > x2 + width2 && y1 + height1 < y1) {xToUse1 = x1;          yToUse1 = y1} // bottom right
    else if(x1 + width1 < x2 && y1 + height1 < y1) {xToUse1 = x1 + width1; yToUse1 = y1 + height1} // bottom left
    else {xToUse1 = centreX1;   yToUse1 = centreY1}



    angleOfCollision   = angleFromPoints(centreX2, centreY2,  xToUse1, yToUse1)

    angleOfTopRight    = angleFromPoints(centreX2, centreY2,    x2 + width2, y2 + height2)
    angleOfTopLeft     = angleFromPoints(centreX2, centreY2,    x2,          y2 + height2)
    angleOfBottomLeft  = angleFromPoints(centreX2, centreY2,    x2,          y2          )
    angleOfBottomRight = angleFromPoints(centreX2, centreY2,    x2 + width2, y2          )


    if(angleOfTopRight <= angleOfCollision && angleOfCollision <= angleOfTopLeft && yVelocity1 < 0 )
    {
        collisionDirection = 'fromTop'
    }
    else if(angleOfTopLeft < angleOfCollision && angleOfCollision < angleOfBottomLeft && xVelocity1 > 0)
    {
        collisionDirection = 'fromLeft'
    }
    else if(angleOfBottomLeft <= angleOfCollision && angleOfCollision <= angleOfBottomRight && yVelocity1 > 0)
    {
        collisionDirection = 'fromBottom'
    }
    else if((angleOfCollision > angleOfBottomRight && xVelocity1 < 0) || (angleOfCollision < angleOfTopRight && xVelocity1 < 0)) // this is not good :<
    {
        collisionDirection = 'fromRight'
    }
    else
    {
        return // False positive
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
    initialXVelocity = Number(colliderElement.getAttribute('xVelocity'))
    initialYVelocity = Number(colliderElement.getAttribute('yVelocity'))

    colliderElement.setAttribute('xVelocity', addedXVelocity + initialXVelocity)
    colliderElement.setAttribute('yVelocity', addedYVelocity + initialYVelocity)

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


// For changing the page
async function changePage(_colliderElement, _collidingElement, pageUrl)
{
    window.location.href = pageUrl;
}


// For playing a sound!
function playSound(_colliderElement, _collidingElement, sound)
{
    let soundToPlay = sounds[sound]
    soundToPlay.play()
    //sounds[sound].play()
}


