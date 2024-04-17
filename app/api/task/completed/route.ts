import { auth } from '@/auth';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

// * - - - GET ALL COMPLETED TASK - - - * //
export const GET = auth(async (req) => {
	if (!req.auth) {
		return NextResponse.json(
			{ data: null, message: 'Unauthorized' },
			{ status: 401 },
		);
	}

	try {
		const completedTask = await db.task.findMany({
			where: {
				completed: true,
			},
			orderBy: {
				updatedAt: 'desc',
			},
		});
		return NextResponse.json(
			{ data: completedTask, message: 'success' },
			{ status: 200 },
		);
	} catch (error) {
		console.log('[API_TASK_COMPLETED - GET] - ', error);
		return NextResponse.json(
			{ data: null, message: 'Internal server error' },
			{ status: 500 },
		);
	}
}) as any;
