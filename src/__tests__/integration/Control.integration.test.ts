const fetch = require('node-fetch');

const url = 'https://dojour.azurewebsites.net/';

test('should return 200', async () => {
  const response = await fetch(`${url}/api/Entries`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "title": "Michael Keaton",
      "subject": "Dragons",
      "date": "2020-01-01",
      "text": "I love dragons"
    })
  });
  expect(response.status).toBe(201);
});

test('should return array of entries', async () => {
  const response = await fetch(`${url}/api/Entries`);
  const entries = await response.json();
  expect(entries).toBeInstanceOf(Array);
});

test('should delete an entry and return 200', async () => {
  const id = 1;
  const response = await fetch(`${url}/api/Entries/${id}`, {
    method: 'DELETE'
  });
  expect(response.status).toBe(200);
});