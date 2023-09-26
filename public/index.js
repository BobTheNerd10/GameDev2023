const creatorName = "Curtis"


class AssignmentEntry {

    constructor(assignmentId, assignmentName, isWip = false, isReleased = false, linkOveride = null){
        
        this.assignmentId = assignmentId; // tXaYY
        this.assignmentName = assignmentName; // whatever ellis writes. Varies between kebab case and pascal case D:

        this.fullAssignmentName = this.assignmentId + "-" + this.assignmentName + "-" + creatorName // How ellis wants the assignments to be formatted
        

        this.isWip = isWip;
        this.isReleased = isReleased;

        // Just in case it's NOT an index.html within a folder of the same name (eg, work-not-screen-time)
        this.fullLink = linkOveride ? linkOveride : this.fullAssignmentName + "/index.html"
    }

    
    stringTest(isTodoList = false){
        if(this.isReleased){
            htmlElement.innerHTML += `<a href="${this.fullLink}">${this.fullAssignmentName}`
            if (this.isWip) {
                htmlElement.innerHTML += ` WIP`
            }
            htmlElement.innerHTML += `</a>`
        }
        else if (this.isWip) {
            htmlElement.innerHTML += `<p>${this.assignmentId.toUpperCase()} is a work in progress<p>`
        }
        else {
            return
        }
    }
}


let assignmentListData = [
    new AssignmentEntry(assignmentId = "t1a01", assignmentName = "BasicWeb",             isWip = true,   isReleased = false  ),
    new AssignmentEntry(assignmentId = "t1a02", assignmentName = "lists-tables",         isWip = true,   isReleased = false  ),
    new AssignmentEntry(assignmentId = "t1a03", assignmentName = "forms",                isWip = true,   isReleased = false  ),
    new AssignmentEntry(assignmentId = "t1a04", assignmentName = "css",                  isWip = true,   isReleased = false  ),
  //new AssignmentEntry(assignmentId = "t1z00", assignmentName = "Work-Not-Screen-Time", isWip = false,  isReleased = true,  linkOveride = "Work-Not-Screen-Time-Curtis.html"),
    new AssignmentEntry(assignmentId = "t1z01", assignmentName = "first-javascript",     isWip = true,   isReleased = false  ),
    new AssignmentEntry(assignmentId = "t1z02", assignmentName = "object-zombie",        isWip = true,   isReleased = true   ),
    new AssignmentEntry(assignmentId = "t1z03", assignmentName = "array-zombie",         isWip = true,   isReleased = false  ),
]


let assignmentList = document.getElementById("assignmentList")

assignmentListData.forEach(function(assignmentEntryToAdd){
    assignmentEntryToAdd.addToAssignmentList(assignmentList)
})
