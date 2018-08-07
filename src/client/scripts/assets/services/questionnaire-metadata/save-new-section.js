
import getMetadata from './get-metadata';


export default function saveNewQuestionnaire(qid, sectionid, title, order) {
    const questionnaire = getMetadata(qid);

    questionnaire.sections.push({
        title,
        sectionid: sectionid.toString(),
        order,
        questions: []
    });


    return questionnaire;
}
