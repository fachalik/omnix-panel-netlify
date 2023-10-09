import { useFormik } from 'formik';
import * as yup from 'yup';
import { timeout } from '@/utils/utilitys';
import { useAuthStore } from '@/store';

export default function useFormSignInAdmin() {
  const { loginAdmin } = useAuthStore((state) => state);

  const initialValues: any = {
    email: '',
    password: '',
  };

  const yupAdd = yup.object({
    email: yup
      .string()
      .email('Must be a valid email')
      .required('Email is required'),
    password: yup.string().min(5).required('Password is required'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    onSubmit: async (value) => {
      const payload = value;
      await loginAdmin(payload);
      await timeout(1000);
    },
    validationSchema: yupAdd,
  });

  return {
    ...formik,
  };
}
