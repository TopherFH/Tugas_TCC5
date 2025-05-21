const API_URL = 'https://notes-be075-981623652580.us-central1.run.app';
const token = localStorage.getItem('token');

if (!token && (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/'))) {
    window.location.href = 'login.html';
}

async function fetchNotes() {
    try {
        const response = await fetch(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) throw new Error("Token invalid atau session habis");

        const notes = await response.json();
        const notesList = document.getElementById('notesList');

        if (!notesList) {
            console.error("Element 'notesList' tidak ditemukan");
            return;
        }

        notesList.innerHTML = '';

        if (notes.length === 0) {
            notesList.innerHTML = '<p>Belum ada catatan. Buat catatan baru!</p>';
            return;
        }

        notes.forEach(note => {
            const noteElement = document.createElement('div');
            noteElement.className = 'note';

            const titleElement = document.createElement('h3');
            titleElement.textContent = note.judul;

            const contentElement = document.createElement('p');
            contentElement.textContent = note.konten;

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.onclick = () => editNote(note.id, note.judul, note.konten);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = () => deleteNote(note.id);

            noteElement.appendChild(titleElement);
            noteElement.appendChild(contentElement);
            noteElement.appendChild(editButton);
            noteElement.appendChild(deleteButton);

            notesList.appendChild(noteElement);
        });
    } catch (err) {
        console.error("Error:", err);
        alert("Gagal mengambil catatan. Redirect ke login.");
        localStorage.removeItem('token');
        window.location.href = 'login.html';
    }
}

const form = document.getElementById('noteForm');
if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const id = document.getElementById('noteId').value;
        const judul = document.getElementById('judul').value;
        const konten = document.getElementById('konten').value;

        if (!judul || !konten) {
            alert('Judul dan konten harus diisi');
            return;
        }

        try {
            const method = id ? 'PATCH' : 'POST';
            const url = id ? `${API_URL}/${id}` : API_URL;

            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ judul, konten })
            });

            const responseText = await res.text();
            console.log('Response:', responseText);

            if (!res.ok) {
                let errorData = {};
                try {
                    errorData = JSON.parse(responseText);
                } catch (_) { }
                alert('Gagal menyimpan catatan: ' + (errorData.msg || 'Terjadi kesalahan'));
                return;
            }

            form.reset();
            document.getElementById('noteId').value = '';
            fetchNotes();
        } catch (err) {
            console.error("Error:", err);
            alert('Gagal menyimpan catatan. Mohon coba lagi.');
        }
    });
}

async function deleteNote(id) {
    if (!confirm('Apakah Anda yakin ingin menghapus catatan ini?')) return;

    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!res.ok) {
            let errorData = {};
            try {
                errorData = await res.json();
            } catch (_) { }
            alert('Gagal menghapus catatan: ' + (errorData.msg || 'Terjadi kesalahan'));
            return;
        }

        fetchNotes();
    } catch (err) {
        console.error("Error:", err);
        alert('Gagal menghapus catatan. Mohon coba lagi.');
    }
}

function editNote(id, judul, konten) {
    console.log("Edit clicked", id, judul, konten);
    document.getElementById('noteId').value = id;
    document.getElementById('judul').value = judul;
    document.getElementById('konten').value = konten;

    document.getElementById('noteForm').scrollIntoView({
        behavior: 'smooth'
    });
}

function showNotes() {
    document.getElementById('formSection').style.display = 'none';
    document.getElementById('notesSection').style.display = 'block';
    fetchNotes();
}

function showForm() {
    document.getElementById('formSection').style.display = 'block';
    document.getElementById('notesSection').style.display = 'none';
}

const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = 'login.html';
    });
}

if (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
    document.addEventListener('DOMContentLoaded', () => {
        fetchNotes();
    });
}
