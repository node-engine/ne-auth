if (process.env.NE_AUTO) {
    var React = require(process.env.NE_AUTO).react
}
else {
    var React = require("react")
}

var meta = {
    path: "/login",
    title: "Login",
    description: "Login page"
};

var handler = React.createClass({

    render: function() {
        var self = this;

        console.log(self.props);

        if(self.props.meta.query.message){
            var message = self.props.meta.query.message
        }
        else{
            var message = "Please Login"
        }

        return (
            <body>
            <div className="ne-row-70">

                <div className="ne-ccol-3s">
                </div>

                <div className="ne-ccol-3s">

                    <h2 id="main-title">Login Page</h2>

                    {message}

                    <form action="/auth/local/login" method="post">
                        <div>
                            <label>Email:</label>
                            <input type="text" name="email"/>
                        </div>
                        <div>
                            <label>Password:</label>
                            <input type="password" name="password"/>
                        </div>
                        <div>
                            <input type="submit" value="Log In"/>
                        </div>
                    </form>

                    <a href="/auth/facebook" ><span></span> Facebook</a>

                    <p>Dont have an account yet? <a href="/signup">Signup</a></p>

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