import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import saveNewQuestionnaire from '../../services/questionnaire-metadata/save-new-questionnaire';

class NewQuestionnaire extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: ''
        };

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleAddNewQuestionnaire = this.handleAddNewQuestionnaire.bind(this);
    }

    componentWillReceiveProps() {
        this.setState({
            title: ''
        });
    }

    handleTitleChange(e) {
        this.setState({
            title: e.target.value
        });
    }

    handleAddNewQuestionnaire(questionnaireId) {
        saveNewQuestionnaire(this.state.title, questionnaireId);
        this.props.history.replace('/editquestionnaire');
    }

    render() {
        const questionnaireId = Date.now();
        return (
            <div>
                <h2>{'Add a new questionnaire'.trim()}</h2><br />

                <div
                    style={{
                        borderStyle: 'solid',
                        borderWidth: '1px 1px 1px 1px',
                        borderColor: '#abb7c3b8',
                        paddingTop: '5px',
                        paddingLeft: '10px'
                    }}
                >
                    <label
                        htmlFor={`input_${questionnaireId}`.trim()}
                    >
                        {'Title: '.toString()}
                        <input
                            id={`input_${questionnaireId}`.trim()}
                            value={this.state.title}
                            onChange={(e) => { this.handleTitleChange(e); }}
                        />
                    </label>
                    <br /><br />
                    <button type="button" onClick={() => { this.handleAddNewQuestionnaire(questionnaireId); }}>
                        {'Add Questionnaire'.toString()}
                    </button>
                </div>

            </div>
        );
    }
}

NewQuestionnaire.propTypes = {
    // children: PropTypes.oneOfType([
    //     PropTypes.arrayOf(PropTypes.node),
    //     PropTypes.node
    // ])
    history: PropTypes.object
};

NewQuestionnaire.defaultProps = {
    // children: null
    history: null
};

export default withRouter(NewQuestionnaire);
