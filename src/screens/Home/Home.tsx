import React from 'react';
import * as Yup from 'yup';
import {View, MainInput, Formik, Text, Keyboard, Pressable, TouchableWithoutFeedback} from '@components';
import {regExp} from '@constants';
import {useTranslation, useRoute, useAppDispatch, useTheme, useCallback} from '@hooks';
import {FormikHelpers, HomeRouteProp, TComponent} from '@types';
import styles from './styles';

const initialFormValue: TComponent['TForm'] = {
  name: '',
  password: '',
  confirmPassword: '',
};

const Home: React.FC = () => {
  const {t} = useTranslation();
  const {params} = useRoute<HomeRouteProp>();
  const dispatch = useAppDispatch();
  // const data = useAppSelector(selectData);
  const {colors} = useTheme();

  const validationSchema = Yup.object({
    name: Yup.string().trim().required('name is required!'),
    password: Yup.string()
      .trim()
      .required('require')
      .min(8, 'is too short')
      .matches(regExp.password, 'Password must contain 8-24 characters, a capital letter, a symbol'),
    confirmPassword: Yup.string()
      .trim()
      .required('require')
      .equals([Yup.ref('password')], 'Passwords do not match'),
  });

  const onSubmitForm = useCallback((values: TComponent['TForm'], actions: FormikHelpers<TComponent['TForm']>) => {
    console.log(values);
    actions.resetForm();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.flexContainer}>
          <Formik initialValues={initialFormValue} onSubmit={onSubmitForm} validationSchema={validationSchema}>
            {({handleChange, handleSubmit, values, touched, errors, handleBlur}) => {
              const onPressHandler = useCallback(() => {
                handleSubmit();
              }, []);

              return (
                <View>
                  <MainInput
                    value={values.name}
                    setValue={handleChange('name')}
                    error={touched.name ? errors.name : null}
                    onBlur={handleBlur('name')}
                    styleInput={styles.input}
                    placeholder="имя"
                  />
                  <MainInput
                    value={values.password}
                    setValue={handleChange('password')}
                    error={touched.password ? errors.password : null}
                    styleInput={styles.input}
                    onBlur={handleBlur('password')}
                    placeholder="пароль"
                  />
                  <MainInput
                    value={values.confirmPassword}
                    setValue={handleChange('confirmPassword')}
                    error={touched.confirmPassword ? errors.confirmPassword : null}
                    onBlur={handleBlur('confirmPassword')}
                    placeholder="подтвердите пароль"
                  />

                  <Pressable onPress={onPressHandler} style={styles.button}>
                    <Text>Submit</Text>
                  </Pressable>
                </View>
              );
            }}
          </Formik>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Home;
