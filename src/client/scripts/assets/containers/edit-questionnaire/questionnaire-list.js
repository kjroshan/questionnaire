import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import getQuestionnaires from '../../services/questionnaire-metadata/get-questionnaires';

class QuestionnaireList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'something'
        };

        this.handleFillQuestionnaire = this.handleFillQuestionnaire.bind(this);
    }

    handleFillQuestionnaire() {
        this.props.history.push('/answerquestionnaire');
    }

    handleQuestionnaireSelection(qid) {
        this.setState({
            selectedQuestionid: qid
        });

        this.props.history.push(`/editquestionnaire/id/${qid}`);
    }

    render() {
        const { selectedQuestionid } = this.state;
        return (
            <div className={this.state.name}>
                <div
                    style={{
                        display: 'inline-block',
                        width: '300px',
                        backgroundColor: 'lightgrey',
                        verticalAlign: 'top',
                        marginTop: '20px',
                        padding: '5px 5px 5px 5px'
                    }}
                >
                    <div
                        style={{
                            display: 'block',
                            backgroundColor: '#a3bdc5',
                            verticalAlign: 'top',
                            height: '30px',
                            paddingTop: '10px',
                            paddingBottom: '10px',
                            paddingLeft: '40px',
                            marginBottom: '20px'
                        }}
                    >

                        <button type="button" onClick={this.handleFillQuestionnaire}>
                            {'Answer Questionnaire'.toString()}
                        </button>

                    </div>
                    {
                        getQuestionnaires().map((questionnaire) => {
                            return (
                                <div key={questionnaire.qid}
                                    style={{
                                        height: '30px',
                                        paddingTop: '5px',
                                        paddingLeft: '0px'
                                    }}
                                >
                                    <button
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            borderWidth: '0px 0px 0px 0px',
                                            borderStyle: 'none',
                                            backgroundColor: selectedQuestionid === questionnaire.qid ? '#3baf6e' : '#96999c',
                                            textAlign: 'left',
                                            paddingLeft: '10px'
                                        }}

                                        onClick={() => { this.handleQuestionnaireSelection(questionnaire.qid); }}
                                    >
                                        {questionnaire.title}
                                    </button>
                                </div>
                            );
                        })
                    }
                </div>
                <div
                    style={{
                        width: '1055px',
                        display: 'inline-block',
                        paddingLeft: '10px'
                    }}
                >
                    {this.props.children}
                </div>
            </div>
        );
    }
}

QuestionnaireList.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    history: PropTypes.object
};

QuestionnaireList.defaultProps = {
    children: null,
    history: null
};

export default withRouter(QuestionnaireList);
