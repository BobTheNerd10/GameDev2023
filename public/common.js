
class Assignment 
{

    constructor(assignmentId = "", assignmentName = "", isShown = true, isWip = false, isSubmitted = false, linkOverride = null, assignmentNotes = "")
    {
        this.assignmentId = assignmentId.toUpperCase() // tXaYY
        this.assignmentName = assignmentName // whatever ellis writes. Varies between kebab case and pascal case D:

        this.fullAssignmentName = assignmentId + "-" + this.assignmentName + "-" + creatorName // How ellis wants the assignments to be formatted
        

        this.isShown = isShown
        this.isWip = isWip
        this.isSubmitted = isSubmitted

        this.assignmentNotes = assignmentNotes // Added to the end of the asssignment's link on the page's index.html

        // Points to the index.html if the link override is null (otherwise use the link override for all links referring to this assignment)
        this.fullLink = linkOverride != null ? linkOverride : this.fullAssignmentName + "/index.html"
    }

    
    // Returns some html text that's ready to be put inside the innerHTML of an <li> or a <p> or whatever you want
    // (I'm aware getters exist, but getters can't take arguments, so I made it a function instead.)
    getLinkFormat(formatType = "assignmentList", layersDeep = 0) 
    {
        if(!this.isShown)
        {
            return // Not shown, so return nothing
        }

        let formattedLink = ""

        // Note to self: never try to call anonymous functions from a class's object ESPECIALLY while trying to pass arguments. It's not worth it even if it's elegant
        // ^^This note was the pain and suffering of trying to use an enumerator instead of this switch below, so USE SWITCHES^^
        switch(formatType)
        {   
            case "todoList":
                if(this.isWip)
                {
                    if(this.isSubmitted)
                    {
                        formattedLink += `Improving upon `
                    }   
                    else
                    {
                        formattedLink += `Working on `
                    }
                    formattedLink += this.assignmentId + "-" + this.assignmentName
                }
                break

            case "assignmentList":                
                if(this.isSubmitted)
                {   
                    // Account for not being at the page's root
                    formattedLink += `<a href="${addLayerCounteracting(this.fullLink, layersDeep)}">${this.fullAssignmentName}</a>`
                    
                    if (this.isWip) 
                    {
                        formattedLink += ` WIP`
                    }

                    if (this.assignmentNotes != "")
                    {
                        formattedLink += this.assignmentNotes
                    }
                }
                else if (this.isWip) 
                {
                    formattedLink += `${this.assignmentId.toUpperCase()} is a work in progress`
                }
                break

            case "navBar": // Idk if I ever used this, but it's good to have in case I want to add assignments to my navbar!
                if(!this.isSubmitted)
                {
                    break
                }
                if(this.isShown)
                {
                    // Account for not being at the page's root
                    formattedLink += `<a href="${addLayerCounteracting(this.fullLink, layersDeep)}">${this.assignmentName}</a>`
                }
                break

            default: // If the format doesn't exist
                console.error(`Assignment link format type "${formatType}" does not exist.`)
                break
        }

        return formattedLink
    }
}


// Returns a link that exits folders without needing to subtract from the URL
//   ../ works in the browser! Did you know that? (this whole thing is a hack but ehh)
function addLayerCounteracting(inputLink = "", layersDeep = 0)
{
    formattedResult = ""

    for(let i = layersDeep; i != 0; i--){
        formattedResult += "../"
    }

    formattedResult += inputLink
    
    return formattedResult
}


//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const creatorName = "Curtis"

let assignments = 
[
    new Assignment("t1a01", "BasicWeb",             isShown = true, isWip = false,  isSubmitted = true,  ),
    new Assignment("t1a02", "Lists-Tables",         isShown = true, isWip = false,  isSubmitted = true,  ),
    new Assignment("t1a03", "Forms",                isShown = true, isWip = false,  isSubmitted = true,  ),
    new Assignment("t1a04", "Css",                  isShown = true, isWip = false,  isSubmitted = true,  linkOverride = "t1a01-BasicWeb-Curtis/index.html", assignmentNotes = " (my t1a01 is my t1a04 submission. <a href='t1a01-BasicWeb-Curtis/t1a01.css'>Go to css file</a>)"),
    new Assignment("t1a05", "Input-Output",         isShown = true, isWip = false,  isSubmitted = true,  linkOverride = "zCarrotGame/index.html", assignmentNotes = " (carrot game)"),
    new Assignment("t1a06", "Variables",            isShown = true, isWip = false,  isSubmitted = true,  linkOverride = "zCarrotGame/index.html", assignmentNotes = " (carrot game)"),
    new Assignment("t1a07", "Decisions",            isShown = true, isWip = false,  isSubmitted = true,  linkOverride = "zCarrotGame/index.html", assignmentNotes = " (carrot game)"),
    new Assignment("t1a08", "Loops",                isShown = true, isWip = false,  isSubmitted = true,  ),
    new Assignment("t1a09", "local-storage",        isShown = true, isWip = false,  isSubmitted = true,  ),
    new Assignment("t1a10", "Events",               isShown = true, isWip = false,  isSubmitted = true,  ),
    new Assignment("t1a11", "Arrays",               isShown = true, isWip = false,  isSubmitted = true,  linkOverride = "zZombies/index.html", assignmentNotes = " (zombies mega assignment)"),
    new Assignment("t1a12", "Objects",              isShown = true, isWip = false,  isSubmitted = true,  linkOverride = "zZombies/index.html", assignmentNotes = " (zombies mega assignment)"),
    new Assignment("t1a13", "Classes",              isShown = true, isWip = false,  isSubmitted = true,  linkOverride = "zZombies/index.html", assignmentNotes = " (zombies mega assignment)"),
    new Assignment("t1a14", "Extend-Classes",       isShown = true, isWip = false,  isSubmitted = true,  linkOverride = "zZombies/index.html", assignmentNotes = " (zombies mega assignment)"),
    new Assignment("t1z00", "Work-Not-Screen-Time", isShown = true, isWip = false,  isSubmitted = true,  linkOverride = "Work-Not-Screen-Time-Curtis.html"),
    new Assignment("t1z01", "First-Javascript",     isShown = true, isWip = false,  isSubmitted = true,  linkOverride = "zCarrotGame/index.html", assignmentNotes = " (carrot game)"),
    new Assignment("t1z02", "Object-Zombie",        isShown = true, isWip = false,  isSubmitted = true,  linkOverride = "zZombies/index.html", assignmentNotes = " (zombies mega assignment)"),
    new Assignment("t1z03", "Array-Zombie",         isShown = true, isWip = false,  isSubmitted = true,  linkOverride = "zZombies/index.html", assignmentNotes = " (zombies mega assignment)"),
    new Assignment("t1z04", "Classes",              isShown = true, isWip = false,  isSubmitted = true,  linkOverride = "zZombies/index.html", assignmentNotes = " (zombies mega assignment)"),
    new Assignment("Funtest","By",                  isShown = true, isWip = false,  isSubmitted = true,  linkOverride = "Funtest-By-Curtis/index.html"), // The name of this is a hack, but I don't care!
]

let extraClassTodos = [ // For stuff that isnt assignments 
	'Nov 9 - Working On Other Classes',
	'Nov 8 - Working On Other Classes'
]

let freeTodos = [
    `Learning how to use godot to make web games!`,
    `Reading <a href="https://developer.mozilla.org/en-US/docs/Games/Introduction">Introduction to game development for the Web</a> (an article on the MDN web docs!)</li>`,
    `Brainstorming ideas for games`,
    `Working on stuff for other classes`,
    `Reading the <a href="https://www.gitpod.io/docs/introduction">Gitpod Docs</a> to figure out how to host cool backends!`,
    `Reading the <a href="https://en.wikipedia.org/wiki/CubeSat">Wikipedia Page for CubeSats</a> for satellite club!`,
]

let extraNavBarLinks = {
    //"Name of link" : "http link"
    "Index" : "index.html",
    "Work-Not-Screen-Time" : "Work-Not-Screen-Time-Curtis.html",
    "Repo" : "https://github.com/BobTheNerd10/GameDev2023"
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// ASSIGN THE STUFF TO ELEMENTS BY IDs WHERE NEEDED

// Prepare to account for not being at the root (create pageUrl, arrayOfUrl, and layersDeep)
const pageUrl = window.location.href;
let arrayOfUrl = pageUrl.split("/")
if(arrayOfUrl[arrayOfUrl.length - 1].split('').includes(".")) // If the final thing in the href has a period in it, remove it
{
    arrayOfUrl.pop()
}
let layersDeep = arrayOfUrl.length - arrayOfUrl.indexOf("public") - 1



// Page title 

if(layersDeep >= 1 && document.getElementsByTagName("title")[0].innerHTML == "")
{   
    document.title = `${arrayOfUrl[arrayOfUrl.length-1].split("-")[0]} ${creatorName}`
    // I hate this, but it's good enough (it gets the ID from the folder name)
    // This is a hack
}



// Assignment list

let assignmentListElements = document.getElementsByClassName("assignmentList")

for (let assignmentListElement of assignmentListElements)
{
    for (let assignment of assignments)
    {
        assignmentListElement.innerHTML += assignment.getLinkFormat("assignmentList", layersDeep) ? "<p>" + assignment.getLinkFormat("assignmentList", layersDeep) + "</p>" : "" // If it's null then don't add anything
    }
} 



// Todo list

let classTodoListElements = document.getElementsByClassName("classTodoList")

for (let classTodoListElement of classTodoListElements)
{
    noAssignments = true; // Will be set to false if i do have something to do for this class
    for (let assignment of assignments)
    {
        assignmentText = assignment.getLinkFormat("todoList", layersDeep) ? `<li>${assignment.getLinkFormat("todoList", layersDeep)}</li>` : "" // If it's null then don't add anything
        if(assignmentText != ""){
            noAssignments = false
        }
        classTodoListElement.innerHTML += assignmentText
    }
    for (let extraClassTodo of extraClassTodos)
    {
		noAssignments = false;
        classTodoListElement.innerHTML += `<li>${extraClassTodo}</li>`
    }
	if(noAssignments == true){
        classTodoListElement.innerHTML = "Wow, nothing! I'm done every assignment :D"
    }
} 

let freeTodoLists = document.getElementsByClassName("freeTodoList")

for (let classTodoListElement of freeTodoLists)
{
    for (let freeTodo of freeTodos)
    {
        classTodoListElement.innerHTML += `<li>${freeTodo}</li>`
    }
} 


   
// Nav bar

let headerElements = document.getElementsByTagName("header")
let formattedNav = "";

for (let headerElement of headerElements)
{
    formattedNav += "<nav>"

    // Extra links
    for (let extraNavBarLinkName of Object.keys(extraNavBarLinks))
    {   
        // If it's a direct link
        if(extraNavBarLinks[extraNavBarLinkName].split("s")[0] != "http")
        {
            formattedNav += `<a href="${addLayerCounteracting(extraNavBarLinks[extraNavBarLinkName], layersDeep)}">${extraNavBarLinkName}</a>`
        }
        else
        {
            formattedNav += `<a href="${extraNavBarLinks[extraNavBarLinkName]}">${extraNavBarLinkName}</a>`
        }
    }
    
    // Assignment links
    /*
    formattedNav += "<span style='margin-left:0.5%'></span>" // Little divider
    formattedNav += "<a class='arrow' id='leftArrow'>←</a>" 

    for (let assignment of assignments)
    {
        formattedNav += assignment.getLinkFormat("navBar", layersDeep) ? `${assignment.getLinkFormat("navBar", layersDeep)}` : ""
    }

    formattedNav += "<a class='arrow' id='rightArrow'>→</a>" 
    */
    formattedNav += "<span style='margin-left:0.5%'></span>" // Little divider



    // Back button
    
    urlListOfIsplit = pageUrl.split("i")
    
    if(urlListOfIsplit[urlListOfIsplit.length - 1] != "ndex.html") // HACKHACKHACK I HATE IT 
    {
        formattedNav += `<a href="index.html">Back</a>`
    }
    else if(layersDeep > 0)
    {
        formattedNav += `<a href="${addLayerCounteracting("index.html", layersDeep)}">Back</a>`
    }
    else
    {
        formattedNav += `<a href="index.html">Back</a>`
    }
    

    formattedNav += "</nav>"

    headerElement.innerHTML += formattedNav
} 

