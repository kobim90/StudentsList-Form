import {
  Row,
  Container,
  Col,
  Form,
  InputGroup,
  Button,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import { useState } from "react";
import ErrorMessages from "./ErrorMsg";
import {
  faUser,
  faMailBulk,
  faCity,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {getStudent} from "../DAL/api"

function StudentForm(props) {
  const radios = [
    { name: "Male", value: "Male" },
    { name: "Female", value: "Female" },
    { name: "Other", value: "Other" },
  ];

  const [studentData, setStudentData] = useState({
    username: {
      value: "",
      errors: [],
      background: "",
      validations: {
        required: true,
        pattern: /^[0-9a-zA-Z]{2,}$/,
        requirments: "username should be no less than 2 characters",
      },
    },
    email: {
      value: "",
      errors: [],
      background: "",
      validations: {
        required: true,
        pattern:
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        requirments: "email should be valid email (xxx@yyy.zzz)",
      },
    },
    address: {
      value: "",
      errors: [],
      background: "",
      validations: {
        required: true,
        pattern: /^[a-zA-Z0-9\s,-]{10,}/,
        requirments: "address should be no less than 10 characters",
      },
    },
    course: {
      value: "",
      errors: [],
      background: "",
      validations: {
        required: true,
        pattern:
          /(?:^|\W)Making Money EASY! CHOOSE ME|Java Script|Python|Css(?:$|\W)/,
        requirments: "course must be selected",
      },
    },
    gender: {
      value: "",
      errors: [],
      background: "",
      validations: {
        required: true,
        pattern: /(?:^|\W)Male|Female|Other(?:$|\W)/,
        requirments: "",
      },
    },
  });

  function validation(value, name) {
    const showErrors = [];
    const { validations } = studentData[name];
    let background = "";

    if (validations.required && !value) {
      showErrors.push(`${name} is required`);
      background = "alert-danger";
    }
    if (!validations.pattern.test(value)) {
      showErrors.push(`${validations.requirments}`);
      background = "alert-danger";
    }

    if (name === "username") {
      if (getStudent(value)) {
        showErrors.push(`${value} allready exists, choose a different username`);
        background = "alert-danger";
      }
    }
    setStudentData((prevData) => ({
      ...prevData,
      [name]: {
        ...studentData[name],
        background: background,
        value: value,
        errors: [...showErrors],
      },
    }));
  }

  const validateInput = (event) => {
    let value, name;
    event.target
      ? ({
          target: { value, name },
        } = event)
      : ({
          currentTarget: { value, name },
        } = event);
    
    validation(value, name)
  };


  const onSubmit = (e) => {
    e.preventDefault();
    let error =0;
    for (const input in studentData) {
      validation(studentData[input].value, input)
      if (!studentData[input].value || studentData[input].errors.length > 0) {
        error++;
      }
    }
    if (error === 0) {
      props.addStudentList(studentData.username.value, studentData.email.value, studentData.address.value,studentData.course.value,studentData.gender.value)
      props.handleClose()
    }
  }

  return (
    <Container>
      <Row className="text-center">
        <Col>
          <h1>Student Details</h1>
          <p>Hello Student! Please fill in your details</p>
        </Col>
      </Row>
      <hr></hr>
      <Form onSubmit={onSubmit}>
        <Form.Row className="justify-content-around">
          <Form.Group as={Col} sm={4} controlId="Username">
            <Form.Label><strong>Username</strong></Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">
                  <FontAwesomeIcon icon={faUser} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                onChange={validateInput}
                onBlur={validateInput}
                name="username"
                className={studentData.username.background}
              />
            </InputGroup>
            <ErrorMessages errors={studentData.username.errors} />
          </Form.Group>
          <Form.Group as={Col} sm={4} controlId="formGridEmail">
            <Form.Label><strong>Email</strong></Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">
                  <FontAwesomeIcon icon={faMailBulk} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="text"
                placeholder="Enter email"
                onChange={validateInput}
                onBlur={validateInput}
                name="email"
                className={studentData.email.background}
              />
            </InputGroup>
            <ErrorMessages errors={studentData.email.errors} />
          </Form.Group>
        </Form.Row>
        <Form.Row className="justify-content-center">
          <Form.Group as={Col} sm={10} controlId="formGridAddress1">
            <Form.Label><strong>Address</strong></Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">
                  <FontAwesomeIcon icon={faCity} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                placeholder="Street, Number, City, Zip"
                onBlur={validateInput}
                onChange={validateInput}
                name="address"
                className={studentData.address.background}
              />
            </InputGroup>
            <ErrorMessages errors={studentData.address.errors} />
          </Form.Group>
        </Form.Row>
        <Form.Row className="justify-content-around">
          <Form.Group as={Col} sm={4} controlId="formGridCourse">
            <Form.Label><strong>Course</strong></Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">
                  <FontAwesomeIcon icon={faGraduationCap} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                as="select"
                defaultValue="Select Course"
                name="course"
                onBlur={validateInput}
                onChange={validateInput}
                className={studentData.course.background}
              >
                <option>Select Course</option>
                <option>Making Money EASY! CHOOSE ME</option>
                <option>Java Script</option>
                <option>Python</option>
                <option>Css</option>
              </Form.Control>
            </InputGroup>
            <ErrorMessages errors={studentData.course.errors} />
          </Form.Group>
          <Form.Group as={Col} sm={4} controlId="formGridGender">
            <Form.Label><strong>Gender</strong></Form.Label>
            <br></br>
            <Form.Row className="justify-content-start">
              <ButtonGroup toggle id="formGridGender" defaultValue="">
                {radios.map((radio, idx) => (
                  <ToggleButton
                    key={idx}
                    type="radio"
                    variant="secondary"
                    name="gender"
                    value={radio.value}
                    onChange={validateInput}
                    variant="outline-dark"
                    className={studentData.gender.background}
                    // checked={radioValue === radio.value}
                  >
                    {radio.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
              <ErrorMessages errors={studentData.gender.errors} />
            </Form.Row>
          </Form.Group>
        </Form.Row>
        <Button type="submit" variant="outline-dark" size="lg" block>
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default StudentForm;
