import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import find from 'lodash/find';
import maxBy from 'lodash/maxBy';

import getMetadata from '../../services/questionnaire-metadata/get-metadata';
import saveNewQuestion from '../../services/questionnaire-metadata/save-new-question';

class QuestionList extends Component {
    constructor(props) {
        super(props);

        this.metadata = getMetadata(this.props.match.params.qid);

        this.state = {
            title: '',
            order: this.getNextQuestionSortOrder()
        };

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleOrderChange = this.handleOrderChange.bind(this);
        this.handleAddNewQuestion = this.handleAddNewQuestion.bind(this);
    }

    componentWillReceiveProps() {
        this.setState({
            title: '',
            order: this.getNextQuestionSortOrder()
        });

        this.metadata = getMetadata(this.props.match.params.qid);
    }

    getNextQuestionSortOrder() {
        const section = find(this.metadata.sections, { sectionid: this.props.match.params.sectionid });

        const question = maxBy(section.questions, 'order');
        return question ? question.order + 1 : 1;
    }

    handleTitleChange(e) {
        this.setState({
            title: e.target.value
        });
    }

    handleOrderChange(e) {
        this.setState({
            order: Number(e.target.value)
        });
    }

    handleAddNewQuestion() {
        const { title, order } = this.state;
        const { qid, sectionid } = this.props.match.params;

        saveNewQuestion(qid, sectionid, title, order);
        // this.props.history.push(`/editquestionnaire/id/${qid}/section/${sectionid}`);
        this.setState({
            title: '',
            order: this.getNextQuestionSortOrder()
        });
    }

    handleQuestionSelection(qid, sectionid, questionid) {
        this.props.history.push(`/editquestionnaire/id/${qid}/section/${sectionid}/question/${questionid}`);
    }

    render() {
        const { match } = this.props;
        const { title, order } = this.state;

        const section = find(this.metadata.sections, { sectionid: match.params.sectionid });

        return (
            <div className={this.state.name}>
                <h2>{`Questionnaire: ${this.metadata.title}`.trim()}</h2>
                <h3>{`Section: ${section.title}`.trim()}</h3>
                <div
                    style={{
                        height: '120px',
                        borderStyle: 'solid',
                        borderWidth: '0px 0px 1px 0px',
                        borderColor: '#abb7c3b8',
                        marginTop: '10px',
                        paddingTop: '20px',
                        paddingLeft: '10px',
                        marginBottom: '10px',
                        backgroundColor: 'lightgrey'
                    }}
                >
                    <label
                        htmlFor={'question-title-input'.trim()}
                    >
                        {'Question Text: '.toString()}
                        <input
                            id={'question-title-input'.trim()}
                            value={title}
                            onChange={(e) => { this.handleTitleChange(e); }}
                        />
                    </label><br /><br />
                    <label
                        htmlFor={'question-order-input'.trim()}
                    >
                        {'Order: '.toString()}
                        <input
                            id={'question-order-input'.trim()}
                            value={order}
                            onChange={(e) => { this.handleOrderChange(e); }}
                        />
                    </label><br /><br />
                    <button type="button" onClick={() => { this.handleAddNewQuestion(); }}>
                        {'Add Question'.toString()}
                    </button>
                </div>

                {
                    section.questions.map((question) => {
                        return (
                            <div key={question.questionid}
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
                                        textAlign: 'left',
                                        paddingLeft: '10px',
                                        backgroundColor: '#96999c'
                                    }}

                                    onClick={() => { this.handleQuestionSelection(this.metadata.qid, section.sectionid, question.questionid); }}
                                >
                                    {question.label}
                                </button>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

QuestionList.propTypes = {
    // children: PropTypes.oneOfType([
    //     PropTypes.arrayOf(PropTypes.node),
    //     PropTypes.node
    // ])
    match: PropTypes.object,
    history: PropTypes.object
};

QuestionList.defaultProps = {
    // children: null
    match: null,
    history: null
};

export default withRouter(QuestionList);
