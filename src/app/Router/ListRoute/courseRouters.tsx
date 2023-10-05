// import { lazy } from 'react';
// import { ListRouteProps } from './index';
// import { RoleEnum } from 'models';

// const FindCourse = lazy(() => import('pages/Course/FindCourse'));
// const Details = lazy(() => import('pages/Course/Details'));
// const EnroledCourse = lazy(() => import('pages/Course/EnroledCourse'));
// const EnroledCourseDetails = lazy(() => import('pages/Course/EnroledCourse/Details'));

// // Dashboard
// const Dashboard = lazy(() => import('pages/Dashboard'));

// // Usermanagement
// const UserManagementStudent = lazy(() => import('pages/UserManagement/list/Student'));
// const UserManagementInstructor = lazy(() => import('pages/UserManagement/list/Instructor'));
// const UserManagementAdmin = lazy(() => import('pages/UserManagement/list/Admin'));
// // const UserManagementForm = lazy(() => import('pages/UserManagement/Form'));

// // MasterData
// const MasterManagementDivision = lazy(() => import('pages/MasterData/list/Division'));
// const MasterManagementJobPosition = lazy(() => import('pages/MasterData/list/JobPosition'));
// const MasterManagementJobLevel = lazy(() => import('pages/MasterData/list/JobLevel'));
// const MasterManagementBranch = lazy(() => import('pages/MasterData/list/Branch'));
// const MasterManagementCategory = lazy(() => import('pages/MasterData/list/Category'));

// const CourseManagement = lazy(() => import('pages/CourseManagement'));
// const DetailCourseManagement = lazy(() => import('pages/CourseManagement/detail-course'));
// const FormLessonDetailCourseManagement = lazy(
//   () => import('pages/CourseManagement/detail-course/lesson-tab/Form')
// );

// // student
// const Agenda = lazy(() => import('pages/Agenda'));
// const CertificateStudent = lazy(() => import('pages/CertificateStudent'));
// const ProfileStudent = lazy(() => import('pages/Profile/Student/index'));
// const MyClass = lazy(() => import('pages/MyClass/index'));

// // instructor
// const ProfileInstructor = lazy(() => import('pages/Profile/Instructor/index'));

// const Routers: ListRouteProps[] = [
//   {
//     comp: FindCourse,
//     path: '/view-course/all',
//     layout: 'Dashboard',
//     index: true,
//     auth: 'AllRole',
//   },
//   {
//     comp: ProfileStudent,
//     path: '/profile-student',
//     layout: 'Dashboard',
//     index: true,
//     auth: [RoleEnum.STUDENT],
//   },
//   {
//     comp: ProfileInstructor,
//     path: '/profile-instructor',
//     layout: 'Dashboard',
//     index: true,
//     auth: [RoleEnum.INSTRUCTOR],
//   },
//   {
//     comp: MyClass,
//     path: '/my-class',
//     layout: 'Dashboard',
//     index: true,
//     auth: [RoleEnum.STUDENT],
//   },
//   {
//     comp: Details,
//     path: '/view-course/:id',
//     layout: 'Dashboard',
//     index: true,
//     auth: 'AllRole',
//   },
//   {
//     comp: EnroledCourse,
//     path: '/my-class/:id',
//     layout: 'Dashboard',
//     index: true,
//     auth: 'AllRole',
//   },
//   {
//     comp: EnroledCourseDetails,
//     path: '/my-lesson/:id',
//     layout: 'Dashboard',
//     index: true,
//     auth: 'AllRole',
//   },
//   {
//     comp: Dashboard,
//     path: '/dashboard',
//     layout: 'Dashboard',
//     index: true,
//     auth: 'AllRole',
//   },
//   {
//     comp: CourseManagement,
//     path: '/course',
//     layout: 'Dashboard',
//     index: true,
//     auth: [RoleEnum.ADMIN, RoleEnum.INSTRUCTOR],
//   },
//   {
//     comp: DetailCourseManagement,
//     path: '/course-detail',
//     layout: 'Dashboard',
//     index: true,
//     auth: [RoleEnum.ADMIN, RoleEnum.INSTRUCTOR],
//   },
//   {
//     comp: FormLessonDetailCourseManagement,
//     path: '/course-detail/lesson-form/:idCourse',
//     layout: 'Dashboard',
//     index: true,
//     auth: [RoleEnum.ADMIN, RoleEnum.INSTRUCTOR],
//   },

//   // ** User Management

//   {
//     comp: UserManagementStudent,
//     path: '/user-student',
//     layout: 'Dashboard',
//     index: true,
//     auth: [RoleEnum.ADMIN, RoleEnum.INSTRUCTOR],
//   },
//   {
//     comp: UserManagementAdmin,
//     path: '/user-admin',
//     layout: 'Dashboard',
//     index: true,
//     auth: [RoleEnum.ADMIN, RoleEnum.INSTRUCTOR],
//   },
//   {
//     comp: UserManagementInstructor,
//     path: '/user-instructor',
//     layout: 'Dashboard',
//     index: true,
//     auth: [RoleEnum.ADMIN, RoleEnum.INSTRUCTOR],
//   },

//   // ** Master Data
//   {
//     comp: MasterManagementDivision,
//     path: '/master/division',
//     layout: 'Dashboard',
//     index: true,
//     auth: [RoleEnum.ADMIN, RoleEnum.INSTRUCTOR],
//   },
//   {
//     comp: MasterManagementJobPosition,
//     path: '/master/job-position',
//     layout: 'Dashboard',
//     index: true,
//     auth: [RoleEnum.ADMIN, RoleEnum.INSTRUCTOR],
//   },
//   {
//     comp: MasterManagementJobLevel,
//     path: '/master/job-level',
//     layout: 'Dashboard',
//     index: true,
//     auth: [RoleEnum.ADMIN, RoleEnum.INSTRUCTOR],
//   },
//   {
//     comp: MasterManagementBranch,
//     path: '/master/branch',
//     layout: 'Dashboard',
//     index: true,
//     auth: [RoleEnum.ADMIN, RoleEnum.INSTRUCTOR],
//   },
//   {
//     comp: MasterManagementCategory,
//     path: '/master/category',
//     layout: 'Dashboard',
//     index: true,
//     auth: [RoleEnum.ADMIN, RoleEnum.INSTRUCTOR],
//   },

//   {
//     comp: Agenda,
//     path: '/course-calendar',
//     layout: 'Dashboard',
//     index: true,
//     auth: [RoleEnum.ADMIN, RoleEnum.STUDENT, RoleEnum.INSTRUCTOR],
//   },
//   {
//     comp: CertificateStudent,
//     path: '/certificates',
//     layout: 'Dashboard',
//     index: true,
//     auth: [RoleEnum.STUDENT],
//   },
// ];

// export default Routers;
