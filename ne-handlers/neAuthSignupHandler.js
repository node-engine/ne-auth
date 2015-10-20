var neAuto;
if(process.env.NE_AUTO){
    neAuto = process.env.NE_AUTO
}
else {
    neAuto = "ne-auto-off"
}

var React = require(neAuto).react || require('react');

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

            <div className="ne-row-70">

                <div className="ne-ccol-3s">
                </div>

                <div className="ne-ccol-3s">
                    <h2 id="main-title">Signup Page</h2>

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