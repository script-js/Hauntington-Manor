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

function initalAssignment() {
  var murderer = charPicker[(Math.floor(Math.random() * charPicker.length))];
  var mroom = roomPicker[(Math.floor(Math.random() * roomPicker.length))];
  suspects[murderer] = true;
  rooms[mroom] = true;
}

function guess(gperson) {
  if (suspects[gperson] == true) {
    popup("<h1>" + gperson + "</h1>is<p class='moi'>The Murderer!</p>")
  } else {
    popup("<h1>" + gperson + "</h1>is<p class='moi'>Innocent!</p>")
  }
}

function move(direction) {
  if (!char.style.left || !char.style.top) {
    char.style.left = "30px"
    char.style.top = "30px"
  }
  if (direction == "l") {
    if (parseInt(char.style.left) > 0) {
      char.style.left = (parseInt(char.style.left) - 1) + "px";
    }
  } else if (direction == "u") {
    if (parseInt(char.style.top) > 0) {
      char.style.top = (parseInt(char.style.top) - 1) + "px";
    }
  } else if (direction == "r") {
    if ((window.innerWidth - 100) > parseInt(char.style.left)) {
      char.style.left = (parseInt(char.style.left) + 1) + "px";
    }
  } else if (direction == "d") {
    if ((window.innerHeight - 100) > parseInt(char.style.top)) {
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
    var details = "left:560px;top:80px"
  }
  var newclue = document.createElement("div")
  newclue.classList = "invisiclue";
  newclue.style = details
  clueCont.appendChild(newclue)
}

function rChange(roomid,iext) {
  clueCont.innerHTML = "";
  rimg.src = "src/room/" + roomid + iext;
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
