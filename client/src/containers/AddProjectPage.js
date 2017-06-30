import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { submit, SubmissionError } from 'redux-form';

import { postProject } from '../actions/indexActions';

import AddProjectForm from '../components/AddProjectForm';
import ProjectTaskForm from '../components/ProjectTaskForm';



let AddProjectPage = class extends Component {
  handleComponentUpdate(prevProps) {
    console.log(prevProps.queuedProject, this.props.queuedProject)
    if (prevProps.queuedProject !== this.props.queuedProject) {
      const { postProject, queuedProject } = this.props;
      const { newTasks } = this.state;
      console.log(newTasks)
      postProject(queuedProject, newTasks);
     //routeToProjects();
    }
  }
  
  handleAddProject() {
    const { submit } = this.props;
    submit('addProjectForm');  
  }
  
  render() {
    const { postProject, queuedProject } = this.props; 
    
    return(
      <div>
        <ProjectTaskForm 
          handleComponentUpdate={this.handleComponentUpdate}
          handleProjectSubmit={this.handleAddProject.bind(this)}
          postProject={postProject}
          queuedProject={queuedProject}
        >
          <AddProjectForm shouldRenderSubmitButton={false} />
        </ProjectTaskForm>  
      </div>
      );
    }
  }
  
  const mapStateToProps = state => {
    const { projects } = state;
    
    return {
      queuedProject: projects.queue
    }
  }

  export default AddProjectPage = connect(mapStateToProps, {
    postProject,
    submit
  })(AddProjectPage);
  
  
  AddProjectPage.propTypes = {
    queuedProject: PropTypes.string
  }