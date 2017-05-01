const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
    logging: false
});

var Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    urlTitle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    }
}, {
        getterMethods: {
            route: function () {
                return '/wiki/' + this.urlTitle;
            }
        },
        hooks: {
            beforeValidate: function (page, options) {
                if (page.title) {
                    // Removes all non-alphanumeric characters from title
                    // And make whitespace underscore
                    page.urlTitle = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
                } else {
                    // Generates random 5 letter string
                    return Math.random().toString(36).substring(2, 7);
                }

            }
        }
    }
);

var User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {  }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {  }
    }
});

Page.belongsTo(User, { as: 'author' });

module.exports = {
    db: db,
    Page: Page,
    User: User
};
