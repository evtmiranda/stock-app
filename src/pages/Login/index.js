/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { Form, Field } from 'react-final-form'
import Typography from '@material-ui/core/Typography';
import { TextField } from 'final-form-material-ui';
import { userService } from '../../services'
import { MODULES } from '../../config/constants'
import { storage } from '../../utils'
import './styles.css'

export class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            loginMessageProps: {}
        }
    }

    render() {
        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

        const onSubmit = async values => {
            this.setState({ loading: true })

            await sleep(300)

            const { username, password } = values;

            try {
                const authenticated = await userService.authenticate(username, password)

                if (authenticated) {
                    const user = storage.get('user');
                    const modules = [...new Set(user.profile.permissions.map(p => p.moduleId)), 0]

                    const moduleName = MODULES[Math.min(...modules.filter(p => p > 0))]

                    this.props.history.push(moduleName);
                } else {
                    this.setState({
                        loading: false,
                        loginMessageProps: {
                            children: "Ops, não foi possível realizar o login, verifique se os dados estão corretos.",
                            paragraph: true,
                            color: "error"
                        }
                    })
                }
            } catch (error) {
                this.setState({ loading: false })
            }
        }

        const clearLoginMessage = () => this.setState({ loginMessageProps: {} })

        return (
            <div id="main-login">
                <React.Fragment>
                    <Form
                        onSubmit={onSubmit}
                        validate={values => {
                            const errors = {}
                            if (!values.username) {
                                errors.username = "Este campo é obrigatório"
                            }
                            if (!values.password) {
                                errors.password = "Este campo é obrigatório"
                            }
                            return errors
                        }}
                        initialValues={{}}
                        render={({ handleSubmit }) => (
                            <form
                                onSubmit={handleSubmit}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <img id="logo" alt="logo" src="./itibanTransparente.png" />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            name="username"
                                            label="Digite o login"
                                            component={TextField}
                                            type="text"
                                            autoComplete="off"
                                            variant="outlined"
                                            onClick={clearLoginMessage}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            name="password"
                                            label="Digite a senha"
                                            component={TextField}
                                            type="password"
                                            autoComplete="off"
                                            variant="outlined"
                                            onClick={clearLoginMessage}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography
                                            {...this.state.loginMessageProps}
                                        >
                                            {this.state.loginMessageProps.children}
                                        </Typography>
                                        {this.state.loading ? (
                                            <CircularProgress></CircularProgress>
                                        ) : (
                                                <Button variant="contained" color="primary" type="submit">
                                                    Acessar minha conta
                                                </Button>
                                            )}
                                    </Grid>
                                </Grid>
                            </form>
                        )} />
                </React.Fragment>
            </div>
        );
    }
}