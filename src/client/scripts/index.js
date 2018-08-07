import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, HashRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './assets/containers/main';
import EditResponseDocument from './assets/containers/answer-questionnaire/edit-response-document';
import QuestionnaireList from './assets/containers/edit-questionnaire/questionnaire-list';
import SectionList from './assets/containers/edit-questionnaire/section-list';
import QuestionList from './assets/containers/edit-questionnaire/question-list';
import QuestionEditor from './assets/containers/edit-questionnaire/question-editor';
import AnswerList from './assets/containers/answer-questionnaire/answer-list';
import AnswerQuestionnaireList from './assets/containers/answer-questionnaire/questionnaire-list';
import CreateResponseDocument from './assets/containers/answer-questionnaire/create-response-document';
import NewQuestionnaire from './assets/containers/edit-questionnaire/new-questionnaire';

ReactDOM.render(
    <Router>
        <Main>
            <Switch>
                <Route
                    path="/answerquestionnaire/id/:qid/document/:documentid"
                    component={EditResponseDocument}
                />
                <Route
                    path="/answerquestionnaire/id/:qid"
                    render={({ match }) => (
                        <h1>{'Welcome to answer questionnaire id:'.trim() + match.params.qid}</h1>
                    )}
                />

                <Route
                    path="/answerquestionnaire/createNewDocument/id/:qid"
                    render={() => (
                        <CreateResponseDocument />
                    )}
                />

                <Route
                    path="/answerquestionnaire/createNewDocument"
                    render={() => (
                        <AnswerQuestionnaireList />
                    )}
                />

                <Route
                    path="/answerquestionnaire"
                    render={() => (
                        <AnswerList />
                    )}
                />
                <Route
                    path="/editquestionnaire"
                    render={() => (
                        <QuestionnaireList>
                            <Switch>
                                <Route
                                    path="/editquestionnaire/id/:qid"
                                    render={() => (
                                        <SectionList>
                                            <Switch>
                                                <Route
                                                    path="/editquestionnaire/id/:qid/section/:sectionid/question/:questionid"
                                                    component={QuestionEditor}
                                                />
                                                <Route
                                                    path="/editquestionnaire/id/:qid/section/:sectionid"
                                                    component={QuestionList}
                                                />
                                            </Switch>
                                        </SectionList>
                                    )}
                                />

                                <Route
                                    component={() => (
                                        <NewQuestionnaire />
                                    )}
                                />
                            </Switch>
                        </QuestionnaireList>
                    )}
                />
                <Route
                    render={() => (
                        <Redirect to="/answerquestionnaire" />
                    )}
                />
            </Switch>
        </Main>
    </Router>,
    document.getElementById('app')
);

// render={({ match }) => (
//     <h1>{`Welcome to answer : ${match.params.docid} for questionnaire id: ${match.params.qid}`.trim()}</h1>
// )}
