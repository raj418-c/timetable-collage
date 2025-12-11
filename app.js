const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const periods = ["9:00-9:50 AM", "9:50-10:40 AM", "10:40-11:30 AM", "11:30-12:20 PM", "1:00-1:50 PM", "1:50-2:40 PM", "2:40-3:30 PM"];

function generateTimetable() {
  const className = document.getElementById("className").value.trim();
  const input = document.getElementById("subjectTeacherPairs").value.trim();
  const timetableDiv = document.getElementById("timetable");

  
  if (!className || !input) {
    alert("Please fill all fields.");
    return;
 
  }

  // Parse subject: teacher, room
  const lines = input.split("\n").map(line => line.trim()).filter(line => line.includes(":"));
  if (lines.length === 0) {
    alert("Please enter data in 'Subject: Teacher, Room' format.");
    return;
  }

  const subjectData = {}; // Subject -> { teacher, room }
  const subjects = [];

  for (let line of lines) {
    const [subjectPart, detailPart] = line.split(":");
    if (!subjectPart || !detailPart || !detailPart.includes(",")) continue;

    const subject = subjectPart.trim();
    const [teacher, room] = detailPart.split(",").map(p => p.trim());

    if (subject && teacher && room) {
      subjectData[subject] = { teacher, room };
      subjects.push(subject);
    }
  }

  if (subjects.length === 0) {
    alert("Invalid format. Please use 'Subject: Teacher, Room'.");
    return;
  }

  // Generate timetable
  const schedule = [];

  for (let day of days) {
    const daySchedule = [];
    for (let period of periods) {
      const subject = subjects[Math.floor(Math.random() * subjects.length)];
      const { teacher, room } = subjectData[subject];
      daySchedule.push({ period, subject, teacher, room });
    }
    schedule.push({ day, periods: daySchedule });
  }

  // Display timetable
  let html = <h2>Timetable for ${className}</h2>;
  html += <table><thead><tr><th>Day</th>;
  for (let period of periods) {
    html += <th>${period}</th>;
  }
  html += </tr></thead><tbody>;

  for (let daySchedule of schedule) {
    html += <tr><td>${daySchedule.day}</td>;
    for (let slot of daySchedule.periods) {
      html += <td><strong>${slot.subject}</strong><br/>${slot.teacher}<br/>Room ${slot.room}</td>;
    }
    html += </tr>;
  }

  html += </tbody></table>;
  timetableDiv.innerHTML = html;
}