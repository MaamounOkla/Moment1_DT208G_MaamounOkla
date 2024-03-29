"use strict";
// Funktion för att hämta kurser från localStorage
function getCourses() {
    var courseArr = localStorage.getItem("courses");
    return courseArr ? JSON.parse(courseArr) : [];
}
// Funktion för att spara kurs till localStorage
function saveCourseToLocalStorage(course) {
    var courses = getCourses();
    courses.push(course);
    localStorage.setItem("courses", JSON.stringify(courses));
}
// Funktion för att uppdatera kurs i localStorage
function updateCourseInLocalStorage(course) {
    var courses = getCourses();
    var updatedCourses = courses.map(function (c) {
        return c.courseCode === course.courseCode ? course : c;
    });
    localStorage.setItem("courses", JSON.stringify(updatedCourses));
}
// Funktion för att skriva ut befintliga kurser till DOM
window.addEventListener("load", function () {
    var courses = getCourses();
    courses.forEach(function (course) {
        printCourse(course);
    });
});
// Funktion för att skriva ut kursdetaljer
function printCourse(course) {
    var courseListEl = document.getElementById("courseList");
    var courseListDiv = document.createElement("div");
    courseListEl === null || courseListEl === void 0 ? void 0 : courseListEl.appendChild(courseListDiv);
    if (courseListDiv) {
        courseListDiv.classList.add("course");
        courseListDiv.innerHTML += "\n        <div>\n            <h2>".concat(course.courseName, "</h2>\n            <br>\n            <p><strong>Kurskod: </strong>").concat(course.courseCode, "</p>\n            <p><strong>Progression: </strong>").concat(course.progression, "</p>\n            <p><strong>Syllabus:</strong>").concat(course.syllabus, "</p>\n            <br/>\n            <hr>\n            <br/>\n        </div>\n    ");
        // Redigera knappen
        var editBtn = document.createElement("button");
        editBtn.textContent = "Redigera";
        editBtn.classList.add("edit-btn");
        courseListDiv.appendChild(editBtn);
        // Lägg till händelselyssnare för "Redigera" knappen
        editBtn.addEventListener("click", function () {
            // Byt ut text med inputfält när "Redigera" knappen klickas
            var editCourseDiv = document.createElement("div");
            editCourseDiv.classList.add("edit-course-div");
            //radera äldre inputfälten
            editCourseDiv.innerHTML = "";
            editCourseDiv.innerHTML = "\n            <input type=\"text\" value=\"".concat(course.courseName, "\" placeholder=\"Kursnamn\">\n            <input type=\"text\" value=\"").concat(course.courseCode, "\" placeholder=\"Kurskod\">\n            <input type=\"text\" value=\"").concat(course.progression, "\" placeholder=\"Progression\">\n            <input type=\"text\" value=\"").concat(course.syllabus, "\" placeholder=\"Syllabus\">\n            <button class=\"save-btn\">Spara</button>\n        ");
            // Hämta knappen för att spara uppdateringar och lägg till event listener
            var saveBtn = editCourseDiv.querySelector(".save-btn");
            if (saveBtn) {
                saveBtn.addEventListener("click", function () {
                    var updatedCourse = {
                        courseName: editCourseDiv.querySelector('input[placeholder="Kursnamn"]').value,
                        courseCode: editCourseDiv.querySelector('input[placeholder="Kurskod"]').value,
                        progression: editCourseDiv.querySelector('input[placeholder="Progression"]').value,
                        syllabus: editCourseDiv.querySelector('input[placeholder="Syllabus"]').value,
                    };
                    courseListEl === null || courseListEl === void 0 ? void 0 : courseListEl.removeChild(courseListDiv); // Ta bort gamla kursdetaljer
                    printCourse(updatedCourse); // Uppdatera kursdetaljer
                    updateCourseInLocalStorage(updatedCourse); // Uppdatera kursen i localStorage
                });
            }
            courseListDiv.appendChild(editCourseDiv); // Lägg till redigeringsfälten
        });
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
    // Validera om courseCode är unik vid input
    // Hämta befintliga kurser från localStorage
    var courses = getCourses();
    var CourseIsUnique = true;
    for (var _i = 0, courses_1 = courses; _i < courses_1.length; _i++) {
        var course = courses_1[_i];
        if (course.courseCode === codeInput.value) {
            CourseIsUnique = false;
            break;
        }
    }
    if (!CourseIsUnique) {
        alert("Kurskoden måste vara unik.");
        return;
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
    saveCourseToLocalStorage(newcourse);
});
