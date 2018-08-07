import find from 'lodash/find';
import getMetadataDocument from './questionnaire-metadata';


export default function getMetadata(qid) {
    const metadata = getMetadataDocument();
    const questionnaire = find(metadata, { qid });
    return questionnaire;
}
