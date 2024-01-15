<script lang="ts">
	import { serializeSchema } from '$lib/components/json-ld/json-ld';

	export let schema: { [key: string]: any };
</script>

{@html serializeSchema(schema)}
