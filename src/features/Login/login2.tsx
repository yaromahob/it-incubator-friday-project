import {AppRootStateType, useAppDispatch} from "../../App/store";
import {useFormik} from "formik";
import {Navigate, NavLink} from "react-router-dom";
import styles from "../SignUp/SignUp.module.scss";
import SuperInputText from "../../common/SuperInputText/SuperInputText";
import {PasswordContainer} from "../SignUp/PasswordContainer";
import SuperButton from "../../common/SuperButton/SuperButton";
import React from "react";
import {loginTC} from "./loginReducer";
import {useSelector} from "react-redux";
import {FormControl, FormControlLabel} from "@mui/material";
import SuperCheckbox from "../../common/SuperCheckbox/SuperCheckbox";
import Login from "./Login";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?:boolean
}
 const Login2 = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe:false,
        },
        validate: values => {
            const errors: FormikErrorType = {}

            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (values.password.length < 9) {
                errors.password = 'Password should be more 8 letters'
            }

            return errors
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
        <div className={styles.signUp}>
            <h3>Sign in</h3>
            <form onSubmit={formik.handleSubmit}>
                <label className={formik.touched.email && formik.errors.email ? styles.errorField : ''}>
                    Email
                    <SuperInputText type={'text'} {...formik.getFieldProps('email')} />

                    <div className={styles.error}>
                        {formik.touched.email && formik.errors.email && formik.errors.email}
                    </div>

                </label>
                <label
                    className={formik.touched.password && formik.errors.password ? styles.errorField : ''}
                >
                    Password
                    {/*<input type="password" name="password" />*/}
                    <PasswordContainer {...formik.getFieldProps('password')} />
                    <div className={styles.error}>
                        {formik.touched.password && formik.errors.password && formik.errors.password}
                    </div>
                </label>
            <FormControl>
                <FormControlLabel
                    label={'Remember me'}
                    control={<SuperCheckbox
                        {...formik.getFieldProps('rememberMe')}
                        checked={formik.values.rememberMe}//меняем на зачищенное поле
                    />}
                />
                </FormControl>
                <p style={{display:'flex',justifyContent:'flex-end'}}>
                    <NavLink to="/recoveryPassword">Forgot Password?</NavLink>

                </p>
                <div className={styles.sendBtn}>
                    <SuperButton xType={'default'} type="submit">
                        Sign in
                    </SuperButton>
                </div>
            </form>
            <a>Already have an account?</a>
            <NavLink to="/signUp">Sign Up</NavLink>
        </div>
    )
}
export default Login2