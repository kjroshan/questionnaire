import getMetadataDocument from './questionnaire-metadata';


export default function saveNewQuestionnaire(title, qid) {
    const metadata = getMetadataDocument();


    metadata.push({
        title,
        qid: qid.toString(),
        sections: []
    });


    return metadata;
}
