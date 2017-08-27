import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {makeAction} from '../redux/actions/makeAction';
import * as actionTypes from '../redux/actions/actionTypes';
import _ from 'lodash';
import {isValidEmail} from '../services/validation';

const DashboardContent = ({sendToApi, changeEmailValue, emailAddress, addEmail, removeEmail, changeFirstName, firstName, changeLastName, lastName}) => (
        <form className="container">
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">First name</label>
                <input className="form-control" id="exampleInputPassword1" defaultValue={firstName}
                       placeholder="First name"
                       onBlur={(event) => changeFirstName(event.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword2">Last name</label>
                <input className="form-control" id="exampleInputPassword2" defaultValue={lastName}
                       placeholder="Last name"
                       onBlur={(event) => changeLastName(event.target.value)}
                />
            </div>
            <div className="row">
                <div className="col-xs-1" onClick={() => addEmail({id: _.uniqueId('email_'), email: ''})}>
                    <button id="buttonAdd" type="button" className="btn btn-default">
                        <i className="fa fa-plus"/> ADD
                    </button>
                </div>
            </div>
            {(emailAddress || []).map((email, key) =>
                <div key={key} className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address:</label>
                    <div className="row">
                        <div className="col-xs-11">
                            <input type="email" className="form-control" id="exampleInputEmail1"
                                   aria-describedby="emailHelp" placeholder="Enter email"
                                   defaultValue={email.email}
                                   onBlur={(event) => {
                                       isValidEmail(event.target.value) &&
                                       changeEmailValue({id: email.id, email: event.target.value})}
                                   }
                            />
                        </div>
                        <div className="col-xs-1" onClick={() => removeEmail(email.id)}>
                            <button id="buttonAdd" type="button" className="btn btn-default">
                                <i className="fa fa-minus"/> REMOVE
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className="form-group">
                <button type="button" className="btn btn-default pull-right m-t-5 m-b-5"
                        onClick={() => sendToApi({
                            name: firstName,
                            lastName: lastName,
                            emails: emailAddress,
                        })}
                >
                    <i className="fa fa-check"/> SAVE
                </button>
            </div>
        </form>
    );

DashboardContent.propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    emailAddress: PropTypes.array.isRequired,
    addEmail: PropTypes.func.isRequired,
    removeEmail: PropTypes.func.isRequired,
    sendToApi: PropTypes.func.isRequired,
    changeFirstName: PropTypes.func.isRequired,
    changeLastName: PropTypes.func.isRequired,
    changeEmailValue: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    firstName: state.dashboard.firstName,
    lastName: state.dashboard.lastName,
    emailAddress: state.dashboard.emailAddress,
});

const mapDispatchToProps = {
    addEmail: makeAction(actionTypes.ADD_EMAIL),
    removeEmail: makeAction(actionTypes.REMOVE_EMAIL),
    sendToApi: makeAction(actionTypes.SEND_TO_API),
    changeFirstName: makeAction(actionTypes.CHANGE_FIRST_NAME),
    changeLastName: makeAction(actionTypes.CHANGE_LAST_NAME),
    changeEmailValue: makeAction(actionTypes.CHANGE_EMAIL),
};

export default  connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardContent);
