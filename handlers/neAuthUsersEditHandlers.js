var React = require('react');

var meta = {
    path: "/admin/users/:_id",
    title: "Edit User",
    description: "Editing user",
    neDataBefore: 1,
    nedb1: {
        pathFunction: function (meta) {
            path = process.env.ROOTURL + "/api/users/" + meta.params._id + "?token="+ meta.token;
            return path
        }
    }
};

var handler = React.createClass({

    render: function() {
        var self = this;
        console.log(self.props);

        if(self.props.data && self.props.data.nedb1 && self.props.data.nedb1.detail){

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

            var detail;
            detail = self.props.data.nedb1.detail.map(function (user, index){
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
                        <h3>Detail</h3>
                        {userProperties}
                    </div>
                )
            });
        }

        /*
         <p>{self.props.data.nedb1.profile.phone}</p>


         */


        return (
            <body>
            <h2 id="main-title">This is the User Edit Handler</h2>
            <div style={{background:'grey',color:'black', margin:'20px',padding:'20px'}}>
                <h3>Name</h3>
                <p>{self.props.data.nedb1[0].profile.name.displayName}</p>
                <p>{self.props.data.nedb1[0].profile.name.nameFirst}</p>
                <p>{self.props.data.nedb1[0].profile.name.nameLast}</p>
            </div>
            <div style={{background:'grey',color:'black', margin:'20px',padding:'20px'}}>
                <h3>Contact Details</h3>
                <h4>Emails</h4>
                <ul>
                    <p>
                        {
                            self.props.data.nedb1[0].profile.emails.map(function (email, index){
                                return (
                                    <li key={index}><p>{email}</p></li>
                                )
                            })
                        }
                    </p>
                </ul>
                <h4>Phones</h4>
                <ul>
                    {
                        self.props.data.nedb1[0].profile.phones.map(function (phone, index){
                            return (
                                <li><p>{phone}</p></li>
                            )
                        })
                    }
                </ul>
            </div>
            <div style={{background:'grey',color:'black', margin:'20px',padding:'20px'}}>
                <h3>Connected Services</h3>
                <div>
                    <h4>Local</h4>
                    <form action="/auth/local/change/email" method="post">
                        <label>Email</label><br/>
                        <input type="hidden" name="_id" value={self.props.meta.claims.user} readOnly />
                        <input type="text" name="email" placeholder={self.props.data.nedb1[0].local.email}/><br/>
                        <input type="submit" value="Change Login Email"/>
                    </form>
                    <br/>
                    <form action="/auth/local/change/password" method="post">
                        <input type="hidden" name="_id" value={self.props.meta.claims.user} readOnly />
                        <label>Old Password</label><br/>
                        <input type="password" name="oldpassword" placeholder={self.props.data.nedb1[0].local.password}/><br/>
                        <label>New Password</label><br/>
                        <input type="password" name="password" placeholder={self.props.data.nedb1[0].local.password}/><br/>
                        <input type="submit" value="Change Password"/>
                    </form>
                </div>
                <div>
                    <h4>Facebook</h4>
                    <label>Id:</label><br/>
                    <label>{self.props.data.nedb1[0].facebook.id}</label><br/>
                    <label>Token:</label><br/>
                    <label>{self.props.data.nedb1[0].facebook.token}</label><br/>
                </div>
            </div>
            <div style={{background:'grey',color:'black', margin:'20px',padding:'20px'}}>
                <h3>Edit Log</h3>
                <ul>
                    {
                        self.props.data.nedb1[0].log.map(function (log, index){
                            return (
                                <li key={index}><p>{log.timeStamp} :<br/> {log.description}<hr/></p></li>
                            )
                        })
                    }
                </ul>
            </div>
            {self.props.data.nedb1.detail && {detail}}
            </body>
        )
    }
});

exports.handler = handler;
exports.meta = meta;
