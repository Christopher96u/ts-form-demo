export type SendOtpPayload = {
  mobileNumber: string;
};

export const sendOtp = async (payload: SendOtpPayload) => {
  const response = await fetch('/send-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message ?? 'Unable to send OTP');
  }
  return data as { message?: string };
};
