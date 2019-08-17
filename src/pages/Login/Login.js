import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Form, Field } from 'react-final-form'
import { TextField } from 'final-form-material-ui';
import './styles.css'

class Login extends Component {
    render() {
        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

        const onSubmit = async values => {
            await sleep(300)
            this.props.history.push("home");
        }

        return (
            <div id="main-login">
                <React.Fragment>
                    <Form
                        onSubmit={onSubmit}
                        initialValues={{}}
                        render={({ handleSubmit, form, submitting, pristine, values }) => (
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <h1 className="title">ITIBAN</h1>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            name="login"
                                            label="Digite o login"
                                            component={TextField}
                                            type="text"
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            name="password"
                                            label="Digite a senha"
                                            component={TextField}
                                            type="password"
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
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

export default Login;