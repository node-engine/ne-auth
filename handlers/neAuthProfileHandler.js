var React = require('react');

var meta = {
    path: "/profile",
    title: "Profile Page",
    description: "User profile page",
    neDataBefore: 1,
    nedb1: {
        pathFunction: function (meta) {
            path = process.env.ROOTURL + "/api/users" + "/" + meta.claims.user +"?token="+ meta.token;
            return path
        },
        cycle: false,
        search: false
    }
};

var handler = React.createClass({

    render: function() {
        var self = this;

        var adminnav;
        if (self.props.meta && self.props.meta.claims && self.props.meta.claims.displayName){
            var text = self.props.meta.claims.displayName;
            adminnav =
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/profile">{text}</a></li>
                    <li><a href="/admin">Admin</a></li>
                    <li><a href="/admin/users">Users</a></li>
                </ul>
        }
        else {
            adminnav =
                <ul>
                    <li><a href="/login">Login</a></li>
                </ul>
        }

        console.log(self.props);
        console.log(self.props.data.nedb1);

        var facebook;
        if (self.props.data && self.props.data.nedb1[0]){
            if(self.props.data.nedb1[0].facebook.active === false){

                facebook = (
                    <div>
                        <h3>Facebook</h3>
                        <p>You are not connected to facebook</p>
                    </div>
                )
            }
            else {
                var facebookId = self.props.data.nedb1[0].facebook.id;
                var facebookToken = self.props.data.nedb1[0].facebook.token;
                facebook = (
                    <div>
                        <h3>Facebook</h3>

                        <p>Id: <br/>{facebookId}</p>

                        <p>Token: <br/>{facebookToken}</p>
                    </div>
                )
            }
        }

        var profile;
        if (self.props.meta.claims && self.props.meta.claims.displayName){
            var greating = "Welcome " + self.props.meta.claims.displayName;
            profile = (
                <div>
                    <p>{greating}</p>
                    {facebook}
                </div>
            )
        }
        else {
            profile = (
                <div>
                    <p>Please login to view your profile page</p>
                </div>
            )
        }
        return (
            <body>
            <h2 id="main-title">This is the Profile Handler</h2>
            {adminnav}
            {profile}

            </body>
        )
    }
});

exports.handler = handler;
exports.meta = meta;