const apiUrl = 'http://localhost:8000/api/v1/todo';


export const createTodo = async (todoData) => {
  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todoData)
  });
  return res.json();
}

// What it does: 
// Its sends a post request to your backend API (eg: apiurl)
// The body of the request contains jason object representing new task(todoData)
// It waits for the sever to respond and returns json response (eg. the saved taask)



export const getTodos = async () => {
  const res = await fetch(apiUrl);
  return res.json();
}

export const deleteTodo = async (id) => {
  return fetch(`${apiUrl}/${id}`, {
    method: 'DELETE'
  }).then(res => res.json());
}

export const getTodoById = async () => {
  const res = await fetch(`${apiUrl}/${id}`)
  return res.json();
}


export const updateTodo = async (id, data) => {
  const payload = {
    description: data.description,
    isCompleted: data.isCompleted,
    title: data.title
  }
  const res = await fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": 'application/json' },
    body: JSON.stringify(payload)
  });
  return res.json();
}