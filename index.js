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

// Sort by number of skill badges completed (descending) and then by User Name (ascending)
// Sort by Arcade Games Completed, then by Skill Badges Completed, and then by User Name
information = information.sort((a, b) => {
  const arcadeGamesA = a["# of Arcade Games Completed"];
  const arcadeGamesB = b["# of Arcade Games Completed"];
  
  const badgesA = a["# of Skill Badges Completed"];
  const badgesB = b["# of Skill Badges Completed"];
  
  // If Arcade Games are equal, compare Skill Badges
  if (badgesB !== badgesA) {
    return badgesB - badgesA; // Sort by skill badges in descending order
  }

// First, compare Arcade Games Completed
  if (arcadeGamesB !== arcadeGamesA) {
    return arcadeGamesB - arcadeGamesA; // Sort by arcade games in descending order
  }

  // If both Arcade Games and Skill Badges are equal, compare User Names
  const nameA = a["User Name"].toLowerCase();
  const nameB = b["User Name"].toLowerCase();
  
  if (nameA < nameB) return -1; // nameA comes before nameB
  if (nameA > nameB) return 1;  // nameA comes after nameB
  return 0; // names are equal
});

// Filter the information
information = information.filter(
  (prod) =>
    prod["Access Code Redemption Status"] === "Yes" ||
    prod["User Name"] === "Sahil Ansari" ||
    prod["All Skill Badges & Games Completed(Yes)"] === "Yes"
);

// Initialize total completions variable
let totalCompletions = 0;

// Count total completions where "All Skill Badges & Games Completed" is "Yes"
information.forEach((student) => {
  if (student["All Skill Badges & Games Completed"] === "Yes") {
    totalCompletions++;
  }
});

// Display the total completions in the HTML
document.getElementById("totalCompletions").textContent = `Total Completions: ${totalCompletions}`;



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
