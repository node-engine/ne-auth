var React = require('react');

var meta = {
    path: "/signup",
    title: "Signup",
    description: "Signup page"
};

var handler = React.createClass({

    render: function() {
        var self = this;

        console.log(self.props);

        return (
            <body>
            <h2 id="main-title">This is the Signup Page</h2>

            <form action="/auth/local/signup" method="post">
                <div>
                    <label>Email: (required)</label>
                    <input type="text" name="email"/>
                </div>
                <div>
                    <label>Password: (required)</label>
                    <input type="password" name="password"/>
                </div>
                <div>
                    <input type="submit" value="Signup"/>
                </div>
            </form>

            <a href="/auth/facebook" ><span></span> Facebook</a>

            <p>Already have an account? <a href="/login">Login</a></p>

            </body>
        )
    }
});

exports.handler = handler;
exports.meta = meta;