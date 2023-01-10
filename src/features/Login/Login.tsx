import React from 'react'
import {AppRootStateType, useAppDispatch} from "../../redux-store/store";
import {useSelector} from "react-redux";
import {useFormik} from "formik";
import style from './login.module.css'
import {
    Box, Container,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    Paper,
    TextField,
} from "@mui/material";
import {loginTC} from "../../redux-store/reducers/authReducer";
import {Navigate} from 'react-router-dom';
import SuperButton from "../../common/SuperButton/SuperButton";
import SuperCheckbox from "../../common/SuperCheckbox/SuperCheckbox";
import SuperInputText from "../../common/SuperInputText/SuperInputText";

export type FormikErrorType = {
    email?: string,
    password?: string,
    rememberMe?: boolean
}

export const Login = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const formik = useFormik({
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length < 4) {
                errors.password = 'Should be more symbols'
            }
            return errors
        },
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm()//зачистить поле
        },
    })

    if (isLoggedIn) {
        return <Navigate to={'/profile'}/>
    }

    return (
        <Grid container className={style.loginBlock}>
            <Grid item  className={style.formContainer} >
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            <h2 className={style.name}>Sign in</h2>
                        </FormLabel>
                        <FormGroup>
                            <TextField
                                label="email"
                                margin="normal"
                                {...formik.getFieldProps('email')}//props
                            />
                            {formik.touched.email && formik.errors.email &&
                                <div style={{color: 'red'}}>{formik.errors.email}</div>} {/*ошибка*/}
                            <TextField
                                type="password"
                                label="Password"
                                margin="normal"
                                {...formik.getFieldProps('password')}
                            />
                            {formik.touched.password && formik.errors.password &&
                                <div style={{color: 'red'}}>{formik.errors.password}</div>}
                            <FormControlLabel
                                label={'Remember me'}
                                control={<SuperCheckbox
                                    {...formik.getFieldProps('rememberMe')}
                                    checked={formik.values.rememberMe}//меняем на зачищенное поле
                                />}
                            />
                            <p style={{display:'flex',justifyContent:'flex-end'}}>
                                <a href={'http://localhost:3001/it-incubator-friday-project/register'}
                                   target={'_blank'}> Forgot Password?
                                </a>
                            </p>
                            <SuperButton type={'submit'} color={'primary'} className={style.button}>
                                Sign in
                            </SuperButton>
                            <a>Already have an account?</a>
                            <a href={'http://localhost:3001/it-incubator-friday-project/register'}
                               target={'_blank'}> Sign Up
                            </a>

                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    )
}


export default Login
