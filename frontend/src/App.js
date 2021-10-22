import './App.css';

import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { Auth } from './pages/Auth';
import { Events } from './pages/Events';
import { Booking } from './pages/Booking';
import { MainNavigation } from './components/navigation/MainNavigation';

import { useAuth } from './context/auth-context';

function App() {
    const [auth] = useAuth();
    return (
        <BrowserRouter>
            <MainNavigation />
            <main className="main-content">
                <Switch>
                    {!auth.token && <Redirect from="/" to="/auth" exact />}
                    {auth.token && <Redirect from="/" to="/events" exact />}
                    {auth.token && <Redirect from="/auth" to="/events" exact />}
                    {!auth.token && <Route path="/auth" component={Auth} />}
                    <Route path="/events" component={Events} />
                    {auth.token && (
                        <Route path="/bookings" component={Booking} />
                    )}
                </Switch>
            </main>
        </BrowserRouter>
    );
}

export default App;
