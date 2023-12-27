// import { useFormik } from 'formik';
// import * as yup from 'yup';
// import { timeout } from '@/utils/utilitys';
// import { postOrder, paymentMidtrans } from '@/service/product';
// import { useActivatedProduct } from '@/store';
// import { nanoid } from 'nanoid';

// export default function useFormDetailOrder() {
//   const { selectedData, incCurrentState } = useActivatedProduct(
//     (state) => state
//   );

//   const initialValues: any = {
//     nama_perusahaan: '',
//   };

//   const yupAdd = yup.object({
//     nama_perusahaan: yup
//       .string()
//       .required('Nama perusahaan is required')
//       .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field '),
//   });

//   const formik = useFormik({
//     enableReinitialize: true,
//     initialValues: initialValues,
//     onSubmit: async (value) => {
//       const payload = {
//         orders: [
//           {
//             tenant_code: nanoid(5),
//             tenant_name: value.nama_perusahaan,
//             tenant_id: `onx_${value.nama_perusahaan
//               .split(' ')
//               .join('')
//               .toLowerCase()}`,
//             package: selectedData.id,
//           },
//         ],
//       };

//       let data = await postOrder(payload);
//       let response = await paymentMidtrans({ order_id: data[0].order_id });

//       if (response) {
//         window.open(response.redirect_url, '_blank');
//       }
//       await timeout(3000);
//       await incCurrentState();
//     },
//     validationSchema: yupAdd,
//   });

//   return {
//     ...formik,
//   };
// }
