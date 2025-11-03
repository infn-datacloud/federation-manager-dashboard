import { NextResponse } from 'next/server';
import getAuthToken from '../../../../../../../../utils';

interface Params {
    params: {
        idpId: string;
        userGroupId: string;
        slaId: string;
        projectId: string;
    };
}

export async function DELETE(_: Request, { params }: Params) {
    const { idpId, userGroupId, slaId, projectId } = await params;
    const accessToken = await getAuthToken();

    if (!accessToken) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const res = await fetch(
        `${process.env.API_SERVER_URL}/idps/${idpId}/user-groups/${userGroupId}/slas/${slaId}/projects/${projectId}`,
        {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

    if (!res.ok) {
        const text = await res.text();
        console.error('API Error:', res.status, text);
        return NextResponse.json({ error: text }, { status: res.status });
    }
    
    if (res.status == 204) {
        return new NextResponse(null, { status: 204 });
    }
    
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
}
