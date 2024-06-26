import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';
import { db } from '@/lib/db';

// * - - - GET ALL IMPORTANT TASK - - - * //
export async function GET(req: NextRequest) {
	const session = await auth();
	if (!session) {
		return NextResponse.json(
			{ data: null, message: 'Unauthorized' },
			{ status: 401 },
		);
	}

	try {
		const importantTask = await db.task.findMany({
			where: {
				userId: session.user.id,
				important: true,
				completed: false,
			},
			orderBy: {
				updatedAt: 'desc',
			},
		});
		if (!importantTask) {
			return NextResponse.json(
				{ data: null, message: 'Task not found' },
				{ status: 404 },
			);
		}

		return NextResponse.json(
			{ data: importantTask, message: 'Success' },
			{ status: 200 },
		);
	} catch (error) {
		return NextResponse.json(
			{ data: null, message: 'Internal server error' },
			{ status: 500 },
		);
	}
}
