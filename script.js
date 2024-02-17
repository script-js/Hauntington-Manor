// Assignments

var roomPicker = ["bed","living","bed2","lounge","baseM","attic","kitchen"]
var charPicker = ["Betty","Anita","Nicholas","Theodore","Pamala"]

// Rooms
var rooms = {
  "bed": false,
  "living": false,
  "bed2": false,
  "lounge": false,
  "baseM": false,
  "attic": false,
  "kitchen": false
}

// Suspects
var suspects = {
  "Betty": false,
  "Anita": false,
  "Nicholas": false,
  "Theodore": false,
  "Pamala": false
}

// Extra Variables

var mvar;
var intJSON = {}
var started = false;
char.style.left = (rimg.getBoundingClientRect().right / 2) + "px"
char.style.top = (rimg.getBoundingClientRect().bottom / 2) + "px"

function initalAssignment() {
  var murderer = charPicker[(Math.floor(Math.random() * charPicker.length))];
  suspects[murderer] = true;
  rooms[roomPicker[(Math.floor(Math.random() * roomPicker.length))]] = true;
  rooms[roomPicker[(Math.floor(Math.random() * roomPicker.length))]] = true;
  rooms[roomPicker[(Math.floor(Math.random() * roomPicker.length))]] = true;
}

function guess(gperson) {
  if (suspects[gperson] == true) {
    popup("<h1>" + gperson + "</h1>is<p class='moi'>The Murderer!</p>")
  } else {
    popup("<h1>" + gperson + "</h1>is<p class='moi'>Innocent!</p>")
  }
}

function move(direction) {
  var irect = rimg.getBoundingClientRect()
  if (direction == "l") {
    if (parseInt(char.style.left) > irect.left) {
      char.style.left = (parseInt(char.style.left) - 1) + "px";
    }
  } else if (direction == "u") {
    if (parseInt(char.style.top) > irect.top) {
      char.style.top = (parseInt(char.style.top) - 1) + "px";
    }
  } else if (direction == "r") {
    if (irect.right > parseInt(char.style.left)) {
      char.style.left = (parseInt(char.style.left) + 1) + "px";
    }
  } else if (direction == "d") {
    if (irect.bottom > parseInt(char.style.top)) {
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
  if (roomid == "testid") {
    var details = "left:560px;top:80px;background:red;";
  }
  var newclue = document.createElement("div")
  newclue.classList = "invisiclue";
  newclue.style = details;
  newclue.id = "clue" +  Math.ceil(Math.random() * 1000);
  intJSON[newclue.id] = setInterval("if (touches(" + newclue.id + ")) {" + newclue.id + ".remove();clueAct('" + roomid + "')};",1)
  clueCont.appendChild(newclue)
}

function clueAct(roomid) {
  if (roomid == "testid") {
    popup("<h1>Clue Found!</h1>some clue text here...")
    window.onclick = function() {popup();window.onclick = null};
  }
}

function getTransitions(roomid,run) {
  if (roomid == "foyer") {
    if (run) {
      var details = "right:0;top:90%";
      var transitionTo = "baseM";
    } else {
      var details = "top:43%;right:-50px";
      var transitionTo = "living";
      getTransitions("foyer",1)
    }
  } else if (roomid == "living") {
    if (run == 3) {
      var details = "top:0;left:43%";
      var transitionTo = "bed";
    } else if (run == 1) {
      var details = "top:43%;right:-50px";
      var transitionTo = "kitchen";
      getTransitions("living",2)
    } else if (run == 2) {
      var details = "top:43%;left:-50px";
      var transitionTo = "foyer";
      getTransitions("living",3)
    } else {
      var details = "left:60%;top:90%";
      var transitionTo = "lounge";
      getTransitions("living",1)
    }
  } else if (roomid == "lounge") {
    var details = "top:0;left:60%;";
    var transitionTo = "living";
  } else if (roomid == "bed") {
    var details = "bottom:-50px;left:45%";
    var transitionTo = "living"
  }
  var newclue = document.createElement("div")
  newclue.classList = "invisiclue";
  newclue.style = details;
  if (!run) {
    newclue.id = "door";
  } else {
    newclue.id = "door" + run;
  }
  intJSON[newclue.id] = setInterval("if (touchesD(" + newclue.id + ")) {rChange('" + transitionTo + "')};",1)
  imgTCont.appendChild(newclue)
}

getTransitions("foyer")
 
function rChange(roomid) {
  var doors = imgTCont.querySelectorAll(".invisiclue")
  Object.keys(doors).forEach(function (k) {doors[k].remove()})
  Object.keys(intJSON).forEach(function (k) {clearInterval(intJSON[k])})
  resetCPOS();
  rimg.style.animation = "fadeInOut ease 3s;"
  char.style.animation = "fadeInOut ease 3s;"
  setTimeout(function() {
    rimg.style.animation = ""
    char.style.animation = ""
  },3000)
  getTransitions(roomid)
  if (roomid == "foyer") {
    rimg.src = "src/room.png"
  } else {
    rimg.src = "src/room/" + roomid + ".png";
  }
  if (rooms[roomid] == true) {
    spawnClue(roomid)
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
  }
}

function touches(clue) {
  var clLeft = parseInt(clue.style.left) - 20;
  var clRight = parseInt(clue.style.left) + 120;
  var clTop = parseInt(clue.style.top) - 20;
  var clBottom = parseInt(clue.style.top) + 120;
  var cLeft = parseInt(char.style.left);
  var cTop = parseInt(char.style.top);
  return (
    cLeft > clLeft
    && cLeft < clRight 
    && cTop > clTop
    && cTop < clBottom
  )
}

function touchesD(door) {
  var clLeft = door.getBoundingClientRect().left - 20;
  var clRight = door.getBoundingClientRect().right + 20;
  var clTop = door.getBoundingClientRect().top - 20;
  var clBottom = door.getBoundingClientRect().bottom + 20;
  var cLeft = parseInt(char.style.left);
  var cTop = parseInt(char.style.top);
  return (
    cLeft > clLeft
    && cLeft < clRight 
    && cTop > clTop
    && cTop < clBottom
  )
}

function resetCPOS() {
  char.style.left = (rimg.getBoundingClientRect().right / 2) + "px"
  char.style.top = (rimg.getBoundingClientRect().bottom / 2) + "px"
}
