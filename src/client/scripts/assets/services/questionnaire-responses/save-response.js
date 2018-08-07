import findIndex from 'lodash/findIndex';
import getResponses from './questionnaire-responses';

export default function saveResponseDocument(responseDocument) {
    const responses = getResponses();
    const index = findIndex(responses, { documentid: responseDocument.documentid });

    if (index < 0) {
        responses.push(responseDocument);
    } else {
        responses.splice(index, 1, responseDocument);
    }

    return responses;
}
