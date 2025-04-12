const API_URL = 'https://notes-be075-981623652580.us-central1.run.app/users';

function showNotes() {
    document.getElementById('formSection').style.display = 'none';
    document.getElementById('notesSection').style.display = 'block';
    fetchNotes();
}

function showForm() {
    document.getElementById('formSection').style.display = 'block';
    document.getElementById('notesSection').style.display = 'none';
}

async function fetchNotes() {
    const response = await fetch(API_URL);
    const notes = await response.json();
    
    const notesList = document.getElementById('notesList');
    notesList.innerHTML = '';

    notes.forEach((note, index) => {
        notesList.innerHTML += `
            <div class="note colorful-note" style="background: ${index % 2 === 0 ? '#ffeb3b' : '#4caf50'}; color: ${index % 2 === 0 ? '#000' : '#fff'};">
                <h3>${note.name}</h3>
                <p>${note.notes}</p>
                <button onclick="editNote(${note.id}, '${note.name}', '${note.notes}')">Edit</button>
                <button onclick="deleteNote(${note.id})">Delete</button>
            </div>
        `;
    });
}

function editNote(id, name, notes) {
    document.getElementById('noteId').value = id;
    document.getElementById('judul').value = name;
    document.getElementById('konten').value = notes;
    showForm();
}

document.getElementById('noteForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = document.getElementById('noteId').value;
    const name = document.getElementById('judul').value;
    const notes = document.getElementById('konten').value;

    const method = id ? 'PATCH' : 'POST';
    const url = id ? `${API_URL}/${id}` : API_URL;

    const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, notes })
    });

    if (response.ok) {
        document.getElementById('noteForm').reset();
        document.getElementById('noteId').value = '';
        showNotes();
    }
});

async function deleteNote(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchNotes();
}
