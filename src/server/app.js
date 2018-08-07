import express from 'express';
// import { INTERNAL_SERVER_ERROR, BAD_REQUEST } from 'http-status';
import { json } from 'body-parser';
import morgan from 'morgan';
// import { Questionnaire } from "./public/scripts/models";
// import { User } from "./public/scripts/models";

const app = express();


const port = process.env.EXPRESS_PORT || 3000;

app.set('view engine', 'ejs');

app.use(json());

app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'));

// require('./public/scripts/auth')(Questionnaire,app); //For Facebook authentication
// require('./public/scripts/httpAuth')(User, Questionnaire,app); //For Http authentication
// require('./public/scripts/googleAuth')(Questionnaire,app); //For Http authentication

app.use('/', express.static(`${__dirname}/public`));

// app.get('/api/currentUserDoc', function(req, res) {
//     //Questionnaire.findOne({ userName: req.query.userName }, function(error, questionnaire) {
//     Questionnaire.findOne({ 'profile.email': req.user.email}, function(error, questionnaire) {
//         if (error) {
//             return res.status(INTERNAL_SERVER_ERROR).json({ error: error.toString() });
//         }

//         if (!questionnaire) {
//             questionnaire = new Questionnaire({
//                 'profile.oauth': req.user.oauth,
//                 'profile.email': req.user.email,
//                 'profile.picture': req.user.picture
//             });

//             questionnaire.save(function(error) {
//                 if (error) {
//                     return res.status(INTERNAL_SERVER_ERROR).json({ error: error.toString() });
//                 }
//             });
//             //return res.status(status.NOT_FOUND).json({ error: 'Not Found' });
//         }

//         return res.json(questionnaire);
//     });
// });

// app.get('/api/questionnaireStructure', function(req, res) {
//     return res.json(require('./public/scripts/questionnaireStructure'));
// });

// app.get('/api/allQuestionnaires/:page',function(req,res){
//     if(!req.params.page)
//     {
//         const page = 1;
//     }else{
//         const page = req.params.page;
//     }
//     const per_page =10;

//     Questionnaire.find().sort('profile.email').skip((page-1)*per_page).limit(per_page).exec(function(err, questionnaires) {
//         if (err) {
//             return res.status(400).json({ error: error.toString() });
//         } else {
//             res.json(questionnaires);
//         }
//     });
// });

// app.put('/api/questionnaire', function(req, res) {
//     try {
//         const questionnaire = req.body.questionnaire;
//     } catch (e) {
//         return res.
//             status(BAD_REQUEST).
//             json({ error: 'No questionnaire provided!' });
//     }
//     Questionnaire.update({'profile.email':questionnaire.profile.email},questionnaire,{multi: false},function(error, numUpdated) {
//         if (error) {
//             return res.
//                 status(INTERNAL_SERVER_ERROR).
//                 json({ error: error.toString() });
//         }
//         return res.json(questionnaire);
//     });
// });

app.listen(port);
