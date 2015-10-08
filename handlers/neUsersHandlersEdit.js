var React = require('react');

var meta = {
    path: "/admin/users/:id",
    title: "Edit User",
    description: "Editing user",
    neDataBefore: 1,
    nedb1: {
        pathFunction: function (meta) {
            path = process.env.ROOTURL + "/api/users/" + meta.params.id + "?token="+ meta.token;
            return path
        }
    }
};

var handler = React.createClass({

    render: function() {
        var self = this;
        console.log(self.props);

        var flattenObject = function(ob) {
            var toReturn = {};
            var flatObject;
            for (var i in ob) {
                if (!ob.hasOwnProperty(i)) {
                    continue;
                }
                if ((typeof ob[i]) === 'object') {
                    flatObject = flattenObject(ob[i]);
                    for (var x in flatObject) {
                        if (!flatObject.hasOwnProperty(x)) {
                            continue;
                        }
                        toReturn[i + (!!isNaN() ? '.' + x : '')] = flatObject[x];
                    }
                } else {
                    toReturn[i] = ob[i];
                }
            }
            return toReturn;
        };

        var users;
        users = self.props.data.nedb1.map(function (user, index){
            var flatUser = flattenObject(user);
            var userProperties = [];
            Object.getOwnPropertyNames(flatUser).forEach(function (val, idx, array) {

                if( val.indexOf('log') >= 0){
                    console.log("Skipped " + val)
                }
                else if( val.indexOf('_v') >= 0){
                    console.log("Skipped " + val)
                }
                else{
                    userProperties.push(
                        React.createElement(
                            'p',
                            {
                                id: 'someId',
                                key: idx
                            },
                            val + ' -> ' + flatUser[val]
                        )
                    )
                }


            })
            userProperties.sort()
            return (
                <div key={index} style={{background:'grey',color:'black', margin:'20px',padding:'20px'}}>
                    {userProperties}
                </div>
            )
        });

        return (
            <body>
                <h2 id="main-title">This is the Users Handler</h2>
                {users}
            </body>
        )
    }
});

exports.handler = handler;
exports.meta = meta;