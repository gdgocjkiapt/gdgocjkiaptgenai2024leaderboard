// Function to fetch JSON data from a file
function fetchData() {
  fetch("info.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      var information = data;
      elems = document.getElementsByClassName("styled-table");

      function sortby(a, b) {
        console.log(a["# of Arcade Games Completed"]);
        console.log(b["# of Arcade Games Completed"]);
        var val =
          -(
            a["# of Arcade Games Completed"] +
            a["# of Skill Badges Completed"] +
            a["All Skill Badges & Games Completed"]
          ) +
          (b["# of Arcade Games Completed"] +
            b["# of Skill Badges Completed"] +
            b["All Skill Badges & Games Completed"]);
        return val;
      }
      // sorting
     information = information.sort(sortby);

      information = information.filter(
        (prod) =>
          prod["Access Code Redemption Status"] == "Yes" ||
          prod["User Name"] == "Sahil Ansari"
      );

      console.log(information);

      for (i = 0; i < elems.length; i++) {
        for (j = 0; j < information.length; j++) {
          elem = elems[i];
          tr = document.createElement("tr");
          td0 = document.createElement("td");
          td1 = document.createElement("td");
          td2 = document.createElement("td");
          td3 = document.createElement("td");
          td4 = document.createElement("td");
          td5 = document.createElement("td");

          td0.textContent = j + 1;
          tr.appendChild(td0);
          td1.textContent = information[j]["User Name"];
          tr.appendChild(td1);
          td2.textContent = information[j]["Access Code Redemption Status"];
          tr.appendChild(td2);
          td3.textContent = information[j]["# of Skill Badges Completed"];
          tr.appendChild(td3);
          td4.textContent = information[j]["# of Arcade Games Completed"];
          tr.appendChild(td4);
          td5.textContent = information[j]["All Skill Badges & Games Completed"];
          tr.appendChild(td5);
          elem.appendChild(tr);
        }
      }
    })
}

// Call the fetchData function when the page loads
window.addEventListener("load", fetchData);

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const Leaderboardtable = document
  .getElementById("Leaderboardtable")
  .getElementsByTagName("tbody")[0];

searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const searchQuery = searchInput.value.toLowerCase();
  fetch("info.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const matchingStudents = searchStudentByName(data, searchQuery);
      console.log(matchingStudents);
      return matchingStudents;
    })
    .then((data) => displayResults(data));
});

function searchStudentByName(apiData, searchQuery) {
  return apiData.filter((student) =>
    student["User Name"].toLowerCase().includes(searchQuery)
  );
}

function displayResults(results) {
  Leaderboardtable.innerHTML = "";

  if (results.length === 0) {
    Leaderboardtable.innerHTML =
      '<tr><td colspan="3">No matching students found</td></tr>';
  } else {
    results.forEach((student, ind) => {
      const row = Leaderboardtable.insertRow();
      const idCell = row.insertCell(0);
      const nameCell = row.insertCell(1);
      const statusCell = row.insertCell(2);
      const skillBadgescompleted = row.insertCell(3);
      const arcadeGamecompleted = row.insertCell(4);
      const allCompleted = row.insertCell(5);

      idCell.textContent = ind + 1;
      nameCell.textContent = student["User Name"];
      statusCell.textContent = student["Access Code Redemption Status"];
      skillBadgescompleted.textContent = student["# of Skill Badges Completed"];
      arcadeGamecompleted.textContent = student["# of Arcade Games Completed"];
      allCompleted.textContent = student["All Skill Badges & Games Completed"];
    });
  }
}
