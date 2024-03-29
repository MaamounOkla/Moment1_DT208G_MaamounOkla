"use strict";

// Interface för kursdetaljer
interface Course {
  courseCode: string;
  courseName: string;
  progression: string;
  syllabus: string;
}

// Funktion för att hämta kurser från localStorage
function getCourses(): Course[] {
  const courseArr: string | null = localStorage.getItem("courses");
  return courseArr ? JSON.parse(courseArr) : [];
}

// Funktion för att spara kurs till localStorage
function saveCourseToLocalStorage(course: Course): void {
  const courses: Course[] = getCourses();
  courses.push(course);
  localStorage.setItem("courses", JSON.stringify(courses));
}

// Funktion för att uppdatera kurs i localStorage
function updateCourseInLocalStorage(course: Course): void {
  const courses: Course[] = getCourses();
  const updatedCourses: Course[] = courses.map((c) =>
    c.courseCode === course.courseCode ? course : c
  );
  localStorage.setItem("courses", JSON.stringify(updatedCourses));
}

// Funktion för att skriva ut befintliga kurser till DOM
window.addEventListener("load", () => {
  const courses: Course[] = getCourses();
  courses.forEach((course) => {
    printCourse(course);
  });
});

// Funktion för att skriva ut kursdetaljer
function printCourse(course: Course): void {
  const courseListEl = document.getElementById("courseList");
  const courseListDiv = document.createElement("div");
  courseListDiv.classList.add("course-list-Div");
  courseListEl?.appendChild(courseListDiv);
  if (courseListDiv) {
    courseListDiv.classList.add("course");
    courseListDiv.innerHTML += `
        <div>
            <h2>${course.courseName}</h2>
            <br>
            <p><strong>Kurskod: </strong> ${course.courseCode}</p>
            <p><strong>Progression: </strong> ${course.progression}</p>
            <p><strong>Syllabus:</strong> <a href="${course.syllabus}">${course.syllabus}</a></p>        
                <br/>
         
            <br/>
        </div>
    `;

    // Redigera knappen
    const editBtn = document.createElement("button");
    editBtn.textContent = "Redigera";
    editBtn.classList.add("edit-btn");
    courseListDiv.appendChild(editBtn);
      // Byt ut text med inputfält när "Redigera" knappen klickas
      const editCourseDiv = document.createElement("div");
      editCourseDiv.classList.add("edit-course-div");
  
    // Lägg till händelselyssnare för "Redigera" knappen
    editBtn.addEventListener("click", () => {    
      //radera äldre inputfälten
      editCourseDiv.innerHTML = "";
      editCourseDiv.innerHTML = `
            <input type="text" value="${course.courseName}" placeholder="Kursnamn">
            <input type="text" value="${course.courseCode}" placeholder="Kurskod">
            <input type="text" value="${course.progression}" placeholder="Progression">
            <input type="text" value="${course.syllabus}" placeholder="Syllabus">
            <button class="save-btn">Spara</button>
        `;
   
      // Hämta knappen för att spara uppdateringar och lägg till event listener
      const saveBtn = editCourseDiv.querySelector(".save-btn");
      if (saveBtn) {
        saveBtn.addEventListener("click", () => {
          const updatedCourse: Course = {
            courseName: (editCourseDiv.querySelector(
              'input[placeholder="Kursnamn"]'
            ) as HTMLInputElement).value,
            courseCode: (editCourseDiv.querySelector(
              'input[placeholder="Kurskod"]'
            ) as HTMLInputElement).value,
            progression: (editCourseDiv.querySelector(
              'input[placeholder="Progression"]'
            ) as HTMLInputElement).value,
            syllabus: (editCourseDiv.querySelector(
              'input[placeholder="Syllabus"]'
            ) as HTMLInputElement).value,
          };
          courseListEl?.removeChild(courseListDiv); // Ta bort gamla kursdetaljer
          printCourse(updatedCourse); // Uppdatera kursdetaljer
          updateCourseInLocalStorage(updatedCourse); // Uppdatera kursen i localStorage
        });
      }
      courseListDiv.appendChild(editCourseDiv); // Lägg till redigeringsfälten
    });
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
  const progressionInput = document.querySelector(
    'input[name="progression"]:checked'
  ) as HTMLInputElement;
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
