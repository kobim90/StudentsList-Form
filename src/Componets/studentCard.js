import { Button, Col, Row, Card, ListGroup } from "react-bootstrap";
import {
  faUniversity,
  faUser,
  faMailBulk,
  faCity,
  faGraduationCap,
  faVenusMars,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../Styles/cardStyle.css";

function StudentCard(props) {
  const iconsObj = {
    username: faUser,
    email: faMailBulk,
    address: faCity,
    course: faGraduationCap,
    gender: faVenusMars,
  };

  const studentDetails = [];
  for (const key in props.student) {
    studentDetails.push([key, props.student[key], iconsObj[key]]);
  }

  return (
    <Card className="card card-custom bg-white border-white border-0">
      <Row className="closeRow justify-content-end">
        <Button className="close" closeButton>
          <span onClick={props.cardViewOff}>
            &times;
          </span>
        </Button>
        </Row>
      <div className="card-custom-img d-flex justify-content-center text-center">
        <FontAwesomeIcon icon={faUniversity} size={"7x"} color={"white"} />
      </div>
      <div className="card-custom-avatar">
        <img className="img-fluid" src={props.student.image} alt="Avatar" />
      </div>
      <Card.Body>
        <Row className="justify-content-center">
          <h4 className="card-title">{props.student.username.toUpperCase()}</h4>
        </Row>
        <ListGroup variant="flush">
          {studentDetails.map((detail) => {
            if (detail[0] !== "image") {
              return (
                <Row className="justify-content-between">
                  <Col>
                    <ListGroup.Item className="redText">
                      <strong>
                        <FontAwesomeIcon icon={detail[2]} />{" "}
                        {detail[0].toUpperCase()}:
                      </strong>
                    </ListGroup.Item>
                  </Col>
                  <Col>
                    <ListGroup.Item className="blackText">
                      {detail[1]}
                    </ListGroup.Item>
                  </Col>
                </Row>
              );
            }
          })}
        </ListGroup>
      </Card.Body>      
    </Card>
  );
}

export default StudentCard;

