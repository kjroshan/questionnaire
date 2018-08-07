import sortBy from 'lodash/sortBy';

import getMetadata from '../questionnaire-metadata/get-metadata';

function getQuestionsTemplate(questions) {
    // const sortedQuestions = sortBy(questions, ['order']);

    return questions.map((question) => {
        return ({
            questionid: question.questionid,
            response: {
                isChecked: false,
                comments: ''
            }
        });
    });
}

function getSectionsTemplate(sections) {
    const sortedSections = sortBy(sections, ['order']);

    return sortedSections.map((section) => {
        return ({
            sectionid: section.sectionid,
            questions: getQuestionsTemplate(section.questions)
        });
    });
}

function createTemplate(metadata) {
    const template = {
        documentid: Date.now(),
        qid: metadata.qid,
        sections: getSectionsTemplate(metadata.sections)
    };
    return template;
}

export default function getResponseTemplate(qid) {
    const metadata = getMetadata(qid);
    let template = null;
    if (metadata) {
        template = createTemplate(metadata);
    }


    return template;
}
