"use strict";

 //Variables

// Interface för kursdetaljer
interface Course {
  courseCode: string;
  courseName: string;
  progression: string;
  syllabus: string;
}
//funktion getCourses hämtar kurser från localStorage
function getCourses(): Course[] {
  const courseArr: string | null = localStorage.getItem("courses");
  return courseArr ? JSON.parse(courseArr) : [];
}
// Funktion  
function saveCourseToLocalStorage(course: Course): void {
  const courses: Course[] = getCourses();
  courses.push(course);
  localStorage.setItem("courses", JSON.stringify(courses));
}
 

//skriv ut befintliga kurser till DOM
window.addEventListener("load", () => {
  const courses: Course[] = getCourses();
  courses.forEach(course => {
    printCourse(course);
  });
});

// Funktion för att skriva ut kursdetaljer
function printCourse(course: Course): void {
  const courseListDiv = document.getElementById("courseList");
  if (courseListDiv) {
    courseListDiv.innerHTML += `
        <h2> ${course.courseName}</h2>
        <br>
        <p><strong>Kurskod: </strong> ${course.courseCode} </p>
        <p><strong>Progression: </strong> ${course.progression}</p>
        <p><strong>Syllabus:</strong> ${course.syllabus}</p>
        <br/>
        <hr>
        <br/>
      `;
      courseListDiv.classList.add("course");
  }
  
}

// Hämta DOM-element för formulär och kursdetaljer
const courseFormEl = document.getElementById("courseForm") as HTMLFormElement;

// Lägg till händelselyssnare på formuläret
courseFormEl.addEventListener("submit", function (event: Event) {
  event.preventDefault();

  // Hämta värden från formuläret
  const codeInput = document.getElementById("courseCode") as HTMLInputElement;
  const nameInput = document.getElementById("courseName") as HTMLInputElement;
  const progressionInput = document.querySelector('input[name="progression"]:checked') as HTMLInputElement;
  const syllabusInput = document.getElementById("syllabus") as HTMLInputElement;

  //Validera länken
   const syllabusUrl = syllabusInput.value;
    if (
        !syllabusUrl.includes("http://") &&
        !syllabusUrl.includes("https://") &&
        !syllabusUrl.includes("www.")
    ) {
        alert("Länken måste innehålla 'http://', 'https://', eller 'www.'");
        return;  
    }
  //Validera vilken progression kursen har
  let progressionValue = "";
  if (progressionInput) {
      progressionValue = progressionInput.value;
  }
    // Validera om courseCode är unik vid input
    // Hämta befintliga kurser från localStorage
  const courses: Course[] = getCourses();
    let CourseIsUnique = true;
    for (const course of courses) {
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
  const newcourse: Course = {
    courseCode: codeInput.value,
    courseName: nameInput.value,
    progression: progressionInput.value,
    syllabus: syllabusInput.value,
  };

  // Använd printcourse för att skriva ut kursdetaljer
  printCourse(newcourse);
  saveCourseToLocalStorage(newcourse);
});
