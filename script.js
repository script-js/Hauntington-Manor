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
  if 
}
