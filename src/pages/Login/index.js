import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Form, Field } from 'react-final-form'
import Typography from '@material-ui/core/Typography';
import { TextField } from 'final-form-material-ui';
import { userService } from '../../services'
import './styles.css'

export class Login extends Component {
    state = {
        loginMessageProps: {}
    }

    render() {
        // eslint-disable-next-line no-undef
        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

        const onSubmit = async values => {
            await sleep(300)

            const { username, password } = values;

            const authenticated = await userService.authenticate(username, password)

            if (authenticated) {
                // eslint-disable-next-line react/prop-types
                this.props.history.push("stock");
            } else {
                this.setState({
                    loginMessageProps: {
                        children: "Ops, não foi possível realizar o login, verifique se os dados estão corretos.",
                        paragraph: true,
                        color: "error"
                    }
                })
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
                                        <h1 className="title">ITIBAN</h1>
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
                                        <Button variant="contained" color="primary" type="submit">
                                            Acessar minha conta
                                    </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        )} />
                </React.Fragment>
            </div>
        );
    }
}