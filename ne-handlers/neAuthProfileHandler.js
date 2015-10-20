if (process.env.NE_AUTO) {
    var React = require(process.env.NE_AUTO).react
}
else {
    var React = require("react")
}

var meta = {
    path: "/profile",
    title: "Profile Page",
    description: "User profile page",
    nerbArray: [
        {
            nerbName: 'users',
            pathFunction: function (meta) {
                path = process.env.ROOTURL + "/data/users" + "/" + meta.claims.user +"?token="+ meta.token;
                return path
            },
        }
    ]
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
                    <li><a href="/auth/logout">Logout</a></li>
                </ul>
        }
        else {
            adminnav =
                <ul>
                    <li><a href="/login">Login</a></li>
                </ul>
        }

        if(self.props.meta.query.message){
            var message = self.props.meta.query.message
        }
        else{
            var message = ""
        }

        console.log(self.props);
        console.log(self.props.data.users);

        var profile;
        if (self.props.meta.claims && self.props.meta.claims.displayName){

            var linkToUser = "/admin/users/" + self.props.meta.claims.user;
            var greating = "Welcome " + self.props.meta.claims.displayName;
            profile = (
                <div>
                    <p>{greating}</p>
                    <p><a href={linkToUser}>Edit profile</a><br/></p>
                    <p><a href="/auth/logout">Logout</a></p>
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

            <div className="ne-row-70">

                <div className="ne-ccol-3s">
                </div>
                <div className="ne-ccol-3s">
                    <h2 id="main-title">Profile Page</h2>
                    {adminnav}
                    {profile}
                    {message}
                </div>
                <div className="ne-ccol-3s">
                </div>


            </div>

            </body>
        )
    }
});

exports.handler = handler;
exports.meta = meta;