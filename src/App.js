import {
  Row,
  Container,
  Col,
  ListGroup,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import "./App.css";
import "./style.css";
import "./cardStyle.css"
import StudentForm from "./form";
import { getStudents, getStudent, sortBy, addStudent, updateStudents} from "./DAL/api";
import StudentCard from "./studentCard";
import { useState, useEffect } from "react";
import {
  faGraduationCap,
  faPlusCircle,
  faSortAlphaDown
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function App() {
  // useEffect ( () => {
  //   getStudents()
  //   return () => {

  //   }
  // }, [])

  const [students, setStudents] = useState([...getStudents()])
  const [showCard, setShowCard] = useState(false);
  const [student, setStudent] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  function cardView({ target: { name } }) {
    setShowCard(true);
    setStudent(getStudent(name));
  }

  function cardOff() {
    if (showCard) {
      setShowCard(false);
    }
  }
  function addStudentList(username, email, address, course, gender) {
    addStudent(username, email, address, course, gender)
    setStudents([...getStudents()])
  }
  function sortClick({target:{value}}) {
    setStudents([...sortBy(students, value)])
    updateStudents(students)
  }

  return (
    <Container>
      <Row className="justify-content-center align-items-center headerRed">
        <h1 className="header"><FontAwesomeIcon size={"2x"} icon={faGraduationCap}/>STUDENTS LIST</h1>
      </Row>
      <Row className="justify-content-between">
        <Col className="grey">
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label><FontAwesomeIcon icon={faSortAlphaDown} /> Sort by:</Form.Label>
            <Form.Control as="select" defaultValue="Choose..." onChange={sortClick}>
              <option>Choose...</option>
              <option>username</option>
              <option>gender</option>
              <option>email</option>
            </Form.Control>
          </Form.Group>
          <ListGroup variant="flush" className="bg-red" >
            {students.map((student, index) => {
              return (
                <ListGroup.Item
                  className="studentsCol"
                  action href={`#link${index+1}`}
                  key={index}
                  name={student.username}
                  onClick={cardView}
                >
                  {student.username.toUpperCase()}
                </ListGroup.Item>
              );
            })}
          </ListGroup>
          
          <Modal
            show={showModal}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="lg"
          >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <StudentForm handleClose={handleClose} addStudentList={addStudentList}/>
            </Modal.Body>
            {/* <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary">Understood</Button>
          </Modal.Footer> */}
          </Modal>
          <Button variant="outline-dark" className="mt-3" onClick={handleShow}>
            <FontAwesomeIcon icon={faPlusCircle} size={"2x"}/>
          </Button>
        </Col>
        <Col></Col>
        <Col
          className="displayCol d-flex justify-content-center text-center align-items-center"
        >
          {showCard && <StudentCard student={student} cardViewOff={cardOff} />}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
