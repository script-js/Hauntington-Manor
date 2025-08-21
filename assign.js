// Assignments

var charPicker = ["Betty", "Anita", "Nicholas", "Theodore", "Pamala", "Arthur"]
var roomPicker = ["bed", "living", "bed2", "lounge", "baseM", "attic", "kitchen"]
var weapon = "knife"

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
  "Betty": { "isMurderer": false, "clueATTR": ["NM", "IM", false], "desc": "a curly-haired old lady", "alliance": false },
  "Anita": { "isMurderer": false, "clueATTR": ["NM", "IM", false], "desc": "a timid-looking woman wearing a white dress", "alliance": false },
  "Nicholas": { "isMurderer": false, "clueATTR": ["NM", "IM", false], "desc": "a man with a brown suit and brown hair", "alliance": false },
  "Theodore": { "isMurderer": false, "clueATTR": ["NM", "IM", false], "desc": "a skinny-looking young man", "alliance": false },
  "Pamala": { "isMurderer": false, "clueATTR": ["NM", "IM", false], "desc": "an angry-looking woman with frizzy brown hair", "alliance": false },
  "Arthur": { "isMurderer": false, "clueATTR": ["NM", "IM", false], "desc": "an old man with a blue shirt", "alliance": false }
}

function getRandomNM() {
  var r1r = charPicker[(Math.floor(Math.random() * charPicker.length))];
  if (suspects[r1r].alliance == false && suspects[r1r].isMurderer == false) {
    return r1r
  } else {
    return getRandomNM()
  }
}

// More Assignments
var murderer = charPicker[(Math.floor(Math.random() * charPicker.length))]
var al1 = getRandomNM()
var al2 = getRandomNM()
suspects[murderer].isMurderer = true;
suspects[al1].alliance = true;
suspects[al2].alliance = true;

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

function getRandRoom2() {
  var cnum = (Math.floor(Math.random() * roomPicker.length))
  var chosenRD = roomPicker[cnum]
  var exists = false
  if (chosenRD == mroom || suspects[murderer].clueATTR[2] == chosenRD) {
    exists = true;
  }
  if (exists) {
    return getRandRoom2()
  } else {
    return chosenRD
  }
}

Object.keys(suspects).forEach(function (k) {
  suspects[k].clueATTR[2] = getRandRoom()
  suspects[k].clueATTR[1] = "I saw " + suspects[getRandomNM()].desc + " going into the " + getReadableRoom(getRandRoom2())
  suspects[k].clueATTR[0] = "I saw " + suspects[murderer].desc + " going into the " + getReadableRoom(mroom)
})
suspects[getRandomNM()].clueATTR[0] = al1 + " and " + al2 + " have been acting weird"