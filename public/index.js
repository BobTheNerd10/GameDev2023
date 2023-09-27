const creatorName = "Curtis"


class AssignmentEntry {

    constructor(assignmentId, assignmentName, isShown = true, isWip = false, isSubmitted = false, linkOveride = null)
    {
        
        this.assignmentId = assignmentId.toUpperCase(); // tXaYY
        this.assignmentName = assignmentName; // whatever ellis writes. Varies between kebab case and pascal case D:

        this.fullAssignmentName = this.assignmentId + "-" + this.assignmentName + "-" + creatorName // How ellis wants the assignments to be formatted
        
        this.isShown = isShown
        this.isWip = isWip;
        this.isSubmitted = isSubmitted;

        // Just in case it's NOT an index.html within a folder of the same name (eg, work-not-screen-time)
        this.fullLink = linkOveride ? linkOveride : this.fullAssignmentName + "/index.html"
    }

    
    getLinkFormat(isTodoList = false)
    {

        let formattedLink = ""

        if(this.isShown)
        {
            if(isTodoList)
            {
                if(this.isSubmitted)
                {
                    if(this.isWip)
                    {
                        
                    }
                    else if(!this.isWip)
                    {
                        return
                    }
                }
                else if(this.isSubmitted)
                {
                    if(this.isWip)
                    {
                        
                    }
                    else if(!this.isWip)
                    {
                        return
                    }
                }

            }
            else if(!isTodoList)
            {
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
                    formattedLink += `<p>${this.assignmentId.toUpperCase()} is a work in progress<p>`
                }
            }

        }

        return formattedLink
    }
}


let assignmentListData = 
[
    new AssignmentEntry(assignmentId = "t1a01", assignmentName = "BasicWeb",             isShown = true,  isWip = true,   isSubmitted = false  ),
    new AssignmentEntry(assignmentId = "t1a02", assignmentName = "lists-tables",         isShown = true,  isWip = true,   isSubmitted = false  ),
    new AssignmentEntry(assignmentId = "t1a03", assignmentName = "forms",                isShown = true,  isWip = true,   isSubmitted = false  ),
    new AssignmentEntry(assignmentId = "t1a04", assignmentName = "css",                  isShown = true,  isWip = true,   isSubmitted = false  ),
    new AssignmentEntry(assignmentId = "t1z00", assignmentName = "Work-Not-Screen-Time", isShown = true,  isWip = false,  isSubmitted = true,  linkOveride = "Work-Not-Screen-Time-Curtis.html"),
    new AssignmentEntry(assignmentId = "t1z01", assignmentName = "first-javascript",     isShown = true,  isWip = true,   isSubmitted = false  ),
    new AssignmentEntry(assignmentId = "t1z02", assignmentName = "object-zombie",        isShown = true,  isWip = true,   isSubmitted = true   ),
    new AssignmentEntry(assignmentId = "t1z03", assignmentName = "array-zombie",         isShown = true,  isWip = true,   isSubmitted = false  ),
]


let assignmentList = document.getElementById("assignmentList")

assignmentListData.forEach(function(assignmentEntryToAdd){
        assignmentList.innerHTML += assignmentEntryToAdd.getLinkFormat(false)
})
