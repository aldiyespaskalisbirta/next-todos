'use client';

import { useTheme } from 'next-themes';
import * as React from 'react';

import { SwitchTheme } from '@/components/ui/switch-theme';

export function ModeToggle() {
	const { theme, setTheme } = useTheme();

	return (
		<SwitchTheme
			defaultChecked={true}
			onCheckedChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
		/>
	);
}
