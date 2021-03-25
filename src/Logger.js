const reporter = require('testcafe-reporter-acd-html-reporter')();

const getCurrentDateTime = function (dateSeparator = '/', timeSeparator = ':', dateTimeSeparator = '|--|') {
    const currentdate = new Date();
    
    return currentdate.getDate() + dateSeparator
            + (currentdate.getMonth() + 1) + dateSeparator 
            + currentdate.getFullYear() + dateTimeSeparator
            + currentdate.getHours() + timeSeparator
            + currentdate.getMinutes() + timeSeparator
            + currentdate.getSeconds();
};

const log = function (message, isStep, testcaseName) {
    if(!testcaseName){
      return;
    }
    console.log(`${getCurrentDateTime()} --- ${message}`);
    if (console.isReportUsed) reporter[isStep ? 'addStep' : 'addStepInfo'](message, testcaseName);
};

module.exports = class Logger {

    static step(stepNum, message, testcaseName) {
        stepNum = typeof stepNum === 'number' ? stepNum : `${stepNum[0]}-${stepNum[stepNum.length - 1]}`;
        log(`Step ${stepNum}: ${message}`, true, testcaseName);
    }

    static info (message) {
        log(`INFO --- ${message}`, false);
    }

    static preconditions () {
        log('Preconditions', true);
    }

    static cleanUp () {
        log('Clean up', true);
    }

    static warn (message) {
        log(`WARN --- : ${message}`, false);
        if (console.isReportUsed) reporter.setTestStatus(reporter.testStatuses.broken);
    }
};
