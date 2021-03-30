import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Field, FieldArray, reduxForm, reset } from 'redux-form'
import {WithContext as ReactTags} from 'react-tag-input';
import PropTypes from 'prop-types';

import {required, number, email} from '../../utils/validations'
import './styles.scss'


const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && ((error && <span className="error">{error}</span>) || (warning && <span className="error">{warning}</span>))}
    </div>
  </div>
)


const renderEducation = ({ fields }) => {
  if (!fields?.length) {
   fields.push({});
  }
  return (
    <ul>
      {fields.map((field, index) => (
        <li key={index}>
          <div className="field-wrapper name">
            <Field
              name={`${field}.name`}
              type="text"
              component={renderField}
              label="Institution Name"
              validate={[required]}
            />
          </div>
          <div className="field-wrapper year">
            <Field
              name={`${field}.year`}
              type="number"
              component={renderField}
              label="Year"
              validate={[required, number]}
            />
          </div>
          <div className="field-wrapper">
            <Field
              name={`${field}.degree`}
              type="text"
              component={renderField}
              label="Degree"
              validate={[required]}
            />
          </div>
         
        </li>
      ))}
      <li>
        <Button variant="info" type="button" onClick={() => fields.push({})}>Add Education</Button>
      </li>
  </ul>
  );
}

const renderExperience = ({ fields }) => {
  if (!fields?.length) {
    fields.push({});
  }
  return (
    <ul>
      {fields.map((field, index) => (
        <li key={index}>
          <div className="field-wrapper name">
            <Field
              name={`${field}.name`}
              type="text"
              component={renderField}
              label="Company Name"
              validate={[required]}
            />
          </div>
          <div className="field-wrapper year">
            <Field
              name={`${field}.year`}
              type="number"
              component={renderField}
              label="Year"
              validate={[required, number]}
            />
          </div>
          <div className="field-wrapper">
            <Field
              name={`${field}.designation`}
              type="text"
              component={renderField}
              label="Designation"
              validate={[required]}
            />
          </div>
         
        </li>
      ))}
      <li>
        <Button variant="info" type="button" onClick={() => fields.push({})}>Add Experience</Button>
      </li>
  </ul>
  );
}

const renderSkills = ({ input: { onChange }}) => {
  const skills = useSelector(state => state?.form?.profile?.values?.skills)
  
  const handleDelete = index => {
    onChange((skills || []).filter((s, i) => index != i));
  };

  const handleAdd = e => {
    onChange([...(skills?.length ? skills: []), {id: (skills?.length || 0 ) + 1, text: e}]);
  };

  return (
    <ReactTags
      placeholder="Add new skill"
      tags={skills || []}
      // suggestions={suggestions} can be added here
      handleDelete={handleDelete}
      handleAddition={handleAdd}
    />
  );
};

const Edit = (props) => {
  const dispatch = useDispatch()
  const form = useSelector(state=>state.form)
  const {
    profile: {
      syncErrors: errors,
      values: {
        skills
      } = {}
    } = {}
  } = form;

  const viewResume = () => {
    props.history.push("/view")
  };

  const resetForm = () => {
    dispatch(reset("profile"))
  };
 
  return (
    <Container className="edit-container">
      <Row>
        <Col>
          <div className="basic-div">
            <Accordion defaultActiveKey="0">
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    BASIC INFO
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <form>
                      <div className="field-wrapper">
                        <Field 
                          name="name" 
                          component={renderField} 
                          type="text" 
                          label="Name"
                          validate={[required]}
                        />
                      </div>
                      <div className="field-wrapper">
                        <Field 
                          name="email" 
                          component={renderField} 
                          type="email" 
                          label="Email"
                          validate={[required, email]}
                        />
                      </div>
                      <div className="field-wrapper">
                        <Field 
                          name="phone" 
                          component={renderField} 
                          type="number" 
                          label="Phone number"
                          validate={[required, number]}
                        />
                      </div>
                      <div className="field-wrapper">
                        <label >Address</label>
                        <Field 
                          name="address" 
                          component="textarea" 
                          placeholder="Address"
                          rows="4"
                        />
                      </div>
                    </form>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="education-div">
            <Accordion defaultActiveKey="0">
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    EDUCATION
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <form>
                      <FieldArray name="education" component={renderEducation} />
                    </form>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="experience-div">
            <Accordion defaultActiveKey="0">
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    EXPERIENCE
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <form>
                      <FieldArray name="experience" component={renderExperience} />
                    </form>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="skills-div">
            <Accordion defaultActiveKey="0">
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    SKILLS
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <form>
                      <div className="field-wrapper">
                        <Field 
                          name="skills" 
                          component={renderSkills} 
                          />
                      </div>
                    </form>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="action-div"> 
            <Button variant="danger" onClick={resetForm}>Reset</Button>
            <Button title="Fill all fields to enable preview" variant="info" onClick={viewResume} disabled={errors || !skills?.length }>View My Resume</Button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

Edit.propTypes = {
  history: PropTypes.object,
  reset: PropTypes.func
};

export default reduxForm({form: 'profile', destroyOnUnmount: false})(Edit);
