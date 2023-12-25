// Function to save a note
function saveNote() {
    const noteContent = document.getElementById('noteContent').value;
    if (!noteContent.trim()) {
        alert('Please enter a note before saving.');
        return;
    }

    const noteList = document.getElementById('noteList');
    const newNote = document.createElement('li');
    newNote.textContent = noteContent;

    createRemoveButton(newNote, noteContent);

    noteList.appendChild(newNote);

    // Save note to local storage
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(noteContent);
    localStorage.setItem('notes', JSON.stringify(notes));

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

// Display saved notes on page load
window.onload = function () {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    const noteList = document.getElementById('noteList');
    savedNotes.forEach(function (note) {
        const newNote = document.createElement('li');
        newNote.textContent = note;
        noteList.appendChild(newNote);

        createRemoveButton(newNote, note);
    });

    document.getElementById('saveNote').addEventListener('click', saveNote);
    document.getElementById('removeAll').addEventListener('click', removeAllNotes);
};
