document
  .getElementById("issueInputForm")
  .addEventListener("submit", submitIssue);

function submitIssue(e) {
  const getInputValue = (id) => document.getElementById(id).value;
  const description = getInputValue("issueDescription");
  const severity = getInputValue("issueSeverity");
  const assignedTo = getInputValue("issueAssignedTo");
  const id = Math.floor(Math.random() * 100000000) + "";
  const status = "Open";

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem("issues")) {
    issues = JSON.parse(localStorage.getItem("issues"));
  }
  issues.push(issue);
  localStorage.setItem("issues", JSON.stringify(issues));
  countTotalIssue();
  countOpenIssue();
  document.getElementById("issueInputForm").reset();
  fetchIssues();
  e.preventDefault();
}

const setStatusClosed = (id) => {
  const issues = JSON.parse(localStorage.getItem("issues"));
  const currentIssue = issues.find((issue) => parseInt(issue.id) === id);

  currentIssue.status = "Closed";
  localStorage.setItem("issues", JSON.stringify(issues));
  fetchIssues();
  countOpenIssue();
};

const deleteIssue = (id) => {
  const issues = JSON.parse(localStorage.getItem("issues"));
  const remainingIssues = issues.filter((issue) => id !== parseInt(issue.id));
  localStorage.setItem("issues", JSON.stringify(remainingIssues));
  fetchIssues();
  countTotalIssue();
  countOpenIssue();
};

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem("issues"));
  const issuesList = document.getElementById("issuesList");
  issuesList.innerHTML = "";

  for (var i = 0; i < issues.length; i++) {
    const { id, description, severity, assignedTo, status } = issues[i];

    issuesList.innerHTML += `
            <div class="well">
              <h6>Issue ID: ${id} </h6>
              <p><span class="label label-info"> ${status} </span></p>
              <h3 class="${
                status === "Closed" ? "closed" : null
              }"> ${description} </h3>
              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
              <a href="#" onclick="setStatusClosed(${id});return false" class="btn btn-warning">Close</a>
              <a href="#" onclick="deleteIssue(${id});return false" class="btn btn-danger">Delete</a>
            </div>`;
  }
};

const countTotalIssue = () => {
  const issues = JSON.parse(localStorage.getItem("issues"));
  document.getElementById("total-issue").innerText = issues.length;
};
countTotalIssue();

const countOpenIssue = () => {
  const issues = JSON.parse(localStorage.getItem("issues"));
  const openIssue = issues.filter((issue) => issue.status === "Open");
  document.getElementById("open-issue").innerText = openIssue.length;
};
countOpenIssue();
