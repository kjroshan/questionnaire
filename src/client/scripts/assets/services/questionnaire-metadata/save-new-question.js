import find from 'lodash/find';

import getMetadata from './get-metadata';


export default function saveNewQuestionnaire(qid, sectionid, label, order) {
    const questionnaire = getMetadata(qid);
    const section = find(questionnaire.sections, { sectionid });

    section.questions.push({
        label,
        questionid: Date.now().toString(),
        order
    });


    return section;
}
