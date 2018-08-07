import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import find from 'lodash/find';
import { withRouter } from 'react-router-dom';

import getMetadata from '../../../services/questionnaire-metadata/get-metadata';
// import getResponses from '../../../services/questionnaire-responses/questionnaire-responses';
import getResponseDocument from '../../../services/questionnaire-responses/get-response-document';
import saveResponseDocument from '../../../services/questionnaire-responses/save-response';

// const responseDocuments = getResponses();

class EditResponseDocument extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'something'
        };

        this.isQuestionChecked = this.isQuestionChecked.bind(this);
        this.getComment = this.getComment.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleComment = this.handleComment.bind(this);
        this.handleSaveNewQuestionnaire = this.handleSaveNewQuestionnaire.bind(this);

        this.metadata = getMetadata(props.match.params.qid);
        this.response = getResponseDocument(props.match.params.qid, props.match.params.documentid);
    }

    componentWillReceiveProps(props) {
        this.metadata = getMetadata(props.match.params.qid);
        this.response = getResponseDocument(props.match.params.qid, props.match.params.documentid);
        this.forceUpdate();
    }

    getComment(response, sectionid, questionid) {
        const section = find(response.sections, { sectionid });
        const question = find(section.questions, { questionid });
        if (!question) return '';
        return question.response.comments;
    }

    isQuestionChecked(response, sectionid, questionid) {
        const section = find(response.sections, { sectionid });
        const question = find(section.questions, { questionid });
        if (!question) return false;
        return question.response.isChecked;
    }

    handleCheck(e, response, sectionid, questionid) {
        const section = find(response.sections, { sectionid });
        const question = find(section.questions, { questionid });

        question.response.isChecked = e.target.checked;
        this.forceUpdate();
        console.log(response);
    }
    handleComment(e, response, sectionid, questionid) {
        const section = find(response.sections, { sectionid });
        const question = find(section.questions, { questionid });

        question.response.comments = e.target.value;
        console.log(response);
        this.forceUpdate();
    }

    handleSaveNewQuestionnaire() {
        saveResponseDocument(this.response);
        this.props.history.push('/answerquestionnaire');
    }

    render() {
        // const { match } = this.props;

        // const metadata = getMetadata(match.params.qid);
        // const response = getResponseDocument(match.params.qid, match.params.documentid);

        const { metadata, response } = this;


        if (!response) return null;

        return (
            <Fragment>
                <QuestionnaireTitle title={metadata.title} />

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

                    <button type="button" onClick={this.handleSaveNewQuestionnaire}>
                        {'Save Questionnaire'.toString()}
                    </button>

                </div>

                {
                    metadata.sections.map((section) => {
                        return (
                            <Section key={`${metadata.qid}-${section.sectionid}`.trim()} name={this.state.name}>
                                <SectionTitle title={section.title} />
                                <QuestionsContainer>
                                    {
                                        section.questions.map((question) => {
                                            return (
                                                <Question key={`${metadata.qid}-${section.sectionid}-${question.questionid}`.trim()}>
                                                    <Checkbox
                                                        id={`${metadata.qid}-${section.sectionid}-${question.questionid}`.trim()}
                                                        isChecked={this.isQuestionChecked(response, section.sectionid, question.questionid)}
                                                        label={question.label}
                                                        onChange={(e) => { this.handleCheck(e, response, section.sectionid, question.questionid); }}
                                                    />
                                                    <Comment
                                                        onChange={(e) => { this.handleComment(e, response, section.sectionid, question.questionid); }}
                                                        value={this.getComment(response, section.sectionid, question.questionid)}
                                                    />
                                                </Question>
                                            );
                                        })
                                    }
                                </QuestionsContainer>
                            </Section>
                        );
                    })
                }

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

                    <button type="button" onClick={this.handleSaveNewQuestionnaire}>
                        {'Save Questionnaire'.toString()}
                    </button>

                </div>
            </Fragment>
        );
    }
}

EditResponseDocument.propTypes = {
    // children: PropTypes.shapeOf(PropTypes.element)
    match: PropTypes.object,
    history: PropTypes.object
};

EditResponseDocument.defaultProps = {
    match: null,
    history: null
};

export default withRouter(EditResponseDocument);

const Section = props => (
    <div style={{
        backgroundColor: 'lightgrey'
    }}
    >
        {props.children}
    </div>
);

Section.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

Section.defaultProps = {
    children: null
};

const QuestionsContainer = props => (
    <div>
        {props.children}
    </div>
);

QuestionsContainer.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

QuestionsContainer.defaultProps = {
    children: null
};

const Question = props => (
    <div style={{
        borderStyle: 'solid',
        borderWidth: '0px 0px 1px 0px',
        borderColor: '#abb7c3b8',
        height: '35px'
    }}
    >
        {props.children}
    </div>
);

Question.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

Question.defaultProps = {
    children: null
};

const QuestionnaireTitle = props => (
    <div style={{
        position: 'relative',
        top: '5px',
        marginLeft: '10px'
    }}
    >
        <h2>{props.title}</h2>
    </div>
);

QuestionnaireTitle.propTypes = {
    title: PropTypes.string
};

QuestionnaireTitle.defaultProps = {
    title: null
};

const SectionTitle = props => (
    <div style={{
        position: 'relative',
        top: '5px',
        marginLeft: '10px'
    }}
    >
        <h3> {props.title} </h3>
    </div>
);

SectionTitle.propTypes = {
    title: PropTypes.string
};

SectionTitle.defaultProps = {
    title: null
};

const Checkbox = props => (
    <div style={{
        position: 'relative',
        top: '5px',
        marginLeft: '10px',
        display: 'inline-block'
    }}
    >
        <label htmlFor={props.id}>
            <input
                type="checkbox"
                id={props.id}
                checked={props.isChecked}
                onChange={(e) => { props.onChange(e); }}
            />
            {props.label}
        </label>
    </div>
);

Checkbox.propTypes = {
    id: PropTypes.string,
    isChecked: PropTypes.bool,
    label: PropTypes.string,
    onChange: PropTypes.func
};

Checkbox.defaultProps = {
    id: null,
    isChecked: false,
    label: null,
    onChange: null,
};

const Comment = props => (
    <div style={{
        float: 'right',
        display: 'inline-block',
        position: 'relative',
        top: '5px',
        marginLeft: '10px',
        marginRight: '20px'
    }}
    >
        <label htmlFor={`comment-${props.id}`.toString()}>
            {'Comment: '.toString()}
            <input
                id={`comment-${props.id}`.toString()}
                type="text"
                onChange={(e) => { props.onChange(e); }}
                value={props.value}
            />
        </label>

    </div>
);

Comment.propTypes = {
    id: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string
};

Comment.defaultProps = {
    id: null,
    onChange: null,
    value: null
};

