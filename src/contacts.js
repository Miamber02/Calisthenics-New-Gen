import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

import { helpHttp } from "./helpers/helpHttp";

const http = helpHttp();

export async function getContacts(query) {
  await fakeNetwork(`getContacts:${query}`);
  const response = await  http.get("http://localhost:5000/users");
  let contacts = response.err ? [] : response;
  if (query) {
    contacts = matchSorter(contacts, query, { keys: ["first", "last"] });
  }
  console.log(contacts)
  return contacts.sort(sortBy("last", "createdAt"));
}

/*export async function createContact() {
  //await fakeNetwork();
  let id = Math.random().toString(36).substring(2, 9);
  let contact = { id, createdAt: Date.now() };
  let contacts = await getContacts();
  contacts.unshift(contact);
  await set(contacts);
  return contact;
}*/

export async function createContact(contactData) {
  try {
    const url = 'http://localhost:5000/users';
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      body: contactData
    };

    const response = await http.post(url, options);
    if (response.err) {
      throw new Error('Error al crear el contacto: ' + response.statusText);
    }
    return response;
  } catch (error) {
    console.error('Error al crear el contacto:', error);
    throw error; 
  }
}

export async function getContact(id) {
  await fakeNetwork(`contact:${id}`);
  let contact = await http.get(`http://localhost:5000/users/${id}`);
  // let contact = contacts.find(contact => contact.id === id);
  return contact ?? null;
}

export async function getTrainings(id) {
  //await fakeNetwork(`contact:${id}`);
  let trainings = await http.get(`http://localhost:5000/trainings?idUser=${id}`);
  //let train = trainings.find(contact => contact.idUser === id);
  return trainings ?? [];
}

export async function getTrain(id) {
  //await fakeNetwork(`contact:${id}`);
  let train = await http.get(`http://localhost:5000/trainings/${id}`);
  // let train = trainings.find(contact => contact.idTrain === id);
  return train ?? null;
}

export async function updateContact(id, updates) {
  try {
    const url = `http://localhost:5000/users/${id}`;
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      body: updates
    };

    const response = await http.put(url, options);
    if (response.err) {
      throw new Error('Error al actualizar el contacto: ' + response.statusText);
    }
    return response;
  } catch (error) {
    console.error('Error al actualizar el contacto:', error);
    throw error;
  }
  //await fakeNetwork();
  //let contacts = await localforage.getItem("contacts");
  //let contact = contacts.find(contact => contact.id === id);
  //if (!contact) throw new Error("No contact found for", id);
  //Object.assign(contact, updates);
  //await set(contacts);
  //return contact;
}

export async function deleteContact(id) {
  let contacts = await http.del(`http://localhost:5000/users/${id}`);
  //let contacts = await localforage.getItem("contacts");
  //let index = contacts.findIndex(contact => contact.id === id);
  /*if (index > -1) {
    contacts.splice(index, 1);
    await set(contacts);
    return true;
  }
  return false;*/
  return contacts ?? null;
}

/*export const addExercise = async (trainingId, exercise) => {
  const url = `http://localhost:5000/trainings/${trainingId}/exercises`;
  return helpHttp().post(url, {
    body: exercise,
    headers: {
      "Content-Type": "application/json",
    },
  });
};*/

export const updateTraining = async (trainingId, training) => {
  const url = `http://localhost:5000/trainings/${trainingId}`;
  const http = helpHttp();
  return http.put(url, {
    body: training,
    headers: {
      "Content-Type": "application/json",
    },
  });
};


export const removeExercise = async (trainingId, exerciseId) => {
  const url = `http://localhost:5000/trainings/${trainingId}/exercises/${exerciseId}`;
  return helpHttp().del(url);
};

export const updateExercise = async (trainingId, exerciseId, updateData) => {
  const url = `http://localhost:5000/trainings/${trainingId}/exercises/${exerciseId}`;
  return helpHttp().put(url, {
    body: updateData,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const addSerie = async (trainingId, exerciseId, serie) => {
  const url = `http://localhost:5000/trainings/${trainingId}/exercises/${exerciseId}/series`;
  return helpHttp().post(url, {
    body: serie,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const updateSerie = async (trainingId, exerciseId, serieIndex, updateData) => {
  const url = `http://localhost:5000/trainings/${trainingId}/exercises/${exerciseId}/series/${serieIndex}`;
  return helpHttp().put(url, {
    body: updateData,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const removeSerie = async (trainingId, exerciseId, serieIndex) => {
  const url = `http://localhost:5000/trainings/${trainingId}/exercises/${exerciseId}/series/${serieIndex}`;
  return helpHttp().del(url);
};



function set(contacts) {
  return localforage.setItem("contacts", contacts);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise(res => {
    setTimeout(res, Math.random() * 800);
  });
}