import { useFormik } from 'formik';
import * as yup from 'yup';
import { User } from '@/models/authModels';

interface HooksTypes {
  handleClose: () => void;
  mutate: (props: any) => void;
  data?: User | null;
}

const phoneRegExp =
  /(\+62 ((\d{3}([ -]\d{3,})([- ]\d{4,})?)|(\d+)))|(\(\d+\) \d+)|\d{3}( \d+)+|(\d+[ -]\d+)|\d+/gm;

export default function useFormUser({ handleClose, data }: HooksTypes) {
  const initialValues: any = {
    email: data?.email ?? '',
    password: '',
    password_confirmation: '',
    // phoneNumber: data?.phoneNumber ?? '',
    // firstName: data?.firstName ?? '',
    // lastName: data?.lastName ?? '',
    // role: data?.role?.name ?? '',
    // status: data?.status?.name ?? '',
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    onSubmit: async (value) => {
      let payload: any = await {};
      if (data) {
        delete value.email;
        delete value.password;
        payload = await { val: value, id: data._id };
      } else {
        delete value.password_confirmation;
        payload = await value;
      }
      console.log(payload);

      // await mutate(payload);
      await handleClose();
    },
    validationSchema: yup.object({
      email: yup.string().email().required('Category Must addedd'),
      phoneNumber: yup
        .string()
        .matches(phoneRegExp, 'Phone number is not valid'),
      password: yup.string().min(8).required('Password is required'),
      password_confirmation: yup
        .string()
        .min(8, 'Password Confirmation must be at least 8 characters')
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required('Password is required'),
      firstName: yup.string().required(),
      lastName: yup.string().required(),
      role: yup.string().required(),
      status: yup.string().required(),
    }),
  });

  return {
    ...formik,
  };
}
