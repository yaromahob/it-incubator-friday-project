import React from 'react';
import SuperInputText from "../../common/SuperInputText/SuperInputText";
import styles from "./SignUp.module.scss";
import showPass from "../../assets/svg/eye.svg";
import {FieldInputProps} from "formik/dist/types";

type PasswordContainerType = FieldInputProps<string>
export const PasswordContainer: React.FC<PasswordContainerType> = ({...restProps}) => {
  const [visiblePass, setVisiblePass] = React.useState(false)
  
  const visiblePassHandler = () => {
    setVisiblePass(visible => !visible)
  };
  
  return (
    <div>
      <SuperInputText
        type={visiblePass ? 'text' : 'password'}
        {...restProps}
      />
  
      <div className={visiblePass ? styles.active : styles.showPass} onClick={visiblePassHandler}>
        <img  src={showPass} alt="show password" />
      </div>
    </div>
  );
};


