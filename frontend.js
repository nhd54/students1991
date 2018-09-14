"use strict";

window.addEventListener("DOMContentLoaded", initFrontend);

function initFrontend() {
  console.log("Frontend is running");

  // register buttons for sort
  document
    .querySelector("button#sort_first")
    .addEventListener("click", clickedSortFirstname);
  document
    .querySelector("button#sort_last")
    .addEventListener("click", clickedSortLastname);
  document
    .querySelector("button#sort_house")
    .addEventListener("click", clickedSortHouse);

  // register buttons for filters
  //    document.querySelectorAll("#filters a").forEach( function(element) { element.addEventListener("click", clickedFilter); } );
  document
    .querySelectorAll("#filters a")
    .forEach(element => element.addEventListener("click", clickedFilter));
}

function clickTable() {
  console.log("clicked table");
  console.log(event.target);

  const clicked = event.target;

  if (clicked.tagName === "BUTTON") {
    clickedDelete(clicked);
  }
}

function clickedDelete(deleteButton) {
  console.log(deleteButton);

  let tr = deleteButton.parentElement;

  while (tr.tagName !== "TR") {
    tr = tr.parentElement;
  }

  const studentId = tr.dataset.studentId;
  console.log(studentId);

  deleteStudent(studentId);

  tr.remove();
}

function clickedSortFirstname() {
  console.log("clickedSortFirstname");
  sortByFirstName();
  displayList(currentStudents);
}

function clickedSortLastname() {
  console.log("clickedSortLastname");
  sortByLastName();
  displayList(currentStudents);
}

function clickedSortHouse() {
  console.log("clickedSortHouse");
  sortByHouse();
  displayList(currentStudents);
}

function clickedFilter(event) {
  console.log("clickedFilter");
  const filter = this.dataset.filter; // references data-filter="____"
  console.log(event);
  event.preventDefault();

  // create a list of filtered students by house

  // if filter === all, let the list be all students
  if (filter === "all") {
    currentStudents = allStudents;
    displayList(currentStudents);
  } else {
    currentStudents = filterByHouse(filter);
    displayList(currentStudents);
  }
}

function displayList(listOfStudents) {
  console.log("Display list");
  // clear the table
  document.querySelector("table#studentlist tbody").innerHTML = "";

  // foreach student in listOfStudents
  listOfStudents.forEach(function(student) {
    // clone a table-row for student
    const clone = document
      .querySelector("#student_template")
      .content.cloneNode(true);

    // fill in the clone with data
    clone.querySelector("[data-firstname]").textContent = student.firstName;
    clone.querySelector("[data-lastname]").textContent = student.lastName;
    clone.querySelector("[data-house]").textContent = student.house;
    clone.querySelector("tr").dataset.studentId = student.id;

    document
      .querySelector("table#studentlist")
      .addEventListener("click", clickTable);
    // append clone to table
    document.querySelector("table#studentlist tbody").appendChild(clone);
  });
}
