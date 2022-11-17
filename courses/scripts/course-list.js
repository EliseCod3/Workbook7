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
  const updateMessageDisplay = document.getElementById("update-message");
  
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

  function displayMessage() {
    if(sessionStorage.savedMessage){
      updateMessageDisplay.innerText = sessionStorage.savedMessage;
    }else if (sessionStorage.changedMessage) {
      updateMessageDisplay.innerText = sessionStorage.changedMessage;
    }

    if(sessionStorage.deleteMessage) {
      updateMessageDisplay.innerText = sessionStorage.deleteMessage;
    }
  }

  function removeMessage() {
    if(sessionStorage.savedMessage){
      updateMessageDisplay.innerText = "";
      sessionStorage.removeItem("message");
      sessionStorage.savedMessage = "";
    }else if (sessionStorage.changedMessage) {
      updateMessageDisplay.innerText = "";
      sessionStorage.removeItem("message");
      sessionStorage.changedMessage = "";
    }

    if(sessionStorage.deleteMessage) {
      updateMessageDisplay.innerText = "";
      sessionStorage.removeItem("message");
      sessionStorage.deleteMessage = "";
    }
}
  
  window.onload = () => {
    loadCourseTableBody();
    displayMessage();
    setTimeout(removeMessage, 5000)
  };