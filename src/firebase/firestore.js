import { db } from './firebaseConfig';
import { collection, doc, addDoc, deleteDoc, getDocs, query, where, setDoc, getDoc } from 'firebase/firestore';

// Create default Favorites list for new user
export const createDefaultList = async (userId) => {
  const listRef = doc(collection(db, 'users', userId, 'lists'));
  await setDoc(listRef, {
    name: 'Favorites',
    createdAt: new Date(),
    isDefault: true,
    isPublic: false,
  });
  return listRef.id;
};

// Get user's lists
export const getUserLists = async (userId) => {
  const listsRef = collection(db, 'users', userId, 'lists');
  const querySnapshot = await getDocs(listsRef);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Create a new list
export const createList = async (userId, name, isPublic = false) => {
  const listsRef = collection(db, 'users', userId, 'lists');
  // Use setDoc with a generated doc id to avoid latency of addDoc
  const newDocRef = doc(listsRef);
  await setDoc(newDocRef, {
    name,
    createdAt: new Date(),
    isDefault: false,
    isPublic,
  });
  return newDocRef.id;
};

// Add movie to list
export const addMovieToList = async (userId, listId, movie) => {
  const listItemsRef = collection(db, 'users', userId, 'lists', listId, 'listItems');
  const q = query(listItemsRef, where('imdbID', '==', movie.imdbID));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    throw new Error('Movie already in list');
  }
  await addDoc(listItemsRef, {
    imdbID: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    poster: movie.Poster,
    addedAt: new Date(),
  });
};

// Remove movie from list
export const removeMovieFromList = async (userId, listId, movieId) => {
  const listItemsRef = collection(db, 'users', userId, 'lists', listId, 'listItems');
  const q = query(listItemsRef, where('imdbID', '==', movieId));
  const querySnapshot = await getDocs(q);
  const deletePromises = querySnapshot.docs.map(document =>
    deleteDoc(doc(db, 'users', userId, 'lists', listId, 'listItems', document.id))
  );
  await Promise.all(deletePromises);
};

// Get movies in a list
export const getListMovies = async (userId, listId) => {
  const listItemsRef = collection(db, 'users', userId, 'lists', listId, 'listItems');
  const querySnapshot = await getDocs(listItemsRef);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Rename a list
export const renameList = async (userId, listId, newName) => {
  const listRef = doc(db, 'users', userId, 'lists', listId);
  await setDoc(listRef, { name: newName }, { merge: true });
};

// Delete a list and all its movies
export const deleteList = async (userId, listId) => {
  // First, delete all movies in the list
  const listItemsRef = collection(db, 'users', userId, 'lists', listId, 'listItems');
  const querySnapshot = await getDocs(listItemsRef);
  const deletePromises = querySnapshot.docs.map(document =>
    deleteDoc(doc(db, 'users', userId, 'lists', listId, 'listItems', document.id))
  );
  await Promise.all(deletePromises);

  // Then delete the list itself
  const listRef = doc(db, 'users', userId, 'lists', listId);
  await deleteDoc(listRef);
};
