import http from '../utils/request';

export const GetDetailPackageAdmin = ({
  token,
  id,
}: {
  token: string;
  id: string;
}) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.get(`api/productpackages/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (respon.data) {
        resolve(respon.data);
      }
    } catch (err: any) {
      const message: string = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });

export const postPackageAdmin = (payload: any) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.post(`api/productpackages`, payload);

      if (respon) {
        resolve(respon);
      }
    } catch (err: any) {
      const message: string = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });

export const updatePackageAdmin = ({ val, id }: { val: any; id: string }) => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.patch(
        `/api/productpackages/product-packages//${id}`,
        {
          ...val,
        }
      );
      if (respon) {
        resolve(respon);
      }
    } catch (err: any) {
      const message: string = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });
};
