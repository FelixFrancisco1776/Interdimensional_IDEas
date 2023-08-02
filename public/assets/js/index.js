
document.addEventListener('DOMContentLoaded', () => {
  const noteTitle = document.querySelector('.note-title');
  const noteText = document.querySelector('.note-textarea');
  const saveNoteBtn = document.querySelector('.save-note');
  const newNoteBtn = document.querySelector('.new-note');
  const noteList = document.querySelector('.list-container .list-group');

  let activeNote = {};

  const show = (elem) => elem.style.display = 'inline';
  const hide = (elem) => elem.style.display = 'none';

  const getNotes = async () => {
    try {
      const response = await fetch('/api/notes');
      return await response.json();
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const saveNote = async (note) => {
    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
      });
      return await response.json();
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await fetch(`/api/notes/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const renderActiveNote = () => {
    if (activeNote.id) {
      noteTitle.setAttribute('readonly', true);
      noteText.setAttribute('readonly', true);
    } else {
      noteTitle.removeAttribute('readonly');
      noteText.removeAttribute('readonly');
    }
    noteTitle.value = activeNote.title || '';
    noteText.value = activeNote.text || '';
    hide(saveNoteBtn);
  };

  const handleNoteSave = async () => {
    const newNote = {
      title: noteTitle.value,
      text: noteText.value,
    };
    await saveNote(newNote);
    getAndRenderNotes();
    renderActiveNote();
  };

  const handleNoteDelete = async (id) => {
    if (activeNote.id === id) {
      activeNote = {};
    }
    await deleteNote(id);
    getAndRenderNotes();
    renderActiveNote();
  };

  const handleNoteView = (note) => {
    activeNote = note;
    renderActiveNote();
  };

  const handleNewNoteView = () => {
    activeNote = {};
    renderActiveNote();
  };

  const handleRenderSaveBtn = () => {
    const isNoteEmpty = !noteTitle.value.trim() || !noteText.value.trim();
    isNoteEmpty ? hide(saveNoteBtn) : show(saveNoteBtn);
  };

  const renderNoteList = (notes) => {
    noteList.innerHTML = '';
    const notesWithId = notes.filter(note => note.id); // added Filter to clean notes.html 
    if (notesWithId.length === 0) {
      noteList.innerHTML = '<li class="list-group-item">No saved Notes</li>';
      return;
    }
    notesWithId.forEach(note => {
      const liEl = document.createElement('li');
      liEl.classList.add('list-group-item');
      liEl.innerHTML = `
        <span class="list-item-title">${note.title}</span>
        <i class="fas fa-trash-alt float-right text-danger delete-note"></i>
      `;
      liEl.querySelector('.list-item-title').addEventListener('click', () => handleNoteView(note));
      liEl.querySelector('.delete-note').addEventListener('click', () => handleNoteDelete(note.id));
      noteList.appendChild(liEl);
    });
  };

  const getAndRenderNotes = async () => {
    const notes = await getNotes();
    renderNoteList(notes);
  };

  saveNoteBtn.addEventListener('click', handleNoteSave);
  newNoteBtn.addEventListener('click', handleNewNoteView);
  noteTitle.addEventListener('keyup', handleRenderSaveBtn);
  noteText.addEventListener('keyup', handleRenderSaveBtn);

  getAndRenderNotes();
});
