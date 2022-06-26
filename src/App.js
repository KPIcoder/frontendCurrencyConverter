import {Routes, Route, Navigate} from "react-router-dom";
import {AdminLayout, MainLayout} from "./layouts";
import {AdminPage, HomePage, LoginPage} from "./pages";
import './App.css'
import {RequireAuth} from "./hoc";
import {useDispatch} from "react-redux";
import {authActions} from "./redux";

function App() {

    const dispatch = useDispatch();
    const token = localStorage.getItem('token');

    if (token) {
        dispatch(authActions.setAuth())
    }

    return (
        <Routes>
            <Route path={'/'} element={<MainLayout/>}>
                <Route index element={<Navigate to={'home'}/>}/>
                <Route path={'home'} element={<HomePage/>}/>
                <Route path={'admin'} element={<RequireAuth><AdminPage/></RequireAuth>}/>
                <Route path={'login'} element={<LoginPage/>}/>
            </Route>
        </Routes>
    );
}

export default App;
