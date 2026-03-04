export async function getHello() {
  const response = await fetch('http://localhost:5000/api/hello');
  const data = await response.json();
  return data;
}

export async function addNumbers(a, b) {
  const response = await fetch('http://localhost:5000/api/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ a, b }),
  });
  const data = await response.json();
  return data;
}
