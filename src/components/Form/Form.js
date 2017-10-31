import React, { Component } from 'react';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import {FormGroup, ControlLabel, FormControl, HelpBlock, Button} from 'react-bootstrap';


const FieldGroup = ({ id, label, help, onChange, ...props }) => (
  <FormGroup controlId={id}>
    <ControlLabel>{label}</ControlLabel>
    <FormControl name={id} {...props} onChange={onChange}/>
    {help && <HelpBlock>{help}</HelpBlock>}
  </FormGroup>
)

export default class Form extends Component {
  constructor(props){
    super(props);
    this.state = {
      formControlDate: '',
      formControlFor: '',
      formControlSubject: '',
      formControlsBody: ''
    }
  }
  handleFormChange(value, name) {
    this.setState({[name]: value});
  }
  sendForm(e) {
    e.preventDefault();

  }
  render() {
    return (<div className="welcome">
      <PageHeader>היי אבא, ברוך הבא</PageHeader>
      <form>
        <FieldGroup id="formControlDate" type="date" label="תאריך" onChange={(e) => this.handleFormChange(e.target.value, e.target.name)}/>
        <FieldGroup id="formControlFor" type="text" label="לכבוד" onChange={(e) => this.handleFormChange(e.target.value, e.target.name)} />
        <FieldGroup id="formControlSubject" type="text" label="הנדון" onChange={(e) => this.handleFormChange(e.target.value, e.target.name)}/>
        <FormGroup controlId="formControlsBody">
          <ControlLabel>גוף הצעת המחיר</ControlLabel>
          <FormControl componentClass="textarea" name="formControlsBody" rows={15} onChange={(e) => this.handleFormChange(e.target.value, e.target.name)} />
        </FormGroup>
        <Button bsSize="large" type="submit" onClick={(e)=>{this.sendForm(e)}}>שגר הצעת מחיר</Button>
      </form>
    </div>);
  }
}