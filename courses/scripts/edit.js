"use strict";

const $q = (selector) => document.querySelector(selector);
const courseNameInput = $q("#course-name-input");
const courseNumberInput = $q("#course-number-input");
const courseDeptInput = $q("#course-dept-input");
const courseInstrutorInput = $q("#course-instructor-input");
const startDateInput = $q("#course-startdate-input");
const numDaysInput = $q("#numDays-input");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");

function saveEditedCourse(event) {
    event.preventDefault();

    const id = getCourseId();

    const courseData = {
        dept: courseDeptInput.value,
        courseNum: courseNumberInput.value,
        courseName: courseNameInput.value,
        instuctor: courseInstrutorInput.value,
        startDate: startDateInput.value,
        numDays: numDaysInput.value,
    }

    fetch("http://localhost:8888/courses/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(courseData)
    }).then(response => response.json())
    .then(data => {
        console.log(data)
        sessionStorage.changedMessage = "Changes have successfully been saved."
        window.location = "./courses.html";
    })
    .catch(error => {
        console.log(error);
        messageParagraph.innerText = "An unexpected error occured.";
    })
}

function loadCourse(courseId) {
    fetch(`http://localhost:8888/courses/${courseId}`).then(response => response.json()).then(course => {
        console.log(course)
        courseNameInput.value = course.courseName;
        courseNumberInput.value = course.courseNum;
        courseDeptInput.value = course.dept;
        courseInstrutorInput.value = course.instructor;
        startDateInput.value = course.startDate;
        numDaysInput.value = course.numDays;
    })
}

function getCourseId() {
    const params = new URLSearchParams(location.search);
    return params.get("id");
}

function cancelEdit() {
    sessionStorage.changedMessage = "No changes have been made."
    window.location = "./courses.html"
}

window.onload = () => {
    const form = $q("form");

    loadCourse(getCourseId());
    form.onsubmit = saveEditedCourse;
    cancelBtn.onclick = cancelEdit;
}