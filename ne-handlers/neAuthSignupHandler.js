var React = require('react');

var meta = {
    path: "/signup",
    title: "Signup",
    description: "Signup page",
    css: ["/neAuthStyle.css", "/ne-style/ne-css/neStyleFontAwesome.css"]
};

var handler = React.createClass({

    render: function() {
        var self = this;

        return (
            <body>
                <div className="ne-row-70">
                    <div className="ne-ccol-3s">
                    </div>

                    <div className="ne-ccol-3s">
                        <h2 id="main-title">Signup Page</h2>

                        <div className="login-form">
                            <form action="/auth/local/signup" method="post">
                                <div>
                                    <label>Email: (required)</label>
                                    <input type="text" name="email"/>
                                </div>
                                <br/>
                                <div>
                                    <label>Password: (required)</label>
                                    <input type="password" name="password"/>
                                </div>
                                <br/>
                                <div>
                                    <input type="submit" value="Signup"/>
                                </div>
                            </form>
                        </div>

                        <div className="login-facebook">
                            <a href="/auth/facebook">  Login/Signup with Facebook<br/><br/> <i className="fa fa-facebook-square"></i> Facebook</a>
                        </div>

                        <div className="login-signup">
                            <a href="/login"> Already have an account? <br/><br/>  <i className="fa fa-sign-in"></i>Login</a>
                        </div>
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