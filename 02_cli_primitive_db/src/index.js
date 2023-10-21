import inquirer from 'inquirer';
import { mainQuestions, searchQuestion } from './questions.js';
import { addUser, getUsers, searchUser } from './utils/file_system.js';

const start = () => {
  inquirer.prompt(mainQuestions).then(async (answers) => {
    if (answers.name) {
      await addUser({
        name: answers.name,
        gender: answers.gender,
        age: answers.age || undefined,
      });
      start();
    }
    if (answers.isSearch) {
      console.log(await getUsers());
      inquirer.prompt(searchQuestion).then(async (answer) => {
        const user = await searchUser(answer.searchInput);
        const message = user
          ? `${user.name} was found.\n` + JSON.stringify(user)
          : `${answer.searchInput} wasn\'t found.`;
        console.log(message);
      });
    }
  });
}

console.clear();
start();
