import * as React from 'react';
import { observer } from 'mobx-react';
import { Router } from 'lib/router';
import PrivateRoute from 'components/PrivateRoute';

import MainPage from 'pages/main';
import LoginPage from 'pages/login';
import NotFoundPage from 'pages/notFound';
import SignUpPage from 'pages/signup';
import ProfilePage from 'pages/profile';
import MainLayout from 'layouts/main';
import AuthLayout from 'layouts/auth';

const authorizationRoutes = {
    '/login': (
        <AuthLayout>
            <LoginPage />
        </AuthLayout>
    ),
    '/signup': (
        <AuthLayout>
            <SignUpPage />
        </AuthLayout>
    ),
};

const routes = {
    '/': (
        <MainLayout>
            <MainPage />
        </MainLayout>
    ),
    '/page/:page': (
        <MainLayout>
            <MainPage />
        </MainLayout>
    ),
    ...authorizationRoutes,
    '/profile': (
        <PrivateRoute>
            <MainLayout>
                <ProfilePage />
            </MainLayout>
        </PrivateRoute>
    ),
    '': (
        <MainLayout>
            <NotFoundPage />
        </MainLayout>
    ),
};

export default function Routes() {
    return <Router global routes={routes} />;
}

Routes = observer(Routes);
