import { describe, it, expect } from 'vitest';
import { validateStatBlock, isValidStatBlock } from '../src/utils/validation';

describe('validateStatBlock', () => {
	it('returns invalid for null/undefined', () => {
		expect(validateStatBlock(null).valid).toBe(false);
		expect(validateStatBlock(undefined).valid).toBe(false);
	});

	it('returns invalid for non-objects', () => {
		expect(validateStatBlock('string').valid).toBe(false);
		expect(validateStatBlock(123).valid).toBe(false);
		const arrayResult = validateStatBlock([]);
		expect(arrayResult.valid).toBe(false);
		expect(arrayResult.errors).toContain('Data must be an object');
	});

	it('requires name field', () => {
		const result = validateStatBlock({});
		expect(result.valid).toBe(false);
		expect(result.errors).toContain('Name is required and must be a string');
	});

	it('validates minimal valid statblock', () => {
		const result = validateStatBlock({ name: 'Test Creature' });
		expect(result.valid).toBe(true);
		expect(result.errors).toHaveLength(0);
	});

	it('validates full statblock', () => {
		const statblock = {
			name: 'General Carver',
			kin: 'Human',
			type: 'Leader',
			tl: 3,
			instinct: 'To inspire loyalty',
			wants: 'Victory at any cost',
			fears: 'Betrayal',
			immunity: 'Fear',
			actionCap: 2,
			defenseSlots: 3,
			wounds: 10,
			speed: 5,
			size: 'Medium',
			perks: [
				{ name: 'Inspiring Presence', effect: 'Allies gain +1 to attacks' },
			],
			actions: [
				{ name: 'Sword Strike', cost: 1, effect: 'Deal 2d6 damage' },
				{ name: 'Rally', type: 'Maneuver', effect: 'All allies heal 1d6' },
			],
		};
		const result = validateStatBlock(statblock);
		expect(result.valid).toBe(true);
	});

	it('validates number fields are numbers', () => {
		const result = validateStatBlock({
			name: 'Test',
			tl: 'three', // should be number
		});
		expect(result.valid).toBe(false);
		expect(result.errors).toContain('tl must be a number');
	});

	it('validates perks array structure', () => {
		const result = validateStatBlock({
			name: 'Test',
			perks: [{ name: 'Missing Effect' }],
		});
		expect(result.valid).toBe(false);
		expect(result.errors).toContain('perks[0].effect is required');
	});

	it('rejects array entries in perks', () => {
		const result = validateStatBlock({
			name: 'Test',
			perks: [['invalid']],
		});
		expect(result.valid).toBe(false);
		expect(result.errors).toContain('perks[0] must be an object');
	});

	it('validates actions array structure', () => {
		const result = validateStatBlock({
			name: 'Test',
			actions: [{ effect: 'Missing Name' }],
		});
		expect(result.valid).toBe(false);
		expect(result.errors).toContain('actions[0].name is required');
	});

	it('validates action cost is number', () => {
		const result = validateStatBlock({
			name: 'Test',
			actions: [{ name: 'Attack', effect: 'Hits', cost: 'one' }],
		});
		expect(result.valid).toBe(false);
		expect(result.errors).toContain('actions[0].cost must be a number');
	});

	it('rejects array entries in actions', () => {
		const result = validateStatBlock({
			name: 'Test',
			actions: [['invalid']],
		});
		expect(result.valid).toBe(false);
		expect(result.errors).toContain('actions[0] must be an object');
	});
});

describe('isValidStatBlock', () => {
	it('returns true for valid statblock', () => {
		expect(isValidStatBlock({ name: 'Test' })).toBe(true);
	});

	it('returns false for invalid statblock', () => {
		expect(isValidStatBlock({})).toBe(false);
		expect(isValidStatBlock(null)).toBe(false);
	});
});
