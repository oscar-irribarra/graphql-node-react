import './App.css';

import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { Auth } from './pages/Auth';
import { Events } from './pages/Events';
import { Booking } from './pages/Booking';
import { MainNavigation } from './components/navigation/MainNavigation';

function App() {
    return (
        <BrowserRouter>
            <MainNavigation />
            <main className="main-content">
                <Switch>
                    <Redirect from="/" to="/auth" exact />
                    <Route path="/auth" component={Auth} />
                    <Route path="/events" component={Events} />
                    <Route path="/bookings" component={Booking} />
                </Switch>
            </main>
        </BrowserRouter>
    );
}

export default App;
