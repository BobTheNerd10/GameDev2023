// global variables here
let myGlobalX = 0
let myClock


function myHitOther(my1, my2)
{
    left1      = parseInt(document.getElementById(my1).style.left)
    right1     = left1 + parseInt(document.getElementById(my1).style.width)
    top1       = parseInt(document.getElementById(my1).style.top)
    bottom1    = top1 + parseInt(document.getElementById(my1).style.height)
    left2      = parseInt(document.getElementById(my2).style.left)
    right2     = left2 + parseInt(document.getElementById(my2).style.width)
    top2       = parseInt(document.getElementById(my2).style.top)
    bottom2    = top2 + parseInt(document.getElementById(my2).style.height)   

    if 
    (
        ( right1  >= left2  ) &&
        ( bottom1 >= top2   ) &&
        ( left1   <= right2 ) &&
        ( top1    <= bottom2) 
    )
    {
    return true
    }
}

function myCheckHit()
{
    if ( myHitOther('myImg01', 'myImg02'))
    {
        location = 'microgames.html' 
    }

    if ( myHitOther('myImg01', 'myImg03'))
    {
        alert('you lose 3')
    }

    // more if statements here
}




// Auto background left function
{
    clearInterval(myClock)
    let myTemp = '100px 0px'
    myClock = setInterval(function(){
        myGlobalX -= 3
        myTemp = myGlobalX + 'px 0px'
        document.getElementById('myBody').style.backgroundPosition = myTemp
    }, 10)
}



// the function that makes the guy move right
{
    document.getElementById('myImg01').style.left = parseInt(document.getElementById('myImg01').style.left) +
    10 + 'px'
        myCheckHit()
}