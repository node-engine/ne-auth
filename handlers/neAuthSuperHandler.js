var React = require('react');

var meta = {
    path: "/super",
    title: "Super Admin Page",
    description: "Use the super admin key to create admin tokens and assign them to users",
    neDataBefore: 2,
    nedb1: {
        pathFunction: function (meta) {

            console.log(meta);

            if(meta.query){
                if(meta.query.super_token){
                    var path = process.env.ROOTURL + "/admin/api/tokens/admin" + "?access_token=" + meta.query.super_token;
                }
                else{
                    var path = process.env.ROOTURL + "/admin/api/tokens/admin";
                }
            }
            else {
                var path = process.env.ROOTURL + "/admin/api/tokens/admin"
            }


            return path
        },
    },
    nedb2: {
        pathFunction: function (meta) {

            console.log(meta);

            if(meta.query){
                if(meta.query.admin_token){
                    var path = process.env.ROOTURL + "/admin/api/users" + "?access_token=" + meta.query.admin_token;
                }
                else{
                    var path = process.env.ROOTURL + "/admin/api/users";
                }
            }
            else {
                var path = process.env.ROOTURL + "/admin/api/tokens/admin"
            }


            return path
        },
    }
};

var handler = React.createClass({

    render: function() {
        var self = this;

        console.log(self.props);

        if(self.props.body) {
            console.log('self.props.body------------------------------------------');
            console.log(self.props.body);
        }

        if(self.props.session){
            console.log('self.props.session------------------------------------------');
            console.log(self.props.session);
        }

        var message;
        if (self.props.user){
            message = "You are logged in as: "
        }
        else {
            message = "Please login"
        }

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

        var adminTokens;
        var users;

        adminTokens = self.props.data.nedb1.map(function (adminToken, index){
            return (
                <div key={index} style={{background:'black',color:'white', margin:'20px',padding:'20px'}}>
                        <label>Token:</label> <br/>
                        {adminToken.token} <br/>
                        <label>TokenId:</label> <br/>
                        {adminToken._id} <br/>
                        <label>User with this token:</label> <br/>
                        {adminToken.user}<br/>
                </div>
            )
        });

        users = self.props.data.nedb2.map(function (user, index){
            var flatUser = flattenObject(user);
            var userProperties = [];
            Object.getOwnPropertyNames(flatUser).forEach(function (val, idx, array) {

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


            })
            return (
                <div key={index} style={{background:'grey',color:'black', margin:'20px',padding:'20px'}}>
                    {userProperties}
                </div>
            )
        });



        return (
            <body>
                <h2 id="main-title">Admin token assign</h2>

                <form action="/admin/api/tokens/admin/touser" method="post">
                    <label>Assign token to differnt user:</label> <br/>
                    <input type="text" placeholder="TokenId here" name="tokenId"/>
                    <input type="text" placeholder="UserId here" name="userId"/>
                    <input type="text" placeholder="Super Token" name="access_token"/>
                    <input type="submit" value="Submit"/>
                </form>

                {message}

                <h3>Admin Tokens</h3>

                {adminTokens}

                <h3>Users</h3>

                {users}

                <form action="/super" method="post">
                    <div>
                        <label>neSuper Token:</label>
                        <input type="text" name="super_token"/>
                    </div>
                    <div>
                        <label>neAdmin Token:</label>
                        <input type="text" placeholder="user.tokens.neAdmin.token" name="admin_token"/>
                    </div>
                    <div>
                        <input type="submit" value="Submit"/>
                    </div>
                </form>

            </body>
        )
    }
});

exports.handler = handler;
exports.meta = meta;