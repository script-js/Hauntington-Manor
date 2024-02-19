// Assignments

var charPicker = ["Betty","Anita","Nicholas","Theodore","Pamala","Arthur"]
var roomPicker = ["bed","living","bed2","lounge","baseM","attic","kitchen"]
var weapons = ["Knife","Pipe","Rope","Glass Shard","Bat"]
var weapon = weapons[(Math.floor(Math.random() * weapons.length))]

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
// Clue Format: [message(0),ifmurderer(1),seen(2)]

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

// More Assignments
var murderer = charPicker[(Math.floor(Math.random() * charPicker.length))]
var al1 = charPicker[(Math.floor(Math.random() * charPicker.length))]
var al2 = charPicker[(Math.floor(Math.random() * charPicker.length))]
suspects[murderer].isMurderer = true;
suspects[al1].alliance = true;
suspects[al2].alliance = true;
var responsesNM = ["I thought I saw someone go into the " + getReadableRoom(mroom),"When I walked past where the " + weapon + " usually was, I noticed it wasn't there.","I saw " + suspects[murderer].desc + " going into the " + getReadableRoom(mroom),al1 + " has been acting weird",al2 + " has been acting weird","I heard people yelling in the " + getReadableRoom(mroom)]
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
Object.keys(suspects).forEach(function (k) {
  suspects[k].clueATTR[1] = "I saw " + suspects[getRandomNM()].desc + " going into the " + getReadableRoom(mroom)
  suspects[k].clueATTR[0] = getRR()
})

// Functions/Event Listeners

function resetCPOS() {
  char.style.left = (rimg.getBoundingClientRect().width / 2) + "px"
  char.style.top = (rimg.getBoundingClientRect().height / 2) + "px"
}

function guess(elem1) {
  var gperson = elem1.getElementsByTagName("p")[0].innerHTML;
  sessionStorage.setItem("murderer",murderer)
  if (suspects[gperson].isMurderer == true) {
    popup("<h1>" + gperson + "</h1>is<p class='moi'>The Murderer!</p>")
    setTimeout(function() {location.replace("message/winSP")},6000)
  } else {
    popup("<h1>" + gperson + "</h1>is<p class='moi'>Innocent!</p>")
    setTimeout(function() {location.replace("message/loseSP")},6000)
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
    var iurl = "src/weapons/" + weapon + ".png";
    var clueText = "You found the murder weapon!";
    var npcn = "MW";
    if (foundMW == true) {
      var nocontinue = true
    }
  } else if (rooms[roomid] == "point") {
    var npcn = charPicker[(Math.floor(Math.random() * charPicker.length))];
    var npc = suspects[npcn]
    if (npc.clueATTR[2] == false) {
      var iurl = "src/suspects/" + npcn.toLowerCase() + ".png"
      if (npc.isMurderer || npc.alliance) {
        var clueText = npc.clueATTR[1]
      } else {
        var clueText = npc.clueATTR[0]
      }
    } else {
      var nocontinue = 1;
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
  } else {
    suspects[char].clueATTR[2] = true;
    var messagec = char + ' says "' + message + '"';
    cluebox = cluebox + "<p>" + messagec + "</p>"
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
  if (!roomid || roomid == "undefined") {
    popup("<h1>Uh Oh!</h1><p>Something went wrong when changing the room. Please <a href='mailto:sscriptjs@gmail.com'>report this problem</a></p><p>ERROR_ROOMID_NULL</p>")
  }
}

function popup(text) {
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
    setTimeout(function() {popupBox.innerHTML = text;},400)
    window.onclick = function() {popup();window.onclick = null}
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
  popup("<p>&nbsp;</p><h1>Who Did It?</h1><div class='guessB' onclick='guess(this)'><img src='src/suspects/betty.png'><p>Betty</p></div><div class='guessB' onclick='guess(this)'><img src='src/suspects/anita.png'><p>Anita</p></div><div class='guessB' onclick='guess(this)'><img src='src/suspects/nicholas.png'><p>Nicholas</p></div><div class='guessB' onclick='guess(this)'><img src='src/suspects/theodore.png'><p>Theodore</p></div><div class='guessB' onclick='guess(this)'><img src='src/suspects/pamala.png'><p>Pamala</p></div><div class='guessB' onclick='guess(this)'><img src='src/suspects/arthur.png'><p>Arthur</p></div><p style='font-size:10px'>Images generated by AI</p>")
}

function rungame() {
  resetCPOS()
  getTransitions("foyer")
}

setTimeout(rungame,1000)
