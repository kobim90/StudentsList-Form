import { Button, Col, Container, Row } from "react-bootstrap";
import {
  faUser,
  faMailBulk,
  faCity,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

function StudentCard(props) {
  const [showDetails, setShowDetails] = useState(false);
  const [detail, setDetail] = useState("")

  function showDetailse({target:{name}}) {
    setShowDetails(true)
    setDetail(props.student[name])
  }

  return (
      <Container fluid>
          <Row>
              
          </Row>
      </Container>
  )
}

export default StudentCard;
