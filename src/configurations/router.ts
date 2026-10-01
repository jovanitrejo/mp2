import {
    createBrowserRouter,
} from 'react-router';
import App from '../App';
import Root from '../routes/Root';
import Search from '../routes/Search';
import { searchLoader } from '../loaders/searchLoader';

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
                Component: Search,
                loader: searchLoader,
            }
        ]
    }
], {
    basename: '/mp2/',
})

export default router;