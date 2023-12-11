export enum RoleEnum {
  ADMIN = 'admin',
  USER = 'user',
  REGULER = 'reguler',
  RESELLER = 'reseller',
  NOT_YET_DEFINED = 'not_yet_defined',
}

export type RoleAuth =
  | 'user'
  | 'reseller'
  | 'admin'
  | 'reguler'
  | 'not_yet_defined';

export interface UserType {
  refreshToken: string;
  token: string;
  tokenExpires: number;
  user: User;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  loginType: string;
  socialtoken: string;
  ReferalCode?: string;
  reseller: null;
  role: string;
  __v: number;
}

export interface Role {
  id: number;
  name: string;
  __entity: string;
}

export interface Menu {
  _id: string;
  role: string;
  menu_id: MenuID[];
  status: string;
  createdAt: null;
  updatedAt: null;
  createdBy: null;
  updatedBy: null;
  __v: number;
}

export interface MenuID {
  _id: string;
  accessor: string;
  icon: string;
  parentAccessor: null;
  status: string;
  path: string;
  label: string;
  createdAt: null;
  updatedAt: null;
  createdBy: null;
  updatedBy: null;
  __v?: number;
}

//   {
//     "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uSWQiOjkwLCJpYXQiOjE2OTU4MjE2MjYsImV4cCI6MTY5NTkwODAyNn0.Ik9SwwLZgWEh04j2KWmcK_pHCMtnFmewzTQmQ1T3krU",
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInJvbGUiOnsiaWQiOjIsIm5hbWUiOiJVc2VyIiwiX19lbnRpdHkiOiJSb2xlIn0sInNlc3Npb25JZCI6OTAsImlhdCI6MTY5NTgyMTYyNiwiZXhwIjoxNjk1OTA4MDI2fQ.gtXUqbxYme39S15WpScCCBMJEMkcbfgXa0zX14MYjnI",
//     "tokenExpires": 1695908026272,
//     "user": {
//         "id": 11,
//         "email": "fachalik@gmail.com",
//         "provider": "google",
//         "socialId": "109579141981627128146",
//         "firstName": "F A",
//         "lastName": "Chalik",
//         "phoneNumber": null,
//         "referralCode": null,
//         "selfReferralCode": "23377c09-9778-42d3-a62c-34fbe0a48a2b",
//         "createdAt": "2023-09-26T17:00:30.325Z",
//         "updatedAt": "2023-09-27T13:20:45.186Z",
//         "deletedAt": null,
//         "photo": null,
//         "role": {
//             "id": 2,
//             "name": "User",
//             "__entity": "Role"
//         },
//         "status": {
//             "id": 1,
//             "name": "Active",
//             "__entity": "Status"
//         },
//         "__entity": "User"
//     }
// }
