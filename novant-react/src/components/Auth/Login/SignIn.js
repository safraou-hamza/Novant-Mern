import React, { Component } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';

import AuthService from '../../../services/auth.service';
import Profile from '../../../Profile';
import {
  Router,
  Route,
  Switch,
  Redirect,
  BrowserRouter,
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Button } from '@material-ui/core';
import authService from '../../../services/auth.service';
import Card from '@material-ui/core/Card';
export const history = createBrowserHistory();
const required = (value) => {
  if (!value) {
    return (
      <div className='alert alert-danger' role='alert'>
        This field is required!
      </div>
    );
  }
};

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      email: '',
      password: '',
      loading: false,
      message: '',
    };
  }

  onChangeUsername(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: '',
      loading: true,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.email, this.state.password).then(
        () => {
          history.push('/Home');
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage,
          });
        }
      );
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    return (
      <div className='col-md-12'>
  
       
          

          <Form
            onSubmit={this.handleLogin}
            ref={(c) => {
              this.form = c;
            }}
          >
            <div className='form-group'>
              <label htmlFor='username'>Username</label>
              <Input
                type='email'
                className='form-control'
                name='username'
                value={this.state.email}
                onChange={this.onChangeUsername}
                validations={[required]}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <Input
                type='password'
                className='form-control'
                name='password'
                value={this.state.password}
                onChange={this.onChangePassword}
                validations={[required]}
              />
            </div>

            <div className='form-group'>
              <button
                className='btn btn-primary btn-block'
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className='spinner-border spinner-border-sm'></span>
                )}
                <span>Login</span>
              </button>
            </div>

            {this.state.message && (
              <div className='form-group'>
                <div className='alert alert-danger' role='alert'>
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: 'none' }}
              ref={(c) => {
                this.checkBtn = c;
              }}
            />
          </Form>
       
      
      </div>
    );
  }
}
