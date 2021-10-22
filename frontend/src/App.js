import './App.css';

import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { MainNavigation } from './components/navigation/MainNavigation';

import * as ROUTES from './constants/routes';
import { useAuth } from './context/auth-context';

const Auth = lazy(() => import('./pages/Auth'));
const Events = lazy(() => import('./pages/Events'));
const Booking = lazy(() => import('./pages/Booking'));

function App() {
    const { auth } = useAuth();

    return (
        <BrowserRouter>
            <MainNavigation />
            <main className="main-content">
                <Suspense fallback={<p>Loading ...</p>}>
                    <Switch>
                        {!auth && (
                            <>
                                <Redirect to="/" />
                                <Redirect from="/" to={ROUTES.AUTH} exact />
                                <Route path={ROUTES.AUTH} component={Auth} />
                            </>
                        )}
                        {auth && (
                            <>
                                <Redirect to={ROUTES.EVENTS} />

                                <Route
                                    path={ROUTES.EVENTS}
                                    component={Events}
                                />
                                <Route
                                    path={ROUTES.BOOKINGS}
                                    component={Booking}
                                />
                            </>
                        )}
                    </Switch>
                </Suspense>
            </main>
        </BrowserRouter>
    );
}

export default App;
