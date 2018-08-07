import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import find from 'lodash/find';

import getMetadata from '../../services/questionnaire-metadata/get-metadata';

class QuestionEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'something'
        };

        this.handleLabelChange = this.handleLabelChange.bind(this);
        this.handleOrderChange = this.handleOrderChange.bind(this);
        this.handleSaveQuestion = this.handleSaveQuestion.bind(this);
    }

    handleLabelChange(e, question) {
        const tmpQuestion = question;
        tmpQuestion.label = e.target.value;
        this.forceUpdate();
    }

    handleOrderChange(e, question) {
        const tmpQuestion = question;
        tmpQuestion.order = Number(e.target.value);
        this.forceUpdate();
    }

    handleSaveQuestion() {
        const { qid, sectionid } = this.props.match.params;
        // saveQuestion(qid, sectionid, question);
        this.props.history.push(`/editquestionnaire/id/${qid}/section/${sectionid}`);
        // this.setState({
        //     title: '',
        //     order: this.getNextQuestionSortOrder()
        // });
    }

    handleCancel() {
        const { qid, sectionid } = this.props.match.params;
        this.props.history.push(`/editquestionnaire/id/${qid}/section/${sectionid}`);
    }

    render() {
        const { match } = this.props;
        const metadata = getMetadata(match.params.qid);
        const section = find(metadata.sections, { sectionid: match.params.sectionid });
        const question = find(section.questions, { questionid: match.params.questionid });

        return (
            <div className={this.state.name}>
                <h2>{`Questionnaire: ${metadata.title}`.trim()}</h2>
                <h3>{`Section: ${section.title}`.trim()}</h3>
                <h4>{`Edit Question # ${question.questionid}`.trim()}</h4>

                {/* <div key={question.questionid}
                    style={{
                        borderStyle: 'solid',
                        borderWidth: '1px 1px 1px 1px',
                        borderColor: '#abb7c3b8',
                        paddingTop: '5px',
                        paddingLeft: '10px'
                    }}
                >
                    <label
                        htmlFor={`checkbox${question.questionid}`.trim()}
                    >
                        {'Label: '.toString()} <br />
                        <input
                            id={`checkbox${question.questionid}`.trim()}
                            value={question.label}
                            onChange={(e) => { this.handleLabelChange(e, question); }}
                        />
                    </label>
                </div> */}

                <div
                    style={{
                        height: '120px',
                        borderStyle: 'solid',
                        borderWidth: '0px 0px 1px 0px',
                        borderColor: '#abb7c3b8',
                        marginTop: '10px',
                        paddingTop: '10px',
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
                            value={question.label}
                            onChange={(e) => { this.handleLabelChange(e, question); }}
                        />
                    </label><br /><br />
                    <label
                        htmlFor={'question-order-input'.trim()}
                    >
                        {'Order: '.toString()}
                        <input
                            id={'question-order-input'.trim()}
                            value={question.order}
                            onChange={(e) => { this.handleOrderChange(e, question); }}
                        />
                    </label><br /><br />
                    <button type="button" onClick={() => { this.handleSaveQuestion(); }}>
                        {'Save Question'.toString()}
                    </button>
                    <button type="button"
                        onClick={() => { this.handleCancel(); }}
                        style={{ marginLeft: '30px' }}
                    >
                        {'Cancel'.toString()}
                    </button>
                </div>
            </div>
        );
    }
}

QuestionEditor.propTypes = {
    // children: PropTypes.oneOfType([
    //     PropTypes.arrayOf(PropTypes.node),
    //     PropTypes.node
    // ])
    match: PropTypes.object,
    history: PropTypes.object
};

QuestionEditor.defaultProps = {
    // children: null
    match: null,
    history: null
};


export default withRouter(QuestionEditor);
