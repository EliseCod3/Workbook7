"use strict";

const $q = (selector) => document.querySelector(selector);
const courseNameInput = $q("#course-name-input");
const courseNumberInput = $q("course-number-input");
const courseDeptInput = $q("course-dept-input");
const courseInstrutorInput = $q("course-instructor-input");
const startDateInput = $q("course-startdate")
const form = $q("form");

function saveCourse(event) {
    event.preventDefault():



}

window.onload = () => {
    form.submit = saveCourse;
}