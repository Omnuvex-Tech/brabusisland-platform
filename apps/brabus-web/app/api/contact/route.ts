import { NextResponse } from 'next/server';

interface ContactPayload {
  name?: string;
  surname?: string;
  phone?: string;
  message?: string;
}

export async function POST(request: Request) {
  const webhookUrl = process.env.BITRIX_WEBHOOK_URL;
  const sourceId = process.env.BITRIX_SOURCE_ID;
  const assignedById = process.env.BITRIX_ASSIGNED_BY_ID;

  if (!webhookUrl) {
    console.error('BITRIX_WEBHOOK_URL is not set');
    return NextResponse.json(
      { success: false, message: 'Server xətası, bir az sonra yenidən cəhd edin' },
      { status: 500 }
    );
  }

  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: 'Yanlış sorğu formatı' },
      { status: 400 }
    );
  }

  const { name, surname, phone, message } = body;

  if (!name?.trim() || !surname?.trim() || !phone?.trim()) {
    return NextResponse.json(
      { success: false, message: 'Zəhmət olmasa bütün vacib sahələri doldurun' },
      { status: 400 }
    );
  }

  try {
    const bitrixResponse = await fetch(`${webhookUrl}crm.lead.add.json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fields: {
          TITLE: `Brabus Island Baku — ${name} ${surname}`,
          NAME: name,
          LAST_NAME: surname,
          PHONE: [{ VALUE: phone, VALUE_TYPE: 'WORK' }],
          COMMENTS: message || '',
          SOURCE_ID: sourceId,
          ASSIGNED_BY_ID: assignedById,
        },
        params: { REGISTER_SONET_EVENT: 'Y' },
      }),
    });

    const bitrixData = await bitrixResponse.json();

    if (!bitrixResponse.ok || bitrixData.error) {
      console.error('Bitrix API error:', bitrixData);
      return NextResponse.json(
        { success: false, message: 'Sorğu göndərilə bilmədi, yenidən cəhd edin' },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, leadId: bitrixData.result });
  } catch (error) {
    console.error('Bitrix request failed:', error);
    return NextResponse.json(
      { success: false, message: 'Şəbəkə xətası, yenidən cəhd edin' },
      { status: 500 }
    );
  }
}