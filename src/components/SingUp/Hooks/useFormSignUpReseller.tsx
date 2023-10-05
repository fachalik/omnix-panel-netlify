'use client';

import { useFormik } from 'formik';
import * as yup from 'yup';
import { timeout } from '@/utils/utilitys';
// import { useAuthStore } from '@/store';
import { register } from '@/service/auth';
import { useNavigate } from 'react-router-dom';
// import { useRouter } from 'next/navigation';

export default function useFormSignUpReseller() {
  // const { useNavigate } = useRouter();
  const navigate = useNavigate();
  // const { login } = useAuthStore((state) => state);

  const initialValues: any = {
    email: '',
    phoneNumber: '',
    password: '',
    password_confirmation: '',
    firstName: '',
    lastName: '',
  };

  const phoneRegExp =
    /(\+62 ((\d{3}([ -]\d{3,})([- ]\d{4,})?)|(\d+)))|(\(\d+\) \d+)|\d{3}( \d+)+|(\d+[ -]\d+)|\d+/gm;

  const yupAdd = yup.object({
    email: yup
      .string()
      .email('Must be a valid email')
      .required('Email is required'),
    firstName: yup.string().required(),
    phoneNumber: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
    lastName: yup.string().required(),
    password: yup.string().min(8).required('Password is required'),
    password_confirmation: yup
      .string()
      .min(8, 'Password Confirmation must be at least 8 characters')
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Password is required'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    onSubmit: async (value) => {
      const payload = { ...value, role: 3 };
      await register(payload)
        .then(() => navigate('/verify'))
        .catch((err) => console.log(err));
      await timeout(1000);
    },
    validationSchema: yupAdd,
  });

  return {
    ...formik,
  };
}
