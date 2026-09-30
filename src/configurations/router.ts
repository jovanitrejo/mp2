import {
    createBrowserRouter,
} from 'react-router';
import App from '../App';
import Root from '../routes/Root';

export const router = createBrowserRouter([
    {
        path: '/',
        Component: App,
        children: [
            {
                index: true,
                Component: Root,
            },
            {
                path: '/search',
            }
        ]
    }
], {
    basename: '/mp2/',
})

export default router;