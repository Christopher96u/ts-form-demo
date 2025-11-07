import { delay, http, HttpResponse } from 'msw';
import { VALID_OTPS } from '../mobile-form/fields/otp';

const simulateDelay = (ms = 800) => new Promise((resolve) => setTimeout(resolve, ms));

export const handlers = [
  http.post('/api/send-otp', async ({ request }) => {
    const body = (await request.json().catch(() => ({}))) as {
      mobileNumber?: string;
    };
    await simulateDelay();
    if (!body.mobileNumber || body.mobileNumber.trim().length < 6) {
      return HttpResponse.json(
        { message: 'Enter your current mobile number before sending the OTP' },
        { status: 400 }
      );
    }
    return HttpResponse.json({ message: 'OTP sent successfully' });
  }),
  http.post('/api/verify-otp', async ({ request }) => {
    const body = (await request.json().catch(() => ({}))) as {
      otp?: string;
    };
    await simulateDelay();
    if (!body.otp) {
      return HttpResponse.json(
        { message: 'Enter the code you received' },
        { status: 400 }
      );
    }
    if (!VALID_OTPS.includes(body.otp)) {
      return HttpResponse.json({ message: 'The OTP you entered is incorrect' }, { status: 400 });
    }
    return HttpResponse.json({ message: 'OTP verified successfully' });
  }),
  http.post('/update-order', async ({ request }) => {
    await delay(1500);
    const payload = await request.json().catch(() => ({}));
    return HttpResponse.json({
      message: 'Order updated successfully',
      received: payload,
      timestamp: Date.now(),
    });
  }),
];
