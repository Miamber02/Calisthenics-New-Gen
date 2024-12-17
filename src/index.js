import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

import Root, { loader as rootLoader, action as rootAction, } from "./routes/root";

import ErrorPage from "./error-page";
import Contact, {
  loader as contactLoader,
  action as contactAction,
} from "./routes/contact";
//from "./components/contact";

import EditContact, {
  action as editAction,
  loader as editLoader,
} from "./routes/edit";

import { action as destroyAction } from "./routes/destroy";

import Index from "./routes/index";

import DailyTrain, {
  loader as dailyTrainLoader
} from './components/DailyTrain';

import TrainingDay, {
  loader as trainingDayLoader
} from './components/TrainingDay';

import EditTraining, { 
  loader as editTrainingLoader 
} from './components/EditTraining';

import PrivateRoute from './components/PrivateRoute';

import WorkingLogin from './components/WorkingLogin';

import { AuthProvider } from './auth-context';

import UserDashboard, {
  loader as userDashboardLoader
} from './components/UserDashboard';


const router = createBrowserRouter([
  {
    path: "/login",
    element: <WorkingLogin />,
  },
  {
    path: "/",
    element: <PrivateRoute element={<Root />} requiredRole="admin" />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            path: "contacts/:contactId",
            element: <PrivateRoute element={<Contact />} requiredRole="admin" />,
            loader: contactLoader,
            action: contactAction,
            children: [
              {
                path: "destroy",
                action: destroyAction,
                errorElement: <div>Oops! There was an error.</div>,
              },
              {
                path: "trainings",
                loader: dailyTrainLoader,
              },
            ],
          },
          {
            path: "contacts/:contactId/edit",
            element: <PrivateRoute element={<EditContact />} requiredRole="admin" />,
            loader: editLoader,
            action: editAction,
          },
          {
            path: "createUser",
            element: <PrivateRoute element={<EditContact />} requiredRole="admin" />,
            loader: editLoader,
            action: editAction,
          },     
          {
            path: "contacts/:contactId/editTraining/:trainingId",
            element: <PrivateRoute element={<EditTraining />} requiredRole="admin" />,
            loader: editTrainingLoader,
          },
          {
            path: "contacts/:contactId/trainings/:trainingId",
            element: <PrivateRoute element={<TrainingDay />} requiredRole="admin" />,
            loader: trainingDayLoader,
            //action: dailyTrainAction,
          },
          {
            path: "contacts/:contactId/trainingUserView/:trainingId",
            element: <PrivateRoute element={<DailyTrain />} requiredRole="admin" />,
            loader: dailyTrainLoader,
            //action: dailyTrainAction,
          },
          {
            path: "contacts/:contactId/edit",
            element: <PrivateRoute element={<EditContact />} requiredRole="admin" />,
            loader: contactLoader,
            action: editAction,
          },
          {
            path: "contacts/:contactId/destroy",
            action: destroyAction,
            errorElement: <div>Oops! There was an error.</div>,
          },
        ],
      },
    ],
  },
  {
    path: "/trainer",
    element: <PrivateRoute element={<Root />} requiredRole="trainer" />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        path: "contacts/:contactId",
        element: <PrivateRoute element={<Contact />} requiredRole="trainer" />,
        loader: contactLoader,
        action: contactAction,
        children: [
          {
            path: "trainings",
            loader: dailyTrainLoader,
          },
        ],
      },
      {
        path: "contacts/:contactId/editTraining/:trainingId",
        element: <PrivateRoute element={<EditTraining />} requiredRole="trainer" />,
        loader: editTrainingLoader,
      },
      {
        path: "contacts/:contactId/trainings/:trainingId",
        element: <PrivateRoute element={<TrainingDay />} requiredRole="trainer" />,
        loader: trainingDayLoader,
        //action: dailyTrainAction,
      },
      {
        path: "contacts/:contactId/trainingUserView/:trainingId",
        element: <PrivateRoute element={<DailyTrain />} requiredRole="trainer" />,
        loader: dailyTrainLoader,
        //action: dailyTrainAction,
      },
    ],
  },
  {
    path: "/user",
    element: <PrivateRoute element={<UserDashboard />} requiredRole="user" />,
    errorElement: <ErrorPage />,
    loader: userDashboardLoader,
    children: [
      {
        path: "/user/training/:trainingId",
        element: <PrivateRoute element={<DailyTrain />} requiredRole="user" />,
        errorElement: <ErrorPage />
      }
    ]
  }
]);



/* const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            path: "contacts/:contactId",
            element: <Contact />,
            loader: contactLoader,
            action: contactAction,
            children: [
              {
                path: "destroy",
                action: destroyAction,
                errorElement: <div>Oops! There was an error.</div>,
              },
              {
                path: "trainings",
                //element: <TrainingsList />,
                loader: dailyTrainLoader,  
              },
            ],
          },
          {
            path: "contacts/:contactId/editUser",
            element: <EditContact />,
            loader: editLoader,
            action: editAction,
          },
          {
            path: "createUser",
            element: <EditContact />,
            loader: editLoader,
            action: editAction,
          },
          {
            path: "contacts/:contactId/trainings/:trainingId",
            element: <TrainingDay />,
            loader: trainingDayLoader,
            //action: dailyTrainAction,
          },
          {
            path: "contacts/:contactId/trainingUserView/:trainingId",
            element: <DailyTrain />,
            loader: dailyTrainLoader,
            //action: dailyTrainAction,
          },
          {
            path: "contacts/:contactId/editTraining/:trainingId",
            element: <EditTraining />,
            loader: editTrainingLoader,
          },
          {
            path: "contacts/:contactId/edit",
            element: <EditContact />,
            loader: contactLoader,
            action: editAction,
          },
          {
            path: "contacts/:contactId/destroy",
            action: destroyAction,
            errorElement: <div>Oops! There was an error.</div>,
          },
        ],
      },
    ],
  },
]);*/

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/*<App />*/}
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
