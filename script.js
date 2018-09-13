"use strict";

window.addEventListener("DOMContentLoaded", init);

const students = [];

const Student_prototype = {
    firstName: "",
    lastName: "",
    house: "",
    toString() {
        return this.firstName+" "+this.lastName;
    },
    splitName(fullName) {
        const firstSpace = fullName.indexOf(" ");
        this.firstName = fullName.substring(0,firstSpace);
        this.lastName = fullName.substring(firstSpace+1);
    },
    setHouse(house) {
        this.house = house;
    }
}
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
    students.splice(0, students.length); // from https://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript
    
    // fetch JSON 
    fetchData();

    // parse JSON
    // --- done via fetchJSON
}

function fetchData() {
    const url= "students.json";

    fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(jsondata) {
        console.log(jsondata);

        buildList(jsondata);
        
        displayList(students);
    });
}


function buildList(jsondata) {
    // find the keys - expect them to be the houses
    const houses = Object.keys(jsondata);
    //console.log(houses);
    // for each house, 
    houses.forEach((house) => {
        // fill the house with a list of students
        const houseStudentNames = jsondata[house];
        // console.log(houseStudentNames);
        fillHouseWithStudents(house, houseStudentNames);
    });

    function fillHouseWithStudents( house, studentNames ) {
        studentNames.forEach( createStudent );
    
        function createStudent( fullName ) {
            const student = Object.create(Student_prototype);
            student.splitName(fullName);
            //student.setHouse(house);
            student.house = house;
            students.push(student);
        }
    }
}


function sortByFirstName() {
    students.sort( byFirstName );

    function byFirstName(a,b) {
        if( a.firstName < b.firstName ) {
            return -1;
        } else if( a.firstName > b.firstName ) {
            return 1;
        } else {
            return 0;
        }
    }
}

function sortByLastName() {
    students.sort( byLastName );

    function byLastName(a,b) {
        if( a.lastName < b.lastName ) {
            return -1;
        } else {
            return 1;
        }
    }
}



function sortByHouse() {
    students.sort( byHouseAndFirstName );

    function byHouseAndFirstName(a,b) {
        // first sort by house, but if house is the same, sort by first name
        if( a.house < b.house ) {
            return -1;
        } else if( a.house > b.house ) {
            return 1;
        } else {
            if( a.firstName < b.firstName ) {
                return -1;
            } else {
                return 1;
            }
        }
    }
}

function filterByHouse( house ) {
    const filteredStudents = students.filter( byHouse );

    function byHouse( student ) {
        if( student.house === house ) {
            return true;
        } else {
            return false;
        }
    }

    return filteredStudents;
}

function listOfStudents() {
    let str = "";

    students.forEach( student => str+=student+"\n" );

    return str;
}