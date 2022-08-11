// const readline = require('readline').createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   });
  
//   readline.question(`What's your name?`, name => {
//     console.log(`Hi ${name}!`);
//     readline.close();
//   });

const inquirer = require('inquirer');

const questions = [
  {
    type: 'input',
    name: 'name',
    message: "What's your name?",
  },
  {
  type: 'input',
  name: 'cough',
  message: "Do you have cough? (y/n)",
  },
  {
  type: 'input',
  name: 'fever',
  message: "Do you have fever? (y/n)",
  },
  {
  type: 'input',
  name: 'weakness',
  message: "Do you have weakness? (y/n)",
  }
];

inquirer.prompt(questions).then(answers => {
//   console.log(answers);
  let test = [];
  let res;
  for(let ans in answers){
    if (answers.hasOwnProperty(ans)) {
        // console.log(answers[ans]);
        if(answers[ans]==='y'){
            // console.log('true');
            test.push(answers[ans]);
        }
      }
      if(test.length>2){
          res='POSITIVE'
      }
      else{
          res='NEGATIVE'
      };
  }
  console.log(`Hi ${answers.name}! Covid test result : ${res}`);
});