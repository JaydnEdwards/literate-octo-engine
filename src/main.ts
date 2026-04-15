import { Plugin, parseYaml } from 'obsidian';
import type { StatBlock } from './types';
import { mount } from 'svelte';
import StatBlockComponent from './components/StatBlock.svelte';

export default class DrakonymStatBlocks extends Plugin {
	async onload() {

		this.registerMarkdownCodeBlockProcessor('rbs', (source, el, ctx) => {
			try {
				const data = parseYaml(source) as StatBlock;
				if (!data || typeof data !== 'object') {
					el.createEl('div', { 
						text: 'Invalid YAML: empty or invalid stat block', 
						cls: 'statblock-error' 
					});
					return;
				}
				mount(StatBlockComponent, {
					target: el,
					props: { data }
				});
			} catch (e) {
				el.createEl('div', { 
					text: 'Invalid YAML: ' + (e instanceof Error ? e.message : String(e)), 
					cls: 'statblock-error' 
				});
			}
		});
	}
}
