const API_URL = 'https://do-jour-api.azurewebsites.net/api'; 
// const API_URL = 'https://localhost:5001/api';

export interface User {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  userId?: string;
  token?: string;
}

export interface Entry {
  entryId?: string;
  userId: string;
  title: string;
  subject: string;
  date: string;
  text: string;
}

interface RegisterResponse {
  message: string;
  token: string;
  userId: string;
}

export async function registerUser(user: User): Promise<RegisterResponse> {
  try {
    const response = await fetch(`${API_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
    });

    if (!response.ok) {
      throw new Error(`Error: A user with this email already exists`);
    }

    const text = await response.text();
    const data = await JSON.parse(text);

    return data;

  } catch (error) {
    if (error instanceof Error) {
      console.error('A problem occurred with the fetch operation: ' + error.message);
    } else {
      console.error('A problem occurred with the fetch operation');
    }
    throw error;
  }
}

export async function loginUser(user: User) {
  const response = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });

  if (!response.ok) {
    throw new Error(`Error: User Not Found`);
  }

  const text = await response.text();
  const data = await JSON.parse(text);

  return data;
}

export async function getAllEntries() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  return response.json();
}

export async function getEntryById(id: string) {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  return response.json();
}

export async function getEntriesByUserId(userId: string) {
  const response = await fetch(`${API_URL}/entries/user/${userId}`);
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  return response.json();
}

export async function createEntry(entry: Entry) {
  const response = await fetch(`${API_URL}/entries`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(entry)
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  return response.json();
}

export async function updateEntry(id: string, entry: Entry) {
  const response = await fetch(`${API_URL}/entries/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(entry)
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  return response.text();
}

export async function deleteEntry(id: string) {
  const response = await fetch(`${API_URL}/entries/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  return response.text();
}

