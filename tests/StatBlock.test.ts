import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import StatBlock from '../src/components/StatBlock.svelte';
import type { StatBlock as StatBlockType } from '../src/types';

describe('StatBlock component', () => {
	it('renders nothing when data is undefined', () => {
		const { container } = render(StatBlock, { props: { data: undefined as unknown as StatBlockType } });
		expect(container.querySelector('.drakonym-statblock')).toBeNull();
	});

	it('renders name in header', () => {
		const data: StatBlockType = { name: 'Test Creature' };
		render(StatBlock, { props: { data } });
		expect(screen.getByText('Test Creature')).toBeTruthy();
	});

	it('renders kin, type, and threat level', () => {
		const data: StatBlockType = {
			name: 'General Carver',
			kin: 'Human',
			type: 'Leader',
			tl: 3,
		};
		render(StatBlock, { props: { data } });
		expect(screen.getByText('Human')).toBeTruthy();
		expect(screen.getByText('Leader')).toBeTruthy();
		expect(screen.getByText('TL 3')).toBeTruthy();
	});

	it('renders personality fields', () => {
		const data: StatBlockType = {
			name: 'Test',
			instinct: 'To survive',
			wants: 'Freedom',
			fears: 'Fire',
		};
		render(StatBlock, { props: { data } });
		expect(screen.getByText('To survive')).toBeTruthy();
		expect(screen.getByText('Freedom')).toBeTruthy();
		expect(screen.getByText('Fire')).toBeTruthy();
	});

	it('renders immunity', () => {
		const data: StatBlockType = {
			name: 'Test',
			immunity: 'Poison',
		};
		render(StatBlock, { props: { data } });
		expect(screen.getByText('Poison')).toBeTruthy();
	});

	it('renders perks section', () => {
		const data: StatBlockType = {
			name: 'Test',
			perks: [
				{ name: 'Night Vision', effect: 'Can see in darkness' },
			],
		};
		render(StatBlock, { props: { data } });
		expect(screen.getByText('Night Vision')).toBeTruthy();
		expect(screen.getByText('Can see in darkness')).toBeTruthy();
	});

	it('renders actions with cost', () => {
		const data: StatBlockType = {
			name: 'Test',
			actions: [
				{ name: 'Slash', cost: 1, effect: 'Deal 1d6 damage' },
			],
		};
		render(StatBlock, { props: { data } });
		expect(screen.getByText('Slash')).toBeTruthy();
		expect(screen.getByText('1 AP')).toBeTruthy();
		expect(screen.getByText('Deal 1d6 damage')).toBeTruthy();
	});

	it('renders actions with type instead of cost', () => {
		const data: StatBlockType = {
			name: 'Test',
			actions: [
				{ name: 'Rally', type: 'Maneuver', effect: 'Boost allies' },
			],
		};
		render(StatBlock, { props: { data } });
		expect(screen.getByText('Rally')).toBeTruthy();
		expect(screen.getByText('Maneuver')).toBeTruthy();
	});

	it('renders stats grid', () => {
		const data: StatBlockType = {
			name: 'Test',
			actionCap: 2,
			defenseSlots: 3,
			wounds: 10,
			speed: 5,
			size: 'Medium',
		};
		render(StatBlock, { props: { data } });
		expect(screen.getByText('Action Cap')).toBeTruthy();
		expect(screen.getByText('2')).toBeTruthy();
		expect(screen.getByText('DS')).toBeTruthy();
		expect(screen.getByText('3')).toBeTruthy();
		expect(screen.getByText('Wounds')).toBeTruthy();
		expect(screen.getByText('10')).toBeTruthy();
	});
});
