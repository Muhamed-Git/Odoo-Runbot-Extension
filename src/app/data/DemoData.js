// Data Format
// {
//     key: ,
//     branchName: ,
//     branchType: ,
//     branchUrl: ,
//     gitBranchURL: ,
//     gitCompareURL: ,
//     branches: [{
//       commitURL: ,
//       logURL: ,
//       order: ,
//       runbotLink: ,
//       status: ,
//       logs: {
//         error: 0,
//         warning: 0,
//       }
//     }]
// }

const demoData = [{
    key: "entdev+master-website-sign-qunit-test-case-dep",
    branchName: "master-website-sign-qunit-test-case-dep",
    branchType: "entdev",
    branchUrl: "http://runbot.odoo.com/runbot/repo/git-github-com-odoo-dev-enterprise-8?search=master-website-sign-qunit-test-case-dep",
    gitBranchURL: "https://github.com/odoo-dev/enterprise/tree/master-website-sign-qunit-test-case-dep",
    gitCompareURL: "https://github.com/odoo-dev/enterprise/compare/master-website-sign-qunit-test-case-dep",
    branches: [{
      commitURL: "https://github.com/odoo-dev/enterprise/commit/e7ba3451651b9fcc0d0681fa7b514045f7061a30",
      logURL: "http://runbot.odoo.com/runbot/build/262750",
      order: 1,
      runbotLink: "http://262748-1292-e7ba34.runbot14.odoo.com/?db=262750-master-website-sign-qunit-test-c-e7ba34-all",
      status: "danger",
      logs: {
        error: 5,
        warning: 10,
      }
    }]
}];

export default demoData;
