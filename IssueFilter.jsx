/*
# ========================================================================================
# Class: CIS-129 (Frameworks / Server-Side JavaScript)
# Term: Spring 2019
# Student Name: Attoni B. Demel
# Student ID: 
# Student Email: attondemel@my.smccd.edu
# Assignment #: 13
# File Name: IssueFilter.jsx
# Assignment Objectives: Forms
# Due Date: Saturday, April 20, 2019
# ========================================================================================
*/

import React from 'react';
import PropTypes from 'prop-types';

export default class IssueFilter extends React.Component 
{ 
  constructor(props) {
    super(props);
    this.state = this.getInitialState(props);  
  
    this.onChangeFilter = this.onChangeFilter.bind(this);
    this.applyFilter = this.applyFilter.bind(this);  
    this.resetFilter = this.resetFilter.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState(this.getInitialState(newProps));
  }

  resetFilter() {  
    this.setState(this.getInitialState(this.props));
  }

// ======================== New Addedd Method: getInitialState ============================
  getInitialState(currentProps){
    return {
      status: currentProps.initFilter.status || '',
      effort_gte: currentProps.initFilter.effort_gte || '',
      effort_lte: currentProps.initFilter.effort_lte || '',
      changed: false,
    };
  }

// ======================== New Added Method: onChangeFilter ==============================
 onChangeFilter(e){
   const target = e.target;
   const name = target.name;
   const value = target.value;
   const effortsArray = ["effort_gte","effort_lte"];
   const effortsRegEx = /^\d*$/;

   if(effortsArray.includes(name) && !value.match(effortsRegEx)) {return};
   this.setState({
     [name]: value,
     changed: true
   });
 }
// ========================================================================================

 applyFilter() {
  console.log("applyFilter Start: ",(new Date()).getTime());
   const newFilter = {};
   if (this.state.status) newFilter.status = this.state.status;
   if (this.state.effort_gte) newFilter.effort_gte = this.state.effort_gte; 
   if (this.state.effort_lte) newFilter.effort_lte = this.state.effort_lte;
   this.props.setFilter(newFilter);
   console.log("applyFilter End: ",(new Date()).getTime());
 }

 clearFilter() {
   this.props.setFilter({});
 }

 render() {
  console.log("render Method IssueFilter.jsx: ",(new Date()).getTime());  
   return (    
      <>
        Status:      
        <select name="status" value={this.state.status} onChange={this.onChangeFilter}>
          <option value="">(Any)</option>
          <option value="New">New</option>
          <option value="Open">Open</option>  
          <option value="Assigned">Assigned</option>
          <option value="Fixed">Fixed</option>
          <option value="Verified">Verified</option> 
          <option value="Closed">Closed</option>
        </select>
        &nbsp;Effort between: < input size={5} name="effort_gte" value={this.state.effort_gte} onChange={this.onChangeFilter} />
        &nbsp;-&nbsp; < input size={5} name="effort_lte" value={this.state.effort_lte} onChange={this.onChangeFilter} />
        <button onClick={this.applyFilter}>Apply</button> 
        < button onClick={this.resetFilter} disabled={!this.state.changed}>Reset</button>
        <button onClick={this.clearFilter}>Clear</button>
      </>
   );
 }
}

IssueFilter.propTypes = {
    setFilter: PropTypes.func.isRequired,
    initFilter: PropTypes.object.isRequired
};

