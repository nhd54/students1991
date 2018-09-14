"use strict";

window.addEventListener("DOMContentLoaded", init);

const allStudents = [];
let currentStudents = [];

const Student_prototype = {
  firstName: "",
  lastName: "",
  house: "",
  toString() {
    return this.firstName + " " + this.lastName;
  },
  splitName(fullName) {
    const firstSpace = fullName.indexOf(" ");
    this.firstName = fullName.substring(0, firstSpace);
    this.lastName = fullName.substring(firstSpace + 1);
  },
  setHouse(house) {
    this.house = house;
  }
};
/*
function init( ) {

}

function fetchData() {

}

function buildList(jsonData) {

}

function displayList( listOfStudents ) {

}

function sortByFirstName() {

}

function sortByLastName() {

}

function sortByHouse() {

}

function filterByHouse( house ) {

    return filteredList;
}
*/

function init() {
  // clear the students array - just in case
  allStudents.splice(0, allStudents.length); // from https://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript

  // fetch JSON
  fetchData();

  // parse JSON
  // --- done via fetchJSON
}

function fetchData() {
  const url = "students.json";

  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(jsondata) {
      console.log(jsondata);

      buildList(jsondata); // creates allStudents

      currentStudents = allStudents;

      displayList(currentStudents);
    });
}

function buildList(jsondata) {
  // find the keys - expect them to be the houses
  const houses = Object.keys(jsondata);
  //console.log(houses);
  // for each house,
  houses.forEach(house => {
    // fill the house with a list of students
    const houseStudentNames = jsondata[house];
    // console.log(houseStudentNames);
    fillHouseWithStudents(house, houseStudentNames);
  });

  function fillHouseWithStudents(house, studentNames) {
    studentNames.forEach(createStudent);

    function createStudent(fullName) {
      const student = Object.create(Student_prototype);
      student.splitName(fullName);
      //student.setHouse(house);
      student.house = house;

      student.id = "" + allStudents.length;

      allStudents.push(student);
    }
  }
}

function sortByFirstName() {
  currentStudents.sort(byFirstName);

  function byFirstName(a, b) {
    if (a.firstName < b.firstName) {
      return -1;
    } else if (a.firstName > b.firstName) {
      return 1;
    } else {
      return 0;
    }
  }
}

function sortByLastName() {
  currentStudents.sort(byLastName);

  function byLastName(a, b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  }
}

function deleteStudent(studentId) {
  console.log("break here");

  // function that returns true when student.id = studentId
  const index = allStudents.findIndex(findStudent);
  allStudents.splice(index, 1);
  function findStudent(student) {
    if (student.id === studentId) {
      return true;
    } else {
      return false;
    }
  }
}
function generateUUID() {
  // Public Domain/MIT
  var d = new Date().getTime();
  if (
    typeof performance !== "undefined" &&
    typeof performance.now === "function"
  ) {
    d += performance.now(); //use high-precision timer if available
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}
function sortByHouse() {
  currentStudents.sort(byHouseAndFirstName);

  function byHouseAndFirstName(a, b) {
    // first sort by house, but if house is the same, sort by first name
    if (a.house < b.house) {
      return -1;
    } else if (a.house > b.house) {
      return 1;
    } else {
      if (a.firstName < b.firstName) {
        return -1;
      } else {
        return 1;
      }
    }
  }
}

function filterByHouse(house) {
  const filteredStudents = allStudents.filter(byHouse);

  function byHouse(student) {
    if (student.house === house) {
      return true;
    } else {
      return false;
    }
  }

  return filteredStudents;
}

function listOfStudents() {
  let str = "";

  allStudents.forEach(student => (str += student + "\n"));

  return str;
}
