import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';
import { fileURLToPath } from 'url';
import env from './env.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Public-facing server list. Set PUBLIC_API_URL in the deployed backend's env
// to the deployed base URL (e.g. https://staysignal-lk-api.onrender.com/api).
const localUrl = `http://localhost:${env.PORT}/api`;
const servers = [{ url: env.PUBLIC_API_URL, description: 'Current environment' }];
if (env.PUBLIC_API_URL !== localUrl) {
  servers.push({ url: localUrl, description: 'Local development' });
}

const definition = {
  openapi: '3.0.3',
  info: {
    title: 'StaySignal LK API',
    version: '1.0.0',
    description:
      'REST API for StaySignal LK — a Sri Lankan guest-house corridor-status and ' +
      'travel-disruption board. Covers JWT authentication & RBAC, disruption notices, ' +
      'tourism destination registry (with multi-image upload), geography, and impact stats.',
    contact: { name: 'StaySignal LK' },
  },
  servers,
  tags: [
    { name: 'Auth', description: 'Signup, login, refresh, logout, current user' },
    { name: 'Notices', description: 'Disruption / operational notice CRUD (owner-only writes)' },
    { name: 'Tourism', description: 'Tourism destination CRUD + multi-image upload' },
    { name: 'Geography', description: 'Towns, corridors, properties' },
    { name: 'Impact', description: 'Aggregate impact statistics, stories, the problem statement' },
    { name: 'Health', description: 'Service health check' },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Access token returned by /auth/login or /auth/signup/*, 15 min TTL.',
      },
    },
    schemas: {
      Error: {
        type: 'object',
        properties: {
          error: {
            type: 'object',
            properties: {
              code: { type: 'string', example: 'UNAUTHENTICATED' },
              message: { type: 'string', example: 'Authentication required.' },
              fields: { type: 'object', additionalProperties: { type: 'string' } },
            },
          },
        },
      },
      User: {
        type: 'object',
        properties: {
          id: { type: 'string', example: '66f0c8e2b1a2c3d4e5f60718' },
          name: { type: 'string', example: 'Amali Perera' },
          email: { type: 'string', format: 'email', example: 'amali@zionview.lk' },
          role: { type: 'string', enum: ['traveller', 'owner'], example: 'owner' },
          phone: { type: 'string', example: '0771234567' },
        },
      },
      AuthTokenResponse: {
        type: 'object',
        properties: {
          user: { $ref: '#/components/schemas/User' },
          accessToken: { type: 'string', description: 'JWT, 15 min TTL' },
        },
      },
      NoticeUtilities: {
        type: 'object',
        properties: {
          generatorStatus: { type: 'string', example: '6:00 PM - 10:00 PM Active' },
          waterStatus: { type: 'string', example: 'Gravity Feed 3000L Reserve' },
          connectivityStatus: { type: 'string', example: 'Dialog 4G + Starlink Active' },
        },
      },
      Notice: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'notice-zion-view' },
          title: { type: 'string', example: 'Zion View' },
          town: { type: 'string', example: 'ella' },
          townName: { type: 'string', example: 'Ella' },
          corridor: { type: 'string', example: 'Ella Valley · A23 Corridor' },
          issue: {
            type: 'string',
            enum: ['landslide', 'road_closed', 'flooded_access', 'no_water', 'power_cut', 'bridge_unsafe', 'network_down', 'relocation'],
          },
          status: { type: 'string', enum: ['open', 'caution', 'disrupted', 'closed', 'resolved'] },
          headline: { type: 'string' },
          description: { type: 'string' },
          bypassAdvice: { type: 'string' },
          utilities: { $ref: '#/components/schemas/NoticeUtilities' },
          contactNumber: { type: 'string', example: '077 412 8901' },
          verifiedBy: { type: 'string', example: 'Estate Dispatch' },
          isUrgent: { type: 'boolean' },
        },
      },
      NoticeInput: {
        type: 'object',
        required: ['title', 'town', 'corridor', 'status', 'issue', 'headline', 'description', 'contactNumber'],
        properties: {
          title: { type: 'string', minLength: 3, maxLength: 80 },
          town: { type: 'string' },
          corridor: { type: 'string', minLength: 3, maxLength: 100 },
          status: { type: 'string', enum: ['open', 'caution', 'disrupted', 'closed', 'resolved'] },
          issue: {
            type: 'string',
            enum: ['landslide', 'road_closed', 'flooded_access', 'no_water', 'power_cut', 'bridge_unsafe', 'network_down', 'relocation'],
          },
          headline: { type: 'string', minLength: 5, maxLength: 120 },
          description: { type: 'string', minLength: 10, maxLength: 1000 },
          bypassAdvice: { type: 'string', maxLength: 300 },
          contactNumber: { type: 'string', description: 'Sri Lankan phone number' },
          verifiedBy: { type: 'string', maxLength: 60 },
          utilities: { $ref: '#/components/schemas/NoticeUtilities' },
        },
      },
      TourismImage: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          url: { type: 'string', example: '/uploads/tourism/1730000000000-abc123.jpg' },
          originalName: { type: 'string' },
          size: { type: 'integer', example: 245678 },
          uploadedAt: { type: 'string', format: 'date-time' },
        },
      },
      TourismDestination: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          name: { type: 'string', example: 'Sigiriya Rock Fortress' },
          slug: { type: 'string', example: 'sigiriya-rock-fortress' },
          nodeId: { type: 'string', example: 'LK-SLTDA-4821' },
          category: {
            type: 'string',
            enum: [
              'Heritage & Archaeological',
              'Nature & Hiking',
              'Viewpoints & Walking',
              'National Park & Cloud Forest',
              'Waterfalls & Gorges',
              'Coastal & Marine',
            ],
          },
          province: { type: 'string' },
          district: { type: 'string' },
          elevation: { type: 'string' },
          gps: { type: 'string' },
          corridor: { type: 'string' },
          difficulty: { type: 'string', enum: ['easy', 'moderate', 'steep'] },
          status: { type: 'string', enum: ['open', 'caution', 'danger', 'draft'] },
          statusText: { type: 'string' },
          statusSub: { type: 'string' },
          foreignTariff: { type: 'string' },
          localTariff: { type: 'string' },
          saarcTariff: { type: 'string' },
          operatingHours: { type: 'string' },
          guideRequirement: { type: 'string' },
          smsSummary: { type: 'string', maxLength: 140 },
          overview: { type: 'string' },
          heroImage: { type: 'string', description: 'Mirrors the first uploaded image URL' },
          images: { type: 'array', items: { $ref: '#/components/schemas/TourismImage' } },
          regulations: {
            type: 'object',
            properties: {
              plastics: { type: 'boolean' },
              drones: { type: 'boolean' },
              frescoes: { type: 'boolean' },
              hornets: { type: 'boolean' },
              attire: { type: 'boolean' },
              macaques: { type: 'boolean' },
            },
          },
          contacts: {
            type: 'object',
            properties: {
              touristPolice: { type: 'string' },
              hospital: { type: 'string' },
              ambulance: { type: 'string' },
            },
          },
        },
      },
      TourismDestinationInput: {
        type: 'object',
        required: ['name'],
        description:
          'multipart/form-data. Object-valued fields (regulations, contacts, specs, dossier, ' +
          'siteRules, corridorRadar, campAndStay, hotlines) are sent as JSON strings. ' +
          'Attach up to 10 image files under the "images" field.',
        properties: {
          name: { type: 'string' },
          category: { type: 'string' },
          province: { type: 'string' },
          district: { type: 'string' },
          elevation: { type: 'string' },
          gps: { type: 'string' },
          corridor: { type: 'string' },
          difficulty: { type: 'string', enum: ['easy', 'moderate', 'steep'] },
          foreignTariff: { type: 'string' },
          localTariff: { type: 'string' },
          saarcTariff: { type: 'string' },
          operatingHours: { type: 'string' },
          guideRequirement: { type: 'string' },
          smsSummary: { type: 'string' },
          overview: { type: 'string' },
          regulations: { type: 'string', description: 'JSON-encoded object of booleans' },
          contacts: { type: 'string', description: 'JSON-encoded object' },
          removeImageIds: { type: 'string', description: 'JSON array of image _ids to delete (update only)' },
          images: { type: 'array', items: { type: 'string', format: 'binary' } },
        },
      },
      TourismStats: {
        type: 'object',
        properties: {
          totalDestinations: { type: 'integer' },
          totalDestinationsSub: { type: 'string' },
          activeOpen: { type: 'integer' },
          activeOpenSub: { type: 'string' },
          weatherAdvisory: { type: 'integer' },
          weatherAdvisorySub: { type: 'string' },
          draftRevisions: { type: 'integer' },
          draftRevisionsSub: { type: 'string' },
        },
      },
      Town: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          slug: { type: 'string' },
          name: { type: 'string' },
          district: { type: 'string' },
          corridor: { type: 'string' },
        },
      },
      ImpactStats: {
        type: 'object',
        properties: {
          staysReporting: { type: 'integer' },
          townsAffected: { type: 'integer' },
          guestsWarned: { type: 'integer' },
          resolvedToday: { type: 'integer' },
        },
      },
    },
    responses: {
      Unauthorized: {
        description: 'Missing/invalid/expired access token.',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
      },
      Forbidden: {
        description: 'Authenticated but wrong role.',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
      },
      NotFound: {
        description: 'Resource not found.',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
      },
    },
  },
};

const options = {
  definition,
  // JSDoc `@swagger` blocks live next to each route definition.
  apis: [path.join(__dirname, '..', 'routes', '*.js'), path.join(__dirname, '..', 'app.js')],
};

export const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
