export const mainQuestions = [
  {
    name: 'name',
    message: 'Enter the user\'s name. To cancel press ENTER:',
    type: 'input',
  }, {
    name: 'gender',
    message: 'Choose your gender.',
    type: 'list',
    choices: ['male', 'female'],
    when: (answers) => answers.name.trim(),
  }, {
    name: 'age',
    message: 'Enter your age:',
    type: 'input',
    when: (answers) => answers.name.trim(),
  }, {
    name: 'isSearch',
    message: 'Would you like to search users by name in DB?',
    type: 'confirm',
    when: (answers) => !answers.name.trim(),
  },
]

export const searchQuestion = {
  name: 'searchInput',
  message: 'Enter user\'s name you want to find in DB:',
  type: 'input',
}
