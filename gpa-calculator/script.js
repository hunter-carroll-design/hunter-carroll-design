let subjects = [];
let editIndex = -1;

function addSubject() {
    const subjectInput =
        document.getElementById('subject');
    const grade =
        document.getElementById('grade').value;
    const creditInput =
        document.getElementById('credit');
    const credit =
        parseInt(creditInput.value);

    // Validate credit input
    const inputError =
        document.getElementById('inputError')
    const creditError =
        document.getElementById('creditError');
    if (!subjectInput.value || isNaN(credit)) {
        inputError.textContent =
            'Please fill out all fields.';
        return;
    }
    else if (credit < 1 || credit > 20) {
        creditError.textContent =
            'Credit must be between 1 and 20';
        return;
    } else {
        creditError.textContent = '';
    }
    if (editIndex !== -1) {
        subjects[editIndex] =
            { subject: subjectInput.value, grade, credit };
        editIndex = -1;
    } else {
        subjects.push(
            { subject: subjectInput.value, grade, credit });
    }

    displaySubjects();
    clearForm();
}

function displaySubjects() {
    const subjectList =
        document.getElementById('subjectList');
    subjectList.innerHTML = '';

    subjects.forEach((s, index) => {
        const row = document.createElement('tr');
        const subjectCell = document.createElement('td');
        const gradeCell = document.createElement('td');
        const creditCell = document.createElement('td');
        const actionCell = document.createElement('td');
        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');

        subjectCell.textContent = s.subject;
        gradeCell.textContent = s.grade;
        creditCell.textContent = s.credit;

        editButton.className = 'edit';
        editButton.textContent = 'Edit';
        editButton.onclick = () => editSubject(index);
        deleteButton.className = 'delete';
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteSubject(index);

        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);

        row.appendChild(subjectCell);
        row.appendChild(gradeCell);
        row.appendChild(creditCell);
        row.appendChild(actionCell);

        subjectList.appendChild(row);
    });
}

function editSubject(index) {
    const subjectInput =
        document.getElementById('subject');
    const selectedSubject = subjects[index];

    subjectInput.value = selectedSubject.subject;
    document.getElementById('grade').value =
        selectedSubject.grade;
    document.getElementById('credit').value =
        selectedSubject.credit;

    editIndex = index;
}

function deleteSubject(index) {
    subjects.splice(index, 1);
    displaySubjects();
}

function calculategpa() {
    const totalCredits = subjects.reduce(
        (sum, s) => sum + s.credit, 0);
    const weightedSum = subjects.reduce(
        (sum, s) => sum + getGradePoint(s.grade) * s.credit, 0);

    const gpa = totalCredits === 0 ? 0 :
        (weightedSum / totalCredits).toFixed(2);
    document.getElementById('gpa').textContent = gpa;
}

function getGradePoint(grade) {
    // Assign grade points as per your grading system
    switch (grade) {
        case 'S': return 10.0;
        case 'A': return 9.0;
        case 'B': return 8.0;
        case 'C': return 7.0;
        case 'D': return 6.0;
        case 'F': return 0.0;
        default: return 0.0;
    }
}

function gpaResults() {
    var subjectTab = document.getElementById('subjectTable');
    var subjects = document.getElementById('subjectList').textContent.trim();

    if (subjects === "") {
        subjectTab.style.display = "none";
    } else {
        subjectTab.style.display = "table";
    }
}
gpaResults();

function clearForm() {
    document.getElementById('subject').value = '';
    document.getElementById('grade').value = '';
    document.getElementById('credit').value = '';
}

function resetForm() {
    subjects = [];
    editIndex = -1;
    document.getElementById('subjectList').innerHTML = '';
    document.getElementById('gpa').textContent = '0.00';
    clearForm();
}


