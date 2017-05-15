'use strict';

module.exports = function (app) {
    var MongoDB = app.dataSources.MongoDB;

    MongoDB.automigrate('SchoolUser', function (err) {
        if (err) throw (err);
        var SchoolUser = app.models.SchoolUser;

        SchoolUser.create([
         { username: 'Admin', email: 'admin@admin.com', password: '12345' },
         { username: 'Kamil', email: 'kamil@g.pl', password: '12345' }
        ], function (err, users) {
            if (err) throw (err);
            var Role = app.models.Role;
            var RoleMapping = app.models.RoleMapping;

            Role.find({ name: 'admin' }, function (err, results) {
                if (err) { /* handle this! */ }

                //create the admin role
                if (results.length < 1) {
                    Role.create({
                        name: 'admin'
                    }, function (err, role) {
                        if (err) throw (err);
                        //make admin
                        role.principals.create({
                            principalType: RoleMapping.USER,
                            principalId: users[0].id
                        }, function (err, principal) {
                            if (err) throw (err);
                        });
                    });

                }


            })
        })
    })
};