"use strict";
//funktion getCourses hämtar kurser från localStorage
function getCourses() {
    var courseJSON = localStorage.getItem("courses");
    return courseJSON ? JSON.parse(courseJSON) : [];
}
// Funktion  
function saveCourseToLocalStorage(course) {
    var courses = getCourses();
    courses.push(course);
    localStorage.setItem("courses", JSON.stringify(courses));
}
//skriv ut befintliga kurser till DOM
window.addEventListener("load", function () {
    var courses = getCourses();
    courses.forEach(function (course) {
        printCourse(course);
    });
});
// Funktion för att skriva ut kursdetaljer
function printCourse(course) {
    var courseListDiv = document.getElementById("courseList");
    if (courseListDiv) {
        courseListDiv.innerHTML += "\n        <h2> ".concat(course.courseName, "</h2>\n        <br>\n        <p><strong>Kurskod:</strong>").concat(course.courseCode, " </p>\n        <p><strong>Progression:</strong> ").concat(course.progression, "</p>\n        <p><strong>Syllabus:</strong> ").concat(course.syllabus, "</p>\n        <br/>\n        <hr>\n        <br/>\n      ");
        courseListDiv.classList.add("course");
    }
}
// Hämta DOM-element för formulär och kursdetaljer
var courseFormEl = document.getElementById("courseForm");
// Lägg till händelselyssnare på formuläret
courseFormEl.addEventListener("submit", function (event) {
    event.preventDefault();
    // Hämta värden från formuläret
    var codeInput = document.getElementById("courseCode");
    var nameInput = document.getElementById("courseName");
    var progressionInput = document.querySelector('input[name="progression"]:checked');
    var syllabusInput = document.getElementById("syllabus");
    //Validera länken
    var syllabusUrl = syllabusInput.value;
    if (!syllabusUrl.includes("http://") &&
        !syllabusUrl.includes("https://") &&
        !syllabusUrl.includes("www.")) {
        alert("Länken måste innehålla 'http://', 'https://', eller 'www.'");
        return;
    }
    //Validera vilken progression kursen har
    var progressionValue = "";
    if (progressionInput) {
        progressionValue = progressionInput.value;
    }
    // Skapa ett nytt kursobjekt
    var newcourse = {
        courseCode: codeInput.value,
        courseName: nameInput.value,
        progression: progressionInput.value,
        syllabus: syllabusInput.value,
    };
    // Använd printcourse för att skriva ut kursdetaljer
    printCourse(newcourse);
});
