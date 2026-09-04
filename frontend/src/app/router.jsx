import { createBrowserRouter } from 'react-router-dom';
import Layout from '../shared/components/Layout';
import { HomePage, ProblemPage, HowItWorksPage, TownPage } from '../features/geography';
import { NoticesPage, NoticeDetailPage } from '../features/notices';
import { OwnerDeskPage, PostNoticePage, EditNoticePage } from '../features/owner';
import { ImpactPage, NotFoundPage } from '../features/impact';
import { TourismDirectoryPage, AddTourismPlacePage, TourismDetailPage } from '../features/tourism';
import { CampingDirectoryPage, AddCampingPage, CampingDetailPage } from '../features/camping';
import {
  LoginPage,
  SignupTravellerPage,
  SignupOwnerPage,
  UnauthorizedPage,
  RequireAuth,
  RequireRole,
  GuestOnly,
} from '../features/auth';

const ownerOnly = (element) => (
  <RequireAuth>
    <RequireRole role="owner">{element}</RequireRole>
  </RequireAuth>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      // public
      { index: true, element: <HomePage /> },
      { path: 'problem', element: <ProblemPage /> },
      { path: 'how-it-works', element: <HowItWorksPage /> },
      { path: 'towns/:slug', element: <TownPage /> },
      { path: 'notices', element: <NoticesPage /> },
      { path: 'notices/:id', element: <NoticeDetailPage /> },
      { path: 'impact', element: <ImpactPage /> },

      // Tourism Routes
      { path: 'tourism', element: <TourismDirectoryPage /> },
      { path: 'tourism/new', element: <AddTourismPlacePage /> },
      { path: 'tourism/:id', element: <TourismDetailPage /> },
      { path: 'admin/tourism', element: <TourismDirectoryPage /> },
      { path: 'admin/tourism/new', element: <AddTourismPlacePage /> },

      // Camping Routes
      { path: 'camping', element: <CampingDirectoryPage /> },
      { path: 'camping/new', element: <AddCampingPage /> },
      { path: 'camping/:id', element: <CampingDetailPage /> },
      { path: 'admin/camping', element: <CampingDirectoryPage /> },
      { path: 'admin/camping/new', element: <AddCampingPage /> },

      { path: '*', element: <NotFoundPage /> }
    ]
  }
      // auth (guests only)
      { path: 'login', element: <GuestOnly><LoginPage /></GuestOnly> },
      { path: 'signup/traveller', element: <GuestOnly><SignupTravellerPage /></GuestOnly> },
      { path: 'signup/owner', element: <GuestOnly><SignupOwnerPage /></GuestOnly> },
      { path: 'unauthorized', element: <UnauthorizedPage /> },

      // owner-only
      { path: 'owner', element: ownerOnly(<OwnerDeskPage />) },
      { path: 'post', element: ownerOnly(<PostNoticePage />) },
      { path: 'notices/:id/edit', element: ownerOnly(<EditNoticePage />) },

      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
