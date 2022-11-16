"use strict";

const $q = (selector) => document.querySelector(selector);
const courseNameOutput = document.getElementById("course-title-output");
const courseNumOutput = document.getElementById("course-num-output");
const courseDeptOutput = document.getElementById("course-dept-output");
const errorMessageParagraph = document.getElementById("error-message");
const deleteCancel = document.getElementById("cancel-delete");
const confirmDelete = document.getElementById("confirm-delete");

function deleteCourse(event) {
    event.preventDefault();
    const id = getCourseId();

    fetch("http://localhost:8888/courses/" + id, {
        method: "DELETE",
    }).then(() => {
        window.location = "./courses.html";
    })
    .catch(error => {
        console.log(error)
        errorMessageParagraph.innerText = "An unexpected error occured."
    })

}

function loadCourse(courseId) {
    fetch(`http://localhost:8888/courses/${courseId}`).then(response => response.json()).then(course => {
        console.log(course)
        courseNameOutput.innerText = course.courseName;
        courseNumOutput.innerText = course.courseNum;
        courseDeptOutput.innerText = course.dept;
    })
}

function getCourseId() {
    const params = new URLSearchParams(location.search);
    return params.get("id");
}

function cancelDelete() {
    window.location = "./courses.html"
}

window.onload = () => {
    loadCourse(getCourseId());
    const form = $q("form");
    confirmDelete.onclick = deleteCourse;
    form.onsubmit = deleteCourse;
    deleteCancel.onclick = cancelDelete;
}