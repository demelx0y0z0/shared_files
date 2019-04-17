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
    /*
    this.state = {
      status: props.initFilter.status || '',
      effort_gte: props.initFilter.effort_gte || '',
      effort_lte: props.initFilter.effort_lte || '',
      changed: false,
    };
    */

    // Added Line To Replace state Initialization Above
    this.state = this.getInitialState(props); 

    /*
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeEffortGte = this.onChangeEffortGte.bind(this);
    this.onChangeEffortLte = this.onChangeEffortLte.bind(this);
    */
    
    // onChangeFilter: Unifies onChangeStatus, onChangeEffortGte And onChangeEffortLte
    this.onChangeFilter = this.onChangeFilter.bind(this);

    this.applyFilter = this.applyFilter.bind(this);  
    this.resetFilter = this.resetFilter.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
  }

  componentWillReceiveProps(newProps) {
    /*
    this.setState({
      status: newProps.initFilter.status || '',
      effort_gte: newProps.initFilter.effort_gte || '',
      effort_lte: newProps.initFilter.effort_lte || '',
      changed: false,
    });
    */
    
    this.setState(this.getInitialState(newProps));
  }

  resetFilter() {
    /*
    const newState = {
      status: this.props.initFilter.status || '',
      effort_gte: this.props.initFilter.effort_gte || '',
      effort_lte: this.props.initFilter.effort_lte || '',
      changed: false,
    };

    this.setState(newState);
    */
     
    this.setState(this.getInitialState(this.props));
  }

  // ================================ New Addedd Method ======================================
  getInitialState(currentProps){
    return {
      status: currentProps.initFilter.status || '',
      effort_gte: currentProps.initFilter.effort_gte || '',
      effort_lte: currentProps.initFilter.effort_lte || '',
      changed: false,
    };
  }
  // =========================================================================================

 /*
 onChangeStatus(e) {
   this.setState({ status: e.target.value, changed: true });
 }

 onChangeEffortGte(e) { 
   const effortString = e.target.value;
   if (effortString.match(/^\d*$/)) {
     this.setState({ effort_gte: e.target.value, changed: true });
   }
 }

 onChangeEffortLte(e) {
   const effortString = e.target.value;
   if (effortString.match(/^\d*$/)) {
     this.setState({ effort_lte: e.target.value, changed: true });
   }
 }
 */

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
 //}
 
 applyFilter() {
   const newFilter = {};
   if (this.state.status) newFilter.status = this.state.status;
   if (this.state.effort_gte) newFilter.effort_gte = this.state.effort_gte; 
   if (this.state.effort_lte) newFilter.effort_lte = this.state.effort_lte;
   this.props.setFilter(newFilter);
 }

 clearFilter() {
   this.props.setFilter({});
 }

 render() {  
   return (    
      <>
        Status:      
        {/*<select value={this.state.status} onChange={this.onChangeStatus}>*/}
        <select name="status" value={this.state.status} onChange={this.onChangeFilter}>
          <option value="">(Any)</option>
          <option value="New">New</option>
          <option value="Open">Open</option>  
          <option value="Assigned">Assigned</option>
          <option value="Fixed">Fixed</option>
          <option value="Verified">Verified</option> 
          <option value="Closed">Closed</option>
        </select>

        &nbsp;Effort between: 
        {/*< input size={5} value={this.state.effort_gte} onChange={this.onChangeEffortGte} />*/}
        < input size={5} name="effort_gte" value={this.state.effort_gte} onChange={this.onChangeFilter} />
        &nbsp;-&nbsp; {/*< input size={5} value={this.state.effort_lte} onChange={this.onChangeEffortLte} />*/}
        < input size={5} name="effort_lte" value={this.state.effort_lte} onChange={this.onChangeFilter} />
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

