const creatorName = "Curtis"


class AssignmentEntry 
{

    constructor(assignmentId = "", assignmentName = "", isShown = true, isWip = false, isSubmitted = false, linkOverride = null, excludedFormats = [])
    {
        this.assignmentId = assignmentId.toUpperCase(); // tXaYY
        this.assignmentName = assignmentName; // whatever ellis writes. Varies between kebab case and pascal case D:

        this.fullAssignmentName = this.assignmentId + "-" + this.assignmentName + "-" + creatorName // How ellis wants the assignments to be formatted
        
        this.isShown = isShown
        this.isWip = isWip;
        this.isSubmitted = isSubmitted;

        this.excludedFormats = excludedFormats

        // Just in case it's NOT an index.html within a folder of the same name (eg, work-not-screen-time)
        this.fullLink = linkOverride != null ? linkOverride : this.fullAssignmentName + "/index.html"
    }

    
    getLinkFormat(formatType = "assignmentList") // Default is the first option in the linkFormats
    {
        if(!this.isShown)
        {
            return // Not shown
        }

        let formattedLink = ""

        // Note to self: never try to call anonymous functions from an object ESPECIALLY while trying to pass arguments. It's not worth it even if it's elegant
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
                    formattedLink += `<a href="${this.fullLink}">${this.fullAssignmentName}</a>`
                    
                    if (this.isWip) 
                    {
                        formattedLink += ` WIP`
                    }
                }
                else if (this.isWip) 
                {
                    formattedLink += `${this.assignmentId.toUpperCase()} is a work in progress`
                }
                break

            default: // If the format doesn't exist
                console.error(`Assignment link format type "${formatType}" does not exist.`)
                break
        }

        return formattedLink
    }
}


let assignments = 
[
    new AssignmentEntry("t1a01", "BasicWeb",             isShown = true,  isWip = true,   isSubmitted = false  ),
    new AssignmentEntry("t1a02", "lists-tables",         isShown = true,  isWip = true,   isSubmitted = false  ),
    new AssignmentEntry("t1a03", "forms",                isShown = true,  isWip = true,   isSubmitted = false  ),
    new AssignmentEntry("t1a04", "css",                  isShown = true,  isWip = true,   isSubmitted = false  ),
    new AssignmentEntry("t1z00", "Work-Not-Screen-Time", isShown = true,  isWip = false,  isSubmitted = true,  linkOverride = "Work-Not-Screen-Time-Curtis.html"),
    new AssignmentEntry("t1z01", "first-javascript",     isShown = true,  isWip = true,   isSubmitted = false  ),
    new AssignmentEntry("t1z02", "object-zombie",        isShown = true,  isWip = true,   isSubmitted = true   ),
    new AssignmentEntry("t1z03", "array-zombie",         isShown = true,  isWip = true,   isSubmitted = false  ),
    new AssignmentEntry("t1z04", "Classes",              isShown = true,  isWip = true,   isSubmitted = false  ),
]

let classTodos = [
    "Improving my site's general structure (cleaning!)"
]

let freeTodos = [
    `Reading <a href="https://developer.mozilla.org/en-US/docs/Games/Introduction">Introduction to game development for the Web</a> (an article on the MDN web docs!)</li>`,
    `Brainstorming ideas for games`,
    `Working on stuff for other classes`,
    `Reading the <a href="https://www.gitpod.io/docs/introduction">Gitpod Docs</a> to figure out how to host cool backends!`,
    `Reading the <a href="https://en.wikipedia.org/wiki/CubeSat">Wikipedia Page for CubeSats</a> for satellite club!`,
]


// ASSIGN THE STUFF TO ELEMENTS BY IDs WHERE NEEDED


let assignmentLists = document.getElementsByClassName("assignmentList")

for (let assignmentList of assignmentLists)
{
    for (let assignment of assignments)
    {
        assignmentList.innerHTML += assignment.getLinkFormat("assignmentList") ? "<p>" + assignment.getLinkFormat("assignmentList") + "</p>" : "" // If it's null then don't add anything
    }
} 





let classTodoLists = document.getElementsByClassName("classTodoList")

for (let todoList of classTodoLists)
{
    for (let assignment of assignments)
    {
        todoList.innerHTML += assignment.getLinkFormat("todoList") ? `<li>${assignment.getLinkFormat("todoList")}</li>` : "" // If it's null then don't add anything
    }
    for (let classTodo of classTodos)
    {
        todoList.innerHTML += `<li>${classTodo}</li>`
    }
} 


let freeTodoLists = document.getElementsByClassName("freeTodoList")

for (let todoList of freeTodoLists)
{
    for (let freeTodo of freeTodos)
    {
        todoList.innerHTML += `<li>${freeTodo}</li>`
    }
} 

   

