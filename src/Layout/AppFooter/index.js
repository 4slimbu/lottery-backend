import React, {Fragment} from 'react';

class AppFooter extends React.Component {
    render() {


        return (
            <Fragment>
                <div className="app-footer">
                    <div className="app-footer__inner">
                        <div className="app-footer-left">
                        </div>
                        <div className="app-footer-right">
                            © 2019 Bitlot. All rights reserved.
                        </div>
                    </div>
                </div>
            </Fragment>
        )}
}

export default AppFooter;