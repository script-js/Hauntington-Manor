// Assignments

var roomPicker = ["bed","living","bed2","lounge","baseM"]
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
    return "The Murderer!"
  } else {
    return "Innocent!"
  }
}

function move(direction) {
  if (!char.style.left || !char.style.top) {
    char.style.left = "30px"
    char.style.top = "30px"
  }
  if (direction == "l") {
    if (parseInt(char.style.left) > 0) {
      char.style.left = (parseInt(char.style.left) - 3) + "px";
    }
  } else if (direction == "u") {
    if (parseInt(char.style.top) > 0) {
      char.style.top = (parseInt(char.style.top) - 3) + "px";
    }
  } else if (direction == "r") {
    if (window.innerWidth > parseInt(char.style.left)) {
      char.style.left = (parseInt(char.style.left) + 3) + "px";
    }
  } else if (direction == "d") {
    if (window.innerHeight > parseInt(char.style.top)) {
      char.style.top = (parseInt(char.style.top) + 3) + "px";
    }
  }
}

function moveSS(direction) {
  clearInterval(mvar)
  if (direction) {
    mvar = setInterval('move("' + direction + '")',1)
  }
}
