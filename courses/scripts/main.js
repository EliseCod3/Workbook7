"use strict";

const courseTableBody = document.querySelector("#courseTable tbody");

function loadCourseTableBody() {
  fetch("http://localhost:8082/api/courses")
    .then((response) => response.json())
    .then((courses) => {
      courses.forEach((course) => {
        let row = courseTableBody.insertRow(-1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);

        cell1.innerText = course.courseNum;
        cell3.innerText = course.dept;

        const anchor = document.createElement('a');
        anchor.innerText = course.courseName;
        anchor.href = `./details.html?courseid=${course.id}`;
        cell2.appendChild(anchor)

      });
    });
}

window.onload = () => {
  loadCourseTableBody();
};
