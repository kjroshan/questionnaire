import find from 'lodash/find';
import getResponses from './questionnaire-responses.js';
import getResponseTemplate from './get-response-template';

export default function getResponseDocument(qid, documentid) {
    const responses = getResponses();
    let responseDocument = null;
    if (documentid) {
        responseDocument = find(responses, { documentid: +documentid });
    }

    if (!responseDocument) {
        responseDocument = getResponseTemplate(qid);
    }
    return responseDocument;
}
