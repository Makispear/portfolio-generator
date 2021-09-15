
const fs = require('fs');
const generatePage = require('./src/page-template');



const inquirer = require('inquirer')

const promptUser = () => {
    return inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'What is your name? (required)',
        validate: nameInput => {
          if (nameInput) {
            return true
          } else {
            console.log('Please Enter Your Name!')
            return false
          }
        }
    }, 
    {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub Username (required)',
        validate: userInput => {
          if (userInput) {
            return true
          } else {
            console.log('Please Enter Your GitHub Username!')
            return false
          }
        }
    },
    {
      type: 'confirm',
      name: 'confirmAbout',
      message: 'Would you like to enter some information about yourself for an "About" section?',
      default: true
    },
    {
        type: 'input',
        name: 'about',
        message: 'Provide some information about yourself:',
        when: ({ confirmAbout }) => {
          if (confirmAbout) {
            return true
          } else {
            return false
          }
        }
    }
    ]);
};



const promptProject = portfolioData => {
    // create one if there isn't any 
    if (!portfolioData.projects) {
        portfolioData.projects = [];
      }
    
    console.log(`
  =================
  Add a New Project
  =================
  `);
    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your project? (required)',
        validate: userInput => {
          if (userInput) {
            return true
          } else {
            console.log('Please Enter Your Project Name!')
            return false
          }
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Provide a description of the project (Required)',
        validate: userInput => {
          if (userInput) {
            return true
          } else {
            console.log('Please Enter A Description!')
            return false
          }
        }
      },
      {
        type: 'checkbox',
        name: 'languages',
        message: 'What did you build this project with? (Check all that apply)',
        choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
      },
      {
        type: 'input',
        name: 'link',
        message: 'Enter the GitHub link to your project. (Required)',
        validate: userInput => {
          if (userInput) {
            return true
          } else {
            console.log('Please Enter Your GitHub Link!')
            return false
          }
        }
      },
      {
        type: 'confirm',
        name: 'feature',
        message: 'Would you like to feature this project?',
        default: false
      },
      {
        type: 'confirm',
        name: 'confirmAddProject',
        message: 'Would you like to enter another project?',
        default: false
      }
    ])
    .then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {
          return promptProject(portfolioData);
        } else {
          return portfolioData;
        }
      });
    
};
  
promptUser()
  .then(promptProject)
  .then(portfolioData => {
  const pageHTML = generatePage(portfolioData);

  fs.writeFile('./dist/index.html', pageHTML, err => {
    if (err) throw err;
    console.log('Page created! Check out index.html in this directory to see it!');
  });
  
  fs.copyFile('./src/style.css', './dist/style.css', err => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Style sheet copied successfully!')});
});
