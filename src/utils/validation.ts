import type { StatBlock } from '../types';

export interface ValidationResult {
	valid: boolean;
	errors: string[];
}

export function validateStatBlock(data: unknown): ValidationResult {
	const errors: string[] = [];

	if (!data || typeof data !== 'object') {
		return { valid: false, errors: ['Data must be an object'] };
	}

	const statblock = data as Record<string, unknown>;

	// Required field
	if (!statblock.name || typeof statblock.name !== 'string') {
		errors.push('Name is required and must be a string');
	}

	// Optional string fields
	const stringFields = ['kin', 'type', 'size', 'instinct', 'wants', 'fears', 'immunity'] as const;
	for (const field of stringFields) {
		if (statblock[field] !== undefined && typeof statblock[field] !== 'string') {
			errors.push(`${field} must be a string`);
		}
	}

	// Optional number fields
	const numberFields = ['tl', 'actionCap', 'defenseSlots', 'wounds', 'speed'] as const;
	for (const field of numberFields) {
		if (statblock[field] !== undefined && typeof statblock[field] !== 'number') {
			errors.push(`${field} must be a number`);
		}
	}

	// Perks validation
	if (statblock.perks !== undefined) {
		if (!Array.isArray(statblock.perks)) {
			errors.push('perks must be an array');
		} else {
			statblock.perks.forEach((perk: unknown, i: number) => {
				if (!perk || typeof perk !== 'object') {
					errors.push(`perks[${i}] must be an object`);
				} else {
					const p = perk as Record<string, unknown>;
					if (!p.name || typeof p.name !== 'string') {
						errors.push(`perks[${i}].name is required`);
					}
					if (!p.effect || typeof p.effect !== 'string') {
						errors.push(`perks[${i}].effect is required`);
					}
				}
			});
		}
	}

	// Actions validation
	if (statblock.actions !== undefined) {
		if (!Array.isArray(statblock.actions)) {
			errors.push('actions must be an array');
		} else {
			statblock.actions.forEach((action: unknown, i: number) => {
				if (!action || typeof action !== 'object' || Array.isArray(action)) {
					errors.push(`actions[${i}] must be an object`);
				} else {
					const a = action as Record<string, unknown>;
					if (!a.name || typeof a.name !== 'string') {
						errors.push(`actions[${i}].name is required`);
					}
					if (!a.effect || typeof a.effect !== 'string') {
						errors.push(`actions[${i}].effect is required`);
					}
					if (a.cost !== undefined && typeof a.cost !== 'number') {
						errors.push(`actions[${i}].cost must be a number`);
					}
					if (a.type !== undefined && typeof a.type !== 'string') {
						errors.push(`actions[${i}].type must be a string`);
					}
				}
			});
		}
	}

	return { valid: errors.length === 0, errors };
}

export function isValidStatBlock(data: unknown): data is StatBlock {
	return validateStatBlock(data).valid;
}
