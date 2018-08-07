import pick from 'lodash/pick';
import getMetadataDocument from './questionnaire-metadata';


export default function getQuestionnaires() {
    const metadata = getMetadataDocument();
    return metadata.map((questionnaire) => {
        return pick(questionnaire, ['qid', 'title']);
    });
}
