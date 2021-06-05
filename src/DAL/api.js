const students = [
  {
    username: "kobim",
    email: "kobim272@gamil.com",
    address: "HaEshel 1",
    course: "Python",
    gender: "Male",
    image: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random()*100)}.jpg`
  },
  {
    username: "yaela",
    email: "yaya2@gamil.com",
    address: "HaEshel 1",
    course: "css",
    gender: "Female",
    image: `https://randomuser.me/api/portraits/women/${Math.floor(Math.random()*100)}.jpg`
  },
  {
    username: "morel",
    email: "mornila72@gamil.com",
    address: "HaEshel 1",
    course: "JavaScrip",
    gender: "Male",
    image: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random()*100)}.jpg`
  },
  {
    username: "zamit",
    email: "amiti32@gamil.com",
    address: "HaEshel 1",
    course: "JavaScrip",
    gender: "Female",
    image: `https://randomuser.me/api/portraits/women/${Math.floor(Math.random()*100)}.jpg`
  },
];

localStorage.setItem("students", JSON.stringify(getStudents() ? getStudents() : students))

const updateStudents = function(array) {
  localStorage.setItem("students", JSON.stringify(array))
}


function getStudents() {
  return JSON.parse(localStorage.getItem("students"))
}

function getStudent(username) {
    for (const student of getStudents()) {
        if (student.username === username) {
            return student;
        }
    }
}

function addStudent(userName, email, address, course, gender) {
  const newStudents = getStudents()
  newStudents.push({
    username: userName,
    email: email,
    address: address,
    course: course,
    gender: gender,
    image: gender === "Male" ? `https://randomuser.me/api/portraits/men/${Math.floor(Math.random()*100)}.jpg` : `https://randomuser.me/api/portraits/women/${Math.floor(Math.random()*100)}.jpg`
  });
  updateStudents(newStudents)
}

function sortBy(array, sortParameter){
  return array.sort(function(a, b) {
     if(a[sortParameter].toLowerCase() < b[sortParameter].toLowerCase()) { return -1; }
     if(a[sortParameter].toLowerCase() > b[sortParameter].toLowerCase()) { return 1; }
  return 0;
  })
}

export {
    getStudents,
    addStudent,
    getStudent,
    sortBy,
    updateStudents
}