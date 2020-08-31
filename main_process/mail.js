var mailer = require('nodemailer');
const path = require("path");
var acc = require(path.join(__dirname, "../package.json")).mail_acc

var option = {
  service: 'gmail',
  auth: {
    user: acc.user,
    pass: acc.pass
  }
}
var transporter = mailer.createTransport(option);

//kiem tra ket noi
transporter.verify(function (err, success) {
  if (err)
    console.log(err);
  else
    console.log("mail verify");
})


function getTask(tasks) {
  var mailContent;
  let plan = `1. Plan:`;
  let actual = `2. Actual:`;
  let issue = `3. Issue:`;
  let nextPlan = `4. Next plan:`;
  tasks.forEach(e => {
    const { task, process } = e;
    plan += `
    - ${task}`;
    switch (process) {
      case 1: case 2:
        nextPlan += `
    - ${task}`;
        break;
      case 3:
        actual += `
    - ${task}: 100%`;
        break;
    }
  });
  mailContent = `
  ${plan}
  ${actual}
  ${issue}
  ${nextPlan}
  `;
  return mailContent;
}

module.exports = {
  getContent: (tasks) => {
    return getTask(tasks);
  },
  sendMail: (option) => {
    transporter.sendMail(option, function (err, info) {
      if (err)
        console.log(err);
      else {
        console.log("Sending successfully: " + info.response);
      }
    });
  }
}