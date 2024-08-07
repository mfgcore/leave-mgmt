import { setupWorker } from 'msw/browser';
import { http, HttpResponse } from 'msw';

// Define request handlers
const handlers = [
  http.get('/api/leave-balance', (req) => {
    console.log('Intercepted /api/leave-balance');
    return HttpResponse.json([
      { leaveType: 'Annual Leave', balance: 10, futureLeave: 2, balanceMinusFutureLeave: 8 },
    ]);
  }),
  http.get('/api/request-overview', (req) => {
    return HttpResponse.json([
      { leaveType: 'Annual Leave', date: '2024-07-01', status: 'Approved', approver: 'Joe Supervisor', days: 3, quotaUsed: 3 },
    ]);
  }),
  http.get('/api/leave-types', (req) => {
    return HttpResponse.json({
      '2000': { type: 'Annual Leave', balance: 10 },
      '2001': { type: 'Pers. Lv with Cert', balance: 5 },
    });
  }),
  http.post('/api/leave-request', (req) => {
    return HttpResponse.json({ message: 'Leave request submitted successfully' });
  }),
  http.get('/verify-token', (req) => {
    return HttpResponse.json({
      name: 'Test User',
      employeeId: '123456',
    });
  }),
];

// Create the service worker with the handlers
const worker = setupWorker(...handlers);

// Function to start the service worker
export default function initializeMockApi() {
  console.log('Initializing Mock API...');
  const isProduction = process.env.NODE_ENV === 'production';
  const serviceWorkerUrl = isProduction ? '/leave-mgmt/mockServiceWorker.js' : '/mockServiceWorker.js';

  return worker.start({
    serviceWorker: {
      url: serviceWorkerUrl,
    },
    onUnhandledRequest: 'bypass',
  }).then(() => {
    console.log('Mock API started');
  }).catch((error) => {
    console.error('Mock API failed to start:', error);
  });
}
