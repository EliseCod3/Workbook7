"use strict";

  function createEditLink(course) {
    const a = document.createElement("a");
    a.href = "./edit-course.html?id=" + course.id;
    a.innerText = "Edit";
    return a;
  }

  function createDeleteLink(course) {
    const a = document.createElement("a");
    a.href = "./delete-course.html?id=" + course.id;
    a.innerHTML = "  &#215;";
    a.className = "delete"
    return a
  }
  
  const courseTableBody = document.querySelector("#courseTable tbody");
  
  function loadCourseTableBody() {
    fetch("http://localhost:8888/courses")
      .then((response) => response.json())
      .then((courses) => {
        courses.forEach((course) => {
          let row = courseTableBody.insertRow(-1);
          let cell1 = row.insertCell(0);
          let cell2 = row.insertCell(1);
          let cell3 = row.insertCell(2);
          let cell4 = row.insertCell(3);

          cell1.innerText = course.courseNum;
          cell3.innerText = course.dept;
  
          const anchor = document.createElement('a');
          anchor.innerText = course.courseName;
          anchor.href = `./details.html?courseid=${course.id}`;
          cell2.appendChild(anchor)

          const a = createEditLink(course);
          const d = createDeleteLink(course);
          cell4.appendChild(a);
          cell4.appendChild(d);
  
        });
      });
  }
  
  window.onload = () => {
    loadCourseTableBody();
  };