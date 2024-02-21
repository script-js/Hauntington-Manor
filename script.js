// Assignments

var charPicker = ["Betty","Anita","Nicholas","Theodore","Pamala","Arthur"]
var roomPicker = ["bed","living","bed2","lounge","baseM","attic","kitchen"]
var weapon = "knife"
var mpuid = "TESTER" + Math.random()

// Rooms

var rooms = {
  "bed": "point",
  "living": "point",
  "bed2": "point",
  "lounge": "point",
  "baseM": "point",
  "attic": "point",
  "kitchen": "point"
}
var mroom = roomPicker[(Math.floor(Math.random() * roomPicker.length))];
rooms[mroom] = true
function getReadableRoom(roomid) {
  if (roomid == "bed") {
    return "Bedroom"
  } else if (roomid == "living") {
    return "Living Room"
  } else if (roomid == "bed2") {
    return "Second Bedroom"
  } else if (roomid == "lounge") {
    return "Lounge"
  } else if (roomid == "baseM") {
    return "Basement"
  } else if (roomid == "attic") {
    return "Attic"
  } else if (roomid == "kitchen") {
    return "Kitchen"
  } else {
    return roomid
  }
}

// Suspects
// Clue Format: [message(0),ifmurderer(1),room(2)]

var suspects = {
  "Betty": {"isMurderer":false,"clueATTR":["NM","IM",false],"desc":"a curly-haired old lady","alliance":false},
  "Anita": {"isMurderer":false,"clueATTR":["NM","IM",false],"desc":"a timid-looking woman wearing a white dress","alliance":false},
  "Nicholas": {"isMurderer":false,"clueATTR":["NM","IM",false],"desc":"a man with a brown suit and brown hair","alliance":false},
  "Theodore": {"isMurderer":false,"clueATTR":["NM","IM",false],"desc":"a skinny-looking young man","alliance":false},
  "Pamala": {"isMurderer":false,"clueATTR":["NM","IM",false],"desc":"an angry-looking woman with frizzy brown hair","alliance":false},
  "Arthur": {"isMurderer":false,"clueATTR":["NM","IM",false],"desc":"an old man with a blue shirt","alliance":false}
}

function getRandomNM() {
  var r1r = charPicker[(Math.floor(Math.random() * charPicker.length))];
  if (suspects[r1r].alliance == false && suspects[r1r].isMurderer == false) {
    return r1r
  } else {
    return getRandomNM()
  }
}

// Extra Variables

var mvar;
var intJSON = {};
var foundMW = false;
var started = false;
var cluebox = "<h1>Clues</h1>";
var trMin = 0;
var trHour = 0;
var setupint;
var fbON = false;

// More Assignments
var mpcode = false;
var murderer = charPicker[(Math.floor(Math.random() * charPicker.length))]
var al1 = charPicker[(Math.floor(Math.random() * charPicker.length))]
var al2 = charPicker[(Math.floor(Math.random() * charPicker.length))]
suspects[murderer].isMurderer = true;
suspects[al1].alliance = true;
suspects[al2].alliance = true;
var responsesNM = ["When I walked past where the " + weapon + " usually was, I noticed it wasn't there.","I saw " + suspects[murderer].desc + " going into the " + getReadableRoom(mroom),al1 + " and " + al2 + " have been acting weird"]
function getRR() {
  var cnum = (Math.floor(Math.random() * responsesNM.length))
  var chosenR = responsesNM[cnum]
  if (chosenR) {
    return chosenR;
    responsesNM[cnum] = false
  } else {
    return getRR()
  }
}
function getRandRoom() {
  var cnum = (Math.floor(Math.random() * roomPicker.length))
  var chosenRD = roomPicker[cnum]
  var exists = false
  Object.keys(suspects).forEach(function (k) {
    if (chosenRD == suspects[k].clueATTR[2] || chosenRD == mroom) {
      exists = true;
    }
  })
  if (exists) {
    return getRandRoom()
  } else {
    return chosenRD
  }
}

Object.keys(suspects).forEach(function (k) {
  suspects[k].clueATTR[2] = getRandRoom()
  suspects[k].clueATTR[1] = "I saw " + suspects[getRandomNM()].desc + " going into the " + getReadableRoom(mroom)
  suspects[k].clueATTR[0] = getRR()
})
function isetup() {
  if (fbON) {
    clearInterval(setupint)
    mpcode = sessionStorage.getItem("multiplayer")
    mpSync()
  }
}
  if (!sessionStorage.getItem("multiplayer")) {
    if (localStorage.getItem("tutorial")) {
      popup("<h1>Get Ready!</h1>",true)
      setTimeout(rungame,3000)
    } else {
      localStorage.setItem("tutorial","done")
      location.replace("tutorial")
    }
  } else {
    popup("<h1>Connecting to game...</h1>")
    setupint = setInterval(isetup,500)
  }

// Functions/Event Listeners

function resetCPOS() {
  char.style.left = (rimg.getBoundingClientRect().width / 2) + "px"
  char.style.top = (rimg.getBoundingClientRect().height / 2) + "px"
}

function guess(elem1) {
  var gperson = elem1.getElementsByTagName("p")[0].innerHTML;
  sessionStorage.setItem("murderer",murderer)
  if (suspects[gperson].isMurderer == true) {
    popup("<h1>" + gperson + "</h1>is<p class='moi'>The Murderer!</p>",true)
    if (mpcode) {
      setTimeout(function() {location.replace("message/winMP")},6000)
    } else {
      setTimeout(function() {location.replace("message/winSP")},6000)
    }
  } else {
    popup("<h1>" + gperson + "</h1>is<p class='moi'>Innocent!</p>",true)
    if (mpcode) {
      setTimeout(function() {location.replace("message/loseMP")},6000)
    } else {
      setTimeout(function() {location.replace("message/loseSP")},6000)
    }
  }
  if (mpcode) {
    throwGuess(gperson)
  }
}

function move(direction) {
  var irect = rimg.getBoundingClientRect()
  if (direction == "l") {
    if (char.getBoundingClientRect().left > irect.left) {
      char.style.left = (parseInt(char.style.left) - 1) + "px";
    }
  } else if (direction == "u") {
    if (char.getBoundingClientRect().top > irect.top) {
      char.style.top = (parseInt(char.style.top) - 1) + "px";
    }
  } else if (direction == "r") {
    if (irect.right > char.getBoundingClientRect().right) {
      char.style.left = (parseInt(char.style.left) + 1) + "px";
    }
  } else if (direction == "d") {
    if (irect.bottom > char.getBoundingClientRect().bottom) {
      char.style.top = (parseInt(char.style.top) + 1) + "px";
    }
  }
}

function moveSS(direction) {
  clearInterval(mvar)
  if (direction) {
    mvar = setInterval('move("' + direction + '")',1)
  }
}

window.addEventListener("keydown", (event) => {
  if (event.key == "ArrowUp") {
    moveSS("u")
  } else if (event.key == "ArrowDown") {
    moveSS("d")
  } else if (event.key == "ArrowRight") {
    moveSS("r")
  } else if (event.key == "ArrowLeft") {
    moveSS("l")
  }
});

window.addEventListener("keyup", (event) => {
  if (event.key == "ArrowUp" || event.key == "ArrowDown" || event.key == "ArrowRight" || event.key == "ArrowLeft") {
    moveSS()
  }
});

function spawnClue(roomid) {
  if (rooms[roomid] == true) {
    var iurl = "src/" + weapon + ".png";
    var clueText = "You found the murder weapon!";
    var npcn = "MW";
    if (foundMW == true) {
      var nocontinue = true
    }
  } else if (rooms[roomid] == "point") {
    Object.keys(suspects).forEach(function (k) {
      if (suspects[k].clueATTR[2] == roomid) {
        npcn = k;
      }
    })
    var npc = suspects[npcn]
      var iurl = "src/suspects/" + npcn.toLowerCase() + ".png"
      if (npc.isMurderer || npc.alliance) {
        var clueText = npc.clueATTR[1]
      } else {
        var clueText = npc.clueATTR[0]
      }
  }
  if (roomid == "living") {
    var details = "right:1%;top:14%;";
  } else if (roomid == "lounge") {
    var details = "top:40%;right:18%";
  } else if (roomid == "kitchen") {
    var details = "top:1%;left:23%";
  } else if (roomid == "baseM") {
    var details = "top:10%;left:20%"
  } else if (roomid == "bed") {
    var details = "left:2%;top:2%"
  } else if (roomid == "bed2") {
    var details = "top:2%;right:2%"
  } else if (roomid == "attic") {
    var details = "top:25%;right:37%"
  }
  if (!nocontinue) {
    var newclue = document.createElement("div")
    newclue.classList = "invisiclue";
    newclue.innerHTML = "<img src='" + iurl + "' width='90%'>";
    newclue.style = details;
    newclue.id = "clue" +  Math.ceil(Math.random() * 1000);
    intJSON[newclue.id] = setInterval(function() {
      if (touches(document.getElementById(newclue.id))) {
        clueAct(clueText,iurl,newclue.id,roomid,npcn)
      }
    },1)
    imgTCont.appendChild(newclue)
  }
  if (nocontinue == 1) {
    spawnClue(roomid)
  }
}

function clueAct(message,image,cid,room,char) {
  if (char == "MW") {
    foundMW = true;
    var messagec = message
    cluebox = cluebox + "<p>The murder weapon was in the " + getReadableRoom(room) + "</p>"
  } else {
    var messagec = char + ' says "' + message + '"';
    cluebox = cluebox + "<p>" + messagec + "</p>";
  }
  rooms[room] = false;
  clearInterval(intJSON[cid])
  document.getElementById(cid).remove();
  popup("<img width='50%' src='" + image + "'><h1>Clue Found!</h1><p>" + messagec + "</p>")
}

function getTransitions(roomid,run) {
  if (roomid == "foyer") {
    if (run) {
      var details = "right:0;bottom:0;";
      var transitionTo = "baseM";
    } else {
      var details = "top:40%;right:0";
      var transitionTo = "living";
      getTransitions("foyer",1)
    }
  } else if (roomid == "living") {
    if (run == 3) {
      var details = "top:0;left:43%";
      var transitionTo = "uHall";
    } else if (run == 1) {
      var details = "top:40%;right:0";
      var transitionTo = "kitchen";
      getTransitions("living",2)
    } else if (run == 2) {
      var details = "top:40%;left:0";
      var transitionTo = "foyer";
      getTransitions("living",3)
    } else {
      var details = "left:60%;bottom:0;";
      var transitionTo = "lounge";
      getTransitions("living",1)
    }
  } else if (roomid == "lounge") {
    var details = "top:0;left:60%;";
    var transitionTo = "living";
  } else if (roomid == "bed") {
    var details = "bottom:0;left:45%";
    var transitionTo = "uHall"
  } else if (roomid == "baseM") {
    if (run) {
      var details = "top:0;left:0;"
      var transitionTo = "foyer"
    } else {
      var details = "right: 0; top: 80%;";
      var transitionTo = "kitchen"
      getTransitions("baseM",1)
    }
  } else if (roomid == "kitchen") {
    if (run) {
      var details = "top:40%;left:0;"
      var transitionTo = "living"
    } else {
      var details = "bottom:0;left:15%";
      var transitionTo = "baseM"
      getTransitions("kitchen",1)
    }
  } else if (roomid == "uHall") {
    if (run == 3) {
      var details = "bottom:0;left:43%";
      var transitionTo = "living";
    } else if (run == 1) {
      var details = "top:0;left:44%";
      var transitionTo = "bed";
      getTransitions("uHall",2)
    } else if (run == 2) {
      var details = "top:17%;left:0";
      var transitionTo = "attic";
      getTransitions("uHall",3)
    } else {
      var details = "top:0;right:0";
      var transitionTo = "bed2";
      getTransitions("uHall",1)
    }
  } else if (roomid == "bed2") {
    var details = "top:27%;left:0";
    var transitionTo = "uHall"
  } else if (roomid == "attic") {
    var details = "right:0;top:40%";
    var transitionTo = "uHall"
  }
  var newclue = document.createElement("div")
  newclue.classList = "invisiclue";
  newclue.style = details;
  if (!run) {
    newclue.id = "door";
  } else {
    newclue.id = "door" + run;
  }
  intJSON[newclue.id] = setInterval("if (touches(" + newclue.id + ")) {rChange('" + transitionTo + "')};",1)
  imgTCont.appendChild(newclue)
}
 
function rChange(roomid) {
  var doors = imgTCont.querySelectorAll(".invisiclue")
  Object.keys(doors).forEach(function (k) {doors[k].remove()})
  Object.keys(intJSON).forEach(function (k) {clearInterval(intJSON[k])})
  rimg.style.animation = "fadeInOut ease 3s"
  char.style.animation = "fadeInOut ease 3s"
  setTimeout(function() {
    rimg.style.animation = ""
    char.style.animation = ""
    getTransitions(roomid)
    if (rooms[roomid]) {
      spawnClue(roomid)
    }
  },3000)
  setTimeout(function() {
    if (roomid == "foyer") {
      rimg.src = "src/room.png"
    } else {
      rimg.src = "src/room/" + roomid + ".png";
    }
    resetCPOS();
  },1000)
  if (mpcode) {
    mpRoom(mpuid,roomid)
  }
}

function popup(text,noclose) {
  if (!text) {
    popupBox.style.height = "2px"
    popupBox.innerHTML = "";
    setTimeout(function() {
      popupBack.style.display = "none";
    },400)
  } else {
  popupBack.style.display = "block";
  setTimeout(function() {
    popupBox.style.height = "98%"
  },50)
    setTimeout(function() {
      if (!noclose) {
        popupBox.innerHTML = "<p>&nbsp;</p>" + text + "<p></p><button class='popupCB' onclick='popup()'>Close</button>";
      } else {
        popupBox.innerHTML = "<p>&nbsp;</p>" + text
      }
    },400)
  }
}

function touches(elem1) {
  var clLeft = elem1.getBoundingClientRect().left - 20;
  var clRight = elem1.getBoundingClientRect().right + 20;
  var clTop = elem1.getBoundingClientRect().top - 20;
  var clBottom = elem1.getBoundingClientRect().bottom + 20;
  var cLeft = char.getBoundingClientRect().left
  var cTop = char.getBoundingClientRect().top
  return (
    cLeft > clLeft
    && cLeft < clRight 
    && cTop > clTop
    && cTop < clBottom
  )
}

function cShow() {
  if (foundMW) {
    if (rimg.src == "https://hauntington-manor.pages.dev/src/room.png") {
      popup("<h1>Who Did It?</h1><div class='guessB' onclick='guess(this)'><img src='src/suspects/betty.png'><p>Betty</p></div><div class='guessB' onclick='guess(this)'><img src='src/suspects/anita.png'><p>Anita</p></div><div class='guessB' onclick='guess(this)'><img src='src/suspects/nicholas.png'><p>Nicholas</p></div><div class='guessB' onclick='guess(this)'><img src='src/suspects/theodore.png'><p>Theodore</p></div><div class='guessB' onclick='guess(this)'><img src='src/suspects/pamala.png'><p>Pamala</p></div><div class='guessB' onclick='guess(this)'><img src='src/suspects/arthur.png'><p>Arthur</p></div><p style='font-size:10px'>Images generated by AI</p>")
      if (mpcode) {
        throwGuessProg(mpuid)
      }
    } else {
      popup("<h1>Return to the Foyer to make a guess.</h1>")
    }
  } else {
    popup("<h1>You need to find the murder weapon before you can make a decision.</h1>")
  }
}

function rungame() {
  popup()
  resetCPOS()
  getTransitions("foyer")
  setInterval(count,500)
}

function count() {
  if (mpcode) {getTime()} else {
  trMin = trMin + 1
  if (trMin == 60) {
    trMin = 0
    trHour = trHour + 1
  }
  if (trMin.toString().length == 1) {
    var minTXT = "0" + trMin
  } else {
    var minTXT = trMin
  }
  if (trHour == 12) {
    popup("<h1>Times Up!</h1>",true)
    sessionStorage.setItem("murderer",murderer)
    setTimeout(function() {location.replace("message/loseSP")},2000)
  } else {
    etabox.innerHTML = trHour + ":" + minTXT
  }
  }
}

function splist() {
  popup("<div class='plB' onclick='guess(this)'><img src='src/suspects/betty.png'><p>Betty</p></div><div class='plB' onclick='guess(this)'><img src='src/suspects/anita.png'><p>Anita</p></div><div class='plB' onclick='guess(this)'><img src='src/suspects/nicholas.png'><p>Nicholas</p></div><div class='plB' onclick='guess(this)'><img src='src/suspects/theodore.png'><p>Theodore</p></div><div class='plB' onclick='guess(this)'><img src='src/suspects/pamala.png'><p>Pamala</p></div><div class='plB' onclick='guess(this)'><img src='src/suspects/arthur.png'><p>Arthur</p></div><p style='font-size:10px'>Images generated by AI</p>")
}

function sMap() {
  popupBack.style.display = "block";
  setTimeout(function() {
    popupBox.style.height = "98%"
  },50)
    setTimeout(function() {
      popupBox.innerHTML = "<img src='src/map.png' width='80%'><br><button class='popupCB' onclick='popup()'>Close</button>";
    },400)
}

// Multiplayer Monitoring: guess,rChange,cShow
// Create Functions: throwGuess,mpSync,throwGuessProg,mpRoom,getTime
