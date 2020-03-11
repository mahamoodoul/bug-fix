
document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  const status = 'Open';

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];

  if (localStorage.getItem('issues')){
    issues = JSON.parse(localStorage.getItem('issues'));

  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
}


const closeIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));

  const currentIssue = issues.find(issue => issue.id == id);
  currentIssue.status = 'Closed';
  if (currentIssue.status == "Closed") {
    currentIssue.description = `<span style="text-decoration: line-through;">${currentIssue.description}</span>`;
  }
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter( issue.id !== id )
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
}

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  console.log(issues);
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';
  const array=issues.length;
  let open=0;
  for(let i=0;i<array;i++){

    console.log(issues[i].status);
     if(issues[i].status=="Open"){
      open++;
     }

  }
  document.getElementById("left-open").innerText=open;
  document.getElementById("total_issue").innerText=array;

  

  for (var i = 0; i < array; i++) {
    const {id, description, severity, assignedTo, status} = issues[i];

    issuesList.innerHTML += `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3 id="issueDescription"> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="closeIssue(${id})" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
  }

}

