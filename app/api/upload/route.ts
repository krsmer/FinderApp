import { NextRequest, NextResponse } from "next/server";
import B2 from "backblaze-b2";
import { randomUUID } from "crypto";

// .env.local'dan gelen bilgiler
const b2 = new B2({
  applicationKeyId: process.env.BACKBLAZE_KEY_ID!,
  applicationKey: process.env.BACKBLAZE_APPLICATION_KEY!,
});

function cleanFileName(name: string) {
  // Boşlukları tire ile değiştir, özel karakterleri kaldır
  return name
    .replace(/\s+/g, "-")
    .replace(/[^\w\-\.]/g, "");
}

export async function POST(req: NextRequest) {
  try {
    // Environment variables kontrolü
    if (!process.env.BACKBLAZE_KEY_ID || 
        !process.env.BACKBLAZE_APPLICATION_KEY || 
        !process.env.BACKBLAZE_BUCKET_ID || 
        !process.env.BACKBLAZE_BUCKET_NAME) {
      console.error("Missing Backblaze environment variables");
      return NextResponse.json({ error: "Sunucu yapılandırma hatası." }, { status: 500 });
    }

    await b2.authorize();
    
    const formData = await req.formData();
    const file = formData.get("file") as File;
    
    if (!file) {
      return NextResponse.json({ error: "Dosya bulunamadı." }, { status: 400 });
    }

    // Dosya boyutu kontrolü (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "Dosya boyutu 5MB'dan büyük olamaz." }, { status: 400 });
    }

    // Dosya tipi kontrolü
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Sadece JPG, PNG ve WebP dosyaları kabul edilir." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const safeFileName = `${randomUUID()}-${cleanFileName(file.name)}`;
    
    console.log(`Uploading file: ${safeFileName} to bucket: ${process.env.BACKBLAZE_BUCKET_NAME}`);

    const { data: uploadUrlData } = await b2.getUploadUrl({
      bucketId: process.env.BACKBLAZE_BUCKET_ID!,
    });

    const uploadResponse = await b2.uploadFile({
      uploadUrl: uploadUrlData.uploadUrl,
      uploadAuthToken: uploadUrlData.authorizationToken,
      fileName: safeFileName,
      data: buffer,
      mime: file.type,
      
    });

    


    // Public URL oluştur
    const publicUrl = `https://${process.env.BACKBLAZE_BUCKET_NAME}.s3.us-east-005.backblazeb2.com/${safeFileName}`;

    
    console.log(`File uploaded successfully. Public URL: ${publicUrl}`);

    return NextResponse.json({ 
      url: publicUrl,
      fileName: safeFileName,
      fileId: uploadResponse.data.fileId,
      size: file.size,
      type: file.type
    });

  } catch (err) {
    console.error("Backblaze yükleme hatası:", err);
    
    // Daha detaylı hata mesajları
    if (err instanceof Error) {
      console.error("Error message:", err.message);
      console.error("Error stack:", err.stack);
    }
    
    return NextResponse.json({ 
      error: "Yükleme başarısız.", 
      details: process.env.NODE_ENV === 'development' ? err : undefined
    }, { status: 500 });
  }
}