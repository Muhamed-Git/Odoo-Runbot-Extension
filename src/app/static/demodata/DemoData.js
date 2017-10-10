// Data Format
// {
//     key: ,
//     branchName: ,
//     branchType: ,
//     branchUrl: ,
//     gitBranchURL: ,
//     gitCompareURL: ,
//     autoRefresh: ,
//     refreshInterval: ,
//     branches: [{
//       commitURL: ,
//       logURL: ,
//       order: ,
//       runbotLink: ,
//       status: ,
//       statusString: ,
//       logs: {
//         error: 0,
//         warning: 0,
//       }
//     }]
// }

const demoData = {
  Setting: {
    userName: 'Deep',
    clockType: true,
  },
  Branches: {
    'entdev+master-website-sign-qunit-test-case-dep': {
        key: "entdev+master-website-sign-qunit-test-case-dep",
        branchName: "master-website-sign-qunit-test-case-dep",
        branchType: "entdev",
        branchUrl: "http://runbot.odoo.com/runbot/repo/git-github-com-odoo-dev-enterprise-8?search=master-website-sign-qunit-test-case-dep",
        gitBranchURL: "https://github.com/odoo-dev/enterprise/tree/master-website-sign-qunit-test-case-dep",
        gitCompareURL: "https://github.com/odoo-dev/enterprise/compare/master-website-sign-qunit-test-case-dep",
        autoRefresh: false,
        refreshInterval: 10 * 60000,
        branches: [{
          commitURL: "https://github.com/odoo-dev/enterprise/commit/e7ba3451651b9fcc0d0681fa7b514045f7061a30",
          logURL: "http://runbot.odoo.com/runbot/build/262750",
          order: 1,
          runbotLink: "http://262748-1292-e7ba34.runbot14.odoo.com/?db=262750-master-website-sign-qunit-test-c-e7ba34-all",
          status: "danger",
          statusString: "Error",
          logs: {
            error: 5,
            warning: 10,
          }
        },{
          commitURL: "https://github.com/odoo-dev/enterprise/commit/e7ba3451651b9fcc0d0681fa7b514045f7061a30",
          logURL: "http://runbot.odoo.com/runbot/build/262750",
          order: 2,
          runbotLink: "http://262748-1292-e7ba34.runbot14.odoo.com/?db=262750-master-website-sign-qunit-test-c-e7ba34-all",
          status: "danger",
          statusString: "Error",
          logs: {
            error: 5,
            warning: 10,
          }
        }]
    },
    'odoodev+master': {
        key: "odoodev+master",
        branchName: "master",
        branchType: "odoodev",
        branchUrl: "http://runbot.odoo.com/runbot/repo/git-github-com-odoo-dev-enterprise-8?search=master-website-sign-qunit-test-case-dep",
        gitBranchURL: "https://github.com/odoo-dev/enterprise/tree/master-website-sign-qunit-test-case-dep",
        gitCompareURL: "https://github.com/odoo-dev/enterprise/compare/master-website-sign-qunit-test-case-dep",
        autoRefresh: false,
        refreshInterval: 10 * 60000,
        branches: [{
          commitURL: "https://github.com/odoo-dev/enterprise/commit/e7ba3451651b9fcc0d0681fa7b514045f7061a30",
          logURL: "http://runbot.odoo.com/runbot/build/262750",
          order: 1,
          runbotLink: "http://262748-1292-e7ba34.runbot14.odoo.com/?db=262750-master-website-sign-qunit-test-c-e7ba34-all",
          status: "danger",
          statusString: "Error",
          logs: {
            error: 5,
            warning: 10,
          }
        },{
          commitURL: "https://github.com/odoo-dev/enterprise/commit/e7ba3451651b9fcc0d0681fa7b514045f7061a30",
          logURL: "http://runbot.odoo.com/runbot/build/262750",
          order: 2,
          runbotLink: "http://262748-1292-e7ba34.runbot14.odoo.com/?db=262750-master-website-sign-qunit-test-c-e7ba34-all",
          status: "danger",
          statusString: "Error",
          logs: {
            error: 5,
            warning: 10,
          }
        }]
    }
  },
  history: [
    {
      id: 1,
      lastVisitTime: 1507192209134.96,
      title: "ODOO Runbot",
      typedCount: 15,
      url: 'http://runbot.odoo.com/runbot',
      visitCount: 294
    },
    {
      id: 2,
      lastVisitTime: 1507191621037.4329,
      title: "Google Image",
      typedCount: 15,
      url: 'http://google.com',
      visitCount: 294
    },
    {
      id: 3,
      lastVisitTime: 1507184109853.593,
      title: "Google Fonts",
      typedCount: 0,
      url: "https://fonts.google.com/",
      visitCount: 4
    }
  ]
};

export default demoData;
