import { Fragment, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import { DefaultLayout } from './layouts';
import { AuthProvider } from './components/AuthContext/AuthContext';

function App() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <AuthProvider>
            <BrowserRouter>
                <div className="App">
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Page = route.component;
                            let Layout = DefaultLayout;

                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }

                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}>
                                            <Page isDarkMode={isDarkMode} />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
