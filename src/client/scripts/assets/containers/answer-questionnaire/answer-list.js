import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import getResponses from '../../services/questionnaire-responses/questionnaire-responses';
import getMadata from '../../services/questionnaire-metadata/get-metadata';


const responseDocuments = getResponses();

class AnswerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'something'
        };

        this.handleFillNewQuestionnaire = this.handleFillNewQuestionnaire.bind(this);
        this.handleManageQuestionnaires = this.handleManageQuestionnaires.bind(this);
    }

    handleFillNewQuestionnaire() {
        this.props.history.push('/answerquestionnaire/createNewDocument');
    }

    handleManageQuestionnaires() {
        this.props.history.push('/editquestionnaire');
    }

    render() {
        return (
            <div className={this.state.name}
                style={{
                    display: 'block',
                    width: '100%',
                    verticalAlign: 'top',
                    marginTop: '10px'
                }}
            >
                <div
                    style={{
                        display: 'block',
                        backgroundColor: 'lightgrey',
                        verticalAlign: 'top',
                        marginTop: '10px',
                        height: '30px',
                        paddingTop: '5px',
                        paddingLeft: '10px'
                    }}
                >

                    <button type="button" onClick={this.handleFillNewQuestionnaire}>
                        {'Fill New Questionnaire'.toString()}
                    </button>

                    <button type="button"
                        onClick={this.handleManageQuestionnaires}
                        style={{
                            marginLeft: '30px'
                        }}
                    >
                        {'Manage Questionnaires'.toString()}
                    </button>

                </div>

                <div
                    style={{
                        display: 'block',
                        backgroundColor: 'lightgrey',
                        verticalAlign: 'top',
                        marginTop: '10px'
                    }}
                >
                    {
                        responseDocuments.map((response) => {
                            const questionnaire = getMadata(response.qid);
                            return (
                                <div key={response.documentid}
                                    style={{
                                        height: '30px',
                                        borderStyle: 'solid',
                                        borderWidth: '0px 0px 1px 0px',
                                        borderColor: '#abb7c3b8',
                                        paddingTop: '5px',
                                        paddingLeft: '10px'
                                    }}
                                >
                                    <Link to={`/answerquestionnaire/id/${response.qid}/document/${response.documentid}`.toString()}>
                                        {`Document: ${response.documentid} for questionnaire: ${questionnaire.title}`.toString()}
                                    </Link>
                                </div>
                            );
                        })
                    }
                </div>
                <div
                    style={{
                        width: '1000px',
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

AnswerList.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    history: PropTypes.object
};

AnswerList.defaultProps = {
    children: null,
    history: null
};

export default withRouter(AnswerList);
