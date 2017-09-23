var appData = {
  defaultRefreshInterval: 20*60000,
  runbotURL: 'http://runbot.odoo.com',
  branchInfo: {
    odoodev: {
      string: 'Odoo Dev',
      url: 'http://runbot.odoo.com/runbot/repo/git-github-com-odoo-dev-odoo-2',
      key: 'odoodev'
    },
    odoocommunity: {
      string: 'Odoo',
      url: 'http://runbot.odoo.com/runbot/repo/git-github-com-odoo-odoo-1',
      key: 'odoocommunity'
    },
    odooenterprise: {
      string: 'Enterprise',
      url: 'http://runbot.odoo.com/runbot/repo/git-github-com-odoo-enterprise-7',
      key: 'odooenterprise'
    },
    entdev: {
      string: 'Ent Dev',
      url: 'http://runbot.odoo.com/runbot/repo/git-github-com-odoo-dev-enterprise-8',
      key: 'entdev'
    }
  },
  status: {
    success: {
      string: "Success",
      class: "success",
    },
    info: {
      string: "Testing",
      class: "default",
    },
    default: {
      string: {
        'fa-ban': "Skipped",
        'fa-pause': "Pending"
      },
      class: "default",
    },
    warning: {
      string: "Warning",
      class: "warning",
    },
    danger: {
      string: "Error",
      class: "danger",
    },
    killed: {
      string: "Killed",
      class: "default",
    },
  }
};

export default appData;
