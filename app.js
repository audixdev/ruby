// Function to save a note
function saveNote() {
    const noteContent = document.getElementById('noteContent').value;
    if (!noteContent.trim()) {
        alert('Please enter a note before saving.');
        return;
    }

    const noteList = document.getElementById('noteList');
    const newNote = document.createElement('li');
    const noteText = document.createElement('span');
    noteText.textContent = noteContent;
    newNote.appendChild(noteText);

    createRemoveButton(newNote, noteContent);
    createEditButton(newNote, noteContent);

    noteList.appendChild(newNote);

    // Save note to local storage
    updateLocalStorage();

    document.getElementById('noteContent').value = '';
}

// Function to create a remove button for each note
function createRemoveButton(newNote, noteContent) {
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('removeButton');
    removeButton.onclick = function () {
        newNote.remove();
        removeNoteFromLocalStorage(noteContent);
    };
    newNote.appendChild(removeButton);
}

// Function to create an edit button for each note
function createEditButton(newNote, noteContent) {
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('editButton');
    editButton.onclick = function () {
        const editedContent = prompt('Edit your note:', noteContent);
        if (editedContent !== null) {
            noteContent = editedContent.trim();
            newNote.childNodes[0].textContent = noteContent;
            updateLocalStorage();
        }
    };
    newNote.appendChild(editButton);
}

// Function to update the notes in local storage
function updateLocalStorage() {
    const noteElements = document.querySelectorAll('#noteList li span');
    const notes = [];
    noteElements.forEach(function (noteElement) {
        notes.push(noteElement.textContent);
    });
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Function to remove a note from local storage
function removeNoteFromLocalStorage(noteContent) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const updatedNotes = notes.filter(note => note !== noteContent);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
}

// Function to remove all notes
function removeAllNotes() {
    localStorage.removeItem('notes');
    document.getElementById('noteList').innerHTML = '';
}

// Function to open a specific tab
function openTab(evt, tabName) {
    const tabcontent = document.getElementsByClassName('tabcontent');
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = 'none';
    }

    const tablinks = document.getElementsByClassName('tablinks');
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(' active', '');
    }

    document.getElementById(tabName).style.display = 'block';
    evt.currentTarget.className += ' active';
}

// Display saved notes on page load
window.onload = function () {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    const noteList = document.getElementById('noteList');
    savedNotes.forEach(function (note) {
        const newNote = document.createElement('li');
        const noteText = document.createElement('span');
        noteText.textContent = note;
        newNote.appendChild(noteText);

        createRemoveButton(newNote, note);
        createEditButton(newNote, note);

        noteList.appendChild(newNote);
    });

    document.getElementById('saveNote').addEventListener('click', saveNote);
    document.getElementById('removeAll').addEventListener('click', removeAllNotes);
    document.getElementById('defaultOpen').click();
};
