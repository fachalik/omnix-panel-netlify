import { useFormik } from 'formik';
import * as yup from 'yup';
import { forgotPassword } from '@/service/auth';
import { useNavigate } from 'react-router-dom';
// import { useRouter } from 'next/navigation';

export default function useFormForgetPassword() {
  // const { push } = useRouter();
  const navigate = useNavigate();
  const initialValues: any = {
    email: '',
  };

  const yupAdd = yup.object({
    email: yup
      .string()
      .email('Must be a valid email')
      .required('Email is required'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    onSubmit: async (value) => {
      const payload = { ...value };

      await forgotPassword(payload)
        .then(() => navigate('/verify'))
        .catch((err) => console.log(err));
    },
    validationSchema: yupAdd,
  });

  return {
    ...formik,
  };
}
