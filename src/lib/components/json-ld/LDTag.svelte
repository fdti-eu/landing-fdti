<script lang="ts">
	import { serializeSchema } from '#lib/components/json-ld/json-ld.ts';

	export let schema: Record<string, unknown>;
</script>

{@html serializeSchema(schema)}
