import {
    createBrowserRouter,
} from 'react-router';
import App from '../App';

export const router = createBrowserRouter([
    {
        path: '/',
        Component: App,
    }
], {
    basename: '/mp2',
})

export default router;