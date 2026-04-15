# Drakonym Stat Blocks

An Obsidian plugin for rendering TTRPG stat blocks from YAML code blocks. Designed for Drakonym.

## Usage

Create a code block with the `rbs` identifier and define your stat block in YAML:

````markdown
```rbs
name: 
kin: 
type: 
tl: 
instinct: 
wants: 
fears: 
immunity: 
perks:
  - name: 
    effect: 
actions:
  - name: 
    cost: 
    effect: 
  - name: 
    type: 
    effect: 
actionCap: 
defenseSlots: 
wounds: 
speed: 
size: 
```
````

## Fields

| Field | Description |
|-------|-------------|
| `name` | Character/creature name |
| `kin` | Species or ancestry |
| `type` | Role or classification |
| `tl` | Threat level |
| `instinct` | Core behavioral drive |
| `wants` | Primary motivation |
| `fears` | Primary fear |
| `immunity` | Damage immunities |
| `perks` | Array of special abilities |
| `actions` | Array of available actions |
| `actionCap` | Maximum actions per turn |
| `defenseSlots` | Defense slot count |
| `wounds` | Health/wound capacity |
| `speed` | Movement speed |
| `size` | Creature size category |

## Actions

Actions can have either a `cost` or a `type`:

- **cost**: Numeric action cost
- **type**: Text description like "Special", or "Partnered (Partner Name)"

## Development

### Install dependencies

```bash
npm install
```

### Build

```bash
npm run build
```

### Watch mode

```bash
npm run dev
```

## Manual Installation

Copy `main.js`, `manifest.json`, and `styles.css` to your vault at:
```
<Vault>/.obsidian/plugins/Drakonym Stat Blocks/
```
