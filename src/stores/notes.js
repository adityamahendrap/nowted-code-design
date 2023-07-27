import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useNotesStore = defineStore("notes", () => {
  const data = ref({
    folders: [
      {
        name: "Personal",
        isActive: false,
        date: 1680612856803,
      },
      {
        name: "Bussiness",
        isActive: false,
        date: 1680612856803,
      },
    ],
    notes: [
      {
        title: "Awesome Note",
        date: 1680612856811,
        folder: "Personal",
        content: "Hello World",
        isActive: false,
        isFavorited: false,
      },
      {
        title: "Hellow",
        date: 1680612856899,
        folder: "Personal",
        content: "Hello World",
        isActive: false,
        isFavorited: false,
      },
      {
        title: "Wut",
        date: 1680612856855,
        folder: "Bussiness",
        content: "Hello World",
        isActive: false,
        isFavorited: false,
      },
    ],
    more: [
      {
        name: "Favorites",
        isActive: false,
        icon: "src/assets/Images/favorites-icon.svg",
      },
      {
        name: "Trash",
        isActive: false,
        icon: "src/assets/Images/trash-icon.svg",
      },
      {
        name: "Archived Notes",
        isActive: false,
        icon: "src/assets/Images/archived-notes-icon.svg",
      },
    ],
  });
  const activeMore = ref('')

  // getters
  const countNotes = computed(() => data.value.notes.length);
  const countNotesInFolder = computed(() => (folder) => data.value.notes.filter((note) => note.folder == folder).length);
  const countFolder = computed(() => data.value.folders.length);
  const recentNotes = computed(() => data.value.notes.sort((a, b) => b.date - a.date));
  const folders = computed(() => data.value.folders);
  const filterNotesByTitle = computed(() => (title) => title.trim() == '' ? undefined : data.value.notes.filter((note) => note.title.toLowerCase().includes(title.toLowerCase())));
  const activeNote = computed(() => data.value.notes.filter((note) => note.isActive));
  const activeFolder = computed(() => data.value.folders.filter((folder) => folder.isActive));
  const isAddNoteButton = computed(() => activeFolder.value.length > 0)
  const isNoteFavorited = computed(() => (title) => data.value.notes.filter(note => note.title == title)[0]?.isFavorited ? true : false)
  const favorites = computed(() => data.value.notes.filter(note => note.isFavorited))
  const getActiveMore = computed(() => activeMore.value)
  const notesInFolder_ = computed(() => (folder) => data.value.notes.filter((note) => note.folder == folder));
  
  const notesInFolder = computed(() => {
    return (folder, sortBy, sortType) => {
      const notes = data.value.notes.filter((note) => note.folder === folder);
      if (sortType === 0) {
        return notes.sort((a, b) => {
          if (typeof a[sortBy] === 'string') return b[sortBy].localeCompare(a[sortBy]); 
          else return b[sortBy] - a[sortBy];
        });
      }
      if (sortType === 1) {
        return notes.sort((a, b) => {
          if (typeof a[sortBy] === 'string') return a[sortBy].localeCompare(b[sortBy]); 
          else return a[sortBy] - b[sortBy]; 
        });
      }
      return data.value.notes.filter((note) => note.folder == folder)
    };
  });

  const foldersWithSort = computed(() => {
    return (sortBy, sortType) => {
      if (sortType === 0) {
        return data.value.folders.sort((a, b) => {
          if (typeof a[sortBy] === 'string') return b[sortBy].localeCompare(a[sortBy]); 
          else return b[sortBy] - a[sortBy];
        });
      }
      if (sortType === 1) {
        return data.value.folders.sort((a, b) => {
          if (typeof a[sortBy] === 'string') return a[sortBy].localeCompare(b[sortBy]); 
          else return a[sortBy] - b[sortBy]; 
        });
      }
      return data.value.folders
    };
  });

  // actions
  const createFolder = (newFolderName) => {
    // check is name exist
    const isFolderNameExist = data.value.folders.map((folder) => folder.name).includes(newFolderName);
    if (isFolderNameExist) return alert(`Folder with name '${newFolderName}' already exist`);

    data.value.folders.push({ 
      name: newFolderName, 
      isActive: false, 
      date: new Date() 
    });
    // alert("Folder created");
  };

  const renameFolder = (oldName, newName) => {
    // check is newName equal oldName
    if (oldName === newName) return alert("Cannot rename same folder name");

    // check is newName exist
    const isNewNameExist = data.value.folders.map((folder) => folder.name).includes(newName);
    if (isNewNameExist) return alert(`Folder with name '${newName}' already exist`);

    const folderIndex = data.value.folders.map(folder => folder.name).indexOf(oldName)
    data.value.folders[folderIndex].name = newName

    data.value.notes.forEach(note => {
      if(note.folder == oldName) {
        note.folder = newName
      }
    });
  };

  const createNote = (title, folder) => {
    // check title exist or not
    const isTitleExist = data.value.notes.map((note) => note.title).includes(title);
    if (isTitleExist) return alert(`Note with title ${title} already exist`);

    data.value.notes.push({
      title,
      date: new Date(),
      folder,
      content: '',
      isActive: false,
      isFavorited: false,
    });
  };

  const deleteNote = (title) => {
    const notes = data.value.notes.filter((note) => note.title != title);
    data.value = {
      folders: data.value.folders,
      notes,
      more: data.value.more,
    };
  };

  const deleteFolder = (name) => {
    const folders = data.value.folders.filter((folder) => folder.name != name);
    const notes = data.value.notes.filter((note) => note.folder != name);
    data.value = {
      folders,
      notes,
      more: data.value.more,
    };
  };

  const changeNoteFolder = (title, folder) => {
    const noteIndex = data.value.notes.map(note => note.title).indexOf(title)
    data.value.notes[noteIndex].folder = folder
  }

  const toggleFavorite = (title) => {
    const noteIndex = data.value.notes.map(note => note.title).indexOf(title)
    data.value.notes[noteIndex].isFavorited = !data.value.notes[noteIndex].isFavorited

    // if(activeMore.value == 'Favorites') {
    //   unactivateNote(title)
    // }
  }

  const unactivateNote = () => {
    const noteActiveIndex = data.value.notes.map(note => note.isActive).indexOf(true)
    if(noteActiveIndex != -1) data.value.notes[noteActiveIndex].isActive = false
  };

  const unactivateFolder = () => {
    const folderActiveIndex = data.value.folders.map(folder => folder.isActive).indexOf(true)
    if(folderActiveIndex != -1) data.value.folders[folderActiveIndex].isActive = false
  };

  const activateNote = (title) => {
    const targetNoteIndex = data.value.notes.map(note => note.title).indexOf(title)
    if(targetNoteIndex != -1) data.value.notes[targetNoteIndex].isActive = true
  };

  const activateFolder = (name) => {
    const targetFolderIndex = data.value.folders.map(folder => folder.name).indexOf(name)
    if(targetFolderIndex != -1) data.value.folders[targetFolderIndex].isActive = true
  };

  const setActiveMore = (more) => {
    activeMore.value = more
    unactivateFolder()
  }

  const resetMore = () => {
    activeMore.value = '' 
  }

  const selectNote = (title, folder) => {
    unactivateNote();
    unactivateFolder();
    activateNote(title);
    activateFolder(folder);
    resetMore()
  };

  const selectFavoriteNote = (title) => {
    unactivateNote();
    unactivateFolder();
    activateNote(title);
  }

  const selectFolder = (name) => {
    unactivateFolder()
    activateFolder(name)
    resetMore()
  }


  return {
    data,
    countNotes,
    countNotesInFolder,
    notesInFolder,
    folders,
    createFolder,
    recentNotes,
    countFolder,
    renameFolder,
    filterNotesByTitle,
    activeNote,
    activeFolder,
    selectNote,
    selectFolder,
    deleteFolder,
    isAddNoteButton,
    createNote,
    isNoteFavorited,
    toggleFavorite,
    favorites,
    getActiveMore,
    setActiveMore,
    selectFavoriteNote,
    deleteNote,
    changeNoteFolder,
    resetMore,
    foldersWithSort,
    notesInFolder_
  };
});
