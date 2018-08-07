import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import getQuestionnaires from '../../services/questionnaire-metadata/get-questionnaires';

export default class AnswerQuestionnaireList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'something'
        };
    }

    render() {
        return (
            <div className={this.state.name}>
                <div
                    style={{
                        display: 'inline-block',
                        width: '300px',
                        backgroundColor: 'lightgrey',
                        verticalAlign: 'top',
                        marginTop: '20px'
                    }}
                >
                    <div>
                        <h2> {'Select a questionnaire to fill'.toString()} </h2>
                    </div>
                    {
                        getQuestionnaires().map((questionnaire) => {
                            return (
                                <div key={questionnaire.qid}
                                    style={{
                                        height: '30px',
                                        borderStyle: 'solid',
                                        borderWidth: '0px 0px 1px 0px',
                                        borderColor: '#abb7c3b8',
                                        paddingTop: '5px',
                                        paddingLeft: '10px'
                                    }}
                                >
                                    <Link to={`/answerquestionnaire/createNewDocument/id/${questionnaire.qid}`}>
                                        {questionnaire.title.trim()}
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

AnswerQuestionnaireList.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

AnswerQuestionnaireList.defaultProps = {
    children: null
};
