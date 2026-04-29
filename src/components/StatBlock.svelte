<script lang="ts">
	import type { StatBlock } from '../types';
	
	let { data }: { data: StatBlock } = $props();
	
	const coreFields = ['instinct', 'wants', 'fears'] as const;
	
	let stats = $derived(data ? [
		{ label: 'Action Cap', value: data.actionCap },
		{ label: 'DS', value: data.defenseSlots },
		{ label: 'Wounds', value: data.wounds },
		{ label: 'Speed', value: data.speed },
		{ label: 'Size', value: data.size },
	].filter(s => s.value !== undefined) : []);
</script>

{#if data}
<div class="drakonym-statblock">
	<div class="drakonym-statblock-header">
		<h1 class="drakonym-statblock-name">{data.name}</h1>
		<div class="drakonym-statblock-header-type">
			{#if data.kin}<span class="drakonym-statblock-kin">{data.kin}</span>{/if}
			{#if data.type}<span class="drakonym-statblock-type">{data.type}</span>{/if}
			{#if data.tl !== undefined}<span class="drakonym-statblock-tl">TL {data.tl}</span>{/if}
		</div>
	</div>

	{#if coreFields.some(f => data[f])}
	<div class="drakonym-statblock-personality">
		<table class="drakonym-statblock-table">
			<tbody>
				{#each coreFields as field}
					{#if data[field]}
						<tr>
							<td class="drakonym-statblock-key">{field.charAt(0).toUpperCase() + field.slice(1)}</td>
							<td class="drakonym-statblock-value">{data[field]}</td>
						</tr>
					{/if}
				{/each}
			</tbody>
		</table>
	</div>
	{/if}

	<div class="drakonym-statblock-immunities">
		{#if data.immunity || data.resistance || data.weakness}
			<div class="drakonym-statblock-immunity-group">
				{#if data.resistance}
					<div class="drakonym-statblock-resistance">
						<h2>Resistance</h2>
						<span>{data.resistance}</span>
					</div>
				{/if}
				{#if data.immunity}
					<div class="drakonym-statblock-immunity">
						<h2>Immunity</h2>
						<span>{data.immunity}</span>
					</div>
				{/if}
				{#if data.weakness}
					<div class="drakonym-statblock-weakness">
						<h2>Weakness</h2>
						<span>{data.weakness}</span>
					</div>
				{/if}
			</div>
		{/if}
	</div>

	
	<!-- Perks section -->
	{#if data.perks?.length}
		<div class="drakonym-statblock-perks">
			<h2>Perks</h2>
			{#each data.perks as perk}
				<div class="drakonym-statblock-perk">
					<h3 class="drakonym-statblock-perk-name">{perk.name}</h3>
					{#if perk.effect}
						<p class="drakonym-statblock-perk-effect">{perk.effect}</p>
					{/if}
				</div>
			{/each}
		</div>
	{/if}
	
	<!-- Actions section -->
	{#if data.actions?.length}
		<div class="drakonym-statblock-actions">
			<h2>Actions</h2>
			{#each data.actions as action}
				<div class="drakonym-statblock-action">
					<div class="drakonym-statblock-action-header">
					<h3 class="drakonym-statblock-action-name">{action.name}</h3>
					{#if action.cost !== undefined}
						<p class="drakonym-statblock-action-cost">{action.cost} AP</p>
					{:else if action.type}
						<p class="drakonym-statblock-action-type">{action.type}</p>
					{/if}
					</div>
					{#if action.effect}
						<p class="drakonym-statblock-action-effect">{action.effect}</p>
					{/if}
				</div>
			{/each}
		</div>
	{/if}
	
	<!-- Stats grid -->
	{#if stats.length}
		<div class="drakonym-statblock-stats">
			{#each stats as stat}
				<div class="drakonym-statblock-stat">
					<div class="drakonym-statblock-stat-label">{stat.label}</div>
					<div class="drakonym-statblock-stat-value">{stat.value}</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
{/if}

<style lang="scss">
:root {
	--drakonym-border-color: #AB8163;
	--drakonym-header-bg: #AB8163;
	--drakonym-background-color: #F9E1BC;
	--drakonym-personality-bg: #565656;
	--drakonym-personality-color: white;
	--drakonym-immunity-bg: #3E2B1C;
	--drakonym-immunity-color: white;

	--drakonym-statblock-spacing: 0.25rem;
}
	.drakonym-statblock {
		border: var(--drakonym-border-color) solid 5px;
		border-radius: 5px;
		background-color: var(--drakonym-background-color);
		color: black;
		& * {
			font-size: 1rem;
			line-height: 1.5;
			margin: 0;
			padding: 0;
		}
		&-header {
			display: flex;
			justify-content: space-between;
			background-color: var(--drakonym-header-bg);
			color: white;
			font-weight: bold;
			padding: var(--drakonym-statblock-spacing);
		}
		&-personality {
			background-color: var(--drakonym-personality-bg);
			color: var(--drakonym-personality-color);
			padding: var(--drakonym-statblock-spacing);
		}
		&-immunities {
			background-color: var(--drakonym-immunity-bg);
			color: var(--drakonym-immunity-color);
			padding: var(--drakonym-statblock-spacing);
		}
		&-perks, &-actions {
			padding: var(--drakonym-statblock-spacing);
			border-bottom: 2px solid var(--drakonym-border-color);
			h2 {
				margin-bottom: var(--drakonym-statblock-spacing);
			}
		}
		&-perk, &-action {
			margin-bottom: 1.5rem;
		}
		&-perk-name, &-action-name {
			font-weight: bold;
		}
		&-action-header {
			display: flex;
			gap: 1rem;
			margin-bottom: var(--drakonym-statblock-spacing);
		}
		&-action-cost {
			font-weight: bold;
			padding: 0 0.25rem;
			background-color: var(--drakonym-border-color);
			border-radius: 5px;
			color: white;
		}
		&-action-type {
			font-style: italic;
			color: var(--drakonym-immunity-bg);
		}
		&-stats {
			display: flex;
			justify-content: space-evenly;
			flex-wrap: wrap;
			margin-block: var(--drakonym-statblock-spacing) 0.5rem;
		}
		&-stat {
			text-align: center;
			font-weight: bold;
			&-value {
				font-size: 1.5rem;
				color: var(--drakonym-immunity-bg);
			}
		}
		&-table {
			border: none;
			border-collapse: collapse;
			background: transparent;
			
			td {
				border: none;
				padding: var(--drakonym-statblock-spacing);
				background: transparent;
			}
		}
		&-key {
			font-weight: bold;
		}
	}
</style>
