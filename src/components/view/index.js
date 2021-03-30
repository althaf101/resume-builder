import React from 'react'
import {useSelector} from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import PropTypes from 'prop-types';

import './styles.scss'

const View = (props) => {
  const profile = useSelector(state => state.form.profile)
    const {
    values : {
      name,
      address,
      email,
      phone,
      education = [],
      experience = [],
      skills = []
    } = {}
  } = (profile || {}) 

  const downloadResume = () => {
    window.print();
  };

  const editResume = () => {
    props.history.push("/edit")
  };

  return (
    <Container className="view-container">
      <Row className="top-row">
        <Col>
          <div className="resume-div">
            <section className="basic-info">
              <label className="header-label">
                BASIC INFO
              </label>
              <Row>
                <Col>
                  <label className="header-label">Name</label>
                  <label>{name}</label>
                </Col>
                <Col>
                  <label className="header-label">Email</label>
                  <label>{email}</label>
                </Col>
              </Row>
              <Row>
                <Col>
                  <label className="header-label">Phone</label>
                  <label>{phone}</label>
                </Col>
                <Col>
                  <label className="header-label">Address</label>
                  <label>{address}</label>
                </Col>
              </Row>
            </section>
            <section className="education-info">
              <label className="header-label">
                EDUCATION
              </label>
              {
                education.map((ed, i) => (
                  <Row key={i}>
                    <Col>
                      <label className="header-label">Institute Name</label>
                      <label>{ed.name}</label>
                    </Col>
                    <Col>
                      <label className="header-label">Year</label>
                      <label>{ed.year}</label>
                    </Col>
                    <Col>
                      <label className="header-label">Degree</label>
                      <label>{ed.degree}</label>
                    </Col>
                  </Row>
                ))
              }
            </section>
            <section className="experience-info">
              <label className="header-label">
                EXPERIENCE
              </label>
              {
                experience.map((ex, i) => (
                  <Row key={i}>
                    <Col>
                      <label className="header-label">Company Name</label>
                      <label>{ex.name}</label>
                    </Col>
                    <Col>
                      <label className="header-label">Year</label>
                      <label>{ex.year}</label>
                    </Col>
                    <Col>
                      <label className="header-label">designation</label>
                      <label>{ex.designation}</label>
                    </Col>
                  </Row>
                ))
              }
            </section>
            <section className="skills-info">
              <label className="header-label">
                SKILLS
              </label>
              {
                skills.map((skill, i) => (
                  <span key={i}>
                    {skill.text}
                  </span>
                ))
              }
            </section>
          </div>
        </Col>
      </Row>
      <Row className="top-row">
        <Col>
          <div className="action-div">
            <Button variant="secondary" onClick={editResume}>Back</Button> 
            <Button variant="info" onClick={downloadResume}>Download My Resume</Button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

View.propTypes = {
  history: PropTypes.object
};

export default View;