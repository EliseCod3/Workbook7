"use strict";

const $q = (selector) => document.querySelector(selector);
const courseNameInput = $q("#course-name-input");
const courseNumberInput = $q("#course-number-input");
const courseDeptInput = $q("#course-dept-input");
const courseInstrutorInput = $q("#course-instructor-input");
const startDateInput = $q("#course-startdate-input");
const numDaysInput = $q("#numDays-input");
const messageParagraph = $q("#messageParagraph");
const cancelAdd = document.getElementById("cancel-add")

function saveCourse(event) {
    event.preventDefault();

    const courseData = {
        dept: courseDeptInput.value,
        courseNum: courseNumberInput.value,
        courseName: courseNameInput.value,
        instuctor: courseInstrutorInput.value,
        startDate: startDateInput.value,
        numDays: numDaysInput.value,
    }

    fetch("http://localhost:8888/courses/", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(courseData)
    }).then(response => response.json())
    .then(data => {
        console.log(data)
        window.location = "./courses.html";
    })
    .catch(error => {
        console.log(error);
        messageParagraph.innerText = "An unexpected error occured.";
    })
}
function cancelAddingCourse() {
    window.location = "./courses.html"
}

window.onload = function() {
    const form = $q("form");
    form.onsubmit = saveCourse;
    cancelAdd.onclick = cancelAddingCourse
}