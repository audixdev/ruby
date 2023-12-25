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
    noteList.appendChild(newNote);

    // Save note to local storage
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(noteContent);
    localStorage.setItem('notes', JSON.stringify(notes));

    document.getElementById('noteContent').value = '';
}

// Display saved notes on page load
window.onload = function () {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    const noteList = document.getElementById('noteList');
    savedNotes.forEach(function (note) {
        const newNote = document.createElement('li');
        newNote.textContent = note;
        noteList.appendChild(newNote);
    });

    document.getElementById('saveNote').addEventListener('click', saveNote);
};
