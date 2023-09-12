const http = require('http')
const fs = require('fs')
const url = require('url')
const path = require('path')

const hostname = '127.0.0.1'; // chage me to some other address 
const port = 3000;


// The player ID is a secret kept between the server and the client.
// It's what allows the client to modify their own X and Y pos as well as their color
let playerList = {
    // playerID (int) : {playerData (see client)}
    // player ID 0 will be unused for debug purposes
}

// Create server, the function here handles all requests sent to the server
var server = http.createServer(function (req, res) {


    // -----------------------------POST REQUEST---------------------------------
    if (req.method == 'POST') {
        // TODO program automatically assumes client is sending player data
        var sentPlayerData
        req.on('data', function(recievedData) {
            sentPlayerData += recievedData // data is sometimes sent in parts, use this to concat them all
        })
        req.on('end', function() {
            
            

            // Originally comes in as 'undefined{foo:"bar"...}', remove the undefined part and get an object
            sentPlayerData = sentPlayerData.slice(9)
            sentPlayerData = JSON.parse(sentPlayerData)
            
            // add data to playerlist (id : dict)
            playerIDfromClient = sentPlayerData.clientID
            delete sentPlayerData["clientID"]

            // new player ID join message (For the server logs)
            if(playerList[playerIDfromClient] == null){
                console.log("Player " + playerIDfromClient + " has joined the game.")
            }
            
            // player is declared offline (Also for the server logs)
            if(sentPlayerData.online == false){
                console.log("Player " + playerIDfromClient + " has left the game.")

                delete playerList[playerIDfromClient]
                res.writeHead(200, {'Content-Type': 'text/plain'})
                res.end('post received')
                return

            }
            
            playerList[playerIDfromClient] = sentPlayerData

            // send back verification of reception to client
            res.writeHead(200, {'Content-Type': 'text/plain'})
            res.end('post received')
        })

        return
    }


    // -----------------------------GET REQUEST----------------------------
    var q = url.parse(req.url, true);
    var filename = q.pathname;
    var query = q.query;
    var fileFormat = path.extname(q.pathname)

    // client is requesting new player ID
    if(q.pathname == "/getPlayerID"){
        // count up through the player index and return back the first ID that isn't being used TODO this is insecure
        let checkedPlayerID = 0 // 0 is unused for debug purposes, it automatically incs to 1
        let checkedPlayerContent = {}

        while(checkedPlayerContent != null){
            checkedPlayerID +=1
            checkedPlayerContent = playerList[checkedPlayerID]
        }
        
        // current number in the checkedPlayerID variable is currently unused after this while loop above
        res.writeHead(200, {'Content-Type': 'text/plain'})
        return res.end(String(checkedPlayerID))
    }
    // List of all players online (data only, no IDs)
    else if(q.pathname == "/getPlayerList"){
        res.writeHead(200, {'Content-Type': 'application/json'})
    
        let playerListCopy = JSON.parse(JSON.stringify(playerList)); // TODO so dumb, playerListCopy = playerList will cause playerList to get modified when playerListCopy is modified, i hate it
        delete playerListCopy[query.playerID]

        // convert from object (cant send to client) to array (safe to send to client)
        
        playerListCopy = Object.values(playerListCopy)
 
        return res.end(JSON.stringify(playerListCopy)) 
    }

    // no file requested = return index
    if(filename == "/"){
        filename = "/client.html"
        fileFormat = ".html"
    }

    let publicFileRequest = "./public" + filename
    // give user da file (from public directory)
    fs.readFile(publicFileRequest, function(err, data) {
        
        
        // file not found 404 check
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end("404 Not Found");
        } 
        
        // determine what format to send the file back as
        let readFormat = "text/text"
        switch(fileFormat){
            case ".html":
                readFormat = "text/html"
                break
            case ".js":
                readFormat = "application/javascript"
                break
            case ".css":
                readFormat = "text/css"
                break
        }
    
        // Return the requested file to the user
        res.writeHead(200, {'Content-Type': readFormat})
        res.write(data);
        res.end(); 
        
    });
    
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

// Sleep command (used by async functions to add delay)
var sleep = ms => new Promise(r => setTimeout(r, ms));



