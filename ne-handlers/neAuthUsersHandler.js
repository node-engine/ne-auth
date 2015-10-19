var React = require('react');
var neHandler = require('ne-handler');

var meta = {
    path: "/admin/users",
    title: "Users",
    description: "This is Users page",
    nerbArray: [
        {
            nerbName: 'users',
            pathFunction: function (meta) {
                path = process.env.ROOTURL + "/data/users?token="+ meta.token;
                return path
            }
        }
    ]
};

var handler = React.createClass({

    render: function() {
        var self = this;

        console.log(self.props);

        var users;
        if(self.props.data.users){
            users = self.props.data.users.map((user, index)=>{
                var linkToUser = "/admin/users/" + user._id;
                return (
                    <div key={index}>
                        {user.profile.name.displayName && <p><a href={linkToUser}>{user.profile.name.displayName}</a><br/></p> }
                    </div>
                )
            });
        }

        return (
            <body>
            <h2 id="main-title">Users Handler</h2>

            {neHandler.message(self)}
            {users}

            </body>
        )
    }
});

exports.handler = handler;
exports.meta = meta;