import { v2 as cloudinary } from 'cloudinary';

import { envVariableSchema } from '@/lib/validators';

const {
  CLOUDINARY_API_SECRET,
  NEXT_PUBLIC_CLOUDINARY_API_KEY,
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
} = envVariableSchema.parse(process.env);

cloudinary.config({
  cloud_name: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  const body = await request.json();
  const { paramsToSign } = body;

  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    CLOUDINARY_API_SECRET,
  );

  return Response.json({ signature });
}
