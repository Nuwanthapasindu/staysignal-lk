// M2 notices + shared chrome
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../shared/components/Layout';
import { HomePage, ProblemPage, HowItWorksPage, TownPage } from '../features/geography';
import { NoticesPage, NoticeDetailPage } from '../features/notices';
import { OwnerDeskPage, PostNoticePage, EditNoticePage } from '../features/owner';
import { ImpactPage, NotFoundPage } from '../features/impact';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'problem', element: <ProblemPage /> },
      { path: 'how-it-works', element: <HowItWorksPage /> },
      { path: 'towns/:slug', element: <TownPage /> },
      { path: 'notices', element: <NoticesPage /> },
      { path: 'notices/:id', element: <NoticeDetailPage /> },
      { path: 'owner', element: <OwnerDeskPage /> },
      { path: 'post', element: <PostNoticePage /> },
      { path: 'notices/:id/edit', element: <EditNoticePage /> },
      { path: 'impact', element: <ImpactPage /> },
      { path: '*', element: <NotFoundPage /> }
    ]
  }
]);
