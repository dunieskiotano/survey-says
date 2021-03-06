
export const prepNewSurvey = (rawSurvey: [], userId: number): {} => {
  let parsedSurvey = {};
  let questionObject = { questionText: '', type: '' };
  let parsedQuestions: [any] = [0];
  let choiceObject = { answerText: '' };
  let parsedChoices: [any] = [0];
  let today = new Date();
  let closeDate: Date = new Date();
  parsedChoices.pop();
  parsedQuestions.pop();

  // As of now you will need to fill out all questions in order for the values to be added correctly

  closeDate.setDate(closeDate.getDate() + 36);
  let todayfullDate = `${today.getFullYear()}-${(today.getMonth()).toString().padStart(2, '0')}-${(today.getDate() + 29).toString().padStart(2, '0')}`;
  let defaultCloseDate = `${closeDate.getFullYear()}-${(closeDate.getMonth()).toString().padStart(2, '0')}-${(closeDate.getDate()).toString().padStart(2, '0')}`;
  let questionCount = 0;
  let questionObjCount = 0;
  /* 
   questionObject[item['name']] = item['value']
   parsedQuestions.push(questionObject);
  */
  /* 
   case 'questionTypes':
   case 'questionText':
     parsedQuestions[item['name'] + questionCount++] = item['value'];
     break;
      */
  /* 
       if (questionObjCount >= 2) {
        let temp = JSON.parse(JSON.stringify(questionObject));
        questionObjCount = 0;
        console.log('The question object to be pushed into the array is ', questionObject)
        parsedQuestions.push(temp);
      } else {
        questionObject[item['name']] = item['value'];
        questionObjCount++;
      }
       */
  rawSurvey.forEach(item => {
    if (item['value']) {
      switch (item['name']) {
        case 'title':
        case 'description':
        case 'privacy':
          parsedSurvey[item['name']] = item['value'];
          break;
        case 'type':
        case 'questionText':
          if (questionObjCount < 2) {
            questionObject[item['name']] = item['value'];
            questionObjCount++;
            if (questionObjCount >= 2) {
              let temp = JSON.parse(JSON.stringify(questionObject));
              questionObjCount = 0;
              console.log('The question object to be pushed into the array is ', questionObject)
              parsedQuestions.push(temp);
            }
          }
          break;
        case 'answerText':
          choiceObject[item['name']] = item['value'];
          parsedChoices.push(JSON.parse(JSON.stringify(choiceObject)));
        default:
          break;
      }
      console.log("The item is ", item['value']);

    }
  });

  parsedSurvey['dateCreated'] = todayfullDate;
  parsedSurvey['closingDate'] = defaultCloseDate;
  parsedSurvey['privacy'] = parseInt(parsedSurvey['privacy']);
  console.log("The survey element returning: ", parsedSurvey);
  console.log("The question element returning: ", parsedQuestions);
  console.log("The choice element returning: ", parsedChoices);
  return [parsedSurvey, parsedQuestions, parsedChoices];
}
