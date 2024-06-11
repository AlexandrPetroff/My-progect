// API
// функция загрузки данных с сервера
export async function loadStudents() {
  const response = await fetch('http://localhost:3000/api/students');
  const data = await response.json()
  return data
}

// функция поста данных на сервер
export async function createStudentInServer(name, surname, lastname, birthday, studyStart, faculty) {
  const response = await fetch('http://localhost:3000/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
      name,
      surname,
      lastname,
      birthday,
      studyStart,
      faculty
      })
  });
  const data = await response.json();
  return data;
}

// глобальная функция удаление данных с сервера
export async function deleteStudentInServer(obj) {
  const response = await fetch(`http://localhost:3000/api/students/${obj.id}`, {
    method: 'DELETE'
  });
}
